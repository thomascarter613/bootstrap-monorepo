---
title: Data Classification
description: Defines the initial data classification model.
status: draft
version: 0.1.0
owner: security
created: 2026-05-10
updated: 2026-05-10
tags:
  - security
  - data
  - classification
---

# Data Classification

## Purpose

Define how repository data, fixtures, logs, artifacts, and examples should be classified.

## Initial Classes

### Public

Safe to publish.

### Internal

Safe for repository contributors, not intended for public disclosure unless reviewed.

### Confidential

Sensitive business, security, or architectural information requiring restricted handling.

### Secret

Credentials, private keys, tokens, and other sensitive values that must never be committed.

## Rules

1. Do not commit secrets.
2. Do not commit real user data without explicit approval.
3. Test fixtures must be synthetic or sanitized.
4. Logs and artifacts must not contain secrets.
5. Security-sensitive docs must clearly indicate handling expectations.
