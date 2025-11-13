#!/usr/bin/env bash
# Universal Setup Script for Termux / Linux / UserLAnd (Kali, Debian, Ubuntu, Andronix Ubuntu KDE)
# Insert your identity or organization: export M4_IDENTITY="YOUR_NAME_OR_ORG"
set -euo pipefail

echo "[m4capital] Universal setup start..."

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js not found. Installing (Debian/Ubuntu/Kali)..."
  if command -v apt >/dev/null 2>&1; then
    sudo apt update
    sudo apt install -y curl ca-certificates
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs build-essential
  else
    echo "Please install Node.js manually for your distribution."
  fi
fi

if ! command -v psql >/dev/null 2>&1; then
  echo "PostgreSQL client not found. Installing..."
  if command -v apt >/dev/null 2>&1; then
    sudo apt install -y postgresql postgresql-contrib
    echo "Ensure PostgreSQL service is running."
  fi
fi

if [ ! -f ".env.local" ]; then
  cp .env.example .env.local
  sed -i "s/your-production-domain.com/localhost/g" .env.local
fi

npm install
npx prisma migrate dev --name init
npm run seed
echo "[m4capital] Launching dev server..."
npm run dev