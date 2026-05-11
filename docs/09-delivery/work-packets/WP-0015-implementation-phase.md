---
workPacket: WP-0015
title: Implementation Phase (Code Generation)
description: Implements the Implementation phase, enabling the AI to generate initial boilerplate and scaffolding.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - implementation
  - code-generation
  - ai
---

# WP-0015: Implementation Phase (Code Generation)

## Goal

Enable the AI Orchestrator to transition from Planning to Implementation by generating initial project scaffolding, boilerplate code, and configuration files based on the approved architecture and work packets.

## Scope

Includes:
- **Phase Integration:** Formalize the `implementation` phase in the SDLC lifecycle.
- **Implementation System Prompts:** "Expert Developer" persona focused on clean code, idiomatic patterns, and project structure.
- **Implementation Engine:** Specialized engine for generating multi-file codebases.
- **File Writing Logic:** Safe mechanism to write generated code to the local filesystem (with user approval).

## Non-Goals

Excludes:
- Full application development (focus is on "Day 0" scaffolding and boilerplate).
- External dependency management (e.g., running `npm install` automatically).
- Overwriting existing source code without explicit backup/confirmation.

## Tasks

1.  **Define Implementation Prompts:**
    - Create `src/lib/phases/implementation-prompts.ts` with the "Full-Stack Engineer" system prompt.
2.  **Implement Implementation Engine:**
    - Create `src/lib/phases/implementation-engine.ts` extending the `PhaseEngine`.
    - Add a specialized method to extract file paths and contents from AI responses.
3.  **Update CLI for Implementation Phase:**
    - Insert the `implementation` phase after `planning`.
    - Update the transition logic in `src/index.ts`.
4.  **Safe File Writer:**
    - Implement a utility to parse AI output (e.g., using Markdown code blocks with file path annotations) and write files to the appropriate directories.

## Acceptance Criteria

- The tool guides the user through the Implementation phase after Planning.
- The AI identifies the necessary files for the first Work Packet (e.g., `package.json`, `index.ts`, `README.md`).
- The system correctly parses AI-generated code and writes it to the local filesystem.
- Files are written to the correct project sub-directory (e.g., `apps/<project-name>/`).

## Verification

```bash
cd apps/aic-orchestrator
bun run start init # Complete previous phases
# Tool should prompt to start the Implementation phase.
# AI generates boilerplate; verify files appear in the project directory.
```

## Recommended Commit

```text
feat(aic-orchestrator): implement implementation phase and initial code generation
```
