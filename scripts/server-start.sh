#!/usr/bin/env bash
set -euo pipefail

MODE="${1:-}"
if [[ "$MODE" != "dev" && "$MODE" != "prod" ]]; then
  echo "Usage: $0 dev|prod"
  exit 2
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
ROOT_DIR="$(cd -- "${SCRIPT_DIR}/.." >/dev/null 2>&1 && pwd)"
cd "$ROOT_DIR"

APP_NAME="ecommlab-${MODE}"
PID_DIR="${ROOT_DIR}/.pids"
PID_FILE="${PID_DIR}/${APP_NAME}.pid"

PORT_DEV="${PORT_DEV:-3001}"
PORT_PROD="${PORT_PROD:-3000}"

port_in_use() {
  local port="$1"
  if command -v ss >/dev/null 2>&1; then
    ss -ltnp 2>/dev/null | awk -v p=":$port" '$4 ~ p {print; found=1} END{exit found?0:1}'
    return $?
  fi
  return 1
}

load_env_if_present() {
  local file="$1"
  if [[ -f "$file" ]]; then
    set -a
    # shellcheck disable=SC1090
    . "$file"
    set +a
  fi
}

if [[ "$MODE" == "dev" ]]; then
  load_env_if_present ".env.development"
  load_env_if_present ".env.local"
  PORT="$PORT_DEV"
else
  load_env_if_present ".env.production"
  load_env_if_present ".env.local"
  PORT="$PORT_PROD"
fi

mkdir -p "$PID_DIR"

if [[ "$MODE" == "prod" ]] && command -v pm2 >/dev/null 2>&1; then
  # Make prod start idempotent: never create duplicate PM2 processes
  pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
fi

if port_in_use "$PORT"; then
  echo "ERROR: Port ${PORT} is already in use."
  echo "If you want to start ${MODE} on ${PORT}, stop the process first."
  echo "Hint:"
  echo "  ./scripts/server-stop.sh dev"
  echo "  ./scripts/server-stop.sh prod"
  echo
  echo "Listening processes:"
  port_in_use "$PORT" || true
  exit 1
fi

if [[ "$MODE" == "prod" ]] && command -v pm2 >/dev/null 2>&1; then
  echo "Building for production…"
  npm run build
  echo "Starting ${APP_NAME} on port ${PORT} via PM2…"
  PORT="$PORT" pm2 start npm --name "$APP_NAME" -- start -- -p "$PORT"
  pm2 save >/dev/null 2>&1 || true
  pm2 status "$APP_NAME" || true
  exit 0
fi

if [[ "$MODE" == "dev" ]]; then
  echo "Starting dev WITHOUT PM2 (PID file: ${PID_FILE})."
else
  echo "PM2 not found; falling back to PID file (${PID_FILE})."
fi

if [[ -f "$PID_FILE" ]]; then
  OLD_PID="$(cat "$PID_FILE" || true)"
  if [[ -n "${OLD_PID:-}" ]] && kill -0 "$OLD_PID" >/dev/null 2>&1; then
    echo "Already running (pid ${OLD_PID}). Stop it first: ${SCRIPT_DIR}/server-stop.sh ${MODE}"
    exit 1
  fi
  rm -f "$PID_FILE"
fi

if [[ "$MODE" == "prod" ]]; then
  echo "Building for production…"
  npm run build
  echo "Starting production on port ${PORT}…"
  nohup env PORT="$PORT" npm start > "${ROOT_DIR}/.${APP_NAME}.log" 2>&1 &
else
  echo "Starting dev server on port ${PORT}…"
  nohup env PORT="$PORT" npm run dev -- -p "$PORT" > "${ROOT_DIR}/.${APP_NAME}.log" 2>&1 &
fi

echo $! > "$PID_FILE"
echo "Started ${APP_NAME} (pid $(cat "$PID_FILE")), log: ${ROOT_DIR}/.${APP_NAME}.log"

