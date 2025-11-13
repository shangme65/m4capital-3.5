'use client';
import useSWR from 'swr';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export const PortfolioSummary = () => {
  const { data, isLoading } = useSWR('/api/portfolio', fetcher, { refreshInterval: 8000 });
  if (isLoading) return <div className="animate-pulse text-slate-400">Loading balances...</div>;
  const totalUSD = data?.aggregates?.totalUSD ?? 0;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {data?.balances?.map((b: any, i: number) => (
        <motion.div
          key={b.asset}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-600/30 shadow-lg shadow-black/40 relative overflow-hidden"
        >
          <div className="absolute inset-0 animate-sheen opacity-20" />
          <h3 className="text-sm font-semibold text-cyan-300">{b.asset}</h3>
          <p className="text-2xl font-bold mt-2 text-slate-100">{b.amount}</p>
          <p className="text-xs text-slate-400 mt-1">Updated {new Date(b.updatedAt).toLocaleTimeString()}</p>
        </motion.div>
      ))}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-5 rounded-xl bg-gradient-to-br from-cyan-900/40 to-fuchsia-900/30 border border-fuchsia-600/30"
      >
        <h3 className="text-sm font-semibold text-fuchsia-300">Total USD (Est.)</h3>
        <p className="text-3xl font-extrabold mt-3 bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
          {totalUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </p>
      </motion.div>
    </div>
  );
};