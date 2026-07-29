# GCP Deployment — ecommlab Homepage

Deployment pattern adapted from `clineca-new`: **GitHub Actions (OIDC/WIF) →
Cloud Build → Artifact Registry → Cloud Run**, with idempotent Bash
provisioning. No Terraform. No Cloud SQL (static marketing site + contact API).

## Architecture

```
Browser ──► (optional) Global HTTPS LB ──► ecommlab-web (Cloud Run, Next.js)
                                              │
                              Secret Manager (SMTP_*, TURNSTILE_SECRET_KEY, …)
                              Artifact Registry (ecommlab-docker)
```

| Piece | Name / notes |
| ----- | ------------ |
| GCP project | `ecommlab-homepage` |
| Region | `europe-central2` |
| Cloud Run | `ecommlab-web` (port 8080, min instances 0) |
| Artifact Registry | `ecommlab-docker` |
| Auth to GCP from CI | Workload Identity Federation (`github` / `github-oidc`) |
| Deployer SA | `github-deployer@ecommlab-homepage.iam.gserviceaccount.com` |

## Environments

| Env  | Branch | Config |
| ---- | ------ | ------ |
| prod | `main` | `deploy/environments/prod.env` |

`*.env` files are the single source of truth for project id, region, service
names and WIF paths. They are **not** secret (except you should not put
SMTP passwords there). Runtime secrets live in Secret Manager.

## One-time setup

### 1. Prerequisites

- GCP project `ecommlab-homepage` exists and billing is enabled
- `gcloud` authenticated as owner/editor of that project
- GitHub repo: `pm-ecommlab/homepage` (`GITHUB_REPO` in `deploy/environments/prod.env`)

### 2. Provision infrastructure

```bash
gcloud auth login
gcloud config set project ecommlab-homepage

# Optional: seed secrets from your shell instead of placeholders
export SMTP_HOST=smtp.gmail.com SMTP_PORT=587
export SMTP_USER=… SMTP_PASS=… SMTP_FROM=…
export CONTACT_TO=hello@ecommlab.io
export TURNSTILE_SECRET_KEY=…

scripts/gcp-provision.sh prod --write-config
```

This enables APIs, creates Artifact Registry, Secret Manager entries, the
`github-deployer` SA, and the WIF pool/provider. Commit the updated
`prod.env` (`PROJECT_NUMBER` filled in).

### 3. Fill secrets (if placeholders were created)

```bash
printf '%s' 'your-value' | gcloud secrets versions add SMTP_PASS --data-file=-
# same for SMTP_HOST, SMTP_USER, SMTP_FROM, CONTACT_TO, TURNSTILE_SECRET_KEY
```

### 4. Public build-time env

Edit `deploy/environments/prod.env`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_COOKIEBOT_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

These are baked into the Next.js image at build time.

### 5. Deploy

Push to `main` (or run **Actions → Deploy → Run workflow**). The workflow:

1. Resolves `prod` from the branch
2. Authenticates via WIF (no JSON keys)
3. Runs `gcloud builds submit --config cloudbuild.yaml`

Manual deploy from an authenticated shell:

```bash
source deploy/environments/prod.env
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=COMMIT_SHA=$(git rev-parse --short=12 HEAD),_REGION=$REGION,_REPO=$REPO,_SERVICE=$WEB_SERVICE,_NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL,_NEXT_PUBLIC_COOKIEBOT_ID=$NEXT_PUBLIC_COOKIEBOT_ID,_NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID,_NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY \
  .
```

### 6. Custom domain (optional)

`europe-central2` has no Cloud Run domain mappings, so use a global HTTPS LB:

```bash
scripts/gcp-domain.sh prod
```

If `DNS_PROJECT` / `DNS_ZONE` are empty (e.g. DNS in Cloudflare), the script
prints the reserved static IP — create an A-record yourself. Managed TLS goes
ACTIVE after DNS propagates (~15–60 min).

## Local Docker smoke test

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:8080 \
  -t ecommlab-web:local .
docker run --rm -p 8080:8080 \
  -e SMTP_HOST=… -e TURNSTILE_SECRET_KEY=… \
  ecommlab-web:local
```

## Cost notes

- Cloud Run with `min-instances=0` scales to zero (no idle container cost).
- Load balancer + reserved IP ≈ 18–25 EUR/mo when provisioned — only needed for
  a custom domain in this region.
- No Cloud SQL for this site.

## File map

| Path | Role |
| ---- | ---- |
| `Dockerfile` | Next.js standalone image |
| `cloudbuild.yaml` | Build, push, `gcloud run deploy` |
| `.github/workflows/deploy.yml` | GitHub Actions entrypoint |
| `deploy/environments/prod.env` | Non-secret env config |
| `scripts/gcp-provision.sh` | Idempotent infra bootstrap |
| `scripts/gcp-domain.sh` | Custom domain / ALB |
| `.gcloudignore` | Shrinks Cloud Build upload |
