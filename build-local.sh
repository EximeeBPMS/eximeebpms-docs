#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

selected_version=""
content_ref=""
while (($#)); do
  case "$1" in
    --version) selected_version="${2:?--version requires a version}"; shift 2 ;;
    --ref) content_ref="${2:?--ref requires a Git ref}"; shift 2 ;;
    -h|--help)
      echo "Usage: ./build-local.sh [--version VERSION [--ref CONTENT_REF]]"
      echo "Example: ./build-local.sh --version 1.4-ee-next --ref BPMS-877-agent-manual"
      echo "Requires Docker, Python 3 and npx. Output: public-local/."
      exit 0 ;;
    *) echo "Unknown option: $1" >&2; exit 2 ;;
  esac
done
[[ -z "$content_ref" || -n "$selected_version" ]] || { echo "--ref requires --version" >&2; exit 2; }
[[ -z "$selected_version" || "$selected_version" =~ ^[0-9]+\.[0-9]+([.][0-9]+)?(-ee(-next)?)?$ ]] || { echo "Invalid version: $selected_version" >&2; exit 2; }

active_worktree=""
cleanup() {
  if [[ -n "$active_worktree" ]]; then
    git worktree remove --force "$active_worktree" || true
  fi
}
trap cleanup EXIT

HUGO_IMAGE="${HUGO_IMAGE:-ghcr.io/gohugoio/hugo:v$(./hugo-version.sh)}"
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
    --minify --config config.yaml,../themes/hugo-compatibility.yaml \
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

if [[ -n "$selected_version" ]]; then VERSIONS="$selected_version"; fi

echo "Building versions: $VERSIONS (latest: $LATEST)"
echo "Using Hugo image: ${HUGO_IMAGE}"
rm -rf public-local

for version in $VERSIONS; do
  echo ""
  echo "=== Building $version ==="

  ref="${content_ref:-origin/docs/${version}}"
  if [[ -z "$content_ref" ]] && ! git rev-parse --verify --quiet "$ref^{commit}" >/dev/null; then
    ref="docs/${version}"
  fi
  echo "Content ref: $ref ($(git rev-parse --short "$ref^{commit}"))"
  active_worktree=$(mktemp -d "${REPO_DIR}/worktree-${version}-XXXXXX")
  git worktree add --detach "$active_worktree" "$ref"
  worktree="${active_worktree##*/}"
  cp -r themes "$worktree/"
  python3 .github/scripts/prepare_content.py "$worktree"
  ./render-version-data.sh "${version}" "$worktree/manual/data/versions.yaml"
  ./check-images.sh "$worktree"

  hugo_build "${worktree}/manual" "${REPO_DIR}/public-local/manual/${version}" "/manual/${version}/"

  if [ -d "${worktree}/manual/javadoc" ]; then
    mkdir -p "public-local/manual/${version}/reference/javadoc"
    cp -r "${worktree}/manual/javadoc/." "public-local/manual/${version}/reference/javadoc/"
  fi

  # Build this version's full-text search index (BACKLOG-0023): one
  # independent index per version, scoped to exactly what was just built
  pagefind_index "${REPO_DIR}/public-local/manual/${version}"

  if [[ "${version}" == "${LATEST}" || -n "$selected_version" ]]; then
    hugo_build "${worktree}/manual" "${REPO_DIR}/public-local/manual/latest" "/manual/latest/"

    # manual/latest mirrors this version's content exactly, so reuse its
    # just-built index instead of indexing it a second time
    cp -r "${REPO_DIR}/public-local/manual/${version}/pagefind" "${REPO_DIR}/public-local/manual/latest/pagefind"

    [ -d "${worktree}/get-started" ] && \
      hugo_build "${worktree}/get-started" "${REPO_DIR}/public-local/get-started" "/get-started/" && \
      pagefind_index "${REPO_DIR}/public-local/get-started"

    [ -d "${worktree}/security" ] && \
      hugo_build "${worktree}/security" "${REPO_DIR}/public-local/security" "/security/" && \
      pagefind_index "${REPO_DIR}/public-local/security"

    cp -r "public-local/manual/latest/." "public-local/"
  fi

  git worktree remove --force "$active_worktree"
  active_worktree=""
done

[ -d rest ] && cp -r rest/. public-local/rest/

echo ""
python3 .github/scripts/optimize_publication.py public-local --latest "${selected_version:-$LATEST}"

echo "Build complete! Serve with:"
echo "  cd public-local && python3 -m http.server 8080"
echo "  Open: http://localhost:8080"
