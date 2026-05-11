---
workPacket: WP-0009
title: SRS Phase Implementation
description: Implements the Software Requirements Specification phase, guiding the user to define functional and non-functional requirements.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - specs
  - srs
  - ai
---

# WP-0009: SRS Phase Implementation

## Goal

Enable the AI Orchestrator to guide the user through the Software Requirements Specification (SRS) phase, resulting in a structured document that defines functional and non-functional requirements.

## Scope

Includes:
- **Phase Integration:** Add the `requirements` phase to the project lifecycle.
- **SRS System Prompts:** New Socratic prompts focused on requirements gathering.
- **SRS Engine:** Specialized engine for managing requirements-focused dialogue.
- **Deliverable Generation:** Automatic creation of `docs/05-specs/SRS-<NAME>.md`.

## Non-Goals

Excludes:
- Validation of requirements against code (handled in future verification WPs).
- Direct linking of requirements to domain entities (partial context is shared via history).

## Tasks

1.  **Define SRS Prompts:**
    - Create `src/lib/phases/srs-prompts.ts` with the "Requirements Analyst" system prompt.
2.  **Implement SRS Engine:**
    - Create `src/lib/phases/srs-engine.ts` extending the `PhaseEngine`.
3.  **Update CLI for SRS Phase:**
    - Modify `src/index.ts` to insert the `requirements` phase between `inception` and `design` (Domain Modeling).
    - Ensure project state correctly transitions through the new phase.
4.  **Automate SRS Deliverable:**
    - Add logic to generate the Markdown SRS document from the conversation history.

## Acceptance Criteria

- The `init` command guides the user through the `requirements` phase after `inception` is complete.
- The AI asks probing questions about "What should the system do?" (Functional) and "How should the system perform?" (Non-Functional).
- A valid `SRS-<PROJECT>.md` is generated in `docs/05-specs/`.

## Verification

```bash
cd apps/aic-orchestrator
bun run start init # Complete inception
# Tool should prompt to start the Requirements phase.
# Answer requirements questions and verify SRS generation.
```

## Recommended Commit

```text
feat(aic-orchestrator): implement srs phase and deliverable generation
```
