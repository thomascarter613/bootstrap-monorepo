---
workPacket: WP-0002
title: Repository Baseline Hardening
description: Hardens the generated monorepo foundation after the initial bootstrap commit.
status: active
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - governance
  - baseline
  - hardening
---

# WP-0002: Repository Baseline Hardening

## Goal

Turn the generated bootstrap foundation into a sharper, more portfolio-grade repository baseline without introducing production applications, production services, Charon, Foundry, Bazel, or heavyweight orchestration dependencies.

## Context

WP-0001 created the initial governance-first monorepo foundation. The baseline is intentionally broad and plain. WP-0002 is the first hardening pass after the foundation has been generated, verified locally, committed, and pushed.

This work packet updates the repository state to reflect the real baseline and prepares the next implementation-grade slices.

## Scope

This work packet includes:

1. Recording that the initial foundation was generated, committed, pushed, and locally verified.
2. Replacing placeholder ownership metadata where known.
3. Updating active AI-context files so future sessions know WP-0002 is the current work.
4. Keeping the repository independent of unfinished future control-plane systems.
5. Preparing the next step toward stricter repo-health validation.

## Non-Goals

This work packet does not include:

- production app creation
- production service creation
- package implementation
- database implementation
- generator runtime implementation
- Charon integration
- Foundry integration
- Bazel adoption
- mandatory moon adoption
- new dependency installation

## Expected Files Changed

Expected changes:

```text
.github/CODEOWNERS
docs/09-delivery/work-packets/WP-0002-repository-baseline-hardening.md
docs/10-ai-context/ACTIVE-WORK.md
docs/10-ai-context/CURRENT-STATE.md
```

Optional follow-up changes may include:

```text
docs/09-delivery/ROADMAP.md
docs/10-ai-context/HANDOFF.md
governance/repo-contract/required-files.yaml
```

## Acceptance Criteria

This work packet is complete when:

1. `WP-0002-repository-baseline-hardening.md` exists.
2. `docs/10-ai-context/ACTIVE-WORK.md` points to WP-0002.
3. `docs/10-ai-context/CURRENT-STATE.md` no longer says the WP-0001 baseline verification is pending.
4. `.github/CODEOWNERS` no longer contains the `@OWNER` placeholder.
5. The repository still explicitly does not require Charon or Foundry.
6. Verification passes locally.

## Verification

Run:

```bash
bash tools/scripts/verify.sh
```

Optional:

```bash
bun run verify
```

## Rollback

Revert the commit or restore the four expected changed files to their previous state.

## Recommended Commit

```text
docs(work-packet): add repository baseline hardening plan
```

## Recommended Next Work Packet

```text
WP-0003: Repository Contract Validator Hardening
```

WP-0003 should make repo-contract validation stricter by checking required files from `governance/repo-contract/required-files.yaml`, rejecting placeholder ownership, and adding clearer failure messages.
