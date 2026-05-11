---
workPacket: WP-0008
title: Streaming UI Enhancement
description: Implements word-by-word streaming for AI responses to improve UX responsiveness.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - ux
  - streaming
  - ai
---

# WP-0008: Streaming UI Enhancement

## Goal

Enhance the user experience by streaming AI responses word-by-word in the terminal, reducing the perceived latency and making the Socratic dialogue feel more interactive.

## Scope

Includes:
- **LLM Driver Update:** Update `LLMDriver` interface to support streaming callbacks.
- **Ollama Driver Update:** Enable streaming in the `OllamaDriver`.
- **Engine Support:** Update `PhaseEngine` to process and return streaming content.
- **CLI Implementation:** Update the `runPhase` loop in `src/index.ts` to output chunks as they arrive while maintaining Clack's visual style.

## Non-Goals

Excludes:
- Streaming for deliverable generation (charters/models) - those can remain batch-generated.
- Support for streaming in non-TTY environments.

## Tasks

1.  **Refactor `LLMDriver` Interface:**
    - Update `src/lib/llm/types.ts` to include a `onToken` callback in `PromptOptions` or a new `streamText` method.
2.  **Implement Streaming in Ollama:**
    - Update `src/lib/llm/drivers/ollama.ts` to handle `stream: true` and emit chunks via the callback.
3.  **Update Engine for Streaming:**
    - Modify `PhaseEngine.next` to support an optional streaming callback.
4.  **CLI UX Update:**
    - Refactor `runPhase` in `src/index.ts` to use the streaming capability.
    - Ensure the terminal is managed correctly so streaming text doesn't break Clack's layout.

## Acceptance Criteria

- AI responses in the `init` command appear word-by-word (or chunk-by-chunk).
- The spinner is replaced or supplemented by the streaming text as it arrives.
- The full response is still correctly saved to the project history after streaming finishes.

## Verification

```bash
cd apps/aic-orchestrator
bun run start init
# Start a conversation and verify the text "types out" in real-time.
```

## Recommended Commit

```text
feat(aic-orchestrator): implement streaming ai responses for improved ux
```
