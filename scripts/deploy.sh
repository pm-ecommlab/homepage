#!/usr/bin/env bash
#
# Deploy der ecommlab Homepage auf den CloudPanel-Host.
#
#   ./scripts/deploy.sh [ssh-host]        # Default: ecomde@91.98.93.10
#
# Zielserver: 91.98.93.10 (ecommlab-cloud / CloudPanel).
# Site ecommlab.de/.io unter dem Site-User "ecomde"
# (/home/ecomde/htdocs/ecommlab.de). nginx proxied beide Domains auf
# 127.0.0.1:3000. Jeder Site-User hat einen eigenen pm2-Daemon.
#
set -euo pipefail

HOST="${1:-ecomde@91.98.93.10}"
APP="ecommlab-prod"
REMOTE_DIR="${ECOMMLAB_REMOTE_DIR:-/home/ecomde/htdocs/ecommlab.de}"
PORT="3000"
SKIP_VERIFY="${SKIP_VERIFY:-0}"

# Remote-Kommando MIT nvm-Umgebung: node/npm/pm2 liegen unter ~/.nvm und
# stehen in nicht-interaktiven SSH-Shells sonst nicht im PATH.
NVM_PRELUDE='export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" >/dev/null;'
rsh() { ssh "$HOST" "${NVM_PRELUDE} $*"; }

step() { printf '\n\033[1;36m▶ %s\033[0m\n' "$*"; }
ok()   { printf '  \033[0;32m✓\033[0m %s\n' "$*"; }
warn() { printf '  \033[0;33m⚠\033[0m %s\n' "$*"; }
die()  { printf '\n\033[0;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

if [ "$SKIP_VERIFY" = "1" ]; then
  step "Lint/Build-Gate übersprungen (SKIP_VERIFY=1 — Gate lief bereits in CI)"
else
  step "Lokaler Lint"
  npm run lint >/dev/null || die "Lint rot — Deploy abgebrochen."
  ok "Lint grün"
fi

step "Voraussetzungen auf ${HOST}"
MISSING=$(rsh 'for c in node npm pm2 rsync; do command -v $c >/dev/null || echo $c; done')
[ -z "$MISSING" ] || die "Auf ${HOST} fehlen: $(echo "$MISSING" | tr "\n" " ")"
ok "node/npm/pm2/rsync vorhanden"

step "Bestandsaufnahme pm2 auf ${HOST}"
BEFORE=$(rsh "pm2 jlist" | node -e '
  let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
    const others=JSON.parse(d).filter(p=>p.name!=="'"$APP"'")
      .map(p=>`${p.name}:${p.pid}:${p.pm2_env.status}`).sort();
    console.log(others.join("\n"));
  });')
echo "$BEFORE" | sed 's/^/  · /'
ok "$(echo "$BEFORE" | grep -c . || true) Fremddienste erfasst (bleiben unberührt)"

step "Übertrage Quellcode → ${HOST}:${REMOTE_DIR}"
ssh "$HOST" "mkdir -p ${REMOTE_DIR}"
rsync -az --delete \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '.next/' \
  --exclude '.pids/' \
  --exclude '.env.production' \
  --exclude '.env.local' \
  --exclude '.env*.local' \
  --exclude '.DS_Store' \
  --exclude '*.log' \
  --exclude 'docs/' \
  ./ "${HOST}:${REMOTE_DIR}/"
ok "Dateien synchronisiert (.env.production auf dem Server bleibt)"

step "Installiere Abhängigkeiten (npm ci)"
rsh "cd ${REMOTE_DIR} && npm ci --no-audit --no-fund --loglevel=error" \
  || die "npm ci fehlgeschlagen."
ok "Abhängigkeiten installiert"

step "Production-Build (next build)"
rsh "cd ${REMOTE_DIR} && npm run build" \
  || die "next build fehlgeschlagen."
ssh "$HOST" "test -d ${REMOTE_DIR}/.next" \
  || die "Build-Artefakt fehlt (.next)."
ok "Build fertig"

# --only ist zwingend: ohne Eingrenzung behandelt startOrReload die
# Ecosystem-Datei als Soll-Zustand des GESAMTEN pm2-Bestands dieses Users.
step "pm2 startOrReload (nur App: ${APP})"
rsh "cd ${REMOTE_DIR} && pm2 startOrReload deploy/ecosystem.config.cjs --only ${APP} --update-env" \
  || die "pm2 startOrReload fehlgeschlagen."
rsh "pm2 save >/dev/null" && ok "pm2-Prozessliste gespeichert (überlebt Reboot)"

step "Healthcheck"
HTTP_CODE=""
for i in $(seq 1 20); do
  HTTP_CODE=$(ssh "$HOST" "curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://127.0.0.1:${PORT}/" 2>/dev/null || true)
  [ "$HTTP_CODE" = "200" ] && break
  sleep 2
done
[ "$HTTP_CODE" = "200" ] || die "App antwortet nicht auf 127.0.0.1:${PORT}/ (Status: ${HTTP_CODE:-none}; pm2 logs ${APP})."
ok "HTTP ${HTTP_CODE} auf 127.0.0.1:${PORT}"

step "Nachbardienste unverändert?"
AFTER=$(rsh "pm2 jlist" | node -e '
  let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
    const others=JSON.parse(d).filter(p=>p.name!=="'"$APP"'")
      .map(p=>`${p.name}:${p.pid}:${p.pm2_env.status}`).sort();
    console.log(others.join("\n"));
  });')
if [ "$BEFORE" = "$AFTER" ]; then
  ok "Alle Fremddienste mit identischer PID/Status weiterhin online"
else
  printf '\n\033[1;31m✗ ACHTUNG: Zustand fremder pm2-Dienste hat sich geändert!\033[0m\n' >&2
  diff <(echo "$BEFORE") <(echo "$AFTER") | sed 's/^/    /' >&2 || true
  BROKEN=$(comm -13 <(echo "$AFTER" | grep -o '^[^:]*:.*:online' | cut -d: -f1 | sort) \
                    <(echo "$BEFORE" | grep -o '^[^:]*:.*:online' | cut -d: -f1 | sort) || true)
  if [ -n "$BROKEN" ]; then
    printf '\033[1;31m  Nicht mehr online: %s\033[0m\n' "$(echo "$BROKEN" | tr '\n' ' ')" >&2
    die "Deploy hat fremde Dienste beeinträchtigt."
  fi
  warn "Änderung ohne Verschlechterung (keine Aktion nötig)."
fi

printf '\n\033[1;32m✔ Deploy abgeschlossen\033[0m — App "%s" auf %s, Port %s\n' "$APP" "$HOST" "$PORT"
printf '   Logs:  ssh %s "pm2 logs %s"\n' "$HOST" "$APP"
