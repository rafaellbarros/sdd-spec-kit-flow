# Implementation Plan: Quote Card

**Branch**: `001-quote-card` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-quote-card/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Display a random quote (text + author) on screen load with a refresh button.
Architecture follows constitution: dumb `QuoteCard` component in `quote-card/ui`,
smart `QuoteContainer` in `quote-card/feature`, and `QuoteService` in `quote-card/data`.
State is explicit (loading/error/success) via Angular Signals. HTTP calls use RxJS.
Tests cover the service (HTTP mock) and container (state transitions).

## Technical Context

**Language/Version**: TypeScript 5.9, Angular 21.2

**Primary Dependencies**: Angular HttpClient, RxJS 7.8, Angular Signals

**Storage**: N/A (no persistence)

**Testing**: Vitest with jsdom (configured in project), Angular testing utilities

**Target Platform**: Modern web browser (Chrome, Firefox, Safari, Edge)

**Project Type**: Single-page web application (Angular CLI)

**Performance Goals**: Quote displayed within 3 seconds under normal network conditions (SC-001)

**Constraints**: No additional libraries beyond Angular ecosystem; CORS handled via dev proxy;
minimal scope — only what is needed for the card.

**Scale/Scope**: Single feature screen — no multi-screen or multi-module complexity.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| I. Standalone Component Architecture | Components standalone, split files, no inline, no direct HTTP | PASS |
| II. Smart/Dumb Separation | `QuoteCard` (dumb) in `ui/`, `QuoteContainer` (smart) in `feature/` | PASS |
| III. Explicit State & Reactivity | Signals for state, RxJS for HTTP, no hidden effects | PASS |
| IV. Quality & Verifiability | Tests for service + container, CI headless | PASS |
| V. Accessibility & UX | Loading/error textual, clear messages, button disabled state | PASS |
| Asset & Style Management | Outfit global, existing background only, no new assets | PASS |
| Scope & Maintenance | Plan updated with technical decisions, spec unchanged | PASS |

## Project Structure

### Documentation (this feature)

```text
specs/001-quote-card/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── quote-card/
│       ├── data/
│       │   ├── quote.service.ts
│       │   ├── quote.service.spec.ts
│       │   └── quote.model.ts
│       ├── feature/
│       │   ├── quote-container.component.ts
│       │   ├── quote-container.component.html
│       │   ├── quote-container.component.scss
│       │   └── quote-container.component.spec.ts
│       └── ui/
│           ├── quote-card.component.ts
│           ├── quote-card.component.html
│           └── quote-card.component.scss
├── index.html            # Outfit font configured here
├── styles.scss           # Global styles
└── main.ts

public/
├── background.jpg        # Existing background image (reuse)
└── favicon.ico
```

**Structure Decision**: Single Angular application with feature-based folder structure
following constitution conventions: `<feature>/ui` (dumb), `<feature>/feature` (smart),
`<feature>/data` (services + models). Lazy-loaded route at `/home` with default redirect.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations — all constitution gates pass.
