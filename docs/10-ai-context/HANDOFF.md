---
title: Handoff
description: Copyable handoff context for future sessions.
status: active
version: 0.1.0
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - ai
  - handoff
---

# Handoff

This repository is a governance-first, plain, self-verifying monorepo foundation.

Current state:

- Phase: Repository Constitution and Governance Foundation.
- The repo must work without Charon or Foundry.
- The repo must not require Bazel by default.
- Bun is the preferred command runner.
- Plain Bash scripts are the canonical initial verification gate.
- AI context lives under `docs/10-ai-context/`.
- Governance rules live under `governance/repo-contract/`.
- Machine-readable workspace state lives under `workspace/`.

Read first:

1. `README.md`
2. `governance/REPOSITORY-CONSTITUTION.md`
3. `docs/03-architecture/ARCHITECTURE.md`
4. `docs/04-decisions/INDEX.md`
5. `docs/10-ai-context/CURRENT-STATE.md`

Verify with:

```bash
bash tools/scripts/verify.sh
```

Recommended current commit:

```text
docs(governance): bootstrap self-governing monorepo foundation
```
