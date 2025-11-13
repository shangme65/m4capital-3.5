import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/errors";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { balances: true },
    });
    if (!user)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });

    // Placeholder: asset USD valuations = 1 (Add real pricing integration)
    const totalUSD = user.balances.reduce(
      (acc, b) => acc + Number(b.amount),
      0
    );

    return Response.json({
      balances: user.balances,
      aggregates: { totalUSD },
    });
  } catch (e) {
    return handleApiError(e);
  }
}
