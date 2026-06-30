#!/bin/bash
set -e
# test
HUGO_IMAGE="${HUGO_IMAGE:-ghcr.io/gohugoio/hugo:v0.162.0}"
REPO_DIR="$(git rev-parse --show-toplevel)"
VERSION="$(git rev-parse --abbrev-ref HEAD | sed 's|docs/||')"
PORT="${PORT:-1313}"

THEMES_DIR=$(mktemp -d)
STATIC_DIR=$(mktemp -d)
# Pre-create themes/ as current user so Docker bind mount doesn't create it as root
mkdir -p "${REPO_DIR}/themes"
trap "rm -rf ${THEMES_DIR} ${STATIC_DIR}; rmdir '${REPO_DIR}/themes' 2>/dev/null || true" EXIT INT TERM

echo "Extracting themes from master..."
git archive master themes/ | tar -x -C "${THEMES_DIR}"

# Build get-started and security statically so navigation links work in dev mode
for section in get-started security; do
  if [ -d "${REPO_DIR}/${section}" ]; then
    echo "Building ${section} (static)..."
    mkdir -p "${STATIC_DIR}/${section}"
    touch "${STATIC_DIR}/${section}/.keep"
    docker run --rm \
      -v "${REPO_DIR}:/project" \
      -v "${THEMES_DIR}/themes:/project/themes" \
      -v "${STATIC_DIR}/${section}:/target" \
      --user "$(id -u):$(id -g)" \
      "${HUGO_IMAGE}" \
      --minify \
      -s "${section}" \
      --destination /target \
      --baseURL "http://localhost:${PORT}/${section}/"
    rm -f "${STATIC_DIR}/${section}/.keep"
  fi
done

# Redirect /manual/latest/ → / so the "Manual" nav tab works in dev mode
mkdir -p "${STATIC_DIR}/manual/latest"
printf '<!DOCTYPE html><html><head><script>window.location.replace("/")</script></head><body></body></html>' \
  > "${STATIC_DIR}/manual/latest/index.html"

echo ""
echo "Starting Hugo dev server for version ${VERSION} on http://localhost:${PORT}"
echo "Edit files in: $(pwd)/manual/ (live reload enabled)"
echo "Press Ctrl+C to stop."
echo ""

# Mount STATIC_DIR as manual/static — Hugo serves it automatically alongside content
docker run --rm --name hugo-dev \
  -v "${REPO_DIR}:/project" \
  -v "${THEMES_DIR}/themes:/project/themes" \
  -v "${STATIC_DIR}:/project/manual/static" \
  -p "${PORT}:1313" \
  --user "$(id -u):$(id -g)" \
  "${HUGO_IMAGE}" \
  server \
  --watch \
  -s manual \
  --baseURL "http://localhost:${PORT}/" \
  --bind 0.0.0.0
