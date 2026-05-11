---
title: Deprecation Policy
description: Defines how docs, code, APIs, packages, and contracts are deprecated.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - governance
  - deprecation
---

# Deprecation Policy

## Purpose

Prevent stale files, APIs, docs, and project surfaces from appearing current.

## Documentation Deprecation

Deprecated docs must include frontmatter:

```yaml
status: deprecated
replacement: path/to/replacement.md
```

## ADR Supersession

Superseded ADRs must include:

```yaml
status: superseded
supersededBy:
  - ADR-XXXX
```

## Code Deprecation

Code deprecation policy will be added when code projects exist.

## Contract Deprecation

Contract deprecation must define:

- deprecation date
- removal date
- migration path
- compatibility window
