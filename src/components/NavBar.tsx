'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { AnimatedButton } from './ui/AnimatedButton';
import { motion } from 'framer-motion';

export const NavBar = () => {
  const { data: session } = useSession();
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-slate-950/70 border-b border-cyan-700/30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">
          m4capital
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/#features" className="text-slate-300 hover:text-cyan-300 transition-colors">Features</Link>
          <Link href="/#architecture" className="text-slate-300 hover:text-cyan-300 transition-colors">Architecture</Link>
          <Link href="/#faq" className="text-slate-300 hover:text-cyan-300 transition-colors">FAQ</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-cyan-300 font-medium">Dashboard</Link>
              <AnimatedButton onClick={() => signOut({ callbackUrl: '/' })} variant="secondary">
                Logout
              </AnimatedButton>
            </>
          ) : (
            <AnimatedButton as="a" href="/login">
              Login
            </AnimatedButton>
          )}
        </div>
      </div>
      <motion.div
        className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        animate={{ backgroundPositionX: ['0%', '200%'] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
      />
    </nav>
  );
};