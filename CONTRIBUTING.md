---
title: Contributing
description: Defines the repository contribution workflow, verification expectations, documentation rules, and review triggers.
status: active
version: 0.1.0
owner: maintainers
created: 2026-05-10
updated: 2026-05-10
tags:
  - contributing
  - workflow
  - governance
---

# Contributing

## Working Standard

Every contribution should leave the repository more explicit, more verifiable, and easier to operate.

This repository prefers:

- small atomic changes
- Conventional Commits
- docs/spec-driven work
- explicit architecture decisions
- verification before push
- no hidden tool coupling
- no generated changes without provenance when practical

## Local Verification

Run:

```bash
bash tools/scripts/verify.sh
```

or:

```bash
bun run verify
```

## Commit Style

Use Conventional Commits:

```text
docs(governance): add repository constitution
feat(cli): add project manifest validator
fix(docs): correct ADR index
chore(repo): update verification script
test(contract): add OpenAPI compatibility checks
```

## Branch Naming

Recommended:

```text
docs/<topic>
feat/<topic>
fix/<topic>
chore/<topic>
refactor/<topic>
```

## Pull Request Requirements

A pull request should include:

1. What changed.
2. Why it changed.
3. Verification commands run.
4. Risks or trade-offs.
5. Any required ADR, work packet, or security review.

## ADR Triggers

Create or update an ADR when a change affects:

- repository structure
- architecture boundaries
- public contracts
- security posture
- persistence strategy
- deployment strategy
- toolchain decisions
- generator behavior
- AI/context workflow
- long-term maintenance policy

## Documentation Requirements

Docs under `docs/`, `governance/`, `security/`, `contracts/`, and `ops/` should include YAML frontmatter unless they are clearly machine-only files or placeholders.

Canonical document statuses:

```text
draft
proposed
accepted
active
superseded
deprecated
rejected
archived
```

## Generated File Policy

Generated files must be reproducible, marked when practical, and documented in provenance records when practical.

Manual edits to generated files are forbidden unless the file explicitly allows it.

## Security Review Triggers

Security review is required for changes involving:

- authentication
- authorization
- cryptography
- secrets
- infrastructure
- dependency policy
- supply-chain metadata
- data classification
- audit logging
- personally identifiable information
- production deployment
