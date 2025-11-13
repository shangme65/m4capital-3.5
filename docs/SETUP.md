# Setup Guide

## Prerequisites

- Node.js 18+ or 20+
- PostgreSQL database (or Neon, Supabase, etc.)
- Git

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/shangme65/m4capital-3.5.git
cd m4capital-3.5
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_URL` - Your application URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Generate using: `openssl rand -base64 48`
- `SEED_ADMIN_EMAIL` - Admin user email
- `SEED_ADMIN_PASSWORD` - Admin user password

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup

```bash
# Run migrations
npx prisma migrate dev --name init

# Seed the database
npm run seed

# (Optional) Open Prisma Studio
npx prisma studio
```

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

### 6. Build for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable              | Description                     | Required |
| --------------------- | ------------------------------- | -------- |
| `DATABASE_URL`        | PostgreSQL connection string    | Yes      |
| `NEXTAUTH_URL`        | Application base URL            | Yes      |
| `NEXTAUTH_SECRET`     | Secret for NextAuth sessions    | Yes      |
| `SEED_ADMIN_EMAIL`    | Admin user email for seeding    | No       |
| `SEED_ADMIN_PASSWORD` | Admin user password for seeding | No       |

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` format: `postgresql://user:password@host:port/database`
- Ensure PostgreSQL is running
- Check firewall settings

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Regenerate Prisma client: `npx prisma generate`
- Clear node_modules: `rm -rf node_modules && npm install`

### Authentication Issues

- Regenerate `NEXTAUTH_SECRET`
- Clear browser cookies
- Check environment variables are loaded
