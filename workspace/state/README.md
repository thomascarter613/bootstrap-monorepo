---
title: Workspace State
description: Explains the purpose of workspace state files.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - workspace
  - state
---

# Workspace State

This directory stores machine-readable current state for the repository.

Rules:

1. Governance rules live in `governance/`.
2. Current state lives in `workspace/`.
3. Generated state should be reproducible where practical.
4. Future control-plane systems may consume these files.
