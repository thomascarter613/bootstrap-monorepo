---
title: API Documentation
description: Documents the API contract strategy for the monorepo foundation.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - api
  - contracts
---

# API Documentation

Public APIs should be contract-first.

The default HTTP API contract format is OpenAPI 3.1.

Contract files live under:

```text
contracts/
```

API documentation should include:

- OpenAPI specifications
- compatibility policy
- error contract policy
- event contract policy
- generated client policy
- versioning and deprecation rules
