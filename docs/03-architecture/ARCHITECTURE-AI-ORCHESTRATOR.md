---
title: Architecture - AI-Guided SDLC Orchestrator
description: Technical architecture for the AI-guided SDLC orchestrator.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - architecture
  - design
  - ai
---

# Architecture: AI-Guided SDLC Orchestrator

## 1. Architectural Style
The tool follows a **Hexagonal (Ports and Adapters)** architecture to ensure it remains agnostic of specific LLM providers and terminal interfaces.

## 2. Component Diagram

```text
[ Terminal UI (Clack/Ink) ]
           |
           v
[ Orchestration Engine ] <--- [ State Manager (Filesystem) ]
           |
           +-----------------------+
           |                       |
[ Driver Adapter: Gemini ]  [ Driver Adapter: Ollama/Local ]
           |                       |
           v                       v
     ( Cloud API )            ( Local API )
```

## 3. Core Components

### 3.1 Orchestration Engine
The central coordinator that manages the **Project State Machine**. It knows which SDLC phase the user is in and what the next required action is.

### 3.2 Driver Abstraction (The "Port")
A unified interface for LLM communication.
- `generateText(prompt: string): Promise<string>`
- `generateStructuredData(prompt: string, schema: Schema): Promise<T>`

### 3.3 State Manager
Handles persistence of the conversation history and project progress. It uses the repository itself (under `workspace/state/` or a hidden `.aic/` folder) as the database.

### 3.4 Inception Engine (Socratic Logic)
A specialized component within the engine that manages the didactic dialogue. It uses a set of "Socratic System Prompts" to guide the LLM's questioning behavior.

## 4. Key Design Patterns

- **Strategy Pattern:** Used for switching between different LLM drivers.
- **State Pattern:** Used to manage the transition between SDLC phases (Inception -> Design -> Execution).
- **Template Method:** Used for generating standard documents (Product Charter, ADR) from LLM output.

## 5. Security & Privacy
- **Driver Isolation:** Cloud drivers must explicitly receive user consent before data is transmitted.
- **Secret Management:** API keys are never stored in the repository; they are read from environment variables or local keyrings.
