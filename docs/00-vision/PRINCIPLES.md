---
title: Principles
description: Defines the operating principles for the monorepo foundation.
status: active
version: 0.1.0
owner: architecture
created: 2026-05-10
updated: 2026-05-10
tags:
  - principles
  - architecture
  - governance
---

# Principles

## 1. The Repository Is the Source of Truth

Product, architecture, decisions, contracts, security, operations, and code should live together.

## 2. Rules Before Automation

The repository should define its rules before requiring advanced tooling.

## 3. Plain Foundation First

The foundation should work with Git, Markdown, Bash, Python 3, JSON, YAML, and CI.

## 4. Tools Are Adapters

No external tool owns the repository architecture.

## 5. Every Project Is Declared

Project directories must not exist as invisible or unmanaged workspaces.

## 6. Boundaries Are Explicit

Applications, services, packages, contracts, infra, data, and docs have different responsibilities.

## 7. Documentation Has Lifecycle

Docs must state whether they are draft, proposed, accepted, active, superseded, deprecated, rejected, or archived.

## 8. Verification Beats Convention

Important conventions should be checked by scripts or CI.

## 9. Generated Work Needs Provenance

Generated files should be reproducible and traceable where practical.

## 10. AI Context Is Derived

AI context files summarize canonical repository state. They are not a second source of truth.
