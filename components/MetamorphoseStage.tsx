'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkle } from './Icons';
import { Reveal } from './Reveal';

type Stage = {
  key: string;
  titre: string;
  soustitre: string;
  image: string;
  texte: string;
  accent: string;
};

const STAGES: Stage[] = [
  {
    key: 'chenille',
    titre: 'La chenille',
    soustitre: 'L’état de sommeil',
    image: '/images/stage-caterpillar.jpg',
    texte:
      'Comme la chenille, l’homme peut ramper, limité par son intelligence non renouvelée : sommeil spirituel, moral et intellectuel. Metamorphoo commence par un diagnostic honnête de cet état.',
    accent: 'from-emerald2-500/30',
  },
  {
    key: 'chrysalide',
    titre: 'La chrysalide',
    soustitre: 'Le temps de la transformation',
    image: '/images/stage-chrysalis.jpg',
    texte:
      'Dans le secret de la chrysalide, tout est reconstruit. Formation, imposition des mains, parole, repentance et sacrifice : le temps où Dieu creuse le vase avant de s’en servir.',
    accent: 'from-gold-400/30',
  },
  {
    key: 'papillon',
    titre: 'Le papillon',
    soustitre: 'L’envol et l’impact',
    image: '/images/hero-butterfly.jpg',
    texte:
      'Le papillon ne rampe plus : il vole et il pollinise. Le croyant transformé devient acteur du réveil dans sa famille, son Église, sa profession et sa nation.',
    accent: 'from-violet2-500/30',
  },
];

/** Section animée : la métamorphose spirituelle en 3 étapes (chenille → chrysalide → papillon). */
export function MetamorphoseStage() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % STAGES.length), 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  // Effet 3D : la carte active s'incline vers le curseur
  const handleMove = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRefs.current[index];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateY(${index === active ? -12 : 0}px) scale(${index === active ? 1.03 : 1})`;
  };

  const resetTransform = (index: number) => () => {
    const el = cardRefs.current[index];
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <section className="section overflow-hidden" id="metamorphose">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow mb-5">
            <Sparkle width={13} height={13} /> Le symbole du mouvement
          </span>
          <h2 className="text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
            De la chenille au <span className="text-gradient">papillon</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/70">
            La métamorphose n’est pas une amélioration : c’est une transformation totale. C’est l’image que
            Dieu nous donne dans Romains 12:2, et la raison d’être de METAMORPHOO.
          </p>
        </Reveal>

        {/* Étapes */}
        <div
          className="relative mt-16 grid gap-6 lg:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Ligne de progression animée */}
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 lg:block">
            <div className="relative h-full w-full bg-white/10">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald2-400 via-gold-300 to-violet2-500 transition-all duration-1000 ease-expo"
                style={{ width: `${((active + 1) / STAGES.length) * 100}%` }}
              />
              <span
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold-200 shadow-glow transition-all duration-1000 ease-expo"
                style={{ left: `calc(${((active + 1) / STAGES.length) * 100}% - 6px)` }}
              />
            </div>
          </div>

          {STAGES.map((stage, i) => (
            <div
              key={stage.key}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              onMouseMove={handleMove(i)}
              onMouseLeave={resetTransform(i)}
              onClick={() => setActive(i)}
              className={cn(
                'group relative cursor-pointer overflow-hidden rounded-3xl border p-1.5 transition-all duration-700 ease-expo',
                i === active
                  ? 'border-gold-300/50 bg-white/[0.06] shadow-[0_40px_90px_-40px_rgba(245,185,66,0.55)]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/25',
              )}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={cn('absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-700', stage.accent, i === active && 'opacity-100')} />

              <div className="relative overflow-hidden rounded-[1.35rem]">
                <img
                  src={stage.image}
                  alt={`${stage.titre} — illustration 3D Metamorphoo`}
                  loading="lazy"
                  className={cn(
                    'h-64 w-full object-cover transition-all duration-1000 ease-expo sm:h-72',
                    i === active ? 'scale-100 grayscale-0' : 'scale-105 grayscale',
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold-200/90">
                    Étape {i + 1} · {stage.soustitre}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">{stage.titre}</h3>
                </div>
                {i === active && (
                  <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-gold-300 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-night-950">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-night-950" /> en cours
                  </span>
                )}
              </div>

              <div className="relative p-6">
                <p className="text-sm leading-relaxed text-cream/70">{stage.texte}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contrôles */}
        <Reveal className="mt-10 flex flex-col items-center gap-5">
          <div className="flex items-center gap-3">
            {STAGES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir l'étape ${s.titre}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-500',
                  i === active ? 'w-12 bg-gold-300' : 'w-2 bg-white/20 hover:bg-white/40',
                )}
              />
            ))}
          </div>
          <p className="flex items-center gap-2 text-xs text-cream/40">
            Survolez pour mettre en pause
            <ArrowRight width={14} height={14} />
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default MetamorphoseStage;
