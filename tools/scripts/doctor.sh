#!/usr/bin/env bash
set -euo pipefail

echo "doctor: checking repository health"

required_root_files=(
  README.md
  CONTRIBUTING.md
  SECURITY.md
  LICENSE
  package.json
  .gitignore
)

for file in "${required_root_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "doctor: missing required root file: $file" >&2
    exit 1
  fi
done

for forbidden in package-lock.json yarn.lock pnpm-lock.yaml; do
  if [[ -e "$forbidden" ]]; then
    echo "doctor: forbidden lockfile found: $forbidden" >&2
    echo "doctor: this foundation uses bun.lock as the canonical lockfile when dependencies are installed." >&2
    exit 1
  fi
done

bash tools/scripts/verify.sh

echo "doctor: ok"
