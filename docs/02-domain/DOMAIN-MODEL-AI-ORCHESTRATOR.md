---
title: Domain Model - AI-Guided SDLC Orchestrator
description: Defines the core entities and relationships for the AI-guided SDLC orchestrator.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - domain
  - model
  - ai
  - sdlc
---

# Domain Model: AI-Guided SDLC Orchestrator

## Overview

The AI-Guided SDLC Orchestrator manages the transition of a project from a vague idea to a structured, governed repository through a series of AI-assisted conversations and state transitions.

## Core Entities

### 1. Workspace
The top-level container (monorepo) managed by the tool. It contains multiple projects, shared governance, and global AI context.

### 2. Project
A specific initiative within the workspace.
- **Attributes:** Name, Path, Type, Status, Owner.
- **Lifecycle:** inception -> research -> design -> execution -> validation.

### 3. SDLC Phase
A discrete stage in the development lifecycle.
- **Examples:** `product-definition`, `domain-modeling`, `architecture-design`, `work-planning`, `implementation`.
- **Properties:** Required deliverables, verification rules.

### 4. Conversation
A stateful interaction session between a user and an LLM.
- **Types:** `socratic-inception`, `specification-refinement`, `architectural-debate`, `plan-generation`.
- **State:** Active, Paused, Concluded.

### 5. Message
An individual unit of communication within a conversation.
- **Role:** `user`, `assistant`, `system`.
- **Content:** Text, structured data (JSON), or tool calls.

### 6. LLM Driver
An abstraction layer for interacting with different LLM providers.
- **Implementations:** `local` (Ollama/Llama.cpp), `cloud` (Gemini, OpenAI, Anthropic).
- **Configuration:** Model name, temperature, max tokens, API endpoint.

### 7. Deliverable
A durable artifact produced during an SDLC phase.
- **Examples:** Product Charter, SRS, ADR, Domain Model, Work Packet, Source Code.

### 8. Specification
A specialized deliverable representing the user's requirements, ingested as raw text and refined into structured documentation.

## Relationships

- A **Workspace** contains many **Projects**.
- A **Project** progresses through multiple **SDLC Phases**.
- Each **SDLC Phase** is supported by one or more **Conversations**.
- A **Conversation** is composed of many **Messages**.
- A **Conversation** utilizes an **LLM Driver** to generate responses.
- **SDLC Phases** produce **Deliverables** (e.g., a `design` phase produces an `ADR`).

## State Machine: Project Lifecycle

1.  **Empty/Uninitialized:** Only the workspace exists.
2.  **Bootstrapped (`init`):** Project directory and basic governance files created.
3.  **Inception:** Product charter drafted and approved through Socratic dialogue.
4.  **Specified:** SRS and Domain Model finalized.
5.  **Designed:** Architecture and ADRs approved.
6.  **Planned:** Work packets generated.
7.  **Executing:** Active code development.
8.  **Verified:** Post-implementation checks passed.
