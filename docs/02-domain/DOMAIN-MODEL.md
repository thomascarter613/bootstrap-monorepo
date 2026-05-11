---
title: Domain Model
description: Defines the core conceptual model for the monorepo foundation.
status: draft
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - domain
  - model
---

# Domain Model

## Core Concepts

### Repository

The durable source of truth for product, architecture, code, contracts, operations, security, and delivery state.

### Project

A declared unit of work inside the repository, such as an app, service, package, contract, tool, docs site, or infra module.

### Repo Contract

The set of machine-readable rules describing what must be true about the repository.

### Workspace State

The machine-readable description of what currently exists in the repository.

### Work Packet

A scoped unit of planned change with acceptance criteria, verification commands, and rollback notes.

### ADR

An architecture decision record describing a durable decision, its context, consequences, and status.

### AI Context

Plain canonical files that summarize current repository state for AI-assisted workflows.

## Invariants

1. Every project must be declared.
2. Every project must have an owner.
3. Every important decision must be recorded.
4. Every important convention should be verifiable.
5. Governance rules and workspace state must remain separate.
6. AI context must derive from canonical repository facts.
