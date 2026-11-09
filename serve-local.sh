#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

for arg in "$@"; do
  if [[ "$arg" == "--help" || "$arg" == "-h" ]]; then
    exec bash "${SCRIPT_DIR}/build-local.sh" --help
  fi
done

bash "${SCRIPT_DIR}/build-local.sh" "$@"

PORT="${PORT:-8080}"
echo ""
echo "Starting server on http://localhost:${PORT}"
cd "${SCRIPT_DIR}/public-local"
exec python3 -m http.server "${PORT}"
