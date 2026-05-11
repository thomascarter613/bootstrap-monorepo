---
title: Delivery Workflow
description: Defines the default delivery workflow for changes in the repository.
status: active
version: 0.1.0
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - delivery
  - workflow
---

# Delivery Workflow

## Default Flow

```text
Idea
  -> Product/requirements note
  -> Architecture review when needed
  -> ADR when durable decision is needed
  -> Work packet
  -> Implementation
  -> Verification
  -> Atomic Conventional Commit
  -> Pull Request
  -> Review
  -> Merge
```

## Definition of Done

A change is done when:

1. Scope is clear.
2. Required docs are updated.
3. Required ADRs are added or updated.
4. Verification passes.
5. Risks are documented.
6. The commit is atomic.
7. The commit message is conventional.
