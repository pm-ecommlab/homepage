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
PID_FILE="${ROOT_DIR}/.pids/${APP_NAME}.pid"

if [[ "$MODE" == "prod" ]] && command -v pm2 >/dev/null 2>&1; then
  echo "Stopping ${APP_NAME} via PM2…"
  pm2 stop "$APP_NAME" >/dev/null 2>&1 || true
  pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
  pm2 save >/dev/null 2>&1 || true
  exit 0
fi

if [[ ! -f "$PID_FILE" ]]; then
  echo "No PID file found at ${PID_FILE}. Nothing to stop."
  exit 0
fi

PID="$(cat "$PID_FILE" || true)"
rm -f "$PID_FILE"

if [[ -z "${PID:-}" ]]; then
  echo "Empty PID file. Nothing to stop."
  exit 0
fi

if kill -0 "$PID" >/dev/null 2>&1; then
  echo "Stopping ${APP_NAME} (pid ${PID})…"
  kill "$PID" || true
else
  echo "Process ${PID} is not running."
fi

