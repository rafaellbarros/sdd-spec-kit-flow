# Tasks: Quote Card

**Input**: Design documents from `/specs/001-quote-card/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED — the feature specification mandates automated tests on the service and container.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Angular application with feature-based folder structure
- Feature root: `src/app/quote-card/`
- Dumb components: `src/app/quote-card/ui/`
- Smart components: `src/app/quote-card/feature/`
- Services + models: `src/app/quote-card/data/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dev proxy configuration

- [x] T001 Configure dev proxy in `proxy.conf.json` to route `/api/quotes` → `https://zenquotes.io/api`
- [x] T002 [P] Add `proxy.conf.json` to serve options in `angular.json`
- [x] T003 [P] Add Outfit `font-family` to `src/styles.scss` on `body` selector

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Import `provideHttpClient()` in `src/app/app.config.ts`
- [x] T005 [P] Create `Quote` model and `ZenQuotesDTO` interface in `src/app/quote-card/data/quote.model.ts`
- [x] T006 Create `QuoteService` with `fetchRandomQuote(): Observable<Quote>` in `src/app/quote-card/data/quote.service.ts`
- [x] T007 Implement DTO-to-model mapping (`mapDto`) inside `QuoteService`
- [x] T008 Set up lazy-loaded route for `/home` and default redirect in `src/app/app.routes.ts`
- [x] T009 Create `QuoteContainer` smart component shell (ts/html/scss) in `src/app/quote-card/feature/`
- [x] T010 [P] Create `QuoteCard` dumb component shell (ts/html/scss) in `src/app/quote-card/ui/`

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Random Quote (Priority: P1) 🎯 MVP

**Goal**: On screen load, fetch and display a random quote with author, showing a visible loading state during fetch

**Independent Test**: Open the application and verify that a quote with author appears after loading completes

### Tests for User Story 1 (REQUIRED) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T011 [P] [US1] Test `QuoteService.fetchRandomQuote()` makes correct HTTP GET to `/api/quotes/random` and maps DTO to `Quote` in `src/app/quote-card/data/quote.service.spec.ts`
- [x] T012 [US1] Test `QuoteContainer` shows loading state on init and transitions to success with quote in `src/app/quote-card/feature/quote-container.component.spec.ts`

### Implementation for User Story 1

- [x] T013 [US1] Implement `QuoteService.fetchRandomQuote()` — HTTP GET + `mapDto` in `src/app/quote-card/data/quote.service.ts`
- [x] T014 [US1] Add Signals for `loading`, `quote`, `error` state in `QuoteContainer` in `src/app/quote-card/feature/quote-container.component.ts`
- [x] T015 [US1] Wire `ngOnInit` to call `QuoteService` and update signals (loading → success/error) in `src/app/quote-card/feature/quote-container.component.ts`
- [x] T016 [US1] Implement loading state template (textual indicator) in `src/app/quote-card/feature/quote-container.component.html`
- [x] T017 [US1] Implement `QuoteCard` dumb component with `input()` for quote text/author and `OnPush` in `src/app/quote-card/ui/quote-card.component.ts`
- [x] T018 [US1] Create `QuoteCard` template displaying quote text and author in `src/app/quote-card/ui/quote-card.component.html`
- [x] T019 [US1] Style `QuoteCard` per prototype (hierarchy, spacing) in `src/app/quote-card/ui/quote-card.component.scss`
- [x] T020 [US1] Embed `QuoteCard` in `QuoteContainer` success state template in `src/app/quote-card/feature/quote-container.component.html`
- [x] T021 [US1] Apply background image (`/background.jpg`) and centered layout in `src/app/quote-card/feature/quote-container.component.scss`

**Checkpoint**: At this point, User Story 1 should be fully functional — open app, see loading, then see quote + author

---

## Phase 4: User Story 2 - Refresh Quote (Priority: P2)

**Goal**: User clicks "Refresh" to fetch a new quote; button disabled during loading

**Independent Test**: Click the refresh button and verify a new quote appears after loading

### Tests for User Story 2 (REQUIRED) ⚠️

- [x] T022 [US2] Test `QuoteContainer` refresh triggers new fetch and updates quote in `src/app/quote-card/feature/quote-container.component.spec.ts`
- [x] T023 [US2] Test refresh button is disabled during loading in `src/app/quote-card/feature/quote-container.component.spec.ts`
- [x] T024 [US2] Add `refresh()` method to `QuoteContainer` that re-fetches and resets loading in `src/app/quote-card/feature/quote-container.component.ts`
- [x] T025 [US2] Add "Refresh" button to template, bound to `refresh()`, disabled when `loading()` is true in `src/app/quote-card/feature/quote-container.component.html`
- [x] T026 [US2] Add `refresh` output event to `QuoteCard` (or button styling) in `src/app/quote-card/ui/quote-card.component.ts`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Handle Errors Gracefully (Priority: P3)

**Goal**: On fetch failure, show clear error message; refresh button remains functional for retry

**Independent Test**: Simulate a network failure and verify error message appears and retry works

### Tests for User Story 3 (REQUIRED) ⚠️

- [x] T027 [P] [US3] Test `QuoteService` propagates HTTP errors as observable errors in `src/app/quote-card/data/quote.service.spec.ts`
- [x] T028 [US3] Test `QuoteContainer` shows error message on fetch failure and allows retry in `src/app/quote-card/feature/quote-container.component.spec.ts`
- [x] T029 [US3] Test that loading is set to false after both success and error (no infinite loading) in `src/app/quote-card/feature/quote-container.component.spec.ts`
- [x] T030 [US3] Add error signal and error handling in `QuoteContainer` `refresh()` / `ngOnInit` in `src/app/quote-card/feature/quote-container.component.ts`
- [x] T031 [US3] Add error message template (clear, actionable text) in `src/app/quote-card/feature/quote-container.component.html`
- [x] T032 [US3] Style error state (contrast, readable) in `src/app/quote-card/feature/quote-container.component.scss`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T033 [P] Verify keyboard navigation: refresh button focusable and activatable via Enter/Space
- [x] T034 [P] Verify loading/error states have sufficient color contrast per WCAG AA
- [x] T035 Run `ng test` and confirm all tests pass
- [x] T036 Run `ng build` and confirm production build succeeds
- [x] T037 Run `ng serve` and manually validate against prototype (`specs/prototypes/quote-card.png`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) — Builds on US1 components (QuoteContainer, QuoteCard already exist)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) — Builds on US1 components (error state added to existing flow)

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Models before services
- Services before components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- T001, T002, T003 can run in parallel (Setup phase)
- T005, T008, T009, T010 can run in parallel (Foundational phase — different files)
- T011 and T012 can run in parallel (US1 tests — different files)
- T017, T018, T019 can run in parallel (US1 QuoteCard — different files, no dependency on T014-T016)
- T022 and T023 can run in parallel (US2 tests — same file but different test cases)
- T027, T028, T029 can run in parallel (US3 tests — different files/cases)
- T033 and T034 can run in parallel (Polish — independent checks)

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Test QuoteService.fetchRandomQuote() in quote.service.spec.ts"
Task: "Test QuoteContainer loading→success in quote-container.component.spec.ts"

# Launch all QuoteCard files together (after service/container logic is done):
Task: "Create QuoteCard component ts"
Task: "Create QuoteCard template html"
Task: "Create QuoteCard styles scss"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP AND VALIDATE**: Open app, verify loading → quote + author
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2 (after US1 components exist)
   - Developer C: User Story 3 (after US1 components exist)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
