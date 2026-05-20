# Research: Quote Card

## Decisions

### Quote API Source

**Decision**: Use ZenQuotes API (`https://zenquotes.io/api/random`) as the quote data source.

**Rationale**: ZenQuotes provides a free, no-authentication-required endpoint that returns
random quotes with text and author fields. It is well-known, stable, and requires no API key.

**Alternatives considered**:
- Local static JSON file — simpler but no variety on refresh
- Quotable API (`https://api.quotable.io/random`) — service has been unreliable
- Custom backend — out of scope for this feature

### CORS Handling

**Decision**: Use Angular dev server proxy (`proxy.conf.json`) during development to avoid CORS issues.

**Rationale**: ZenQuotes API does not send CORS headers for browser requests. A dev proxy
routes `/api/quotes` to `https://zenquotes.io/api` through the Angular dev server,
eliminating CORS without requiring backend changes.

**Alternatives considered**:
- Browser extension to disable CORS — not practical for team development
- JSONP — Angular supports it but ZenQuotes doesn't return JSONP callbacks
- Custom proxy server — overkill for a dev-only concern

### State Management Pattern

**Decision**: Use Angular Signals for component state (`loading`, `quote`, `error`) with
RxJS `HttpClient` for the HTTP call. The service exposes a method returning `Observable<Quote>`,
and the container subscribes via `effect()` or manual subscription to update signals.

**Rationale**: Matches constitution Principle III — Signals for synchronous state, RxJS for
async streams. Simple, explicit, and testable.

**Alternatives considered**:
- NgRx/ComponentStore — overkill for a single-feature state machine
- BehaviorSubject-based service state — adds indirection without benefit for this scope

### Routing Strategy

**Decision**: Lazy-load the `QuoteContainer` at route `/home`. Default route (`''`) redirects to `/home`.

**Rationale**: Constitution-compliant lazy loading keeps the initial bundle small.
Default redirect ensures users land on the quote screen immediately.

### Font Configuration

**Decision**: Apply Outfit font-family globally via `src/index.html` (Google Fonts link)
and `src/styles.scss` (body font-family).

**Rationale**: Constitution Asset & Style Management section requires global typography
defined in a single location. `index.html` + `styles.scss` is the canonical Angular approach.

### Background Image

**Decision**: Use existing `public/background.jpg` — no new assets created.

**Rationale**: Constitution explicitly forbids adding new background assets.
The existing image is applied via CSS on the container layout.
