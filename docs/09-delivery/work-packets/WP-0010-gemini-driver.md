---
workPacket: WP-0010
title: Cloud LLM Support (Google Gemini)
description: Implements a cloud-based driver for Google Gemini to provide higher-capability reasoning.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - ai
  - gemini
  - cloud
---

# WP-0010: Cloud LLM Support (Google Gemini)

## Goal

Enable the AI Orchestrator to utilize Google's Gemini models for complex SDLC tasks, providing an alternative to local LLMs when higher reasoning capability or speed is desired.

## Scope

Includes:
- Installation of `@google/generative-ai` SDK.
- Implementation of the `GeminiDriver`.
- Support for streaming and non-streaming responses via the Gemini API.
- Configuration for API keys (via environment variable `GEMINI_API_KEY`).
- Integration into the `DriverFactory`.

## Non-Goals

Excludes:
- Support for other cloud providers (OpenAI/Anthropic) - handled in future WPs.
- Automatic API key management (handled in WP-0016).

## Tasks

1.  **Dependency Installation:**
    - Add `@google/generative-ai` to `apps/aic-orchestrator/package.json`.
2.  **Implement Gemini Driver:**
    - Create `src/lib/llm/drivers/gemini.ts`.
    - Map the unified `Message[]` history to Gemini's content format.
    - Implement streaming support using `generateContentStream`.
3.  **Update Driver Factory:**
    - Enable the `gemini` provider in `src/lib/llm/factory.ts`.
4.  **Verification:**
    - Use the `test-ai` command to verify connectivity with Gemini.

## Acceptance Criteria

- Running `aic init --provider gemini --model gemini-1.5-pro` successfully uses the Gemini API.
- Streaming UI works seamlessly with the Gemini driver.
- Graceful error handling for missing API keys or network issues.

## Verification

```bash
export GEMINI_API_KEY=your_key
cd apps/aic-orchestrator
bun run start test-ai "Hello Gemini" --provider gemini --model gemini-1.5-flash
```

## Recommended Commit

```text
feat(aic-orchestrator): add google gemini cloud driver support
```
