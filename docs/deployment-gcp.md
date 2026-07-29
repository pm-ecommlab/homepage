# GCP Deployment — ecommlab Homepage

**Live-Traffic bleibt vorerst auf `ecommlab-new`.** GCP (Cloud Run + optional LB)
ist provisioniert und bereit, aber DNS zeigt noch nicht darauf.

Deploy läuft **nur manuell** über GitHub Actions → **Deploy** → Target wählen:

| Target | Ziel |
| ------ | ---- |
| `ecommlab-new` (Default) | SSH/rsync → `/var/www/ecommlab-relaunch`, PM2 `ecommlab-prod` |
| `gcloud` | Cloud Build → Artifact Registry → Cloud Run |

## Architecture (GCP, standby)

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
| Standby LB IP | `8.233.8.74` (noch **nicht** in Cloudflare setzen) |

## Environments

| Env  | Config |
| ---- | ------ |
| prod | `deploy/environments/prod.env` |

`*.env` files are the single source of truth for project id, region, service
names and WIF paths. They are **not** secret. Runtime secrets live in Secret Manager.

## GitHub Secrets for ecommlab-new

Identisch zu mydev.ai (siehe auch `deploy/README.md`):

| Secret | Inhalt |
| ------ | ------ |
| `ECOMMLAB_SSH_KEY` | Privater Deploy-Schlüssel (ed25519) |
| `ECOMMLAB_KNOWN_HOSTS` | `49.12.194.37 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIyKLVpuH21pZU+Suj2X8ySIiQig9Cw4kL5T7TWeEDzj` |

`.env.production` auf dem Server wird **nicht** überschrieben (rsync exclude).

## One-time setup (GCP)

### 1. Prerequisites

- GCP project `ecommlab-homepage` exists and billing is enabled
- `gcloud` authenticated as owner/editor of that project
- GitHub repo: `pm-ecommlab/homepage` (`GITHUB_REPO` in `deploy/environments/prod.env`)

### 2. Provision infrastructure

```bash
gcloud auth login
gcloud config set project ecommlab-homepage
scripts/gcp-provision.sh prod --write-config
```

### 3. Fill secrets (if placeholders were created)

```bash
printf '%s' 'your-value' | gcloud secrets versions add SMTP_PASS --data-file=-
```

### 4. Public build-time env

Edit `deploy/environments/prod.env` (`NEXT_PUBLIC_*`). These are baked into the
Next.js image at build time (gcloud target only).

### 5. Deploy

**Actions → Deploy → Run workflow → Target wählen** (`ecommlab-new` oder `gcloud`).

Kein automatischer Deploy mehr bei `git push`.

## Custom domain (GCP cutover — später)

Erst wenn ihr bewusst umstellt:

1. Cloudflare A-Record `ecommlab.io` → `8.233.8.74`
2. Warten bis Managed Cert `ACTIVE` ist

Solange DNS auf ecommlab-new zeigt, bleibt die Live-Site unverändert.

## Cost notes

- Cloud Run with `min-instances=0` scales to zero.
- Load balancer + reserved IP ≈ 18–25 EUR/mo, solange provisioniert — unabhängig vom DNS-Cutover.

## File map

| Path | Role |
| ---- | ---- |
| `Dockerfile` | Next.js standalone image |
| `cloudbuild.yaml` | Build, push, `gcloud run deploy` |
| `.github/workflows/deploy.yml` | Manual target choice: ecommlab-new \| gcloud |
| `deploy/environments/prod.env` | Non-secret GCP env config |
| `scripts/gcp-provision.sh` | Idempotent infra bootstrap |
| `scripts/gcp-domain.sh` | Custom domain / ALB |
| `.gcloudignore` | Shrinks Cloud Build upload |
