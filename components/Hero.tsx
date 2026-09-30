'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkle, WhatsappIcon } from './Icons';
import { SocialLinks } from './SocialLinks';
import { site } from '@/lib/content';

export function Hero() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const layers = Array.from(scene.querySelectorAll<HTMLElement>('[data-depth]'));

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 1);
        layer.style.transform = `translate3d(${x * depth * 14}px, ${y * depth * 14}px, 0)`;
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center pb-16 pt-32 lg:pt-36">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_1fr]">
          {/* ---------------- Texte ---------------- */}
          <div className="relative z-10">
            <p className="eyebrow animate-rise-fade">
              <Sparkle width={13} height={13} /> {site.brand.baseline} · depuis {site.brand.founded}
            </p>

            <h1 className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight animate-rise-fade sm:text-6xl lg:text-[4.1rem]">
              Soyez <span className="text-gradient text-shadow-glow">transformés</span>
              <br />
              par le renouvellement
              <br />
              de l’intelligence
            </h1>

            <p className="mt-4 font-display text-sm italic text-gold-200/80 animate-rise-fade">
              {site.brand.verse} — {site.brand.verseRef}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 animate-rise-fade sm:text-lg">
              {site.brand.fullName} est une plateforme missionnaire née en {site.brand.founded} pour former,
              équiper et activer les croyants afin qu’ils deviennent des acteurs du réveil dans les nations.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4 animate-rise-fade">
              <Link href="/contact" className="btn-gold">
                Devenir visiteur <ArrowRight width={17} height={17} />
              </Link>
              <Link href="/vision-mission" className="btn-ghost">
                Découvrir la vision
              </Link>
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsappIcon width={18} height={18} /> {site.contact.whatsappDisplay}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 animate-rise-fade">
              <SocialLinks size={17} />
              <span className="hidden h-5 w-px bg-white/10 sm:block" />
              <Link href="/academie" className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cream/50 transition-colors hover:text-gold-200">
                Formation en ligne
                <ArrowRight width={15} height={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* ---------------- Scène 3D ---------------- */}
          <div ref={sceneRef} className="relative perspective mx-auto w-full max-w-lg lg:max-w-none">
            <div className="halo left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 bg-gold-400/20 animate-pulse-glow" />
            <div className="halo right-0 top-10 h-56 w-56 bg-violet2-500/25 animate-float-slow" />

            {/* Image principale */}
            <div
              data-depth="1.2"
              className="frame-img relative aspect-[4/5] w-full animate-float transition-transform duration-300 ease-out will-change-transform"
            >
              <img
                src="/images/hero-butterfly.jpg"
                alt="Papillon aux ailes lumineuses — symbole de la métamorphose Metamorphoo"
                className="h-full w-full object-cover"
                // image prioritaire (LCP)
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-gold-200/90">
                  Étape 3 · L’envol
                </p>
                <p className="mt-2 font-display text-2xl font-bold">Le papillon</p>
                <p className="mt-1 text-xs leading-relaxed text-cream/60">
                  Le croyant transformé porte la vie et le réveil là où il passe.
                </p>
              </div>
            </div>

            {/* Carte flottante : chrysalide */}
            <div
              data-depth="2.4"
              className="glass absolute -left-4 top-10 w-40 animate-float-slow rounded-2xl p-2.5 transition-transform duration-300 ease-out will-change-transform sm:-left-10"
            >
              <img src="/images/stage-chrysalis.jpg" alt="Chrysalide lumineuse" className="h-20 w-full rounded-xl object-cover" />
              <p className="mt-2 px-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-200/90">
                La chrysalide
              </p>
            </div>

            {/* Carte flottante : chenille */}
            <div
              data-depth="3.2"
              className="glass absolute -right-2 bottom-16 w-36 animate-float rounded-2xl p-2.5 transition-transform duration-300 ease-out will-change-transform sm:-right-8"
            >
              <img src="/images/stage-caterpillar.jpg" alt="Chenille lumineuse" className="h-20 w-full rounded-xl object-cover" />
              <p className="mt-2 px-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-emerald2-300">
                La chenille
              </p>
            </div>

            {/* Badge fondateurs */}
            <div
              data-depth="1.8"
              className="glass absolute -bottom-6 left-1/2 hidden -translate-x-1/2 rounded-2xl px-5 py-3 text-center transition-transform duration-300 ease-out will-change-transform sm:block"
            >
              <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cream/40">Porté par</p>
              <p className="mt-1 text-xs font-semibold text-gold-100">Fidèle & Clarice BUMBA</p>
            </div>
          </div>
        </div>

        {/* Indicateur de défilement */}
        <div className="mt-16 hidden items-center justify-center gap-3 lg:flex">
          <span className="text-[0.62rem] uppercase tracking-[0.3em] text-cream/30">Défiler</span>
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <span className="absolute inset-x-0 top-0 h-4 animate-float bg-gold-300" />
          </span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
