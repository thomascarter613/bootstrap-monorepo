---
title: Product Charter - AI-Guided SDLC Orchestrator
description: A terminal-based, AI-guided SDLC orchestrator for bootstrapping and developing monorepos.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - product
  - charter
  - ai
  - sdlc
---

# Product Charter: AI-Guided SDLC Orchestrator

## Vision

To democratize high-quality, AI-driven software development by providing a terminal-based orchestrator that guides users through the entire SDLC—from initial ideation to code—using their choice of LLM (local or cloud-based) without mandatory costs.

## Problem Statement

Current AI-driven development tools often:
1.  Require expensive subscriptions or token fees.
2.  Lack a guided, socratic approach to project inception.
3.  Are tightly coupled to specific IDEs or cloud providers.
4.  Do not guide the user through the "boring" but critical parts of the SDLC (governance, specs, ADRs) before jumping into code.

## Target Audience

- Individual developers seeking to bootstrap projects with high-quality foundations.
- Teams wanting a standardized, AI-assisted way to enforce governance and documentation.
- Privacy-conscious or cost-conscious developers who prefer local LLMs (e.g., via Ollama, Llama.cpp).

## Key Features

### 1. `init` Command & Bootstrapping
- A simple command to start a new project.
- Interactive questionnaire to stand up a governed monorepo foundation.

### 2. Socratic Project Inception
- A didactic, socratic conversational mode to probe the user's intent.
- Helps the user move from a vague idea to a concrete specification.

### 3. Specification Ingestion
- Ability to ingest raw text specifications provided by the user.
- Refines and structures these specs into canonical repository documents.

### 4. LLM Agnostic & Local-First
- Support for multiple LLM providers (Google Gemini, OpenAI, Anthropic, etc.).
- First-class support for local LLMs to ensure a "free to use" tier without service degradation.

### 5. Full SDLC Orchestration
- Guides the user through: Ideation -> Requirements -> Architecture -> Design -> Planning -> Implementation.

## Goals

- **Zero-Cost Entry:** Users must be able to use the tool effectively with local models.
- **High-Signal Foundations:** Every project started with this tool should be "governance-ready" by default.
- **Terminal-Native:** Focus on a high-efficiency CLI experience.

## Non-Goals

- Replacing the IDE (this is an orchestrator/guide, not a text editor).
- Hosting or managing production infrastructure.
