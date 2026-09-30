'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const STAGES = [
  { key: 'chenille', label: 'Appel', sub: 'La chenille', image: '/images/stage-caterpillar.jpg' },
  { key: 'chrysalide', label: 'Transformation', sub: 'La chrysalide', image: '/images/stage-chrysalis.jpg' },
  { key: 'papillon', label: 'Envol', sub: 'Le papillon', image: '/images/hero-butterfly.jpg' },
];

/**
 * Rail de métamorphose : présent sur chaque page, il indique visuellement
 * l'avancement dans le site (chenille → chrysalide → papillon).
 */
export function MorphRail() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const activeIndex = Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length));

  return (
    <div
      className={cn(
        'fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 transition-opacity duration-700 xl:flex',
        mounted ? 'opacity-100' : 'opacity-0',
      )}
      aria-hidden="true"
    >
      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-cream/40 [writing-mode:vertical-rl]">
        Métamorphose
      </span>

      <div className="relative flex flex-col items-center gap-3">
        <span className="absolute inset-y-0 w-px bg-white/10" />
        <span
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-gold-300 via-emerald2-400 to-violet2-500 transition-all duration-500 ease-expo"
          style={{ height: `${progress * 100}%` }}
        />
        {STAGES.map((stage, i) => {
          const active = i <= activeIndex;
          const current = i === activeIndex;
          return (
            <span key={stage.key} className="group relative">
              <span
                className={cn(
                  'relative block h-10 w-10 overflow-hidden rounded-full border transition-all duration-500 ease-expo',
                  active
                    ? 'border-gold-300/80 opacity-100 shadow-glow'
                    : 'border-white/15 opacity-40 grayscale',
                  current && 'scale-110',
                )}
                style={{ backgroundImage: `url(${stage.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-night-950/95 px-3 py-1.5 text-[0.7rem] font-medium text-cream/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {stage.sub}
              </span>
            </span>
          );
        })}
      </div>

      <span className="font-display text-sm font-bold text-gradient">{STAGES[activeIndex].label}</span>
    </div>
  );
}

export default MorphRail;
