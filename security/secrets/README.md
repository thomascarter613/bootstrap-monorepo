---
title: Secrets Policy
description: Defines the initial secrets handling policy.
status: active
version: 0.1.0
owner: security
created: 2026-05-10
updated: 2026-05-10
tags:
  - security
  - secrets
---

# Secrets Policy

Never commit secrets.

Forbidden:

- API keys
- private keys
- passwords
- tokens
- production connection strings
- signing keys
- private certificates

Use `.env.example` for documenting required environment variables without values.
