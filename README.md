## Setup

1. Install dependencies:
```bash
bun install
```

2. Configure backend URL in `.env`:
```
VITE_API_URL=http://localhost:8080/
```

3. Start development server:
```bash
bun run dev
```

## Build

```bash
bun run build
```

## API Specification

### Base URL
```
VITE_API_URL (e.g., http://localhost:8080)
```

### Endpoints

| Endpoint | Method | Parameter Type | Request | Response |
|----------|--------|----------------|---------|----------|
| `/message` | GET | - | - | `Message[]` |
| `/user/add` | POST | Body | `{ username: string }` | `string` (userID) |
| `/message/send` | POST | Body | `{ userID: string, userName: string, message: string }` | `boolean` |
| `/message/{userID}/{messageID}` | DELETE | Path | - | `boolean` |
| `/message/search` | GET | Query | `?filter=<keyword>` | `Message[]` |
| `/message/edit` | PUT | Body | `{ userID: string, messageID: string, newMessage: string }` | `boolean` |

### Data Types

**User**
```typescript
{
  userID: string
  username: string
}
```

**Message**
```typescript
{
  messageID: string
  user: User
  message: string
  deleted?: boolean
}
```

