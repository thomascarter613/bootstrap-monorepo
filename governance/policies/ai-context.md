---
title: AI Context Policy
description: Defines how AI context files are maintained and constrained.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - governance
  - ai
  - context
---

# AI Context Policy

## Rule

AI context files are summaries of canonical repository facts.

They are not canonical replacements for:

- ADRs
- architecture docs
- product docs
- repo-contract rules
- workspace state
- security policy

## Required Practice

When AI context changes because the repository changes, the canonical document should be updated first or in the same change.

## Forbidden Practice

Do not let `docs/10-ai-context/` become the only place where important decisions are recorded.
