'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: 'Next-Gen Forex & Digital Assets',
    subtitle: 'Unified liquidity. Precision analytics. Adaptive intelligence.',
    cta: 'Start Trading'
  },
  {
    title: 'Portfolio Visibility in Real-Time',
    subtitle: 'Granular positions, volatility metrics, live delta exposures.',
    cta: 'View Dashboard'
  },
  {
    title: 'Secure. Scalable. Modular.',
    subtitle: 'Enterprise-grade architecture with extensible APIs.',
    cta: 'Explore Modules'
  }
];

export const HeroSlider = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative w-full h-[55vh] md:h-[70vh] flex items-center justify-center text-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
            className="max-w-4xl px-6"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 1.03 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <h1 className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-300 bg-clip-text text-transparent animate-textGlow">
            {slides[index].title}
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-slate-300">{slides[index].subtitle}</p>
          <div className="mt-10 flex justify-center">
            <motion.a
              href="/dashboard"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="px-7 py-3 rounded-lg font-semibold bg-gradient-to-r from-cyan-600 via-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-cyan-600/30 animate-borderFlow"
            >
              {slides[index].cta}
            </motion.a>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full transition-all ${
              i === index ? 'bg-cyan-400 w-9' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};