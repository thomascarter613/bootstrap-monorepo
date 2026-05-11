---
title: "ADR 0003: Selection of Tech Stack for AI SDLC Orchestrator"
description: Selection of TypeScript and Bun as the foundation for the new tool.
status: proposed
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - adr
  - tech-stack
  - typescript
  - bun
---

# ADR 0003: Selection of Tech Stack for AI SDLC Orchestrator

## Context
We need a tech stack for the AI-Guided SDLC Orchestrator that meets the following criteria:
1.  **High-Performance CLI:** Responsive user interface with low latency.
2.  **Ease of Distribution:** Ability to distribute as a single binary or via common package managers.
3.  **Consistency:** Alignment with existing repository tools (Bun, Node.js).
4.  **Rich Terminal UI:** Support for modern, interactive CLI components (spinners, prompts).

## Decision
We will use **TypeScript** running on the **Bun** runtime.

### UI Components
We will use **Clack** or **Enquirer** for interactive prompts and **Chalk** for terminal styling.

## Rationale

### 1. Consistency
The repository already uses Bun as its primary package manager and runtime for internal scripts. Staying within the JS/TS ecosystem allows us to reuse existing verification scripts and configuration (e.g., `biome.json`).

### 2. Bun Performance and Compilation
Bun is significantly faster than Node.js for CLI startups. Crucially, it has a built-in `bun build --compile` command that can generate a single, standalone executable binary for Linux, macOS, and Windows, satisfying the requirement for easy distribution.

### 3. Ecosystem for LLMs
The majority of LLM SDKs (Google, OpenAI, Anthropic, Ollama) have first-class TypeScript support, making integration straightforward.

### 4. Local-First Development
TypeScript's type system is excellent for modeling the complex state transitions and schemas required for a multi-phase SDLC.

## Alternatives Considered

### Go
- **Pros:** Excellent performance, single binary by default.
- **Cons:** Less alignment with the existing TS-heavy governance and verification layers of this specific monorepo foundation.

### Python
- **Pros:** Strong AI/LLM ecosystem.
- **Cons:** Difficult to distribute as a single binary without significant overhead (e.g., PyInstaller); slower startup times for interactive CLIs.

## Consequences
- **Positive:** Single binary distribution; high performance; shared toolchain with the rest of the monorepo.
- **Negative:** Requires Bun to be installed for development (already a repo requirement).
