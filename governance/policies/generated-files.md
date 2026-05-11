---
title: Generated Files Policy
description: Defines how generated files should be marked, reproduced, and protected.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - governance
  - generated-files
---

# Generated Files Policy

## Rules

1. Generated files should be reproducible.
2. Generated files should be marked where practical.
3. Generated work should have provenance where practical.
4. Generators must be non-destructive by default.
5. Manual edits to generated files are forbidden unless the file explicitly allows it.

## Provenance Location

```text
workspace/provenance/
```

## Future Generator Behavior

Generators should support:

```text
--plan
--write
--force
--merge
```

The default behavior should be non-destructive.
