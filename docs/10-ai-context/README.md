---
title: AI Context
description: Defines the plain AI context layer for the repository.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - ai
  - context
---

# AI Context

This directory provides plain files for AI-assisted development workflows.

It does not require Charon, Foundry, a vector database, or any hosted AI provider.

## Rule

AI context files summarize canonical repository state. They do not replace canonical repository state.

## Files

| File | Purpose |
|---|---|
| `BOOTSTRAP-PROMPT.md` | Starting prompt for future assistants |
| `REPO-READING-ORDER.md` | Recommended order for reading repo context |
| `CURRENT-STATE.md` | Current phase, milestone, next step, and verification status |
| `ARCHITECTURE-CONSTRAINTS.md` | Constraints future work must respect |
| `ACTIVE-WORK.md` | Active work packet and current focus |
| `DECISIONS-SUMMARY.md` | Short summary of accepted decisions |
| `HANDOFF.md` | Copyable context handoff for future sessions |
