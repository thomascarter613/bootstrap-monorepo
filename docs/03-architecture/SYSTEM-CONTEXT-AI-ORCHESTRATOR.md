---
title: System Context - AI-Guided SDLC Orchestrator
description: Maps the interactions between the AI SDLC tool, the user, LLMs, and the filesystem.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - architecture
  - system-context
  - ai
---

# System Context: AI-Guided SDLC Orchestrator

## Overview
The AI-Guided SDLC Orchestrator is a terminal-based application that acts as a bridge between the user's creative intent and the structured reality of a governed repository.

## Actors

### 1. User (Primary Actor)
- Initiates the SDLC process.
- Responds to Socratic questions.
- Provides raw specifications.
- Approves architecture decisions and plans.

### 2. Local LLM Runtime (External System)
- **Examples:** Ollama, Llama.cpp, LM Studio.
- **Role:** Provides offline, zero-cost inference for all SDLC phases.
- **Interface:** Local HTTP API (e.g., OpenAI-compatible endpoint).

### 3. Cloud LLM Provider (External System)
- **Examples:** Google Gemini API, OpenAI API, Anthropic Claude API.
- **Role:** Optional high-capability inference for complex reasoning.
- **Interface:** Cloud HTTPS APIs.

### 4. Local Filesystem (Internal System)
- **Role:** Stores the project source code, documentation, and metadata.
- **Interface:** Standard I/O.

## Data Flows

1.  **User -> Orchestrator:** Raw ideas, answers to questions, `init` commands.
2.  **Orchestrator -> LLM (Local/Cloud):** Context-enriched prompts (e.g., "Ask a probing question about X").
3.  **LLM (Local/Cloud) -> Orchestrator:** Responses, structured data (JSON), or generated text.
4.  **Orchestrator -> User:** Socratic questions, summaries of state, proposed documents.
5.  **Orchestrator -> Filesystem:** Writing `docs/`, `governance/`, and source files.
6.  **Filesystem -> Orchestrator:** Reading existing context to provide to the LLM.

## Boundaries and Sovereignty
The tool is designed with a **Local-First** boundary. If Cloud LLM Providers are unavailable or the user chooses to disable them, the system boundary collapses to only the User, the Orchestrator, and the Local LLM Runtime, ensuring full privacy and zero-cost operation.
