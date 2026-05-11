# bootstrap-monorepo

This repository is a governance-first, plain, self-verifying monorepo foundation.

It is designed to work today with ordinary files, Git, Bash, Python 3, Bun, Markdown, manifests, schemas, and CI. It is also intentionally shaped so that future control-plane systems can adopt it later without restructuring the repository.

## What This Repository Is

This repository is intended to become a polyglot monorepo that treats the repo itself as a durable product, architecture, delivery, verification, and governance surface.

Core principles:

1. The repository is the source of truth.
2. Documentation, contracts, code, tests, operations, and security live together.
3. Project boundaries are explicit.
4. Every project must be declared.
5. Every important convention should be verifiable.
6. AI context is supported through plain canonical files, not through a required runtime.
7. Future automation may consume the repo, but the repo must remain useful without it.

## Current Maturity Layer

This repository starts at the plain foundation layer:

- plain Markdown documentation
- repo-contract YAML files
- workspace JSON files
- Bash verification scripts
- GitHub Actions CI
- optional Bun command wrappers
- optional moon configuration placeholder
- no dependency on unfinished control-plane systems

## Important Paths

| Path | Purpose |
|---|---|
| `docs/` | Product, architecture, decisions, specs, delivery, operations, and AI context |
| `governance/` | Repository constitution, policies, schemas, standards, and repo-contract rules |
| `workspace/` | Machine-readable current workspace state |
| `tools/scripts/` | Plain verification and doctor scripts |
| `security/` | Security, dependency, supply-chain, SBOM, and review planning |
| `contracts/` | API, event, schema, and error-contract standards |
| `apps/` | Future deployable applications |
| `services/` | Future backend services, workers, gateways, and daemons |
| `packages/` | Future shared libraries and SDKs |
| `templates/` | Future generator templates |
| `examples/` | Non-production examples |
| `experiments/` | Time-boxed prototypes and experiments |

## Verify

With Bun:

```bash
bun run verify
```

Without Bun:

```bash
bash tools/scripts/verify.sh
```

## Doctor

```bash
bash tools/scripts/doctor.sh
```

## First Recommended Commit

```text
docs(governance): bootstrap self-governing monorepo foundation
```
