---
title: Architecture Constraints
description: Lists constraints future work must respect.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - ai
  - architecture
  - constraints
---

# Architecture Constraints

## Hard Constraints

1. The repo must work without Charon.
2. The repo must work without Foundry.
3. The repo must not require Bazel by default.
4. Governance rules and workspace state must remain separate.
5. The repo architecture owns the toolchain, not the reverse.
6. Every project must eventually have `project.config.yaml`.
7. Docs must have lifecycle status.
8. Verification must be possible through plain scripts.
9. AI context must not replace canonical docs.
10. Use `python3`, not `python`, in scripts and walkthroughs.

## Preferred Defaults

- Bun for command runner.
- Plain Bash verification before advanced orchestration.
- moon later as optional graph/task orchestration.
- OpenAPI 3.1 for HTTP contracts.
- Conventional Commits.
- Markdown with YAML frontmatter for docs.
