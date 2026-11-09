#!/usr/bin/env bash
# Nonpublishing build of selected refs, including unlisted Enterprise staging.
set -euo pipefail
repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$repo_dir"
scratch=$(mktemp -d)
trap 'rm -rf "$scratch"' EXIT
output="${DOCS_BUILD_DIR:-$scratch/output}"
mkdir -p "$output"
if (($#)); then
  refs=("$@")
else
  mapfile -t versions < <(sed -nE 's/^  - "([^"]+)"/\1/p' versions.yaml)
  refs=()
  for version in "${versions[@]}" 1.4-ee-next; do refs+=("origin/docs/$version"); done
fi
for ref in "${refs[@]}"; do
  # Accept docs/1.4-ee-next as well as origin/docs/1.4-ee-next (CI has only the remote ref).
  if ! git rev-parse --verify --quiet "$ref^{commit}" >/dev/null && git rev-parse --verify --quiet "origin/$ref^{commit}" >/dev/null; then
    ref="origin/$ref"
  fi
  version=${DOCS_BUILD_VERSION:-${ref##*/}}
  content="$scratch/content-$version"
  mkdir -p "$content"
  git archive "$ref" manual get-started security | tar -x -C "$content"
  cp -R themes "$content/"
  python3 .github/scripts/prepare_content.py "$content"
  ./render-version-data.sh "$version" "$content/manual/data/versions.yaml"
  ./check-images.sh "$content"
  for section in manual get-started security; do
    [[ -d "$content/$section" ]] || continue
    hugo --minify --config config.yaml,../themes/hugo-compatibility.yaml --source "$content/$section" --destination "$output/$version/$section" --baseURL "/$section/$version/"
  done
done
printf 'PASS: documentation builds (%s)\n' "${refs[*]}"
