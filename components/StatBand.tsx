'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/lib/content';
import { useI18n } from './I18nProvider';

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const o = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.3 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-gradient sm:text-5xl">
      {n}
      {suffix}
    </span>
  );
}

export function StatBand() {
  const { t } = useI18n();
  const STAT_KEYS = ['founded', 'leaders', 'spheres', 'actions'];

  return (
    <section className="relative z-10 py-14">
      <div className="container-x">
        <div className="glass grid gap-8 rounded-3xl px-7 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((s, i) => (
            <div key={s.label} className="relative text-center">
              {i > 0 && <span className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-white/10 lg:block" />}
              <Counter value={Number(s.value)} suffix={s.suffix} />
              <p className="mt-2 text-sm font-semibold text-cream/80">{s.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-cream/40">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatBand;
