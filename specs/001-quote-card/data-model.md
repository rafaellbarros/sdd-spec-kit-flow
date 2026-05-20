# Data Model: Quote Card

## Entities

### Quote

Represents a single citation displayed to the user.

| Field | Type | Description |
|-------|------|-------------|
| `text` | `string` | The quote text body (required, non-empty) |
| `author` | `string` | The author name (required, non-empty) |

**Validation rules**:
- `text` must be a non-empty string (trim whitespace before display)
- `author` must be a non-empty string (trim whitespace before display)

### QuoteState

Represents the current UI state of the quote feature.

| Field | Type | Description |
|-------|------|-------------|
| `status` | `'loading' \| 'success' \| 'error'` | Current state of the quote fetch |
| `quote` | `Quote \| null` | The loaded quote (present only when status is `success`) |
| `error` | `string \| null` | Error message shown to user (present only when status is `error`) |

**State transitions**:
```
idle → loading → success (with quote)
                → error (with message)
error → loading → ... (retry cycle)
```

### ZenQuotes DTO

External API response shape from ZenQuotes (mapped to internal `Quote`).

| Field | Type | Description |
|-------|------|-------------|
| `q` | `string` | Quote text (maps to `Quote.text`) |
| `a` | `string` | Author name (maps to `Quote.author`) |

**Mapping**: `ZenQuotesDTO → Quote` via `QuoteService.mapDto(dto)`
