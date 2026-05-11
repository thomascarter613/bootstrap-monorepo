---
workPacket: WP-0011
title: Chain-of-Thought Verbosity
description: Implements a --verbose mode to show the AI's internal reasoning traces during the SDLC phases.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - ai
  - transparency
  - reasoning
---

# WP-0011: Chain-of-Thought Verbosity

## Goal

Provide transparency into the AI's decision-making process by allowing users to see the "Hidden Reasoning" (Chain-of-Thought) before it asks a question or generates a deliverable.

## Scope

Includes:
- **System Prompt Updates:** Update all phase prompts to require reasoning wrapped in `<thought>` tags.
- **Engine Support:** Update `PhaseEngine` to parse and separate `<thought>` content from the user-facing response.
- **CLI Implementation:** Add a `--verbose` (or `-v`) flag to the `init` command to display the extracted reasoning.
- **Visual Styling:** Style the reasoning traces (e.g., using a specific color or border) to distinguish them from the dialogue.

## Non-Goals

Excludes:
- Persistent storage of thought traces (they are transient for the session).
- Forcing the AI to use specific reasoning frameworks (e.g., ReAct).

## Tasks

1.  **Update Prompt Instructions:**
    - Append instructions to all system prompts in `src/lib/inception/prompts.ts` and `src/lib/phases/*-prompts.ts` to always include a `<thought>` block before the response.
2.  **Refactor `PhaseEngine`:**
    - Update the `next` method to extract content within `<thought>` tags.
    - Return both the `response` and the `thought` (if any).
3.  **Update CLI Logic:**
    - Add `.option('-v, --verbose', 'Show AI reasoning traces')` to the `init` command.
    - Update `runPhase` to display the thought block if `verbose` is enabled.
4.  **Verification:**
    - Run the tool with `--verbose` and verify the internal reasoning is displayed.

## Acceptance Criteria

- When running with `--verbose`, a clearly styled "AI Reasoning" block appears before each AI question.
- When running WITHOUT `--verbose`, the thought block is hidden, and only the question is shown.
- All SDLC phases support the verbosity mode.

## Verification

```bash
cd apps/aic-orchestrator
bun run start init --verbose
# Verify the reasoning traces appear during the conversation.
```

## Recommended Commit

```text
feat(aic-orchestrator): add verbose mode for ai reasoning traces
```
