'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Check } from './Icons';
import { Reveal } from './Reveal';
import type { Action } from '@/lib/content';
import { useI18n } from './I18nProvider';

type ActionCardProps = {
  action: Action;
  index: number;
  compact?: boolean;
};

/** Carte d'action avec effet 3D à la souris. */
export function ActionCard({ action, index, compact = false }: ActionCardProps) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);

  const titre = t(`data.actions.${action.id}.titre`);
  const resume = t(`data.actions.${action.id}.resume`);
  const categorie = t(`data.actions.${action.id}.categorie`);
  const points = [0, 1, 2].map((i) => t(`data.actions.${action.id}.points.${i}`)).filter((v) => v && !v.startsWith('data.'));

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-8px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <Reveal delay={((index % 3) + 1) as 1 | 2 | 3} as="article">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="card-3d group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-night-900/60"
      >
        <div className="frame-img !rounded-none !border-0">
          <img
            src={action.image}
            alt={`${titre} — illustration 3D Metamorphoo`}
            loading="lazy"
            className={cn(
              'w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-110',
              compact ? 'h-48' : 'h-60',
            )}
          />
        </div>

        <span className="absolute left-5 top-5 rounded-full border border-gold-300/40 bg-night-950/80 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-200 backdrop-blur">
          {categorie}
        </span>

        <div className="relative p-6 sm:p-7">
          <h3 className="text-xl font-bold leading-snug transition-colors duration-300 group-hover:text-gold-200">
            {titre}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">{resume}</p>

          {!compact && (
            <ul className="mt-5 space-y-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[0.82rem] text-cream/60">
                  <Check width={15} height={15} className="mt-0.5 shrink-0 text-emerald2-400" />
                  {p}
                </li>
              ))}
            </ul>
          )}

          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-200 transition-all duration-300 group-hover:gap-3.5"
          >
            Participer / s’inscrire
            <ArrowUpRight width={16} height={16} />
          </Link>
        </div>

        <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-gold-300/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </Reveal>
  );
}

export default ActionCard;
