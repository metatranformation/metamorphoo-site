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

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Médias & Galerie',
  description:
    'Vidéos YouTube, galerie photos et réseaux sociaux de METAMORPHOO : enseignements, témoignages, camps, conférences et actions humanitaires.',
  alternates: { canonical: '/medias' },
};

export default async function MediasPage() {
  const channelId =
    process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || site.integrations.youtubeChannelId || '';
  const feed = await getLatestVideos(channelId, 6);

  const youtubeVideos =
    feed.length > 0
      ? feed
      : videos.map((v) => ({
          videoId: youtubeId(v.videoId),
          titre: v.titre,
          publieLe: '',
          vignette: youtubeThumb(youtubeId(v.videoId)),
          vues: '',
        }));

  return (
    <>
      <PageHero
        breadcrumb="Médias"
        eyebrow="Galerie · Vidéos · Réseaux"
        title={
          <>
            La vie du mouvement en <span className="text-gradient">images</span>
          </>
        }
        subtitle="Camps, conférences, concerts, actions humanitaires : revivez les temps forts de METAMORPHOO et suivez-nous sur toutes nos plateformes."
        image="/images/action-concerts.jpg"
      />

      <section className="section pt-8">
        <div className="container-x">
          <YouTubeSection
            videos={youtubeVideos}
            title="Nos dernières vidéos"
            subtitle="Enseignements, témoignages et temps de louange — en direct sur notre chaîne YouTube."
          />
        </div>
      </section>

      <section className="section pt-0" id="galerie">
        <div className="container-x">
          <SectionHeading
            eyebrow="Galerie"
            title={
              <>
                Instants de <span className="text-gradient">transformation</span>
              </>
            }
            subtitle="Cliquez sur une image pour l’agrandir. Les visuels sont librement remplaçables dans le dossier public/images."
          />
          <GalleryGrid />
        </div>
      </section>

      <section className="section pt-0" id="reseaux">
        <div className="container-x">
          <SectionHeading
            eyebrow="Réseaux sociaux"
            title={
              <>
                Rejoignez la <span className="text-gradient">communauté</span> en ligne
              </>
            }
            subtitle="Facebook, Instagram, YouTube, TikTok et groupes WhatsApp : le mouvement est connecté partout."
          />
          <SocialWall />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="glass rounded-3xl px-7 py-10 text-center sm:px-14">
            <h2 className="text-2xl font-bold sm:text-3xl">Vous êtes journaliste, créateur ou partenaire média ?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/70">
              Nous mettons à disposition des visuels, des témoignages et des données sur les actions du
              mouvement. Contactez notre équipe communication.
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
