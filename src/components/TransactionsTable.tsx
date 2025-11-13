'use client';
import useSWR from 'swr';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export const TransactionsTable = () => {
  const { data } = useSWR('/api/transactions/history', fetcher, { refreshInterval: 12000 });
  return (
    <div className="mt-10">
      <h2 className="font-bold text-lg mb-4 text-cyan-300">Recent Transactions</h2>
      <div className="overflow-x-auto rounded-lg border border-cyan-700/30">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-800/60">
            <tr>
              {['Type', 'Asset', 'Amount', 'Status', 'Created'].map(h => (
                <th key={h} className="px-4 py-2 text-left font-semibold text-slate-300">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.transactions?.map((tx: any, i: number) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="odd:bg-slate-900/40 even:bg-slate-900/20 hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-4 py-2">{tx.type}</td>
                <td className="px-4 py-2">{tx.asset}</td>
                <td className="px-4 py-2">{tx.amount}</td>
                <td className={`px-4 py-2 ${tx.status === 'COMPLETED' ? 'text-cyan-400' : 'text-amber-300'}`}>{tx.status}</td>
                <td className="px-4 py-2">{new Date(tx.createdAt).toLocaleString()}</td>
              </motion.tr>
            )) || (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  No transactions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};