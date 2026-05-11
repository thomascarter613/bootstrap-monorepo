---
title: Package Manager Policy
description: Defines the package manager and lockfile policy.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - governance
  - package-manager
---

# Package Manager Policy

## Default

Bun is the preferred command runner and JavaScript/TypeScript runtime for this repository foundation.

## Compatibility

The workspace structure should remain compatible with pnpm-style monorepo conventions where practical.

## Lockfile Rule

The canonical lockfile is:

```text
bun.lock
```

The following lockfiles are not allowed unless explicitly approved by ADR:

```text
package-lock.json
yarn.lock
pnpm-lock.yaml
```

## Tooling Rule

Do not introduce a new package manager without an ADR.
