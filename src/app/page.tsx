import { HeroSlider } from '@/components/HeroSlider';

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <section id="features" className="max-w-6xl mx-auto px-6 mt-24 space-y-14">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">Core Features</h2>
          <ul className="mt-6 grid md:grid-cols-3 gap-8 text-sm leading-relaxed">
            {[
              'Modular micro-feature architecture with clean separation of concerns (UI/API/Auth/Data).',
              'Continuous animated UI: dynamic 3D background, fluid hero transitions, motion-driven interactions.',
              'Secure auth via NextAuth, role-based access (User/Admin), Prisma-backed persistence.',
              'Extensible domain models for Assets, Transactions, Manual Adjustments.',
              'SEO-friendly metadata, Open Graph image route, dynamic sitemap & robots.',
              'Production ready for Vercel with pre-configured performance headers.'
            ].map(f => (
              <li key={f} className="p-4 rounded-lg bg-slate-900/50 border border-cyan-600/20 hover:border-cyan-400/40 transition-colors">{f}</li>
            ))}
          </ul>
        </div>
        <div id="architecture">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">Architecture Overview</h2>
          <p className="mt-4 text-slate-300 text-sm leading-relaxed">
            The platform leverages a modern Next.js App Router stack with isolated API routes leveraging Prisma transactions and Zod validation.
            Auth boundaries enforced by middleware. Data flows via SWR (realtime polling) enabling optimistic UI expansions. All UI components are
            pure/animated for immersive responsiveness.
          </p>
        </div>
        <div id="faq">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">FAQ</h2>
          <div className="mt-6 space-y-6">
            {[
              ['Can I integrate real FX price feeds?', 'Yes. Add streaming feed adapters under /src/lib/feeds and consume via server actions or websockets.'],
              ['How do I add more assets?', 'Insert records into AssetBalance or handle creation upon first trade. Extend seeding script.'],
              ['Is scaling supported?', 'Yes. Horizontally scale DB and use Vercel edge caches for static segments.']
            ].map(([q, a]) => (
              <div key={q} className="p-4 border border-cyan-600/30 rounded-lg bg-slate-900/40">
                <h3 className="font-semibold text-cyan-300">{q}</h3>
                <p className="text-xs mt-2 text-slate-300">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}