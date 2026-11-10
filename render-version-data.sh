#!/bin/bash
set -euo pipefail

# Derives the OSS version-select dropdown from the single source of truth,
# master's versions.yaml - instead of each docs/X.Y.Z branch hand-
# maintaining its own copy in manual/config.yaml's params.section.versions.
# That per-branch copy is confirmed to drift in practice: docs/1.0.0,
# docs/1.1.0 and docs/1.2.0 were never updated when 1.3.0 was released, so
# their dropdown never offered it. See eximeebpms-factory adr/0022.
#
# Usage: render-version-data.sh <version-being-built> <output-file>
# Writes a Hugo data file (consumed as .Site.Data.versions in the theme)
# to <output-file>, normally worktree-<version>/manual/data/versions.yaml
# in the CI build - a disposable worktree, never committed.
#
# The dropdown lists OSS baselines only. Enterprise release notes can be
# published within that baseline without changing the selected edition.

VERSION="${1:?version being built is required}"
OUT="$2"

if [ ! -f versions.yaml ]; then
  echo "versions.yaml not found" >&2
  exit 1
fi

ALL_VERSIONS=$(grep '^  - ' versions.yaml | sed 's/  - //;s/"//g')

OSS_VERSIONS=$(grep -E '^[0-9]+\.[0-9]+\.[0-9]+$' <<< "${ALL_VERSIONS}" || true)

if [ -z "${OSS_VERSIONS}" ]; then
  echo "versions.yaml has no plain X.Y.Z OSS versions - refusing to write an empty dropdown" >&2
  exit 1
fi

mkdir -p "$(dirname "${OUT}")"

{
  echo "oss:"
  echo "  - \"latest\""
  while IFS= read -r v; do
    [ -n "${v}" ] && echo "  - \"${v}\""
  done <<< "${OSS_VERSIONS}"
} > "${OUT}"

echo "Wrote ${OUT}:"
cat "${OUT}"
