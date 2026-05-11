---
workPacket: WP-0014
title: Self-Healing Verification
description: Integrates repository verification scripts into the AI SDLC, allowing the AI to detect and help fix governance issues.
status: draft
owner: delivery
created: 2026-05-10
updated: 2026-05-10
tags:
  - work-packet
  - verification
  - self-healing
  - ai
---

# WP-0014: Self-Healing Verification

## Goal

Enable the AI Orchestrator to verify the repository state against governance rules using existing scripts and assist the user in "healing" any detected violations.

## Scope

Includes:
- **Phase Integration:** Formalize the `verification` phase in the SDLC.
- **Verification Prompts:** Socratic prompts focused on debugging, repo health, and governance alignment.
- **Verification Engine:** Specialized engine that consumes shell command output (from `verify.sh`).
- **Command Execution Logic:** Safe execution of `tools/scripts/verify-*.sh` from within the tool.
- **Healing Loop:** AI interprets verification errors and proposes specific content fixes or new files.

## Non-Goals

Excludes:
- Running destructive shell commands (rm -rf, etc.) without explicit confirmation.
- Fixing complex code bugs automatically (focus is on governance/docs first).

## Tasks

1.  **Define Verification Prompts:**
    - Create `src/lib/phases/verification-prompts.ts` with the "Governance Inspector" system prompt.
2.  **Implement Command Runner:**
    - Add a utility to `src/lib/utils/shell.ts` to run local scripts and capture stdout/stderr/exit-code.
3.  **Implement Verification Engine:**
    - Create `src/lib/phases/verification-engine.ts`.
    - Add logic to provide verification failures to the LLM as context.
4.  **Update CLI for Verification Phase:**
    - Insert the `verification` phase after `implementation`.
    - Update the transition logic in `src/index.ts`.
5.  **Healing Implementation:**
    - Add logic to the CLI to allow the user to say "Fix it" and have the AI generate the corrected content.

## Acceptance Criteria

- The tool can run `bash tools/scripts/verify-docs.sh` and capture its output.
- If a verification script fails (e.g., missing YAML frontmatter), the AI identifies the specific file and rule violation.
- The AI proposes a corrected version of the file or a new file to satisfy the governance rule.
- Upon user approval, the tool applies the "healing" fix and re-runs the verification.

## Verification

```bash
# 1. Intentionally break a doc (e.g. remove frontmatter)
# 2. Run aic init
# 3. Reach Verification phase
# 4. Verify AI detects the break and offers to fix it.
```

## Recommended Commit

```text
feat(aic-orchestrator): implement verification phase and self-healing logic
```
