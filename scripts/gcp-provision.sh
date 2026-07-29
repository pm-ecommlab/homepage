#!/usr/bin/env bash
#
# gcp-provision.sh — idempotently stand up GCP infrastructure for the
# ecommlab homepage (Cloud Run + Artifact Registry + Secret Manager + WIF).
#
# Everything is "create-if-missing": re-running is safe and only fills gaps.
# It never rotates existing secrets.
#
# Usage:
#   scripts/gcp-provision.sh <env>            # env = prod | <name>
#   scripts/gcp-provision.sh <env> --write-config
#   scripts/gcp-provision.sh --project <id>
#
# Optional: export SMTP_* / TURNSTILE_SECRET_KEY / CONTACT_TO before running
# to seed Secret Manager on first create. Otherwise placeholder secrets are
# created and must be updated manually.
#
# Requirements: gcloud (authenticated owner/editor), openssl.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_DIR="$REPO_ROOT/deploy/environments"

ENV_NAME=""
ENV_FILE=""
WRITE_CONFIG=0
CLI_PROJECT_ID=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --write-config) WRITE_CONFIG=1; shift ;;
    --project) CLI_PROJECT_ID="$2"; shift 2 ;;
    -h|--help) grep '^#' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    -*) echo "Unknown flag: $1" >&2; exit 2 ;;
    *) ENV_NAME="$1"; shift ;;
  esac
done

log()  { printf '\033[1;34m▶ %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m  ✓ %s\033[0m\n' "$*"; }
skip() { printf '\033[0;90m  · %s (exists)\033[0m\n' "$*"; }
warn() { printf '\033[1;33m  ! %s\033[0m\n' "$*" >&2; }
die()  { printf '\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

command -v gcloud >/dev/null 2>&1 || die "gcloud not found in PATH"
command -v openssl >/dev/null 2>&1 || die "openssl not found in PATH"

REGION="europe-central2"
REPO="ecommlab-docker"
WEB_SERVICE="ecommlab-web"
WIF_POOL="github"
WIF_PROVIDER="github-oidc"
DEPLOYER_SA="github-deployer"
GITHUB_REPO=""
PROJECT_ID=""
PROJECT_NUMBER=""

if [[ -n "$ENV_NAME" ]]; then
  ENV_FILE="$ENV_DIR/$ENV_NAME.env"
  [[ -f "$ENV_FILE" ]] || die "No env file: $ENV_FILE"
  # shellcheck disable=SC1090
  set -a; source "$ENV_FILE"; set +a
fi
[[ -n "$CLI_PROJECT_ID" ]] && PROJECT_ID="$CLI_PROJECT_ID"
[[ -n "$PROJECT_ID" ]] || die "PROJECT_ID not set (pass an <env> or --project <id>)"

if [[ -z "$GITHUB_REPO" ]]; then
  origin="$(git -C "$REPO_ROOT" config --get remote.origin.url 2>/dev/null || true)"
  GITHUB_REPO="$(printf '%s' "$origin" | sed -E 's#(git@github.com:|https://github.com/)##; s#\.git$##')"
fi

log "Provisioning project: $PROJECT_ID  (region $REGION, repo ${GITHUB_REPO:-<none>})"
gcloud config set project "$PROJECT_ID" >/dev/null

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
[[ -n "$PROJECT_NUMBER" ]] || die "Could not resolve project number for $PROJECT_ID"
COMPUTE_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
DEPLOYER_EMAIL="${DEPLOYER_SA}@${PROJECT_ID}.iam.gserviceaccount.com"
ok "project number $PROJECT_NUMBER"

# ---------------------------------------------------------------------------
# 1. Enable APIs
# ---------------------------------------------------------------------------
log "Enabling required services"
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  compute.googleapis.com \
  --project "$PROJECT_ID"
ok "services enabled"

# ---------------------------------------------------------------------------
# 2. Artifact Registry
# ---------------------------------------------------------------------------
log "Artifact Registry repo: $REPO"
if gcloud artifacts repositories describe "$REPO" --location "$REGION" >/dev/null 2>&1; then
  skip "artifact registry $REPO"
else
  gcloud artifacts repositories create "$REPO" \
    --repository-format=docker --location "$REGION" \
    --description="ecommlab homepage container images"
  ok "created artifact registry $REPO"
fi

# ---------------------------------------------------------------------------
# 3. Secret Manager (runtime secrets for Cloud Run)
# ---------------------------------------------------------------------------
log "Secret Manager"
secret_exists() { gcloud secrets describe "$1" >/dev/null 2>&1; }

ensure_secret() {
  local name="$1"
  local value="$2"
  if secret_exists "$name"; then
    skip "secret $name"
    return
  fi
  if [[ -z "$value" ]]; then
    value="UNSET"
    warn "creating placeholder secret $name — update before go-live"
  fi
  printf '%s' "$value" | gcloud secrets create "$name" --data-file=-
  ok "created secret $name"
}

ensure_secret SMTP_HOST             "${SMTP_HOST:-}"
ensure_secret SMTP_PORT             "${SMTP_PORT:-587}"
ensure_secret SMTP_USER             "${SMTP_USER:-}"
ensure_secret SMTP_PASS             "${SMTP_PASS:-}"
ensure_secret SMTP_FROM             "${SMTP_FROM:-}"
ensure_secret CONTACT_TO            "${CONTACT_TO:-hello@ecommlab.io}"
ensure_secret TURNSTILE_SECRET_KEY  "${TURNSTILE_SECRET_KEY:-}"

# ---------------------------------------------------------------------------
# 4. Runtime IAM — default compute SA (Cloud Build deploy + Cloud Run runtime)
# ---------------------------------------------------------------------------
log "Runtime IAM for $COMPUTE_SA"
grant_project_role() {
  local member="$1" role="$2"
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="$member" --role="$role" --condition=None >/dev/null
}
for role in \
  roles/run.admin \
  roles/iam.serviceAccountUser \
  roles/secretmanager.secretAccessor \
  roles/artifactregistry.writer \
  roles/logging.logWriter; do
  grant_project_role "serviceAccount:${COMPUTE_SA}" "$role"
done
ok "compute SA roles granted"

# ---------------------------------------------------------------------------
# 5. Deployer service account (GitHub Actions via WIF)
# ---------------------------------------------------------------------------
log "Deployer service account: $DEPLOYER_EMAIL"
if gcloud iam service-accounts describe "$DEPLOYER_EMAIL" >/dev/null 2>&1; then
  skip "service account $DEPLOYER_SA"
else
  gcloud iam service-accounts create "$DEPLOYER_SA" \
    --display-name="GitHub Actions deployer"
  ok "created service account $DEPLOYER_SA"
fi

for role in \
  roles/cloudbuild.builds.editor \
  roles/serviceusage.serviceUsageConsumer \
  roles/run.developer \
  roles/storage.admin \
  roles/viewer; do
  grant_project_role "serviceAccount:${DEPLOYER_EMAIL}" "$role"
done

# Cloud Build runs as the compute SA; submit requires actAs on it.
gcloud iam service-accounts add-iam-policy-binding "$COMPUTE_SA" \
  --member="serviceAccount:${DEPLOYER_EMAIL}" \
  --role="roles/iam.serviceAccountUser" >/dev/null
ok "deployer roles granted (+ actAs on compute SA)"

# ---------------------------------------------------------------------------
# 6. Workload Identity Federation (keyless GitHub OIDC)
# ---------------------------------------------------------------------------
log "Workload Identity Federation pool/provider: $WIF_POOL/$WIF_PROVIDER"
if gcloud iam workload-identity-pools describe "$WIF_POOL" \
     --location=global >/dev/null 2>&1; then
  skip "wif pool $WIF_POOL"
else
  gcloud iam workload-identity-pools create "$WIF_POOL" \
    --location=global --display-name="GitHub Actions"
  ok "created wif pool $WIF_POOL"
fi

if gcloud iam workload-identity-pools providers describe "$WIF_PROVIDER" \
     --location=global --workload-identity-pool="$WIF_POOL" >/dev/null 2>&1; then
  skip "wif provider $WIF_PROVIDER"
else
  [[ -n "$GITHUB_REPO" ]] || die "GITHUB_REPO required to create WIF provider"
  gcloud iam workload-identity-pools providers create-oidc "$WIF_PROVIDER" \
    --location=global --workload-identity-pool="$WIF_POOL" \
    --display-name="GitHub OIDC" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
    --attribute-condition="assertion.repository == '${GITHUB_REPO}'"
  ok "created wif provider $WIF_PROVIDER (scoped to repo $GITHUB_REPO)"
fi

if [[ -n "$GITHUB_REPO" ]]; then
  PRINCIPAL="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WIF_POOL}/attribute.repository/${GITHUB_REPO}"
  gcloud iam service-accounts add-iam-policy-binding "$DEPLOYER_EMAIL" \
    --role="roles/iam.workloadIdentityUser" \
    --member="$PRINCIPAL" >/dev/null
  ok "bound repo $GITHUB_REPO -> $DEPLOYER_SA (workloadIdentityUser)"
else
  warn "No GitHub repo resolved — skipped WIF repo binding. Set GITHUB_REPO and re-run."
fi

# ---------------------------------------------------------------------------
# 7. Optionally persist PROJECT_NUMBER
# ---------------------------------------------------------------------------
if [[ "$WRITE_CONFIG" -eq 1 && -n "$ENV_FILE" ]]; then
  if grep -q '^PROJECT_NUMBER=' "$ENV_FILE"; then
    tmp="$(mktemp)"
    sed "s/^PROJECT_NUMBER=.*/PROJECT_NUMBER=${PROJECT_NUMBER}/" "$ENV_FILE" > "$tmp"
    mv "$tmp" "$ENV_FILE"
    ok "wrote PROJECT_NUMBER=$PROJECT_NUMBER into $ENV_FILE"
  fi
fi

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
WIF_PATH="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WIF_POOL}/providers/${WIF_PROVIDER}"
cat <<EOF

$(printf '\033[1;32m✓ Provisioning complete for %s\033[0m' "$PROJECT_ID")

  Project number : $PROJECT_NUMBER
  Region         : $REGION
  Artifact repo  : $REPO
  Cloud Run      : $WEB_SERVICE  (created on first deploy)
  Deployer SA    : $DEPLOYER_EMAIL
  WIF provider   : $WIF_PATH

Next steps:
  1. Commit deploy/environments/${ENV_NAME:-prod}.env with PROJECT_NUMBER=$PROJECT_NUMBER
     (re-run with --write-config to set it automatically).
  2. Fill Secret Manager values if placeholders were created:
       gcloud secrets versions add SMTP_PASS --data-file=-
       … (SMTP_HOST, SMTP_USER, TURNSTILE_SECRET_KEY, …)
  3. Set NEXT_PUBLIC_* in deploy/environments/${ENV_NAME:-prod}.env and commit.
  4. Push to main (or run workflow_dispatch) to deploy via GitHub Actions.
  5. Optional custom domain: scripts/gcp-domain.sh ${ENV_NAME:-prod}
EOF
