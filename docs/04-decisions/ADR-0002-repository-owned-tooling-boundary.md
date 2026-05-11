---
adr: ADR-0002
title: Repository-Owned Tooling Boundary
description: Establishes that the repository architecture owns the system and tools are adapters.
status: accepted
date: 2026-05-10
deciders:
  - architecture
supersedes: []
supersededBy: []
related:
  - docs/03-architecture/ARCHITECTURE.md
  - governance/REPOSITORY-CONSTITUTION.md
tags:
  - adr
  - tooling
  - architecture
---

# ADR-0002: Repository-Owned Tooling Boundary

## Status

accepted

## Context

Monorepos can become overly coupled to a single tool. That makes future changes difficult and can cause the tool's model to replace the repository's architecture.

## Decision

The repository architecture owns the repository.

Tools are adapters that implement workflows.

The initial foundation must work with plain scripts and CI. Advanced tools may be added later, but they must not become mandatory until explicitly accepted by ADR.

## Consequences

Benefits:

- lower lock-in
- easier migration
- simpler bootstrap
- stronger long-term control

Costs:

- some features may initially be less automated
- custom validation scripts are needed before advanced tooling is adopted

## Verification

- Plain verification scripts are canonical in the initial foundation.
- Optional tools must not be required for baseline verification.
- New required tools need ADR approval.
