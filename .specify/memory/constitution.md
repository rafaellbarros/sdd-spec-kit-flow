# Fluxo de Trabalho - Angular Constitution

## Core Principles

### I. Component-Based Architecture (MUST)
All UI logic MUST be encapsulated in reusable, self-contained components following Angular component lifecycle; Components must have single responsibility with clear input/output contracts via @Input() and @Output(); Templates should remain thin with logic delegated to components or services; Avoid over-engineering - keep components simple and focused on their domain

### II. Service Layer & Dependency Injection (MUST)
All business logic MUST be extracted into injectable services following Angular dependency injection patterns; Services must be stateless where possible, using providedIn: 'root' for singleton access; HTTP communication MUST go through dedicated API services with interceptors for cross-cutting concerns (auth, logging, error handling); Services should follow SOLID principles and remain testable in isolation

### III. Reactive State Management (MUST)
Complex application state MUST be managed through NgRx store following strict unidirectional data flow; Actions must represent discrete events with clear payloads; Reducers must be pure functions with no side effects; Effects handle asynchronous operations and dispatch resulting actions; Selectors provide memoized state access preventing unnecessary re-renders

### IV. Test-First Development (NON-NEGOTIABLE)
Unit tests MUST be written before implementation following Red-Green-Refactor cycle; All services, components, and pipes require comprehensive unit test coverage; Integration tests verify service interactions and store behavior; E2E tests validate critical user workflows end-to-end

### V. Accessibility & Performance by Default (MUST)
All UI components MUST meet WCAG 2.1 AA accessibility standards including keyboard navigation, ARIA attributes, and screen reader compatibility; Component change detection strategies (OnPush) MUST be used where applicable for performance; Lazy loading of feature modules is mandatory to optimize bundle size; Assets optimization via Angular Image Loader and lazy resource loading

### VI. Documentation & Knowledge Sharing (MUST)
All public APIs and components must include comprehensive documentation; Architecture decisions require ADR documentation; Code reviews must verify documentation completeness; Team knowledge base must be maintained and updated regularly

## Development Standards

### TypeScript Strict Mode
All code MUST compile with strict mode enabled including strictNullChecks, noImplicitAny, and strictFunctionTypes; Type definitions must be explicit - avoid 'any' type usage; Interfaces should describe public APIs while types handle internal contracts

### Code Organization & Structure
Feature modules MUST encapsulate related components, services, and routes within domain boundaries; Shared libraries for cross-feature utilities following Angular library conventions; Styles follow component-scoped approach with CSS-in-JS or Angular's native styling

### Quality Gates
Linting with Angular ESLint rules MUST pass before commit; Type checking via 'ng build --configuration production' must succeed without errors; All public APIs require JSDoc documentation comments

## Governance

This constitution supersedes all other development practices within the project. Amendments require:
1. Documentation of changes with rationale
2. Approval from project stakeholders
3. Migration plan for breaking changes

All code reviews MUST verify compliance with these principles. Complexity must be justified - prefer simplicity and readability over clever solutions. Use this document alongside runtime guidance files during implementation.

**Version**: 1.0.0 | **Ratified**: 2026-05-20 | **Last Amended**: 2026-05-20
