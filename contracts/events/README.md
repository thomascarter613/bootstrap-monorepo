---
title: Event Contracts
description: Defines the event contract area.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - contracts
  - events
---

# Event Contracts

This directory is reserved for event schemas and event compatibility policy.

## Recommended Envelope

```json
{
  "id": "evt_example",
  "type": "example.created",
  "version": "1.0.0",
  "occurredAt": "2026-05-10T00:00:00Z",
  "actor": {},
  "data": {},
  "metadata": {
    "correlationId": "corr_example",
    "causationId": "cause_example"
  }
}
```
