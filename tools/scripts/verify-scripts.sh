#!/usr/bin/env bash
set -euo pipefail

echo "verify:scripts: checking scripts"

required=(
  tools/scripts/verify.sh
  tools/scripts/doctor.sh
  tools/scripts/verify-docs.sh
  tools/scripts/verify-repo-contract.sh
  tools/scripts/verify-workspace.sh
  tools/scripts/verify-security-baseline.sh
  tools/scripts/verify-scripts.sh
)

for path in "${required[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "verify:scripts: missing $path" >&2
    exit 1
  fi

  if [[ ! -x "$path" ]]; then
    echo "verify:scripts: $path is not executable" >&2
    exit 1
  fi

  bash -n "$path"
done

echo "verify:scripts: ok"
