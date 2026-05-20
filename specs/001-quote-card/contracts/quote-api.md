# Contract: Quote API

## External API Contract

### GET /api/quotes/random

Fetches a single random quote from the ZenQuotes API (proxied through Angular dev server).

**Request**:
- Method: `GET`
- Headers: None required
- Query params: None

**Response (200)**:
```json
[
  {
    "q": "The only way to do great work is to love what you do.",
    "a": "Steve Jobs"
  }
]
```

**Response fields**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `q` | `string` | Yes | Quote text |
| `a` | `string` | Yes | Author name |

**Error responses**:
| Status | Description |
|--------|-------------|
| 4xx/5xx | Network or server error — mapped to `QuoteState.error` |

**Notes**:
- API returns an array with a single object; extract `[0]` before mapping
- During development, requests to `/api/quotes/random` are proxied to `https://zenquotes.io/api/random`
- No authentication required

## Internal Contract: QuoteService

```typescript
interface QuoteService {
  fetchRandomQuote(): Observable<Quote>;
}
```

- `fetchRandomQuote()` returns an `Observable` that emits a `Quote` on success or errors on failure
- The caller (container) is responsible for managing loading/error state via Signals
