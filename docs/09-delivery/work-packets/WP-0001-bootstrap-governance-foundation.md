---
workPacket: WP-0001
title: Bootstrap Governance Foundation
description: Creates the initial self-governing monorepo foundation.
status: active
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - governance
  - bootstrap
---

# WP-0001: Bootstrap Governance Foundation

## Goal

Create the initial governance-first monorepo foundation.

## Scope

Includes:

- root documentation
- governance constitution
- repo-contract rules
- workspace state files
- verification scripts
- security baseline
- AI context files
- GitHub CI

## Non-Goals

Excludes:

- production apps
- production services
- full generator runtime
- Charon dependency
- Foundry dependency
- mandatory orchestrator dependency

## Acceptance Criteria

- `bash tools/scripts/verify.sh` passes.
- Core docs exist.
- Repo contract files exist.
- Workspace JSON files parse.
- Security baseline files exist.
- GitHub CI exists.

## Verification

```bash
bash tools/scripts/verify.sh
```

## Rollback

Remove the generated files or revert the commit.

## Recommended Commit

```text
docs(governance): bootstrap self-governing monorepo foundation
```
