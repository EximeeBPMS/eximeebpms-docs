#!/bin/bash
set -e

HUGO_IMAGE="${HUGO_IMAGE:-klakegg/hugo:0.56.0}"
REPO_DIR="$(git rev-parse --show-toplevel)"
VERSION="$(git rev-parse --abbrev-ref HEAD | sed 's|docs/||')"
PORT="${PORT:-1313}"

THEMES_DIR=$(mktemp -d)
trap "rm -rf ${THEMES_DIR}" EXIT INT TERM

echo "Extracting themes from master..."
git archive master themes/ | tar -x -C "${THEMES_DIR}"

echo "Starting Hugo dev server for version ${VERSION} on http://localhost:${PORT}"
echo "Edit files in: $(pwd)/manual/"
echo "Press Ctrl+C to stop."
echo ""

docker run --rm --name hugo-dev \
  -v "${REPO_DIR}:/src" \
  -v "${THEMES_DIR}/themes:/src/themes" \
  -p "${PORT}:1313" \
  --user "$(id -u):$(id -g)" \
  "${HUGO_IMAGE}" \
  server \
  --watch \
  -s manual \
  --baseURL "http://localhost:${PORT}/" \
  --bind 0.0.0.0
