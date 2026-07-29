# Deploy auf einen Host mit bestehenden pm2-Diensten

> Variante für geteilte Server ohne Docker (`ecommlab-new`) — **aktuelles
> Standard-Ziel**. Die Google-Cloud-Variante ist eingerichtet, Live-Traffic
> bleibt aber auf ecommlab-new: [../docs/deployment-gcp.md](../docs/deployment-gcp.md).

## Deploy

Automatisch bei jedem Push auf `main` (GitHub Actions, Ziel `ecommlab-new`)
oder manuell im Actions-Tab: *Deploy* → *Run workflow* → Ziel wählen.

Lokal, ohne GitHub:

```bash
./scripts/deploy.sh ecommlab-new
```

### Repository-Secrets (identisch zu mydev.ai)

Dieselben Secrets wie im Repo `mydev.ai` / dem gemeinsamen Deploy-Schlüssel
auf `ecommlab-new`:

| Secret | Inhalt |
|---|---|
| `ECOMMLAB_SSH_KEY` | Privater Deploy-Schlüssel (ed25519, ohne Passphrase) |
| `ECOMMLAB_KNOWN_HOSTS` | `49.12.194.37 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIyKLVpuH21pZU+Suj2X8ySIiQig9Cw4kL5T7TWeEDzj` |

Unter *Settings → Secrets and variables → Actions* eintragen (oder dieselben
Werte aus dem mydev.ai-Repo übernehmen).

Solange `ECOMMLAB_SSH_KEY` fehlt, überspringt der Workflow den Deploy sichtbar
statt fehlzuschlagen.

Der Workflow verifiziert den Host-Key gegen `ECOMMLAB_KNOWN_HOSTS` (kein
`StrictHostKeyChecking=no`).

Das Skript ist idempotent und macht: Voraussetzungs-Check → `rsync` (ohne
`node_modules`, `.next`, `.git`, **ohne** `.env.production`) → `npm ci` →
`next build` → `pm2 startOrReload deploy/ecosystem.config.cjs --only ecommlab-prod`
→ `pm2 save` → Healthcheck. Anschließend vergleicht es die pm2-Liste vor/nach
und weist nach, dass Fremddienste unberührt bleiben.

**Nachbardienste sind tabu:** Niemals `pm2 restart all` / `pm2 delete all` auf
diesem Host verwenden.

## Betrieb

| Aufgabe | Befehl |
|---|---|
| Status | `ssh ecommlab-new "pm2 show ecommlab-prod"` |
| Logs | `ssh ecommlab-new "pm2 logs ecommlab-prod --lines 100"` |
| Neustart | `ssh ecommlab-new "pm2 restart ecommlab-prod"` |
| Update | `./scripts/deploy.sh ecommlab-new` |
