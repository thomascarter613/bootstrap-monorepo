---
title: Architecture Overview
description: Defines the architecture of the governance-first monorepo foundation.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - architecture
  - monorepo
---

# Architecture Overview

## Architectural Style

This repository is a self-governing polyglot monorepo foundation.

It is organized around:

- root-level responsibility boundaries
- documentation as durable product memory
- governance rules as repo contract
- workspace state as machine-readable current state
- plain verification scripts as the first enforcement layer
- optional advanced tooling later

## Layer Model

```text
Layer 1: Plain Repository Foundation
  Git, Markdown, JSON, YAML, Bash, Python 3, Bun scripts, CI.

Layer 2: Lightweight Internal Automation
  validators, generators, doctor scripts, project graph checks.

Layer 3: Future Control Plane Adoption
  future tools may consume governance/, workspace/, docs/10-ai-context/.
```

## Explicit Non-Dependency

This repository is compatible with future Charon and Foundry adoption, but neither Charon nor Foundry is required for local development, verification, CI, documentation, generation, or release.

## Root Boundaries

| Path | Responsibility |
|---|---|
| `apps/` | deployable applications |
| `services/` | backend services, workers, daemons, gateways |
| `packages/` | shared libraries and SDKs |
| `contracts/` | API, event, schema, and error contracts |
| `db/` | migrations, seeds, fixtures, providers |
| `docs/` | durable planning, product, architecture, delivery, and AI context |
| `governance/` | repository rules, schemas, policies, standards |
| `workspace/` | current machine-readable state |
| `tools/` | scripts, validators, generators, repo doctor |
| `security/` | security, supply-chain, SBOM, and review planning |

## Design Rule

The repository owns the architecture. Tools implement workflows.
