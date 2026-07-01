#!/bin/bash
set -euo pipefail

# Regenerates versions.yaml from local docs/* branches: latest is always the
# highest semver branch, versions lists all of them (newest first).

VERSIONS_DESC=$(git for-each-ref --format='%(refname:short)' 'refs/heads/docs/*' \
  | sed 's|^docs/||' \
  | sort -rV)

if [ -z "${VERSIONS_DESC}" ]; then
  echo "No docs/* branches found" >&2
  exit 1
fi

LATEST=$(echo "${VERSIONS_DESC}" | head -n1)

{
  echo "latest: \"${LATEST}\""
  echo "versions:"
  while IFS= read -r version; do
    echo "  - \"${version}\""
  done <<< "${VERSIONS_DESC}"
} > versions.yaml

echo "Generated versions.yaml:"
cat versions.yaml
