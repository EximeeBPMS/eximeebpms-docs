#!/usr/bin/env bash
# Dockerfile is the single version source for every build entry point. Dependabot is not relied on to bump it.
set -euo pipefail
repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
version=$(sed -nE 's/^ARG HUGO_VERSION=([0-9]+\.[0-9]+\.[0-9]+)$/\1/p' "$repo_dir/Dockerfile")
if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo 'Dockerfile must define exactly one stable ARG HUGO_VERSION=x.y.z' >&2
  exit 1
fi
printf '%s\n' "$version"
