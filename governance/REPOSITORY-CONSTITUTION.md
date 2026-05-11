---
title: Repository Constitution
description: Defines the governing rules, scope, constraints, and operating model for the repository.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - governance
  - constitution
  - repository
---

# Repository Constitution

## Purpose

This constitution defines the operating rules for the repository.

The repository must remain:

- understandable
- auditable
- verifiable
- evolvable
- tool-neutral at the architecture layer
- compatible with future automation
- useful without unfinished future systems

## Scope

The repository may contain:

- apps
- services
- packages
- contracts
- database assets
- documentation
- governance rules
- security policy
- operations runbooks
- infrastructure
- tools
- templates
- examples
- experiments
- workspace state

## Source of Truth

The repository is the source of truth for its product, architecture, governance, contracts, security, operations, delivery, and current state.

## Required Governance Surfaces

The following surfaces are required:

- `README.md`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `docs/`
- `governance/`
- `workspace/`
- `tools/scripts/verify.sh`
- `tools/scripts/doctor.sh`

## Project Rules

Every future project must have:

- declared project type
- owner
- path
- lifecycle status
- required tasks
- documentation
- verification path

## Documentation Rules

Important docs must include YAML frontmatter.

Allowed statuses:

- draft
- proposed
- accepted
- active
- superseded
- deprecated
- rejected
- archived

## Architecture Rules

Architecture decisions must be captured in ADRs when they affect durable repository direction.

## Tooling Rules

Tools implement repository workflows. Tools do not own repository architecture.

No required tool may be added without either:

1. being part of the initial plain foundation, or
2. being approved by ADR.

## AI Rules

AI context must be plain, inspectable, and derived from canonical repository files.

No AI system is required to use this repository.

## Future Control-Plane Compatibility

Future systems may consume:

- `docs/10-ai-context/`
- `governance/`
- `workspace/`
- `tools/`
- `templates/`

Future systems must not require a restructuring of the foundation.
