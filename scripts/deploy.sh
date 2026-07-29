#!/usr/bin/env bash
#
# Deploy der ecommlab Homepage auf einen Host mit bestehenden pm2-Diensten.
#
#   ./scripts/deploy.sh [ssh-host]        # Default-Host: ecommlab-new
#
# Eigenschaften:
#   - idempotent (rsync + npm ci + build + pm2 startOrReload --only)
#   - fasst AUSSCHLIESSLICH die pm2-App "ecommlab-prod" an
#   - kein git auf dem Zielhost nötig (Transfer per rsync)
#   - .env.production auf dem Server bleibt unangetastet
#
set -euo pipefail

HOST="${1:-ecommlab-new}"
APP="ecommlab-prod"
REMOTE_DIR="/var/www/ecommlab-relaunch"
PORT="3000"
SKIP_VERIFY="${SKIP_VERIFY:-0}"

step() { printf '\n\033[1;36m▶ %s\033[0m\n' "$*"; }
ok()   { printf '  \033[0;32m✓\033[0m %s\n' "$*"; }
warn() { printf '  \033[0;33m⚠\033[0m %s\n' "$*"; }
die()  { printf '\n\033[0;31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

# ---- 0. Gate ----------------------------------------------------------------
if [ "$SKIP_VERIFY" = "1" ]; then
  step "Lint/Build-Gate übersprungen (SKIP_VERIFY=1 — Gate lief bereits in CI)"
else
  step "Lokaler Lint"
  npm run lint >/dev/null || die "Lint rot — Deploy abgebrochen."
  ok "Lint grün"
fi

# ---- 1. Voraussetzungen + Zustand der Nachbardienste -----------------------
step "Voraussetzungen auf ${HOST}"
MISSING=$(ssh "$HOST" 'for c in node npm pm2 rsync; do command -v $c >/dev/null || echo $c; done')
[ -z "$MISSING" ] || die "Auf ${HOST} fehlen: $(echo "$MISSING" | tr "\n" " ")"
ok "node/npm/pm2/rsync vorhanden"

step "Bestandsaufnahme pm2 auf ${HOST}"
BEFORE=$(ssh "$HOST" "pm2 jlist" | node -e '
  let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{
    const others=JSON.parse(d).filter(p=>p.name!=="'"$APP"'")
      .map(p=>`${p.name}:${p.pid}:${p.pm2_env.status}`).sort();
    console.log(others.join("\n"));
  });')
echo "$BEFORE" | sed 's/^/  · /'
ok "$(echo "$BEFORE" | grep -c . || true) Fremddienste erfasst (bleiben unberührt)"

# ---- 2. Transfer ------------------------------------------------------------
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

# ---- 3. Abhängigkeiten + Build ---------------------------------------------
step "Installiere Abhängigkeiten (npm ci)"
ssh "$HOST" "cd ${REMOTE_DIR} && npm ci --no-audit --no-fund --loglevel=error" \
  || die "npm ci fehlgeschlagen."
ok "Abhängigkeiten installiert"

step "Production-Build (next build)"
ssh "$HOST" "cd ${REMOTE_DIR} && npm run build" \
  || die "next build fehlgeschlagen."
ssh "$HOST" "test -d ${REMOTE_DIR}/.next" \
  || die "Build-Artefakt fehlt (.next)."
ok "Build fertig"

# ---- 4. pm2: NUR die eigene App --------------------------------------------
# --only ist zwingend: ohne Eingrenzung behandelt startOrReload die
# Ecosystem-Datei als Soll-Zustand des GESAMTEN pm2-Bestands.
step "pm2 startOrReload (nur App: ${APP})"
ssh "$HOST" "cd ${REMOTE_DIR} && pm2 startOrReload deploy/ecosystem.config.cjs --only ${APP} --update-env" \
  || die "pm2 startOrReload fehlgeschlagen."
ssh "$HOST" "pm2 save >/dev/null" && ok "pm2-Prozessliste gespeichert (überlebt Reboot)"

# ---- 5. Verifikation --------------------------------------------------------
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
AFTER=$(ssh "$HOST" "pm2 jlist" | node -e '
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
