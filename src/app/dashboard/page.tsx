import { auth } from "@/lib/auth";
import { PortfolioSummary } from "@/components/PortfolioSummary";
import { TransactionsTable } from "@/components/TransactionsTable";
import { UpdateBalanceForm } from "@/components/UpdateBalanceForm";

export const metadata = {
  title: "Dashboard | m4capital",
};

export default async function DashboardPage() {
  const session = await auth();
  // Protected by middleware, but double-guard:
  if (!session) {
    return <div className="p-10 text-center">Unauthorized</div>;
  }
  const isAdmin = (session.user as any)?.role === "ADMIN";
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
        Portfolio Dashboard
      </h1>
      <p className="text-sm text-slate-400 mt-2">
        Real-time animated overview. (Polling + placeholder for live feeds /
        websockets.)
      </p>
      <div className="mt-10">
        <PortfolioSummary />
        <TransactionsTable />
        <UpdateBalanceForm isAdmin={isAdmin} />
      </div>
    </div>
  );
}
