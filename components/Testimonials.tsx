'use client';

import { useEffect, useState } from 'react';
import { Quote } from './Icons';
import { Reveal } from './Reveal';
import { testimonies } from '@/lib/content';
import { useI18n } from './I18nProvider';

export function Testimonials() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % testimonies.length), 7000);
    return () => window.clearInterval(id);
  }, [paused, testimonies.length]);

  const base = testimonies[index];
  const item = {
    nom: t(`data.testimonies.${index}.nom`),
    ville: t(`data.testimonies.${index}.ville`),
    role: t(`data.testimonies.${index}.role`),
    texte: t(`data.testimonies.${index}.texte`),
    note: base.note,
  };

  return (
    <section className="section" id="temoignages">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow mb-5">{t('home.testimonials.eyebrow')}</span>
          <h2 className="text-3xl font-bold leading-[1.12] sm:text-4xl">
            {t('home.testimonials.title')}
          </h2>
        </Reveal>

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass relative overflow-hidden rounded-3xl px-7 py-10 sm:px-14 sm:py-14">
            <Quote width={54} height={54} className="absolute -left-2 -top-2 text-gold-300/15" />
            <div className="halo -right-10 -top-10 h-40 w-40 bg-violet2-500/20" />

            <div key={item.nom} className="relative animate-rise-fade">
              <div className="mb-4 flex gap-1" aria-label={`${t('home.testimonials.rating')} : ${item.note} / 5`}>
                {Array.from({ length: item.note }).map((_, i) => (
                  <span key={i} className="text-gold-300">
                    ★
                  </span>
                ))}
              </div>
              <blockquote className="font-display text-lg leading-relaxed text-cream/90 sm:text-2xl sm:leading-relaxed">
                « {item.texte} »
              </blockquote>
              <div className="mt-7 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-gold-300 to-emerald2-500 font-display text-lg font-bold text-night-950">
                  {item.nom.charAt(0)}
                </span>
                <div>
                  <p className="font-semibold text-cream">{item.nom}</p>
                  <p className="text-xs text-cream/55">
                    {item.role} · {item.ville}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-3">
            {testimonies.map((item, i) => (
              <button
                key={item.nom}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t(`data.testimonies.${i}.nom`)}
                className={
                  i === index
                    ? 'h-2 w-10 rounded-full bg-gold-300 transition-all duration-500'
                    : 'h-2 w-2 rounded-full bg-white/20 transition-all duration-500 hover:bg-white/40'
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
