<!--
SYNC IMPACT REPORT
==================
Version change: N/A → 1.0.0 (initial constitution)
Bump rationale: First version — establishes baseline governance for Angular project.

Modified principles: N/A (new document)

Added sections:
- I. Standalone Component Architecture
- II. Smart/Dumb Component Separation
- III. Explicit State & Reactivity
- IV. Quality & Verifiability
- V. Accessibility & UX
- Asset & Style Management
- Scope & Maintenance Governance

Removed sections: N/A

Templates requiring updates:
- .specify/templates/plan-template.md: ⚠ pending (Constitution Check section uses generic placeholder)
- .specify/templates/spec-template.md: ✅ aligned (no constitution-specific sections required)
- .specify/templates/tasks-template.md: ⚠ pending (task path conventions assume generic single-project layout)

Follow-up TODOs:
- TODO(RATIFICATION_DATE): Original adoption date unknown; set when team formally ratifies.
-->

# SddSpecKitFlow Constitution

## Core Principles

### I. Standalone Component Architecture

All components are standalone by default (omit explicit `standalone: true`).
Component files MUST be split across `.ts`, `.css`, and `.html` — inline templates or styles are prohibited.
Components MUST NOT perform direct HTTP calls; external access belongs in services.
Services and data models MUST reside in `<feature>/data`.

Rationale: Standalone components reduce NgModule boilerplate and improve tree-shaking.
Separate files enforce readability and simplify code review.

### II. Smart/Dumb Component Separation

Presentational (dumb) components MUST:
- Receive data exclusively via `input()` and emit events via `output()`.
- Use `OnPush` change detection.
- Contain zero business logic and no external dependencies (no services, no state injection).
- Reside in `<feature>/ui`.

Container (smart) components MUST:
- Inject services via `inject()` and own state, effects, and business logic.
- Reside in `<feature>/feature`.

Rationale: Separating UI from orchestration makes components independently testable,
reusable, and easier to reason about.

### III. Explicit State & Reactivity

State MUST be explicit and simple — loading, error, and success states are always visible.
Prioritize Angular Signals for synchronous state; use RxJS for asynchronous streams
(HTTP calls, timers, event streams).
Avoid complex or hidden effect chains — effects MUST have a clear, traceable purpose.

Rationale: Explicit state prevents subtle bugs and makes component behavior predictable.
Signals + RxJS together cover the full reactivity spectrum without over-engineering.

### IV. Quality & Verifiability

Every feature with data logic MUST include minimum tests covering services and smart components.
Bug fixes MUST include a regression test — the test MUST fail first, then pass.
CI MUST run tests in headless mode and fail the pipeline on any test failure.

Rationale: Tests are the safety net that enables confident refactoring and deployment.
Regression tests prevent recurring defects.

### V. Accessibility & UX

Loading and error states MUST be visible and textual (not just spinners or colors).
Error messages MUST be clear and actionable — tell the user what went wrong and what to do.
Buttons and interactive elements MUST have clear text labels, sufficient contrast,
and functional keyboard navigation with visible focus indicators.

Rationale: Accessibility is not optional — it ensures the application works for all users
and meets legal and ethical standards.

## Asset & Style Management

Public assets MUST reside in `/public`.
Typography and global styles MUST be defined in a single location (index.html or global styles file).
No additional fonts or global styles may be added without explicit approval.

Rationale: Centralized asset and style management prevents duplication, inconsistency,
and style collisions across the application.

## Scope & Maintenance

When behavior changes, the corresponding feature spec/plan MUST be updated.
When only implementation changes (no behavior change), keep the spec intact but update the plan if needed.
Pull requests MUST be small, traceable, and include a validation checklist
covering test pass, build success, and run verification.

Rationale: Keeping specs and plans in sync with code prevents drift and ensures
documentation remains a reliable source of truth. Small PRs are easier to review
and less likely to introduce regressions.

## Governance

This constitution supersedes all other development practices within the project.
All pull requests and code reviews MUST verify compliance with these principles.
Any deviation MUST be documented with justification in the PR description.
Amendments to this constitution require a version bump (semantic versioning),
a changelog entry, and team acknowledgment.

Versioning policy:
- MAJOR: Backward-incompatible principle removals or redefinitions.
- MINOR: New principles or sections added, material expansions to existing guidance.
- PATCH: Clarifications, wording improvements, typo fixes, non-semantic refinements.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE) | **Last Amended**: 2026-05-20
