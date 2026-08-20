#!/bin/bash
set -euo pipefail

# Validates the already-committed versions.yaml against the docs/* branches
# actually present in this checkout, instead of recomputing "latest"/
# "versions:" from branch names. A highest-semver-wins heuristic over
# `docs/*` cannot tell an unreleased branch (e.g. a next OSS minor already
# branched for in-progress development) or an Enterprise staging branch
# (docs/X.Y-ee-next, never meant to be published) from an actually-released
# version - promoting a version to "latest"/published is a manual, curated
# decision, the same discipline .github/workflows/hugo.yml's GitHub Pages
# deploy already relies on. See eximeebpms-factory adr/0021.

if [ ! -f versions.yaml ]; then
  echo "versions.yaml not found - nothing to validate" >&2
  exit 1
fi

LATEST=$(grep '^latest:' versions.yaml | sed 's/latest: //;s/"//g;s/ //g')
VERSIONS=$(grep '^  - ' versions.yaml | sed 's/  - //;s/"//g')

if [ -z "${LATEST}" ] || [ -z "${VERSIONS}" ]; then
  echo "versions.yaml is missing 'latest' or 'versions:' entries" >&2
  exit 1
fi

STATUS=0

while IFS= read -r version; do
  if ! git show-ref --verify --quiet "refs/heads/docs/${version}"; then
    echo "versions.yaml lists \"${version}\" but branch docs/${version} does not exist" >&2
    STATUS=1
  fi
done <<< "${VERSIONS}"

if ! grep -qxF "${LATEST}" <<< "${VERSIONS}"; then
  echo "versions.yaml's latest (\"${LATEST}\") is not present in its own versions: list" >&2
  STATUS=1
fi

if [ "${STATUS}" -ne 0 ]; then
  exit 1
fi

echo "versions.yaml OK - latest: ${LATEST}, versions: $(tr '\n' ' ' <<< "${VERSIONS}" | xargs)"
