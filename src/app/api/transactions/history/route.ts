import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { handleApiError, AppError } from "@/lib/errors";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) throw new AppError("Unauthorized", 401);
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) throw new AppError("User not found", 404);

    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return Response.json({ transactions });
  } catch (e) {
    return handleApiError(e);
  }
}
