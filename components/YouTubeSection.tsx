'use client';

import { useState } from 'react';
import { cn, youtubeId, youtubeThumb } from '@/lib/utils';
import { Play, YoutubeIcon } from './Icons';
import { Reveal } from './Reveal';
import { site } from '@/lib/content';
import { useI18n } from './I18nProvider';
import type { YoutubeVideo } from '@/lib/youtube';

type YouTubeSectionProps = {
  videos: YoutubeVideo[];
  title?: string;
  subtitle?: string;
};

/** Grille des dernières vidéos YouTube + lecteur en fenêtre modale. */
export function YouTubeSection({
  videos,
  title,
  subtitle,
}: YouTubeSectionProps) {
  const { t } = useI18n();
  const [playing, setPlaying] = useState<string | null>(null);
  const channel = site.socials.find((s) => s.id === 'youtube');

  if (videos.length === 0) return null;

  return (
    <section className="section" id="videos">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-5">
            <YoutubeIcon width={13} height={13} /> {t('home.youtube.eyebrow')}
          </span>
          <h2 className="text-3xl font-bold leading-[1.12] sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 text-sm text-cream/70 sm:text-base">{subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.videoId} delay={((i % 3) + 1) as 1 | 2 | 3} as="article">
              <button
                type="button"
                onClick={() => setPlaying(v.videoId)}
                className="card-3d group block w-full overflow-hidden rounded-2xl border border-white/10 bg-night-900/60 text-left"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={v.vignette || youtubeThumb(v.videoId)}
                    alt={v.titre}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/20 to-transparent" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-300/95 text-night-950 shadow-glow transition-transform duration-500 ease-expo group-hover:scale-110">
                      <Play width={20} height={20} />
                    </span>
                  </span>
                  {v.vues && (
                    <span className="absolute bottom-3 right-3 rounded-full bg-night-950/80 px-2.5 py-1 text-[0.65rem] font-medium text-cream/75">
                      {v.vues} {t('home.youtube.views')}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-cream/90 transition-colors duration-300 group-hover:text-gold-200">
                    {v.titre}
                  </h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a href={channel?.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <YoutubeIcon width={17} height={17} /> {t('home.youtube.cta')}
          </a>
        </Reveal>
      </div>

      {/* Lecteur modal */}
      {playing && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-night-950/95 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Lecteur vidéo"
          onClick={() => setPlaying(null)}
        >
          <div className={cn('w-full max-w-4xl')} onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-gold-200">{t('home.youtube.modal')}</p>
              <button
                type="button"
                onClick={() => setPlaying(null)}
                className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-cream/80 hover:text-cream"
              >
                {t('home.youtube.close')} ✕
              </button>
            </div>
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/15 bg-black shadow-card">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId(playing)}?autoplay=1&rel=0`}
                title="Lecteur YouTube Metamorphoo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default YouTubeSection;
