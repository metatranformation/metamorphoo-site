'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { GlobeCanvas } from './GlobeCanvas';
import { Reveal } from './Reveal';
import { useI18n } from './I18nProvider';

/* ============================================================
   BrandJourney — le film de la marque METAMORPHOO
   Chenille → Chrysalide → Papillon → Logo → Globe des nations
   ============================================================ */

type StageKey = 'chenille' | 'chrysalide' | 'papillon' | 'logo' | 'globe';

const DURATIONS: Record<StageKey, number> = {
  chenille: 5000,
  chrysalide: 5000,
  papillon: 5000,
  logo: 5500,
  globe: 9000,
};

/* ---------------- Scènes SVG ---------------- */

function CaterpillarScene() {
  return (
    <svg viewBox="0 0 320 170" className="h-full w-full">
      <defs>
        <linearGradient id="bjCat" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2ED39B" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0E9473" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* branche */}
      <path d="M6 128 Q 160 104 314 138" stroke="#3b2a17" strokeWidth="11" fill="none" strokeLinecap="round" />
      <path d="M6 128 Q 160 104 314 138" stroke="#5a4227" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" />

      {/* feuilles endormies */}
      <path d="M40 126 q -18 -12 -30 -2 q 14 16 30 2 z" fill="#1c5c46" opacity="0.7" />
      <path d="M282 132 q 18 -12 30 -2 q -14 16 -30 2 z" fill="#1c5c46" opacity="0.7" />

      <g className="bj-crawl">
        {/* segments */}
        {[
          { x: 96, r: 15 },
          { x: 126, r: 18 },
          { x: 158, r: 21 },
          { x: 192, r: 18 },
          { x: 222, r: 14 },
          { x: 248, r: 10 },
        ].map((s, i) => (
          <circle key={i} cx={s.x} cy={112} r={s.r} fill="url(#bjCat)" />
        ))}
        {/* tête */}
        <circle cx="272" cy="108" r="19" fill="#2ED39B" opacity="0.95" />
        <circle cx="279" cy="103" r="3" fill="#04060F" />
        <circle cx="266" cy="103" r="3" fill="#04060F" />
        <path d="M272 92 q -6 -14 -18 -18" stroke="#2ED39B" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M272 92 q 6 -14 18 -18" stroke="#2ED39B" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        {/* petites pattes */}
        {[110, 140, 172, 204, 234].map((x) => (
          <g key={x} stroke="#0E9473" strokeWidth="2.2" strokeLinecap="round">
            <path d={`M${x} 122 l -5 10`} />
            <path d={`M${x} 122 l 5 10`} />
          </g>
        ))}
      </g>

      {/* zzz de sommeil */}
      <g fill="#F7F3EA" opacity="0.5" className="bj-zzz">
        <text x="252" y="62" fontSize="16" fontFamily="Inter, sans-serif" fontWeight="700">
          z
        </text>
        <text x="268" y="46" fontSize="20" fontFamily="Inter, sans-serif" fontWeight="700">
          z
        </text>
        <text x="288" y="28" fontSize="25" fontFamily="Inter, sans-serif" fontWeight="700">
          z
        </text>
      </g>
    </svg>
  );
}

function ChrysalisScene() {
  return (
    <svg viewBox="0 0 320 170" className="h-full w-full">
      <defs>
        <linearGradient id="bjChry" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD88A" />
          <stop offset="0.45" stopColor="#F9A227" />
          <stop offset="1" stopColor="#DD2B18" />
        </linearGradient>
        <radialGradient id="bjChryGlow">
          <stop offset="0" stopColor="#F9A227" stopOpacity="0.75" />
          <stop offset="1" stopColor="#F9A227" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* fil */}
      <path d="M160 6 L160 44" stroke="#8a6a3a" strokeWidth="2" />
      {/* branche haute */}
      <path d="M60 12 Q 160 -2 260 16" stroke="#3b2a17" strokeWidth="8" fill="none" strokeLinecap="round" />

      <circle cx="160" cy="86" r="78" fill="url(#bjChryGlow)" className="bj-pulse" />

      <g className="bj-breathe">
        <path
          d="M160 44 C 186 62 196 82 196 100 C 196 124 180 142 160 142 C 140 142 124 124 124 100 C 124 82 134 62 160 44 Z"
          fill="url(#bjChry)"
          opacity="0.95"
        />
        {/* nervures */}
        <g stroke="#04060F" strokeOpacity="0.28" strokeWidth="2" fill="none">
          <path d="M160 52 L160 138" />
          <path d="M138 66 Q 150 100 142 134" />
          <path d="M182 66 Q 170 100 178 134" />
          <path d="M148 58 Q 160 96 152 136" />
          <path d="M172 58 Q 160 96 168 136" />
        </g>
        <ellipse cx="148" cy="82" rx="8" ry="18" fill="#FFFFFF" opacity="0.28" transform="rotate(-12 148 82)" />
      </g>

      {/* particules qui convergent */}
      {[
        { a: 0, d: 52 },
        { a: 72, d: 58 },
        { a: 144, d: 48 },
        { a: 216, d: 60 },
        { a: 288, d: 50 },
      ].map((p, i) => (
        <circle key={i} r="2.6" fill="#FFD88A" className="bj-converge" style={{ transformOrigin: '160px 92px', animationDelay: `${i * 0.5}s`, ['--angle' as string]: `${p.a}deg`, ['--dist' as string]: `${p.d}px` }} />
      ))}
    </svg>
  );
}

function ButterflyScene() {
  return (
    <svg viewBox="0 0 320 170" className="h-full w-full">
      <defs>
        <linearGradient id="bjWingU" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD88A" />
          <stop offset="0.5" stopColor="#F9A227" />
          <stop offset="1" stopColor="#DD2B18" />
        </linearGradient>
        <linearGradient id="bjWingL" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#F4731F" />
          <stop offset="1" stopColor="#7C5CFF" />
        </linearGradient>
      </defs>

      <g className="bj-fly">
        {/* ailes arrière */}
        <g className="bj-wing bj-wing-l">
          <path d="M158 92 C 118 74 66 84 62 112 C 58 140 104 150 158 118 Z" fill="url(#bjWingL)" opacity="0.95" />
        </g>
        <g className="bj-wing bj-wing-r">
          <path d="M162 92 C 202 74 254 84 258 112 C 262 140 216 150 162 118 Z" fill="url(#bjWingL)" opacity="0.95" />
        </g>
        {/* ailes avant */}
        <g className="bj-wing bj-wing-l bj-wing-front">
          <path d="M158 88 C 126 34 56 26 40 58 C 24 90 92 104 158 100 Z" fill="url(#bjWingU)" />
        </g>
        <g className="bj-wing bj-wing-r bj-wing-front">
          <path d="M162 88 C 194 34 264 26 280 58 C 296 90 228 104 162 100 Z" fill="url(#bjWingU)" />
        </g>
        {/* corps */}
        <ellipse cx="160" cy="96" rx="5" ry="34" fill="#04060F" />
        <circle cx="160" cy="60" r="7" fill="#04060F" />
        <g stroke="#04060F" strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d="M157 56 Q 142 36 128 30" />
          <path d="M163 56 Q 178 36 192 30" />
        </g>
        <circle cx="128" cy="30" r="3" fill="#F9A227" />
        <circle cx="192" cy="30" r="3" fill="#F9A227" />
        {/* taches */}
        <circle cx="72" cy="70" r="7" fill="#FFD88A" opacity="0.85" />
        <circle cx="248" cy="70" r="7" fill="#FFD88A" opacity="0.85" />
        <circle cx="96" cy="126" r="5" fill="#FFD88A" opacity="0.7" />
        <circle cx="224" cy="126" r="5" fill="#FFD88A" opacity="0.7" />
      </g>

      {/* trainée de lumière */}
      <path d="M20 140 Q 90 120 150 100" stroke="#F9A227" strokeWidth="1.6" fill="none" opacity="0.35" strokeDasharray="5 8" />
      <path d="M300 40 Q 240 66 190 92" stroke="#F9A227" strokeWidth="1.2" fill="none" opacity="0.25" strokeDasharray="4 9" />
    </svg>
  );
}

function LogoRevealScene() {
  return (
    <div className="relative grid h-full w-full place-items-center">
      {/* rayons */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="bj-rays h-64 w-64 rounded-full" />
      </div>
      {/* halo */}
      <div className="absolute h-56 w-56 rounded-full bg-gold-400/25 blur-3xl animate-pulse-glow" />
      {/* éclat */}
      <div className="bj-flash absolute h-40 w-40 rounded-full bg-gold-200/70 blur-2xl" />

      <svg viewBox="0 0 200 200" className="bj-logo-in relative h-52 w-52 sm:h-64 sm:w-64">
        <defs>
          <linearGradient id="bjLogoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFC44D" />
            <stop offset="0.35" stopColor="#F9A227" />
            <stop offset="0.7" stopColor="#F4731F" />
            <stop offset="1" stopColor="#DD2B18" />
          </linearGradient>
          <linearGradient id="bjLogoShine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="bj-flame-flicker">
          <path d="M 100 4 C 113 24, 126 40, 126 55 C 126 72, 114 84, 100 84 C 86 84, 74 72, 74 55 C 74 40, 87 24, 100 4 Z" fill="url(#bjLogoGrad)" />
        </g>
        <path d="M 18 40 C 14 90, 52 142, 100 178 C 86 140, 72 88, 68 40 C 48 32, 32 32, 18 40 Z" fill="url(#bjLogoGrad)" />
        <path d="M 182 40 C 186 90, 148 142, 100 178 C 114 140, 128 88, 132 40 C 152 32, 168 32, 182 40 Z" fill="url(#bjLogoGrad)" />
        <path d="M 26 46 C 24 88, 56 134, 96 168 C 84 134, 72 90, 68 48 C 52 42, 38 42, 26 46 Z" fill="#FFFFFF" opacity="0.16" />
        <path d="M 174 46 C 176 88, 144 134, 104 168 C 116 134, 128 90, 132 48 C 148 42, 162 42, 174 46 Z" fill="#FFFFFF" opacity="0.16" />
        {/* balayage brillant */}
        <rect x="-60" y="0" width="46" height="200" fill="url(#bjLogoShine)" className="bj-sweep" />
      </svg>

      {/* étincelles */}
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="bj-sparkle absolute h-1.5 w-1.5 rounded-full bg-gold-200"
          style={{
            left: `${50 + Math.cos((i / 10) * Math.PI * 2) * 34}%`,
            top: `${50 + Math.sin((i / 10) * Math.PI * 2) * 34}%`,
            animationDelay: `${i * 0.22}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------- Composant principal ---------------- */

export function BrandJourney() {
  const { t, translateList } = useI18n();
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  const keys: StageKey[] = ['chenille', 'chrysalide', 'papillon', 'logo', 'globe'];
  const stageLabels = translateList('home.film.stages');
  const nationNames = translateList('home.film.nations');

  useEffect(() => {
    if (paused) return;
    startRef.current = performance.now();
    let alive = true;

    const tick = (now: number) => {
      if (!alive) return;
      const elapsed = now - startRef.current;
      const duration = DURATIONS[keys[stage]];
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      if (p >= 1) {
        setStage((s) => (s + 1) % keys.length);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [stage, paused, keys.length]);

  const scenes = [
    <CaterpillarScene key="c" />,
    <ChrysalisScene key="ch" />,
    <ButterflyScene key="b" />,
    <LogoRevealScene key="l" />,
    <div key="g" className="h-full w-full">
      <GlobeCanvas className="h-full w-full" nationNames={nationNames} ariaLabel={t('home.film.globeLabel')} />
    </div>,
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24" id="film">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow mb-5">{t('home.film.eyebrow')}</span>
          <h2 className="text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
            {t('home.film.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-cream/70 sm:text-base">
            {t('home.film.lead')}
          </p>
        </Reveal>

        {/* Scène */}
        <div
          className="relative mx-auto mt-12 aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-night-950/60 shadow-card sm:aspect-[16/9]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* décor */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(249,162,39,0.16),transparent_62%)]" />
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="halo -left-16 top-0 h-64 w-64 bg-violet2-500/20 animate-float-slow" />
          <div className="halo -right-16 bottom-0 h-64 w-64 bg-gold-400/20 animate-float" />

          {/* scènes superposées */}
          {scenes.map((scene, i) => (
            <div
              key={i}
              className={cn(
                'absolute inset-0 grid place-items-center p-6 transition-all duration-1000 ease-expo sm:p-10',
                i === stage ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0',
              )}
              aria-hidden={i !== stage}
            >
              <div className="h-full w-full max-w-2xl">{scene}</div>
            </div>
          ))}

          {/* légende de l'étape */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 bg-gradient-to-t from-night-950 via-night-950/70 to-transparent px-6 pb-6 pt-16 text-center">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold-200/90">
              {t('home.film.step').replace('{n}', String(stage + 1))}
            </p>
            <p className="font-display text-lg font-bold sm:text-2xl">
              {stageLabels[stage] ?? ''}
            </p>
          </div>
        </div>

        {/* Contrôles */}
        <div className="mx-auto mt-7 flex max-w-2xl flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {keys.map((k, i) => (
              <button
                key={k}
                type="button"
                onClick={() => setStage(i)}
                aria-label={t('home.film.step').replace('{n}', String(i + 1))}
                className={cn(
                  'h-2 rounded-full transition-all duration-500',
                  i === stage ? 'w-12 bg-gold-400' : 'w-2 bg-white/20 hover:bg-white/40',
                )}
              />
            ))}
          </div>
          <div className="h-0.5 w-full max-w-md overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-gold-300 to-gold-600 transition-[width] duration-100 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="text-[0.7rem] text-cream/40">
            {t('home.film.pauseHint')}{' '}
            <button type="button" onClick={() => setStage(0)} className="text-gold-200 underline-offset-4 hover:underline">
              {t('home.film.replay')}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default BrandJourney;
