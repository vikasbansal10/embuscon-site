// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const IS_PROD = process.env.NODE_ENV === 'production';

// Create a typed handle to globalThis so TS knows about `prisma`
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Reuse the client in dev; new client in prod
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: IS_PROD ? ['error'] : ['query', 'error', 'warn'],
  });

if (!IS_PROD) globalForPrisma.prisma = prisma;

export default prisma;
