---
title: Security Policy
description: Defines the baseline security posture and responsible disclosure expectations for this repository.
status: active
version: 0.1.0
owner: security
created: 2026-05-10
updated: 2026-05-10
tags:
  - security
  - policy
---

# Security Policy

## Baseline Position

This repository treats security as a first-class engineering requirement.

Security concerns include:

- dependency safety
- secrets management
- supply-chain integrity
- artifact provenance
- data classification
- access control
- auditability
- logging and telemetry hygiene
- vulnerability response
- release integrity

## Reporting Security Issues

Until a dedicated security contact is established, do not disclose suspected vulnerabilities publicly.

Create a private advisory or contact the repository owner through the preferred private channel.

## Secrets

Never commit secrets.

Examples of forbidden committed secrets:

- API keys
- private keys
- tokens
- passwords
- production connection strings
- cloud credentials
- signing keys
- real user data

## Dependency Security

Dependency policy lives in:

```text
security/dependency-policy/
```

## Supply Chain

Supply-chain planning lives in:

```text
security/supply-chain/
```

## SBOM

SBOM planning lives in:

```text
security/sbom/
```

## Security Review Required

Security review is required before merging changes that affect:

- authentication
- authorization
- cryptography
- deployment
- infrastructure
- secret handling
- audit logging
- public API exposure
- data retention
- dependency trust
