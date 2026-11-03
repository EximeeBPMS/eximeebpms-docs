#!/usr/bin/env bash
# Toolchain and themes are maintained once on the shared docs branch.
set -euo pipefail
DOCS_SHARED_REF="${DOCS_SHARED_REF:-master}"
launcher=$(mktemp)
trap 'rm -f "$launcher"' EXIT
export DOCS_SHARED_REF
git show "${DOCS_SHARED_REF}:dev.sh" > "$launcher"
bash "$launcher" "$@"
