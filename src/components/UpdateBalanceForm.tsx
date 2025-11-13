'use client';
import { useState } from 'react';
import { AnimatedButton } from './ui/AnimatedButton';

export const UpdateBalanceForm = ({ isAdmin }: { isAdmin: boolean }) => {
  const [form, setForm] = useState({ userId: '', asset: '', delta: '', reason: '' });
  const [status, setStatus] = useState<string | null>(null);

  if (!isAdmin) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Processing...');
    const res = await fetch('/api/admin/manual-update', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    setStatus(res.ok ? 'Success' : data.error || 'Failed');
  }

  return (
    <div className="mt-12 p-6 rounded-xl border border-cyan-700/40 bg-slate-900/60">
      <h3 className="font-semibold text-cyan-300 mb-4">Manual Balance Adjustment (Admin)</h3>
      <form onSubmit={submit} className="grid md:grid-cols-5 gap-4">
        {['userId', 'asset', 'delta', 'reason'].map(field => (
          <input
            key={field}
            required
            type={field === 'delta' ? 'number' : 'text'}
            placeholder={field}
            value={(form as any)[field]}
            onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
            className="px-3 py-2 rounded bg-slate-800 border border-cyan-600/30 focus:outline-none focus:border-cyan-400 text-sm"
          />
        ))}
        <AnimatedButton type="submit">Apply</AnimatedButton>
      </form>
      {status && <p className="mt-3 text-xs text-slate-400">{status}</p>}
    </div>
  );
};