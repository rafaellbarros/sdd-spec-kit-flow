# Quickstart: Quote Card

## Prerequisites

- Node.js 18+ and npm installed
- Angular CLI 21.2+ (`npm install -g @angular/cli`)
- Project dependencies installed (`npm install`)

## Run the application

```bash
ng serve
```

Open `http://localhost:4200` — the default route redirects to `/home` and displays a random quote.

## Development proxy

The dev server proxies `/api/quotes/*` to `https://zenquotes.io/api/*` to avoid CORS.
If you need to adjust proxy settings, edit `proxy.conf.json` in the project root.

## Run tests

```bash
ng test
```

Tests cover:
- `QuoteService`: HTTP mock verifies correct API call and DTO mapping
- `QuoteContainer`: loading → success, loading → error, retry after error, button disabled during loading

## Build for production

```bash
ng build
```

Artifacts are written to `dist/`.

## Key files

| File | Purpose |
|------|---------|
| `src/app/quote-card/data/quote.service.ts` | HTTP call + DTO mapping |
| `src/app/quote-card/feature/quote-container.component.*` | Smart component (state, logic) |
| `src/app/quote-card/ui/quote-card.component.*` | Dumb component (presentation) |
| `src/app/app.routes.ts` | Lazy-loaded route at `/home` + default redirect |
| `src/styles.scss` | Global Outfit font + base styles |
