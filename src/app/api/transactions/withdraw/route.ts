import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { txCreateSchema } from "@/lib/validators";
import { AppError, handleApiError } from "@/lib/errors";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new AppError("Unauthorized", 401);
    const body = await req.json();
    const parsed = txCreateSchema.safeParse(body);
    if (!parsed.success) throw new AppError("Invalid payload");
    const { asset, amount } = parsed.data;
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) throw new AppError("User not found", 404);

    const tx = await prisma.$transaction(async (trx) => {
      const balance = await trx.assetBalance.findUnique({
        where: { userId_asset: { userId: user.id, asset } },
      });
      if (!balance || Number(balance.amount) < amount)
        throw new AppError("Insufficient funds", 400);
      await trx.assetBalance.update({
        where: { userId_asset: { userId: user.id, asset } },
        data: { amount: { decrement: amount } },
      });
      return trx.transaction.create({
        data: {
          userId: user.id,
          asset,
          amount,
          type: "WITHDRAW",
          status: "COMPLETED",
        },
      });
    });

    return Response.json({ transaction: tx });
  } catch (e) {
    return handleApiError(e);
  }
}
