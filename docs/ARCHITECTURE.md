# Architecture Documentation

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **SWR** - Data fetching and caching

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js v5** - Authentication
- **Prisma** - ORM and database toolkit
- **Zod** - Schema validation
- **bcryptjs** - Password hashing

### Database
- **PostgreSQL** - Primary database
- Compatible with: Neon, Supabase, Railway, PlanetScale (MySQL)

---

## Project Structure

```
m4capital/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth route group
│   │   │   └── login/           # Login page
│   │   ├── api/                 # API routes
│   │   │   ├── auth/            # NextAuth endpoints
│   │   │   ├── portfolio/       # Portfolio data
│   │   │   ├── transactions/    # Transaction endpoints
│   │   │   └── admin/           # Admin endpoints
│   │   ├── dashboard/           # Dashboard page
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── providers.tsx        # Client providers
│   │   ├── sitemap.ts           # Dynamic sitemap
│   │   └── opengraph-image.tsx  # OG image generation
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # UI primitives
│   │   ├── AnimatedBackground.tsx
│   │   ├── HeroSlider.tsx
│   │   ├── NavBar.tsx
│   │   ├── Footer.tsx
│   │   ├── PortfolioSummary.tsx
│   │   ├── TransactionsTable.tsx
│   │   └── UpdateBalanceForm.tsx
│   │
│   ├── lib/                     # Utilities and helpers
│   │   ├── auth.ts              # NextAuth configuration
│   │   ├── prisma.ts            # Prisma client singleton
│   │   ├── validators.ts        # Zod schemas
│   │   └── errors.ts            # Error handling
│   │
│   ├── middleware.ts            # Next.js middleware
│   └── styles/
│       └── globals.css          # Global styles
│
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Seed script
│
├── docs/                        # Documentation
├── scripts/                     # Setup scripts
└── public/                      # Static assets
```

---

## Database Schema

### User
```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  name         String?
  passwordHash String
  role         Role     @default(USER)
  balances     AssetBalance[]
  transactions Transaction[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### AssetBalance
```prisma
model AssetBalance {
  id        String   @id @default(cuid())
  userId    String
  asset     String
  amount    Decimal  @default(0) @db.Decimal(18,8)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([userId, asset])
}
```

### Transaction
```prisma
model Transaction {
  id        String            @id @default(cuid())
  userId    String
  asset     String
  amount    Decimal           @db.Decimal(18,8)
  type      TransactionType
  status    TransactionStatus @default(PENDING)
  meta      Json?
  user      User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime          @default(now())
  updatedAt DateTime          @updatedAt
}
```

---

## Authentication Flow

### Login Process
1. User submits credentials via `/login`
2. Server action calls `signIn("credentials", {...})`
3. NextAuth validates via `authorize` callback
4. User looked up in database
5. Password verified with bcrypt
6. JWT token created with user data
7. Session cookie set
8. User redirected to `/dashboard`

### Protected Routes
- Middleware checks authentication for protected paths
- Uses `auth()` from NextAuth
- Redirects to `/login` if not authenticated

### Role-Based Access
- `USER` - Standard user access
- `ADMIN` - Administrative privileges
- Admin endpoints check `session.user.role === 'ADMIN'`

---

## API Architecture

### Route Handlers
All API routes use Next.js Route Handlers (App Router):
- Located in `src/app/api/`
- Export named functions: `GET`, `POST`, `PUT`, `DELETE`
- Use `export const dynamic = 'force-dynamic'` for runtime

### Error Handling
Centralized error handling via `handleApiError`:
```typescript
try {
  // Route logic
} catch (e) {
  return handleApiError(e);
}
```

### Validation
All inputs validated with Zod schemas:
```typescript
const parsed = schema.safeParse(body);
if (!parsed.success) throw new AppError('Invalid payload');
```

---

## State Management

### Server State
- **SWR** for data fetching
- Automatic revalidation
- Optimistic updates
- Error retry logic

### Client State
- React hooks (useState, useEffect)
- Framer Motion for animation state
- No global state manager needed (keep it simple)

---

## Security Measures

### Authentication
- bcrypt password hashing
- Secure session cookies
- CSRF protection via NextAuth

### Database
- Parameterized queries (Prisma)
- Row-level validation
- Foreign key constraints
- Cascade deletes for data integrity

### API
- Input validation (Zod)
- Type safety (TypeScript)
- Error sanitization
- Role-based access control

### Environment
- Secrets in environment variables
- No hardcoded credentials
- `.env.local` excluded from git

---

## Performance Optimizations

### Next.js
- Static page generation where possible
- Image optimization (next/image)
- Font optimization (next/font)
- Code splitting (automatic)

### Database
- Indexed fields (email, userId+asset)
- Decimal type for precise financial calculations
- Connection pooling (Prisma)

### Caching
- SWR client-side cache
- Revalidation on interval
- Stale-while-revalidate pattern

---

## Future Enhancements

### Planned Features
- Real-time price feeds
- Order management system
- Advanced charting
- WebSocket connections
- Push notifications
- Two-factor authentication
- API rate limiting
- Advanced analytics

### Scalability Considerations
- Redis for caching
- Message queue for async jobs
- Database read replicas
- CDN for static assets
- Horizontal scaling with containers
