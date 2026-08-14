# Deploy auf CloudPanel (ecommlab-cloud)

> Standard-Ziel: Hetzner `91.98.93.10`, Site-User `ecomde`,
> Pfad `/home/ecomde/htdocs/ecommlab.de`. nginx proxied `ecommlab.de` und
> `ecommlab.io` auf `127.0.0.1:3000`. GCP bleibt Standby:
> [../docs/deployment-gcp.md](../docs/deployment-gcp.md).

## Deploy

Automatisch bei jedem Push auf `main` (Ziel `ecommlab-cloud`)
oder manuell: Actions → *Deploy* → *Run workflow* → Ziel wählen.

Lokal:

```bash
./scripts/deploy.sh ecomde@91.98.93.10
```

### Repository-Secrets (identisch zu mydev.ai)

| Secret | Inhalt |
|---|---|
| `ECOMMLAB_SSH_KEY` | Privater Deploy-Schlüssel (ed25519, ohne Passphrase) |
| `ECOMMLAB_KNOWN_HOSTS` | `91.98.93.10 ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH3zZl4eHDwbpn0i3zE20hKUbaSy37ddMOeDFGC3d9hh` |

Unter *Settings → Secrets and variables → Actions* dieselben Werte wie im
mydev.ai-Repo eintragen. **Wichtig:** `ECOMMLAB_KNOWN_HOSTS` muss die neue IP
`91.98.93.10` enthalten, nicht mehr `49.12.194.37`.

Solange `ECOMMLAB_SSH_KEY` fehlt, überspringt der Workflow den Deploy sichtbar.

Der öffentliche Schlüssel muss in `/home/ecomde/.ssh/authorized_keys` stehen
(derselbe wie bei `/home/mydev/.ssh/authorized_keys`).

## Betrieb

| Aufgabe | Befehl |
|---|---|
| Status | `ssh ecommlab-cloud-root 'su - ecomde -c ". ~/.nvm/nvm.sh; pm2 show ecommlab-prod"'` |
| Logs | `ssh ecommlab-cloud-root 'su - ecomde -c ". ~/.nvm/nvm.sh; pm2 logs ecommlab-prod --lines 100"'` |
| Neustart | `ssh ecommlab-cloud-root 'su - ecomde -c ". ~/.nvm/nvm.sh; pm2 restart ecommlab-prod"'` |
| Update | `./scripts/deploy.sh ecomde@91.98.93.10` |
