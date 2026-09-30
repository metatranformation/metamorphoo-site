'use client';

import { useState } from 'react';
import { ArrowUpRight } from './Icons';
import { Reveal } from './Reveal';
import { gallery } from '@/lib/content';
import { cn } from '@/lib/utils';

/** Galerie photos avec effet 3D et visionneuse plein écran. */
export function GalleryGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item, i) => (
          <Reveal key={item.id} delay={((i % 3) + 1) as 1 | 2 | 3} as="article">
            <button
              type="button"
              onClick={() => setLightbox(i)}
              className="card-3d group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
            >
              <img
                src={item.image}
                alt={item.titre}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/25 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-200/90">
                  {item.categorie}
                </span>
                <span className="mt-1.5 block text-sm font-semibold text-cream">{item.titre}</span>
                <span className="mt-1 block text-xs text-cream/50">{item.legende}</span>
              </span>
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-night-950/70 text-gold-200 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <ArrowUpRight width={16} height={16} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-night-950/95 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <figure className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[lightbox].image}
              alt={gallery[lightbox].titre}
              className="max-h-[76vh] w-full rounded-2xl border border-white/15 object-contain"
            />
            <figcaption className="mt-4 flex items-center justify-between gap-4">
              <span>
                <span className="block font-semibold text-cream">{gallery[lightbox].titre}</span>
                <span className="text-xs text-cream/50">{gallery[lightbox].legende}</span>
              </span>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-cream/80 hover:text-cream"
              >
                Fermer ✕
              </button>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

export default GalleryGrid;
