import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.log('Seed skipped: SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD not set.');
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log('Admin already exists. Skipping.');
    return;
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 12);
  const hash = await bcrypt.hash(adminPassword, saltRounds);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      name: 'M4 Admin',
      role: Role.ADMIN,
      passwordHash: hash,
      balances: {
        create: [
          { asset: 'USD', amount: 100000 },
          { asset: 'BTC', amount: 1.2345678 },
          { asset: 'ETH', amount: 12.5 }
        ]
      }
    }
  });

  console.log('Seeded admin:', admin.email);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());