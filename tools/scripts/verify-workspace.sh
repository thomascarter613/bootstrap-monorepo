#!/usr/bin/env bash
set -euo pipefail

echo "verify:workspace: checking workspace state"

required=(
  workspace/manifest.json
  workspace/project-graph.json
  workspace/task-graph.json
  workspace/state/README.md
)

for path in "${required[@]}"; do
  if [[ ! -f "$path" ]]; then
    echo "verify:workspace: missing $path" >&2
    exit 1
  fi
done

python3 - <<'PY'
from pathlib import Path
import json
import sys

errors = []

for name in ["manifest.json", "project-graph.json", "task-graph.json"]:
    path = Path("workspace") / name
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"{path}: invalid JSON: {exc}")
        continue

    if "schemaVersion" not in data:
        errors.append(f"{path}: missing schemaVersion")

manifest = json.loads(Path("workspace/manifest.json").read_text(encoding="utf-8"))
if manifest.get("tooling", {}).get("requiresCharon") is not False:
    errors.append("workspace/manifest.json: tooling.requiresCharon must be false")
if manifest.get("tooling", {}).get("requiresFoundry") is not False:
    errors.append("workspace/manifest.json: tooling.requiresFoundry must be false")
if manifest.get("tooling", {}).get("requiresBazel") is not False:
    errors.append("workspace/manifest.json: tooling.requiresBazel must be false")

if errors:
    print("verify:workspace: failed", file=sys.stderr)
    for error in errors:
        print(f"- {error}", file=sys.stderr)
    sys.exit(1)

print("verify:workspace: ok")
PY
