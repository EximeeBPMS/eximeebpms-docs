#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

bash "${SCRIPT_DIR}/build-local.sh"

PORT="${PORT:-8080}"
echo ""
echo "Starting server on http://localhost:${PORT}"
cd "${SCRIPT_DIR}/public-local"
exec python3 -m http.server "${PORT}"
