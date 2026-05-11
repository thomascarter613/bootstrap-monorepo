---
workPacket: WP-0006
title: Specification Ingestion
description: Enables the AI Orchestrator to ingest raw text files as the initial project specification.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - ingestion
  - specs
---

# WP-0006: Specification Ingestion

## Goal

Allow users to provide a path to a raw text file containing their project vision, which the AI will then use as the primary context for the Inception phase.

## Scope

Includes:
- A new `--spec <path>` option for the `init` command.
- Logic to read and validate the provided specification file.
- Integration of the file content into the initial `InceptionEngine` prompt.
- Socratic logic update: The AI should acknowledge the spec and ask clarifying questions instead of starting from scratch.

## Non-Goals

Excludes:
- PDF or Word doc ingestion (plain text/Markdown only for now).
- Multiple spec files (single file only).
- Dynamic re-ingestion during an active conversation (handled in a future WP).

## Tasks

1.  **Update `init` Command CLI:**
    - Add the `--spec <path>` option to the `init` command in `src/index.ts`.
2.  **Implement Spec Reader:**
    - Add a utility function to read and sanitize text from a local file path.
3.  **Context Injection Logic:**
    - Modify the `init` action to inject the spec content as a "System-User" message at the start of the `InceptionEngine` history.
4.  **Socratic Prompt Refinement:**
    - Update the `InceptionEngine` to handle the case where a large amount of context is provided upfront.

## Acceptance Criteria

- Running `aic init --spec my-idea.txt` correctly reads the file.
- The AI's first response acknowledges specific points from the provided text.
- The conversation history reflects that the spec was the starting point.
- Errors (e.g., file not found, unreadable file) are handled gracefully.

## Verification

```bash
echo "I want to build a drone delivery system for coffee." > coffee.txt
cd apps/aic-orchestrator
bun run start init --spec coffee.txt
# Verify the AI starts by discussing drone delivery for coffee.
```

## Recommended Commit

```text
feat(aic-orchestrator): add specification ingestion support to init command
```
