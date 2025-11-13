import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { manualAdjustSchema } from "@/lib/validators";
import { AppError, handleApiError } from "@/lib/errors";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== "ADMIN")
      throw new AppError("Forbidden", 403);

    const body = await req.json();
    const parsed = manualAdjustSchema.safeParse(body);
    if (!parsed.success) throw new AppError("Invalid payload");

    const { userId, asset, delta, reason } = parsed.data;

    const result = await prisma.$transaction(async (trx) => {
      await trx.assetBalance.upsert({
        where: { userId_asset: { userId, asset } },
        create: { userId, asset, amount: delta },
        update: { amount: { increment: delta } },
      });
      await trx.transaction.create({
        data: {
          userId,
          asset,
          amount: delta,
          type: "ADJUSTMENT",
          status: "COMPLETED",
          meta: { reason },
        },
      });
      return trx.manualUpdateLog.create({
        data: { userId, asset, delta, reason },
      });
    });

    return Response.json({ update: result });
  } catch (e) {
    return handleApiError(e);
  }
}
