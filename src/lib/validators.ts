import { z } from 'zod';

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const txCreateSchema = z.object({
  asset: z.string().min(2).max(12),
  amount: z.coerce.number().positive(),
  type: z.enum(['DEPOSIT', 'WITHDRAW'])
});

export const manualAdjustSchema = z.object({
  userId: z.string().cuid(),
  asset: z.string().min(2),
  delta: z.coerce.number(),
  reason: z.string().min(3).max(200)
});