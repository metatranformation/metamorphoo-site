import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { YouTubeSection } from '@/components/YouTubeSection';
import { GalleryGrid } from '@/components/GalleryGrid';
import { SocialWall } from '@/components/SocialWall';
import { Mail, WhatsappIcon } from '@/components/Icons';
import { site, videos } from '@/lib/content';
import { getLatestVideos } from '@/lib/youtube';
import { youtubeId, youtubeThumb } from '@/lib/utils';
import { getLocale, getT, translateArray } from '@/lib/i18n';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t('media.title'),
    description: t('media.subtitle'),
    alternates: { canonical: '/medias' },
  };
}

export default async function MediasPage() {
  const t = await getT();
  const locale = await getLocale();
  const fallbackText = translateArray<{ titre: string }>(locale, 'data.videos');

  const channelId =
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || site.integrations.youtubeChannelId || '';
  const feed = await getLatestVideos(channelId, 6);

  const youtubeVideos =
    feed.length > 0
      ? feed
      : videos.map((v, i) => ({
          videoId: youtubeId(v.videoId),
          titre: fallbackText[i]?.titre ?? v.titre,
          publieLe: '',
          vignette: youtubeThumb(youtubeId(v.videoId)),
          vues: '',
        }));

  return (
    <>
      <PageHero
        breadcrumb={t('media.eyebrow')}
        eyebrow={t('media.eyebrow')}
        title={t('media.title')}
        subtitle={t('media.subtitle')}
        image="/images/action-concerts.jpg"
      />

      <section className="section pt-8">
        <div className="container-x">
          <YouTubeSection
            videos={youtubeVideos}
            title={t('media.videosTitle')}
            subtitle={t('media.videosSubtitle')}
          />
        </div>
      </section>

      <section className="section pt-0" id="galerie">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('media.gallery.eyebrow')}
            title={t('media.gallery.title')}
            subtitle={t('media.gallery.subtitle')}
          />
          <GalleryGrid />
        </div>
      </section>

      <section className="section pt-0" id="reseaux">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('media.reseaux.eyebrow')}
            title={t('media.reseaux.title')}
            subtitle={t('media.reseaux.subtitle')}
          />
          <SocialWall />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="glass rounded-3xl px-7 py-10 text-center sm:px-14">
            <h2 className="text-2xl font-bold sm:text-3xl">{t('media.press.title')}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/70">
              {t('media.press.text')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${site.contact.emails[0]}`} className="btn-gold">
                <Mail width={17} height={17} /> {site.contact.emails[0]}
              </a>
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsappIcon width={17} height={17} /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
