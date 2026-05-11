#!/usr/bin/env bash
set -euo pipefail

echo "verify:repo-contract: checking governance repo contract"

required=(
  governance/REPOSITORY-CONSTITUTION.md
  governance/repo-contract/boundaries.yaml
  governance/repo-contract/project-types.yaml
  governance/repo-contract/required-files.yaml
  governance/repo-contract/required-scripts.yaml
  governance/repo-contract/documentation-policy.yaml
  governance/repo-contract/security-policy.yaml
  governance/repo-contract/release-policy.yaml
  governance/schemas/repo-manifest.schema.json
  governance/schemas/project-config.schema.json
  governance/schemas/work-packet.schema.json
  governance/schemas/doc-frontmatter.schema.json
  governance/schemas/adr-frontmatter.schema.json
)

for path in "${required[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "verify:repo-contract: missing $path" >&2
    exit 1
  fi
done

python3 - <<'PY'
from pathlib import Path
import json
import sys

errors = []
for path in Path("governance/schemas").glob("*.json"):
    try:
        json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"{path}: invalid JSON: {exc}")

if errors:
    print("verify:repo-contract: failed", file=sys.stderr)
    for error in errors:
        print(f"- {error}", file=sys.stderr)
    sys.exit(1)

print("verify:repo-contract: ok")
PY
