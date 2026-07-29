#!/usr/bin/env bash
#
# gcp-domain.sh — put the Cloud Run web service behind a custom domain via a
# global external Application Load Balancer + Google-managed TLS.
#
# Why a load balancer (not Cloud Run domain mapping): europe-central2 does not
# support domain mappings. A global external ALB is region-independent.
#
# Usage:
#   scripts/gcp-domain.sh <env>       # env = prod | <name>
#
# If DNS_PROJECT / DNS_ZONE are set, writes an A-record there.
# Otherwise prints the reserved IP for manual DNS (e.g. Cloudflare).
#
# Requirements: gcloud (authenticated owner/editor).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_DIR="$REPO_ROOT/deploy/environments"

ENV_NAME="${1:-}"
[[ -n "$ENV_NAME" ]] || { echo "usage: $0 <env>" >&2; exit 2; }
ENV_FILE="$ENV_DIR/$ENV_NAME.env"
[[ -f "$ENV_FILE" ]] || { echo "No env file: $ENV_FILE" >&2; exit 1; }

log()  { printf '\033[1;34m▶ %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m  ✓ %s\033[0m\n' "$*"; }
skip() { printf '\033[0;90m  · %s (exists)\033[0m\n' "$*"; }
die()  { printf '\033[1;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

command -v gcloud >/dev/null 2>&1 || die "gcloud not found in PATH"

REGION="europe-central2"
WEB_SERVICE="ecommlab-web"
WEB_DOMAIN=""
DNS_PROJECT=""
DNS_ZONE=""
PROJECT_ID=""
# shellcheck disable=SC1090
set -a; source "$ENV_FILE"; set +a

[[ -n "$PROJECT_ID" ]] || die "PROJECT_ID not set in $ENV_FILE"
[[ -n "$WEB_DOMAIN" ]] || die "WEB_DOMAIN not set in $ENV_FILE"

IP_NAME="${WEB_SERVICE}-ip"
NEG_NAME="${WEB_SERVICE}-neg"
BE_NAME="${WEB_SERVICE}-be"
CERT_NAME="${WEB_SERVICE}-cert"
URLMAP_NAME="${WEB_SERVICE}-urlmap"
HTTPS_PROXY="${WEB_SERVICE}-https-proxy"
HTTPS_FR="${WEB_SERVICE}-https-fr"
REDIRECT_MAP="${WEB_SERVICE}-redirect"
HTTP_PROXY="${WEB_SERVICE}-http-proxy"
HTTP_FR="${WEB_SERVICE}-http-fr"

G="--global"
P="--project=$PROJECT_ID"

log "Custom domain $WEB_DOMAIN -> Cloud Run $WEB_SERVICE ($PROJECT_ID / $REGION)"

gcloud services enable compute.googleapis.com --project="$PROJECT_ID" >/dev/null

if ! gcloud run services describe "$WEB_SERVICE" --region="$REGION" $P >/dev/null 2>&1; then
  die "Cloud Run service $WEB_SERVICE not found — deploy once before wiring the domain"
fi

if gcloud compute addresses describe "$IP_NAME" $G $P >/dev/null 2>&1; then
  skip "static ip $IP_NAME"
else
  gcloud compute addresses create "$IP_NAME" $G $P --ip-version=IPV4
  ok "reserved static ip $IP_NAME"
fi
IP=$(gcloud compute addresses describe "$IP_NAME" $G $P --format='value(address)')
ok "ip = $IP"

if gcloud compute network-endpoint-groups describe "$NEG_NAME" --region="$REGION" $P >/dev/null 2>&1; then
  skip "serverless neg $NEG_NAME"
else
  gcloud compute network-endpoint-groups create "$NEG_NAME" \
    --region="$REGION" --network-endpoint-type=serverless \
    --cloud-run-service="$WEB_SERVICE" $P
  ok "created serverless neg $NEG_NAME"
fi

if gcloud compute backend-services describe "$BE_NAME" $G $P >/dev/null 2>&1; then
  skip "backend service $BE_NAME"
else
  gcloud compute backend-services create "$BE_NAME" \
    $G --load-balancing-scheme=EXTERNAL_MANAGED $P
  ok "created backend service $BE_NAME"
fi
if gcloud compute backend-services describe "$BE_NAME" $G $P \
     --format='value(backends[].group)' | grep -q "$NEG_NAME"; then
  skip "backend $NEG_NAME attached"
else
  gcloud compute backend-services add-backend "$BE_NAME" $G $P \
    --network-endpoint-group="$NEG_NAME" --network-endpoint-group-region="$REGION"
  ok "attached neg to backend service"
fi

if gcloud compute ssl-certificates describe "$CERT_NAME" $G $P >/dev/null 2>&1; then
  skip "managed cert $CERT_NAME"
else
  gcloud compute ssl-certificates create "$CERT_NAME" \
    --domains="$WEB_DOMAIN" $G $P
  ok "created managed cert $CERT_NAME (provisions after DNS resolves)"
fi

if gcloud compute url-maps describe "$URLMAP_NAME" $G $P >/dev/null 2>&1; then
  skip "url map $URLMAP_NAME"
else
  gcloud compute url-maps create "$URLMAP_NAME" --default-service="$BE_NAME" $G $P
  ok "created url map $URLMAP_NAME"
fi

if gcloud compute target-https-proxies describe "$HTTPS_PROXY" $G $P >/dev/null 2>&1; then
  skip "https proxy $HTTPS_PROXY"
else
  gcloud compute target-https-proxies create "$HTTPS_PROXY" \
    --url-map="$URLMAP_NAME" --ssl-certificates="$CERT_NAME" $G $P
  ok "created https proxy $HTTPS_PROXY"
fi

if gcloud compute forwarding-rules describe "$HTTPS_FR" $G $P >/dev/null 2>&1; then
  skip "https forwarding rule $HTTPS_FR"
else
  gcloud compute forwarding-rules create "$HTTPS_FR" \
    $G --address="$IP_NAME" --target-https-proxy="$HTTPS_PROXY" \
    --ports=443 --load-balancing-scheme=EXTERNAL_MANAGED $P
  ok "created https forwarding rule $HTTPS_FR"
fi

if gcloud compute url-maps describe "$REDIRECT_MAP" $G $P >/dev/null 2>&1; then
  skip "redirect url map $REDIRECT_MAP"
else
  tmp="$(mktemp)"
  cat > "$tmp" <<YAML
name: $REDIRECT_MAP
defaultUrlRedirect:
  httpsRedirect: true
  redirectResponseCode: MOVED_PERMANENTLY_DEFAULT
YAML
  gcloud compute url-maps import "$REDIRECT_MAP" $G $P --source="$tmp" --quiet
  rm -f "$tmp"
  ok "created redirect url map $REDIRECT_MAP"
fi
if gcloud compute target-http-proxies describe "$HTTP_PROXY" $G $P >/dev/null 2>&1; then
  skip "http proxy $HTTP_PROXY"
else
  gcloud compute target-http-proxies create "$HTTP_PROXY" --url-map="$REDIRECT_MAP" $G $P
  ok "created http proxy $HTTP_PROXY"
fi
if gcloud compute forwarding-rules describe "$HTTP_FR" $G $P >/dev/null 2>&1; then
  skip "http forwarding rule $HTTP_FR"
else
  gcloud compute forwarding-rules create "$HTTP_FR" \
    $G --address="$IP_NAME" --target-http-proxy="$HTTP_PROXY" \
    --ports=80 --load-balancing-scheme=EXTERNAL_MANAGED $P
  ok "created http forwarding rule $HTTP_FR"
fi

if [[ -n "${DNS_PROJECT:-}" && -n "${DNS_ZONE:-}" ]]; then
  log "DNS A-record $WEB_DOMAIN -> $IP  (zone $DNS_ZONE / $DNS_PROJECT)"
  FQDN="${WEB_DOMAIN}."
  EXISTING=$(gcloud dns record-sets list --zone="$DNS_ZONE" --project="$DNS_PROJECT" \
    --name="$FQDN" --type=A --format='value(rrdatas[0])' 2>/dev/null || true)
  if [[ "$EXISTING" == "$IP" ]]; then
    skip "dns A $WEB_DOMAIN"
  elif [[ -n "$EXISTING" ]]; then
    gcloud dns record-sets update "$FQDN" --zone="$DNS_ZONE" --project="$DNS_PROJECT" \
      --type=A --ttl=300 --rrdatas="$IP"
    ok "updated dns A $WEB_DOMAIN ($EXISTING -> $IP)"
  else
    gcloud dns record-sets create "$FQDN" --zone="$DNS_ZONE" --project="$DNS_PROJECT" \
      --type=A --ttl=300 --rrdatas="$IP"
    ok "created dns A $WEB_DOMAIN -> $IP"
  fi
else
  printf '\033[1;33m  ! DNS_PROJECT/DNS_ZONE empty — set an A-record manually (e.g. Cloudflare):\033[0m\n' >&2
  printf '\033[1;33m      %s  →  %s\033[0m\n' "$WEB_DOMAIN" "$IP" >&2
fi

CERT_STATUS=$(gcloud compute ssl-certificates describe "$CERT_NAME" $G $P \
  --format='value(managed.status)' 2>/dev/null || echo "UNKNOWN")
cat <<EOF

$(printf '\033[1;32m✓ Load balancer ready for %s\033[0m' "$WEB_DOMAIN")

  Static IP    : $IP
  Cert status  : $CERT_STATUS  (target: ACTIVE)
  URL          : https://$WEB_DOMAIN

Managed cert becomes ACTIVE after DNS points here (typically 15–60 min):
  gcloud compute ssl-certificates describe $CERT_NAME --global --project $PROJECT_ID \\
    --format='value(managed.status, managed.domainStatus)'
EOF
