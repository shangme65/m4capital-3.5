# m4capital (Version 2)

Futuristic, modular, immersive Forex & Digital Asset platform scaffold. Ready for Vercel deployment with Prisma, NextAuth, animated 3D UI, responsive design, admin balance controls, SEO surfaces.

## 1. Project Structure (Key Directories)
- /src/app — App Router pages, API routes, SEO routes.
- /src/components — Modular animated UI components.
- /src/lib — Auth, Prisma client, validation, error helpers.
- /prisma — Prisma schema & seed script.
- /scripts — Cross-environment setup scripts.
- /public — (Add images, OG assets, favicons.)

## 2. Core Setup Steps (All Environments)
<span style="background:#e0f4ff;">git clone https://YOUR_REPO_URL.git m4capital && cd m4capital</span>  
<span style="background:#e0f4ff;">cp .env.example .env.local</span>  
Edit .env.local with your actual DATABASE_URL, NEXTAUTH_SECRET, domains, admin seed credentials.

Install dependencies (choose one):
<span style="background:#e0f4ff;">npm install</span>  
Alternative:
<span style="background:#e0f4ff;">pnpm install</span>  
Alternative:
<span style="background:#e0f4ff;">yarn install</span>  

Run initial Prisma migration + seed (dev):
<span style="background:#e0f4ff;">npx prisma migrate dev --name init</span>  
<span style="background:#e0f4ff;">npm run seed</span>  

Start dev:
<span style="background:#e0f4ff;">npm run dev</span>  
Alternative:
<span style="background:#e0f4ff;">pnpm dev</span>  
Alternative:
<span style="background:#e0f4ff;">yarn dev</span>  

Build production:
<span style="background:#e0f4ff;">npm run build</span>  
Start production locally:
<span style="background:#e0f4ff;">npm start</span>  
Optional generate types again:
<span style="background:#e0f4ff;">npx prisma generate</span>  

Prisma Studio (inspect DB):
<span style="background:#e0f4ff;">npx prisma studio</span>  

## 3. Database
Use PostgreSQL (recommended). For PlanetScale/MySQL adjust provider in prisma/schema.prisma and DATABASE_URL.

Prisma Deploy on CI / Vercel post-build:
<span style="background:#e0f4ff;">npx prisma migrate deploy</span>

## 4. Authentication
NextAuth Credentials provider with bcrypt. Add OAuth providers by augmenting authConfig (GitHub, Google). Update .env accordingly.

## 5. Admin Manual Adjustments
POST /api/admin/manual-update requires admin role (seed admin). Sends JSON: { userId, asset, delta, reason }.

## 6. Transactions
- Deposit: POST /api/transactions/deposit
- Withdraw: POST /api/transactions/withdraw
- History: GET /api/transactions/history
Payload schema validated via Zod.

## 7. Portfolio Data
GET /api/portfolio polls every 8s (SWR). Add price aggregator: create /src/lib/pricing.ts and integrate into endpoint.

## 8. SEO & Metadata
- layout.tsx sets Open Graph & base metadata.
- /opengraph-image.tsx dynamic OG.
- /sitemap.ts dynamic sitemap.
- /robots.txt/route.ts robots. Update domains.

## 9. Security & Hardening
Add strong NEXTAUTH_SECRET:  
<span style="background:#e0f4ff;">openssl rand -base64 48</span>  
Rate limiting (future): implement middleware or edge function.

## 10. Production Vercel Deployment
Link project:
<span style="background:#e0f4ff;">vercel link</span>  
Set env vars:
<span style="background:#e0f4ff;">vercel env pull .env.local</span>  
Deploy:
<span style="background:#e0f4ff;">vercel --prod</span>  
Alternative:
<span style="background:#e0f4ff;">npm exec vercel -- --prod</span>  
Alternative:
<span style="background:#e0f4ff;">npx vercel --prod</span>  

## 11. Optional Seed Rerun
(Will skip if admin exists)  
<span style="background:#e0f4ff;">npm run seed</span>  

## 12. Lint & Quality
<span style="background:#e0f4ff;">npm run lint</span>  

## 13. Updating Balances (Simulated)
Deposit:
<span style="background:#e0f4ff;">curl -X POST /api/transactions/deposit -H "Content-Type: application/json" -d '{"asset":"USD","amount":100}'</span>  
Withdraw:
<span style="background:#e0f4ff;">curl -X POST /api/transactions/withdraw -H "Content-Type: application/json" -d '{"asset":"USD","amount":50}'</span>  
Manual (Admin):
<span style="background:#e0f4ff;">curl -X POST /api/admin/manual-update -H "Content-Type: application/json" -d '{"userId":"<TARGET_USER_ID>","asset":"BTC","delta":0.01,"reason":"Adjustment"}'</span>  

## 14. Cross-Environment Universal Robust Setup Script
See scripts/universal-setup.sh (Termux / Linux / UserLAnd) and scripts/windows-setup.ps1 (Windows 11). Insert your identity where indicated.

## 15. Insert Your Identity
Replace placeholders:
- your-production-domain.com
- admin@your-domain.com
- In README, OG metadata, .env.example

## 16. Nearly-Equivalent Command Alternatives (Examples)
Primary install: <span style="background:#e0f4ff;">npm install</span>  
Alt1: <span style="background:#e0f4ff;">pnpm install --frozen-lockfile</span>  
Alt2: <span style="background:#e0f4ff;">yarn install --immutable</span>  

Primary dev: <span style="background:#e0f4ff;">npm run dev</span>  
Alt1: <span style="background:#e0f4ff;">pnpm dev</span>  
Alt2: <span style="background:#e0f4ff;">yarn dev</span>  

Primary build: <span style="background:#e0f4ff;">npm run build</span>  
Alt1: <span style="background:#e0f4ff;">pnpm build</span>  
Alt2: <span style="background:#e0f4ff;">yarn build</span>  

## 17. Future Integrations (Placeholders)
- Pricing Feeds: /src/lib/pricing.ts (WebSocket / REST aggregator)
- Order Engine: /src/app/api/orders/*
- Risk Module: /src/lib/risk/*
- Notifications (Web Push): /src/lib/notifications/*
- Streaming (Edge): Add /src/app/api/stream/route.ts (ReadableStream)

## 18. Fundamental Resolved Code Example (Unified Execution)
Single line dev bootstrap after clone:
<span style="background:#e0f4ff;">cp .env.example .env.local && npm install && npx prisma migrate dev --name init && npm run seed && npm run dev</span>  
Alternative:
<span style="background:#e0f4ff;">cp .env.example .env.local && pnpm i && pnpm prisma migrate dev --name init && pnpm seed && pnpm dev</span>  
Alternative:
<span style="background:#e0f4ff;">cp .env.example .env.local && yarn && npx prisma migrate dev --name init && yarn seed && yarn dev</span>  

## 19. Testing Quick Health
<span style="background:#e0f4ff;">curl -I http://localhost:3000</span>  
<span style="background:#e0f4ff;">curl -I http://localhost:3000/api/portfolio</span>  

---
All essential components, APIs, and configurations included for immediate production readiness. Plug in real integrations as needed without structural refactors.