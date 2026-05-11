# GEMINI.md

## Project Overview

This repository is a **governance-first, plain, self-verifying monorepo foundation**. It is designed as a polyglot monorepo that treats the repository itself as a durable product, architecture, delivery, verification, and governance surface.

The foundation layer relies on plain Markdown documentation, repo-contract YAML files, workspace JSON files, Bash verification scripts, and GitHub Actions CI. It is built to be tool-neutral and compatible with future automation and AI control-plane systems.

### Core Principles
1. **Repository as Source of Truth:** Documentation, contracts, code, tests, operations, and security live together.
2. **Explicit Project Boundaries:** Every project must be declared and governed.
3. **Verifiable Conventions:** Important conventions are checked via verification scripts.
4. **AI Context Support:** Supported through plain canonical files in `docs/10-ai-context/`.
5. **Tool Neutrality:** Architecture layer does not depend on specific high-level tooling.

## Building and Running

### Verification
The primary way to verify the repository's integrity and adherence to governance rules:

```bash
# Using Bun
bun run verify

# Using Bash directly
bash tools/scripts/verify.sh
```

Sub-verification scripts are available in `tools/scripts/`:
- `verify-docs.sh`
- `verify-repo-contract.sh`
- `verify-workspace.sh`
- `verify-security-baseline.sh`
- `verify-scripts.sh`

### Doctor
To run repository health checks:

```bash
bash tools/scripts/doctor.sh
```

### Environment
The project uses `mise` (see `mise.toml`) to manage tool versions:
- **Bun:** latest
- **Node:** 20
- **Python:** 3
- **Go:** latest
- **Rust:** latest

## Development Conventions

### Workflows
- **Docs/Spec-Driven:** Work should start with documentation and specifications.
- **Conventional Commits:** Use standard prefixes (e.g., `docs(governance):`, `feat(cli):`, `fix(docs):`).
- **Small Atomic Changes:** Prefer incremental updates over large PRs.
- **Verification:** Always run verification scripts before pushing or committing.

### Documentation
- **Frontmatter:** Important Markdown files must include YAML frontmatter (title, description, status, version, owner, etc.).
- **Statuses:** Documents use specific statuses: `draft`, `proposed`, `accepted`, `active`, `superseded`, `deprecated`, `rejected`, `archived`.
- **ADRs:** Architecture decisions that affect durable repository direction must be captured as ADRs in `docs/04-decisions/`.

### AI Context
AI assistants should refer to `docs/10-ai-context/` for state and constraints:
- `BOOTSTRAP-PROMPT.md`: Starting prompt.
- `CURRENT-STATE.md`: Current focus and status.
- `ARCHITECTURE-CONSTRAINTS.md`: Rules to respect.
- `ACTIVE-WORK.md`: Current active tasks.

## Key Paths

| Path | Purpose |
|---|---|
| `docs/` | Product, architecture, decisions (ADRs), specs, delivery, operations, and AI context. |
| `governance/` | Repository constitution, policies, schemas, and repo-contract rules. |
| `workspace/` | Machine-readable workspace state (manifests, graphs). |
| `tools/` | Internal tooling (scripts, validators, generators). |
| `security/` | Security planning, dependency policy, and supply-chain metadata. |
| `contracts/` | API, event, and schema contract standards. |
| `apps/`, `services/`, `packages/` | Future homes for implementation projects. |
| `templates/`, `examples/`, `experiments/` | Scaffolding and non-production assets. |
