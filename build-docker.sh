#!/bin/bash
set -euo pipefail

# Builds the multi-version Hugo site into ./public using the `hugo` binary
# directly (no docker-in-docker) — run from inside the image builder stage,
# after generate-versions.sh has produced versions.yaml.

REPO_DIR="$(pwd)"
OUT_DIR="${REPO_DIR}/public"

LATEST=$(grep '^latest:' versions.yaml | sed 's/latest: //;s/"//g;s/ //g')
VERSIONS=$(grep '^  - ' versions.yaml | sed 's/  - //;s/"//g' | tr '\n' ' ' | xargs)

echo "Building versions: ${VERSIONS} (latest: ${LATEST})"
rm -rf "${OUT_DIR}"

for version in ${VERSIONS}; do
  echo ""
  echo "=== Building ${version} ==="
  git worktree add "worktree-${version}" "docs/${version}"
  cp -r themes "worktree-${version}/"

  # Version-select dropdown content, derived from versions.yaml (adr/0022)
  # - overwrites this worktree's own copy, never committed.
  ./render-version-data.sh "${version}" "worktree-${version}/manual/data/versions.yaml"

  hugo --minify -s "worktree-${version}/manual" --destination "${OUT_DIR}/manual/${version}" --baseURL "/manual/${version}/"

  if [ -d "worktree-${version}/manual/javadoc" ]; then
    mkdir -p "${OUT_DIR}/manual/${version}/reference/javadoc"
    cp -r "worktree-${version}/manual/javadoc/." "${OUT_DIR}/manual/${version}/reference/javadoc/"
  fi

  if [ "${version}" = "${LATEST}" ]; then
    hugo --minify -s "worktree-${version}/manual" --destination "${OUT_DIR}/manual/latest" --baseURL "/manual/latest/"

    [ -d "worktree-${version}/get-started" ] && \
      hugo --minify -s "worktree-${version}/get-started" --destination "${OUT_DIR}/get-started" --baseURL "/get-started/"

    [ -d "worktree-${version}/security" ] && \
      hugo --minify -s "worktree-${version}/security" --destination "${OUT_DIR}/security" --baseURL "/security/"

    cp -r "${OUT_DIR}/manual/latest/." "${OUT_DIR}/"
  fi

  git worktree remove --force "worktree-${version}"
done

[ -d rest ] && cp -r rest/. "${OUT_DIR}/rest/"

echo ""
echo "Docker build complete: ${OUT_DIR}"
