#!/usr/bin/env bash
set -euo pipefail

echo "verify:docs: checking documentation frontmatter and ADR index"

python3 - <<'PY'
from pathlib import Path
import sys

roots = [Path("docs"), Path("governance"), Path("security"), Path("contracts"), Path("ops")]
errors = []

for root in roots:
    if not root.exists():
        continue
    for path in root.rglob("*.md"):
        text = path.read_text(encoding="utf-8")
        if not text.startswith("---\n"):
            errors.append(f"{path}: missing YAML frontmatter opening")
            continue
        end = text.find("\n---\n", 4)
        if end == -1:
            errors.append(f"{path}: missing YAML frontmatter closing")
            continue
        fm = text[4:end]
        required = ["title:", "description:", "status:"]
        if path.name.startswith("ADR-"):
            required = ["title:", "status:"]
        for key in required:
            if key not in fm:
                errors.append(f"{path}: missing frontmatter key {key}")

adr_index = Path("docs/04-decisions/INDEX.md")
if not adr_index.exists():
    errors.append("docs/04-decisions/INDEX.md: missing ADR index")
else:
    index_text = adr_index.read_text(encoding="utf-8")
    for adr in sorted(Path("docs/04-decisions").glob("ADR-[0-9][0-9][0-9][0-9]-*.md")):
        adr_id = adr.name[:8]
        if adr_id not in index_text and adr.name not in index_text and adr.stem not in index_text:
            errors.append(f"{adr}: not referenced in ADR index")

if errors:
    print("verify:docs: failed", file=sys.stderr)
    for error in errors:
        print(f"- {error}", file=sys.stderr)
    sys.exit(1)

print("verify:docs: ok")
PY
