---
title: Problem Details
description: Defines the standard error contract area.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - contracts
  - errors
  - problem-details
---

# Problem Details

APIs should use a consistent error shape.

Recommended fields:

```text
type
title
status
detail
instance
code
correlationId
metadata
```

This directory will hold shared error contract definitions.
