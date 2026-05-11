---
workPacket: WP-0004
title: Socratic Inception Engine Logic
description: Implements the didactic dialogue logic for project inception and initial document generation.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - ai
  - inception
  - socratic
---

# WP-0004: Socratic Inception Engine Logic

## Goal

Implement the Socratic dialogue logic that guides the user from a vague idea to a concrete Product Charter through didactic questioning.

## Scope

Includes:
- Socratic system prompt design.
- The `InceptionEngine` class to manage conversation state.
- Integration of the engine into the `init` command.
- Logic to determine when "inception" is complete.
- Generation of the initial `PRODUCT-CHARTER.md` based on the conversation history.

## Non-Goals

Excludes:
- Persistent state management across multiple OS restarts (handled in WP-0005).
- Advanced document types like SRS or ADR (handled in future WPs).
- Specification ingestion from existing files.

## Tasks

1.  **System Prompt Design:**
    - Create `src/lib/inception/prompts.ts` with the "Socratic Master Prompt."
2.  **Implement Inception Engine:**
    - Create `src/lib/inception/engine.ts`.
    - Handle message history and "stop condition" detection (e.g., when the LLM signals the project is well-defined).
3.  **Integrate with `init` Command:**
    - Update `src/index.ts` to use the `InceptionEngine` during the `init` workflow.
    - Use Clack's `text` and `spinner` for the interactive loop.
4.  **Charter Generation:**
    - Add logic to the engine to generate a structured Product Charter (Markdown) at the end of the conversation.

## Acceptance Criteria

- The `init` command starts a multi-turn conversation where the AI asks probing questions.
- The AI correctly identifies when enough information has been gathered.
- A valid `PRODUCT-CHARTER.md` file is generated in a local directory at the end of the flow.

## Verification

```bash
cd apps/aic-orchestrator
bun run start init
# Follow the socratic prompts to complete a project definition
```

## Recommended Commit

```text
feat(aic-orchestrator): implement socratic inception engine and charter generation
```
