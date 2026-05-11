---
workPacket: WP-0007
title: Domain Modeling & Schema Generation
description: Implements the second phase of the AI SDLC, guiding the user to define entities and relationships.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - domain
  - modeling
  - ai
---

# WP-0007: Domain Modeling & Schema Generation

## Goal

Enable the AI Orchestrator to transition from the Inception phase to the Domain Modeling phase, guiding the user to identify core entities, attributes, and relationships, and automatically generating a `DOMAIN-MODEL.md`.

## Scope

Includes:
- **Phase Transition Logic:** Logic to detect completion of Inception and trigger the Domain Modeling phase.
- **Domain System Prompts:** New Socratic prompts focused on technical modeling.
- **Domain Engine:** Specialized logic for managing domain-specific dialogue.
- **Deliverable Generation:** Automatic creation of `docs/02-domain/DOMAIN-MODEL-<NAME>.md`.

## Non-Goals

Excludes:
- Database schema generation (SQL/NoSQL) - handled in a future "Design" WP.
- Architecture Diagram generation (Mermaid).

## Tasks

1.  **Define Domain Prompts:**
    - Create `src/lib/domain/prompts.ts` with the "Domain Modeler" system prompt.
2.  **Implement Domain Engine:**
    - Create `src/lib/domain/engine.ts` (or refactor `InceptionEngine` into a generic `PhaseEngine`).
3.  **Update CLI for Phase Transitions:**
    - Modify `src/index.ts` to handle movement from `inception` -> `requirements` -> `domain-modeling`.
    - Ensure project state is updated to reflect the new phase.
4.  **Automate Domain Deliverable:**
    - Add logic to generate the Markdown domain model from the conversation history.

## Acceptance Criteria

- After a Product Charter is generated, the tool offers to move to "Domain Modeling".
- The AI asks questions specifically about "What are the main objects/entities?" and "How do they interact?".
- A valid `DOMAIN-MODEL-<PROJECT>.md` is generated in `docs/02-domain/`.

## Verification

```bash
cd apps/aic-orchestrator
bun run start init # Complete inception
# Tool should prompt: "Inception complete. Would you like to start Domain Modeling?"
# Select Yes and answer modeling questions.
```

## Recommended Commit

```text
feat(aic-orchestrator): implement domain modeling phase and deliverable generation
```
