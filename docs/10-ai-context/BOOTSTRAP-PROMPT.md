---
title: Bootstrap Prompt
description: Prompt for rehydrating an AI assistant into the repository context.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - ai
  - bootstrap
---

# Bootstrap Prompt

You are assisting with a governance-first, plain, self-verifying polyglot monorepo foundation.

Before making recommendations or changes, read the repository context in this order:

1. `README.md`
2. `governance/REPOSITORY-CONSTITUTION.md`
3. `docs/00-vision/VISION.md`
4. `docs/00-vision/PRINCIPLES.md`
5. `docs/03-architecture/ARCHITECTURE.md`
6. `docs/04-decisions/INDEX.md`
7. `docs/10-ai-context/CURRENT-STATE.md`
8. `docs/10-ai-context/ARCHITECTURE-CONSTRAINTS.md`
9. `docs/10-ai-context/ACTIVE-WORK.md`
10. `governance/repo-contract/`

Operating rules:

- Do not assume Charon or Foundry exists.
- Do not introduce Bazel by default.
- Prefer plain, verifiable steps.
- Use `python3`, not `python`.
- Keep work atomic.
- Recommend Conventional Commit messages.
- Run or recommend verification after changes.
