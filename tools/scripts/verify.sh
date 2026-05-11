#!/usr/bin/env bash
set -euo pipefail

echo "verify: starting repository verification"

bash tools/scripts/verify-scripts.sh
bash tools/scripts/verify-docs.sh
bash tools/scripts/verify-repo-contract.sh
bash tools/scripts/verify-workspace.sh
bash tools/scripts/verify-security-baseline.sh

echo "verify: ok"
