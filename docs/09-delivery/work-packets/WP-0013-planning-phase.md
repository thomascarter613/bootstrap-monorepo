---
workPacket: WP-0013
title: Planning Phase (Work Packets) Implementation
description: Implements the Planning phase, guiding the user to break down the architecture into actionable work packets.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - planning
  - delivery
  - ai
---

# WP-0013: Planning Phase (Work Packets) Implementation

## Goal

Enable the AI Orchestrator to guide the user through the Planning phase, facilitating the breakdown of the approved architecture into discrete, actionable Work Packets (WPs) with clear goals, scope, and tasks.

## Scope

Includes:
- **Phase Integration:** Formalize the `planning` phase in the SDLC lifecycle.
- **Planning System Prompts:** Socratic prompts focused on task estimation, dependency mapping, and deliverable definition.
- **Planning Engine:** Specialized engine for decomposition and scheduling dialogue.
- **Deliverable Generation:** 
    - Automatic creation of multiple Work Packet files in `docs/09-delivery/work-packets/WP-XXXX-<TOPIC>.md`.

## Non-Goals

Excludes:
- Direct Jira/GitHub Issue integration (handled in a future WP).
- Resource/Budget management.

## Tasks

1.  **Define Planning Prompts:**
    - Create `src/lib/phases/planning-prompts.ts` with the "Project Manager" system prompt.
2.  **Implement Planning Engine:**
    - Create `src/lib/phases/planning-engine.ts` extending the `PhaseEngine`.
3.  **Update CLI for Planning Phase:**
    - Insert the `planning` phase after `architecture`.
    - Update the transition logic in `src/index.ts`.
4.  **Automate Planning Deliverables:**
    - Add logic to extract multiple work packets from the conversation.
    - Implement a mechanism to iterate through and save each work packet found.

## Acceptance Criteria

- The tool guides the user through the Planning phase after Architecture Design.
- The AI asks probing questions about "What is the first milestone?", "What are the dependencies between tasks?", and "How will we verify this?".
- One or more valid `WP-XXXX` files are generated in `docs/09-delivery/work-packets/`.

## Verification

```bash
cd apps/aic-orchestrator
bun run start init # Complete previous phases
# Tool should prompt to start the Planning phase.
# Answer planning questions and verify work packet generation.
```

## Recommended Commit

```text
feat(aic-orchestrator): implement planning phase and work packet generation
```
