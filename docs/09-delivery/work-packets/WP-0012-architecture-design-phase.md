---
workPacket: WP-0012
title: Architecture Design Phase Implementation
description: Implements the Architecture Design phase, guiding the user to select a tech stack and draft ADRs.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - architecture
  - adr
  - ai
---

# WP-0012: Architecture Design Phase Implementation

## Goal

Enable the AI Orchestrator to guide the user through the Architecture Design phase, facilitating tech stack selection, system boundary definition, and the generation of Architecture Decision Records (ADRs).

## Scope

Includes:
- **Phase Integration:** Refine the SDLC lifecycle to include `architecture` (or formalize `design` as architecture).
- **Architecture System Prompts:** Socratic prompts focused on trade-offs, tech stack selection, and modularity.
- **Architecture Engine:** Specialized engine for architectural dialogue.
- **Deliverable Generation:** 
    - Automatic creation of `docs/03-architecture/ARCHITECTURE-<NAME>.md`.
    - Generation of one or more initial ADRs in `docs/04-decisions/ADR-XXXX-<TOPIC>.md`.

## Non-Goals

Excludes:
- Code generation (handled in future implementation WPs).
- Detailed infrastructure-as-code (Terraform/Tofu) - though it may recommend tools.

## Tasks

1.  **Refine Phase Schema:**
    - Update `SDLCPhase` in `src/lib/state/types.ts` to include `domain-modeling` and `architecture`.
2.  **Define Architecture Prompts:**
    - Create `src/lib/phases/architecture-prompts.ts` with the "System Architect" system prompt.
3.  **Implement Architecture Engine:**
    - Create `src/lib/phases/architecture-engine.ts` extending the `PhaseEngine`.
4.  **Update CLI for Architecture Phase:**
    - Insert the `architecture` phase after `domain-modeling`.
    - Update the transition logic in `src/index.ts`.
5.  **Automate Architecture Deliverables:**
    - Add logic to generate the Architecture Overview.
    - Add a specialized prompt to extract and format ADRs from the conversation history.

## Acceptance Criteria

- The tool guides the user through the Architecture phase after Domain Modeling.
- The AI asks probing questions about "Monolith vs Microservices?", "Database choice?", and "Security posture?".
- A valid `ARCHITECTURE-<PROJECT>.md` is generated.
- At least one `ADR` file is generated based on a key decision made during the conversation.

## Verification

```bash
cd apps/aic-orchestrator
bun run start init # Complete previous phases
# Tool should prompt to start the Architecture Design phase.
# Answer architecture questions and verify deliverable generation.
```

## Recommended Commit

```text
feat(aic-orchestrator): implement architecture design phase and adr generation
```
