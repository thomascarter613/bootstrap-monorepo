---
adr: ADR-0001
title: Repository as Source of Truth
description: Establishes the repository as the durable source of truth for product, architecture, governance, code, and delivery state.
status: accepted
date: 2026-05-10
deciders:
  - architecture
supersedes: []
supersededBy: []
related:
  - docs/00-vision/VISION.md
  - docs/03-architecture/ARCHITECTURE.md
  - governance/REPOSITORY-CONSTITUTION.md
tags:
  - adr
  - source-of-truth
  - governance
---

# ADR-0001: Repository as Source of Truth

## Status

accepted

## Context

Serious software systems need durable continuity across planning, architecture, implementation, security, operations, and AI-assisted development.

External chats, local notes, tool state, and generated summaries are useful but insufficient as canonical records.

## Decision

The repository is the source of truth for:

- product intent
- architecture
- ADRs
- domain model
- contracts
- security posture
- operations
- delivery plans
- AI context summaries
- verification scripts
- workspace state

## Consequences

Benefits:

- fewer hidden decisions
- better onboarding
- stronger AI continuity
- better verification
- less architectural drift

Costs:

- more upfront documentation
- stricter contribution rules
- need for verification scripts

## Verification

This decision is enforced through:

- required documentation directories
- ADR index
- repo contract files
- workspace manifest
- verification scripts
- CI
