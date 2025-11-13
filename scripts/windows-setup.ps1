<# 
Windows 11 Setup Script (Run in PowerShell as Administrator if packages needed)
Insert your identity where needed: $Env:M4_IDENTITY="YOUR_NAME_OR_ORG"
#>

Write-Host "[m4capital] Windows setup starting..." -ForegroundColor Cyan

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found. Please install from https://nodejs.org/ (LTS recommended)" -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path ".env.local")) {
    Copy-Item ".env.example" ".env.local"
    (Get-Content .env.local) -replace "your-production-domain.com","localhost" | Set-Content .env.local
}

npm install
npx prisma migrate dev --name init
npm run seed
Write-Host "Starting development server..." -ForegroundColor Green
npm run dev