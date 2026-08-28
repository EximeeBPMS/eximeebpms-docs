#!/bin/bash
set -e

HUGO_IMAGE="${HUGO_IMAGE:-ghcr.io/gohugoio/hugo:v0.162.0}"
REPO_DIR="$(pwd)"
USER_FLAGS="--user $(id -u):$(id -g)"

PAGEFIND_VERSION="${PAGEFIND_VERSION:-1.5.2}"

hugo_build() {
  local src="$1"    # path relative to repo root
  local dest="$2"   # absolute path on host
  local baseURL="$3"
  mkdir -p "${dest}"
  # Create a placeholder so Hugo can chtimes on the output directory
  touch "${dest}/.keep"
  docker run --rm \
    -v "${REPO_DIR}:/project" \
    -v "${dest}:/target" \
    ${USER_FLAGS} \
    "${HUGO_IMAGE}" \
    --minify \
    -s "${src}" \
    --destination /target \
    --baseURL "${baseURL}"
  rm -f "${dest}/.keep"
}

pagefind_index() {
  local dest="$1"   # absolute path on host, already Hugo-built
  npx --yes "pagefind@${PAGEFIND_VERSION}" --site "${dest}"
}

LATEST=$(grep '^latest:' versions.yaml | sed 's/latest: //;s/"//g;s/ //g')
VERSIONS=$(grep '^  - ' versions.yaml | sed 's/  - //;s/"//g' | tr '\n' ' ' | xargs)

echo "Building versions: $VERSIONS (latest: $LATEST)"
echo "Using Hugo image: ${HUGO_IMAGE}"
rm -rf public-local

for version in $VERSIONS; do
  echo ""
  echo "=== Building $version ==="

  if git worktree list | grep -q "worktree-${version}"; then
    git worktree remove --force "worktree-${version}"
  fi
  git worktree add "worktree-${version}" "docs/${version}"
  cp -r themes "worktree-${version}/"

  hugo_build "worktree-${version}/manual" "${REPO_DIR}/public-local/manual/${version}" "/manual/${version}/"

  if [ -d "worktree-${version}/manual/javadoc" ]; then
    mkdir -p "public-local/manual/${version}/reference/javadoc"
    cp -r "worktree-${version}/manual/javadoc/." "public-local/manual/${version}/reference/javadoc/"
  fi

  # Build this version's full-text search index (BACKLOG-0023): one
  # independent index per version, scoped to exactly what was just built
  pagefind_index "${REPO_DIR}/public-local/manual/${version}"

  if [ "${version}" = "${LATEST}" ]; then
    hugo_build "worktree-${version}/manual" "${REPO_DIR}/public-local/manual/latest" "/manual/latest/"

    # manual/latest mirrors this version's content exactly, so reuse its
    # just-built index instead of indexing it a second time
    cp -r "${REPO_DIR}/public-local/manual/${version}/pagefind" "${REPO_DIR}/public-local/manual/latest/pagefind"

    [ -d "worktree-${version}/get-started" ] && \
      hugo_build "worktree-${version}/get-started" "${REPO_DIR}/public-local/get-started" "/get-started/" && \
      pagefind_index "${REPO_DIR}/public-local/get-started"

    [ -d "worktree-${version}/security" ] && \
      hugo_build "worktree-${version}/security" "${REPO_DIR}/public-local/security" "/security/" && \
      pagefind_index "${REPO_DIR}/public-local/security"

    cp -r "public-local/manual/latest/." "public-local/"
  fi

  git worktree remove --force "worktree-${version}"
done

[ -d rest ] && cp -r rest/. public-local/rest/

echo ""
echo "Build complete! Serve with:"
echo "  cd public-local && python3 -m http.server 8080"
echo "  Open: http://localhost:8080"
