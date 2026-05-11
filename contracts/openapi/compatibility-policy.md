---
title: OpenAPI Compatibility Policy
description: Defines initial API compatibility rules.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - contracts
  - compatibility
  - openapi
---

# OpenAPI Compatibility Policy

## Breaking Changes

Examples:

- removing an endpoint
- removing a response field
- changing a field type
- making an optional request field required
- changing authentication requirements

## Non-Breaking Changes

Examples:

- adding optional fields
- adding new endpoints
- adding new response fields
- documenting previously undocumented behavior

## Rule

Public API compatibility changes should be reviewed before merge.
