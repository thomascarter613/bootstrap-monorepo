---
workPacket: WP-0002
title: AI Orchestrator Scaffolding and CLI Entry Point
description: Sets up the initial development environment and basic CLI structure for the AI-Guided SDLC Orchestrator.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - development
  - ai
---

# WP-0002: AI Orchestrator Scaffolding and CLI Entry Point

## Goal

Establish the codebase for the AI-Guided SDLC Orchestrator and implement a basic "Hello World" `init` command using Bun and Clack.

## Scope

Includes:
- Creation of `apps/aic-orchestrator/` directory.
- `package.json` setup with Bun and TypeScript.
- CLI entry point with Clack-based interactive prompts.
- Basic "init" command structure.
- Implementation of the `version` and `help` commands.

## Non-Goals

Excludes:
- Actual LLM integration (handled in WP-0003).
- Persistent state management (handled in WP-0004).
- Socratic logic implementation.

## Tasks

1.  **Project Initialization:**
    - Create `apps/aic-orchestrator/` directory.
    - Initialize `package.json` with ESM and Bun types.
2.  **CLI Setup:**
    - Install `@clack/prompts`, `picocolors`, and `commander`.
    - Create `src/index.ts` as the main entry point.
3.  **Command Implementation:**
    - Implement a basic `init` command that prompts for a project name.
    - Implement `--version` and `--help` flags.
4.  **Build Configuration:**
    - Configure `tsconfig.json` for the project.
    - Add a `start` script to `package.json`.

## Acceptance Criteria

- `bun run start` in `apps/aic-orchestrator/` launches the CLI.
- The `init` command successfully prompts the user and prints a "Hello" message with the provided name.
- Code adheres to the repository's linting/formatting rules (if any).

## Verification

```bash
cd apps/aic-orchestrator
bun run start init
```

## Recommended Commit

```text
feat(aic-orchestrator): scaffold cli application and init command
```
