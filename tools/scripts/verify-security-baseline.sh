#!/usr/bin/env bash
set -euo pipefail

echo "verify:security: checking security baseline"

required=(
  SECURITY.md
  security/supply-chain/README.md
  security/supply-chain/slsa.md
  security/supply-chain/provenance.md
  security/sbom/README.md
  security/dependency-policy/README.md
  security/dependency-policy/license-policy.md
  security/secrets/README.md
  security/threat-models/README.md
  .github/dependabot.yml
)

for path in "${required[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "verify:security: missing $path" >&2
    exit 1
  fi
done

if grep -RInE '(AKIA[0-9A-Z]{16}|BEGIN RSA PRIVATE KEY|BEGIN OPENSSH PRIVATE KEY|xox[baprs]-)' . \
  --exclude-dir=.git \
  --exclude-dir=node_modules \
  --exclude-dir=.artifacts \
  --exclude=verify-security-baseline.sh >/tmp/monorepo-secret-scan.txt 2>/dev/null; then
  echo "verify:security: possible secret-like material found:" >&2
  cat /tmp/monorepo-secret-scan.txt >&2
  rm -f /tmp/monorepo-secret-scan.txt
  exit 1
fi

rm -f /tmp/monorepo-secret-scan.txt

echo "verify:security: ok"
