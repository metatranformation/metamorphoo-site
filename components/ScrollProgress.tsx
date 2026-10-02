'use client';

import { useEffect, useState } from 'react';

/** Barre de progression de lecture en haut de page (dégradé or → émeraude). */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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

  return (
    <div className="fixed inset-x-0 top-0 z-[55] h-[3px] bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-gold-300 via-emerald2-400 to-violet2-500 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

export default ScrollProgress;
