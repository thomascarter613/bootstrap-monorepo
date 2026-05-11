---
workPacket: WP-0003
title: LLM Driver Abstraction and Local Ollama Adapter
description: Implements the provider-agnostic LLM interface and a local-first driver for Ollama.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - ai
  - llm
  - ollama
---

# WP-0003: LLM Driver Abstraction and Local Ollama Adapter

## Goal

Enable the AI Orchestrator to communicate with LLMs using a provider-agnostic interface, starting with a local-first adapter for Ollama to support zero-cost development.

## Scope

Includes:
- Definition of the `LLMDriver` interface.
- Implementation of the `OllamaDriver` (Local).
- Implementation of a `DriverFactory` to switch between providers.
- Configuration management for LLM endpoints and model names.
- Basic "completion" and "streaming" support (internal).

## Non-Goals

Excludes:
- Cloud-based drivers (Gemini/OpenAI) - handled in future WPs.
- The actual Socratic dialogue logic (handled in WP-0004).
- Persistent conversation history.

## Tasks

1.  **Define Core Interfaces:**
    - Create `src/lib/llm/types.ts` defining `LLMDriver`, `Message`, and `PromptOptions`.
2.  **Implement Ollama Adapter:**
    - Create `src/lib/llm/drivers/ollama.ts`.
    - Implement communication with the local Ollama API (typically `localhost:11434`).
3.  **Driver Registry:**
    - Create `src/lib/llm/factory.ts` to manage and instantiate drivers based on user config.
4.  **Integration Test:**
    - Add a hidden `test-ai` command to the CLI to verify connectivity with a local LLM.

## Acceptance Criteria

- The `LLMDriver` interface is correctly implemented.
- The orchestrator can successfully send a prompt and receive a response from a local Ollama instance.
- Connectivity errors (e.g., Ollama not running) are handled gracefully with helpful user messages.

## Verification

```bash
# Assuming Ollama is running locally with 'llama3' or similar
cd apps/aic-orchestrator
bun run start test-ai "What is the SDLC?"
```

## Recommended Commit

```text
feat(aic-orchestrator): add llm driver abstraction and ollama support
```
