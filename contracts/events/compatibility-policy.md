---
title: Event Compatibility Policy
description: Defines initial event compatibility rules.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - contracts
  - events
  - compatibility
---

# Event Compatibility Policy

Event changes should preserve consumer compatibility unless a versioned migration path exists.

Breaking changes include:

- changing event type semantics
- removing required fields
- changing field types
- reusing event names for new meanings
- removing metadata needed for correlation or causation
