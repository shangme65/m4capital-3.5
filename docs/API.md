# API Documentation

## Authentication

All protected endpoints require authentication via NextAuth session.

## Endpoints

### Portfolio

#### GET /api/portfolio

Get user's portfolio balances and aggregates.

**Authentication:** Required

**Response:**

```json
{
  "balances": [
    {
      "id": "string",
      "userId": "string",
      "asset": "string",
      "amount": "number"
    }
  ],
  "aggregates": {
    "totalUSD": "number"
  }
}
```

**Status Codes:**

- `200` - Success
- `401` - Unauthorized
- `404` - User not found

---

### Transactions

#### POST /api/transactions/deposit

Create a deposit transaction.

**Authentication:** Required

**Request Body:**

```json
{
  "asset": "string",
  "amount": "number"
}
```

**Response:**

```json
{
  "transaction": {
    "id": "string",
    "userId": "string",
    "asset": "string",
    "amount": "number",
    "type": "DEPOSIT",
    "status": "COMPLETED",
    "createdAt": "datetime"
  }
}
```

**Status Codes:**

- `200` - Success
- `400` - Invalid payload
- `401` - Unauthorized

---

#### POST /api/transactions/withdraw

Create a withdrawal transaction.

**Authentication:** Required

**Request Body:**

```json
{
  "asset": "string",
  "amount": "number"
}
```

**Response:**

```json
{
  "transaction": {
    "id": "string",
    "userId": "string",
    "asset": "string",
    "amount": "number",
    "type": "WITHDRAWAL",
    "status": "COMPLETED",
    "createdAt": "datetime"
  }
}
```

**Status Codes:**

- `200` - Success
- `400` - Invalid payload or insufficient balance
- `401` - Unauthorized

---

#### GET /api/transactions/history

Get user's transaction history.

**Authentication:** Required

**Response:**

```json
{
  "transactions": [
    {
      "id": "string",
      "userId": "string",
      "asset": "string",
      "amount": "number",
      "type": "DEPOSIT | WITHDRAWAL | ADJUSTMENT",
      "status": "PENDING | COMPLETED | FAILED",
      "createdAt": "datetime",
      "meta": "object | null"
    }
  ]
}
```

**Status Codes:**

- `200` - Success
- `401` - Unauthorized

---

### Admin

#### POST /api/admin/manual-update

Manually adjust user balance (Admin only).

**Authentication:** Required (Admin role)

**Request Body:**

```json
{
  "userId": "string",
  "asset": "string",
  "delta": "number",
  "reason": "string"
}
```

**Response:**

```json
{
  "balance": {
    "userId": "string",
    "asset": "string",
    "amount": "number"
  },
  "transaction": {
    "id": "string",
    "type": "ADJUSTMENT",
    "amount": "number"
  }
}
```

**Status Codes:**

- `200` - Success
- `400` - Invalid payload
- `401` - Unauthorized
- `403` - Forbidden (not admin)

---

## Error Response Format

All errors follow this format:

```json
{
  "error": "Error message",
  "details": "Additional details (optional)"
}
```

## Rate Limiting

Currently not implemented. Plan to add rate limiting middleware in future updates.

## Authentication Flow

1. User logs in via `/login`
2. NextAuth creates session cookie
3. Protected API routes check session via `auth()` function
4. Session includes user ID and role
