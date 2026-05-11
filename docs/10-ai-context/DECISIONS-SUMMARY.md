---
title: Decisions Summary
description: Summarizes accepted decisions for quick AI rehydration.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - ai
  - adr
  - decisions
---

# Decisions Summary

## Accepted Decisions

### ADR-0001: Repository as Source of Truth

The repository is the durable source of truth for product, architecture, governance, code, contracts, operations, security, and AI context.

### ADR-0002: Repository-Owned Tooling Boundary

The repository architecture owns the repository. Tools are adapters. The initial foundation must work with plain scripts and CI before advanced tooling is required.

## Important Consequence

This repo is future-compatible with Charon and Foundry, but does not depend on either.
