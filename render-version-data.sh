#!/bin/bash
set -euo pipefail

# Derives the version-select dropdown content and, for an OSS baseline that
# has one, its published Enterprise line - both from the single source of
# truth, master's versions.yaml - instead of each docs/X.Y.Z branch hand-
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
# The dropdown lists OSS baselines only (plain X.Y.Z semver branch names).
# Enterprise `-ee` lines are never separate dropdown entries; instead, the
# OSS baseline they're built on gets an `enterpriseLine` pointer, which the
# theme renders as a secondary "Enterprise Edition" link.

VERSION="$1"
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

# This baseline's published Enterprise line, if any: X.Y.Z's baseline is
# X.Y, so look for an "X.Y-ee" entry. Only set when VERSION is itself a
# plain OSS baseline - an Enterprise build (X.Y-ee) gets the same OSS
# dropdown but no enterpriseLine pointer of its own.
ENTERPRISE_LINE=""
if BASELINE=$(grep -oE '^[0-9]+\.[0-9]+' <<< "${VERSION}"); then
  if grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$' <<< "${VERSION}"; then
    ENTERPRISE_LINE=$(grep -xF "${BASELINE}-ee" <<< "${ALL_VERSIONS}" || true)
  fi
fi

mkdir -p "$(dirname "${OUT}")"

{
  echo "oss:"
  echo "  - \"latest\""
  while IFS= read -r v; do
    [ -n "${v}" ] && echo "  - \"${v}\""
  done <<< "${OSS_VERSIONS}"
  if [ -n "${ENTERPRISE_LINE}" ]; then
    echo "enterpriseLine: \"${ENTERPRISE_LINE}\""
  fi
} > "${OUT}"

echo "Wrote ${OUT}:"
cat "${OUT}"
