import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { StatBand } from '@/components/StatBand';
import { ActionCardGrid } from '@/components/ActionCardGrid';
import { MetamorphoseStage } from '@/components/MetamorphoseStage';
import { BrandJourney } from '@/components/BrandJourney';
import { Testimonials } from '@/components/Testimonials';
import { FaqAccordion } from '@/components/FaqAccordion';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { YouTubeSection } from '@/components/YouTubeSection';
import { SocialWall } from '@/components/SocialWall';
import { PaymentBadges } from '@/components/PaymentBadges';
import { Book, Butterfly, Globe, Heart, Sparkle, Users } from '@/components/Icons';
import { actions, site, totalLessons, videos } from '@/lib/content';
import { getLatestVideos } from '@/lib/youtube';
import { getLocale, getT, translateList } from '@/lib/i18n';
import { youtubeId, youtubeThumb } from '@/lib/utils';

export const revalidate = 3600;

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getT();
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

  const SPHERES = [
    { icone: Sparkle, titre: t('home.objectif.spheres.0.titre'), texte: t('home.objectif.spheres.0.texte') },
    { icone: Heart, titre: t('home.objectif.spheres.1.titre'), texte: t('home.objectif.spheres.1.texte') },
    { icone: Book, titre: t('home.objectif.spheres.2.titre'), texte: t('home.objectif.spheres.2.texte') },
    { icone: Users, titre: t('home.objectif.spheres.3.titre'), texte: t('home.objectif.spheres.3.texte') },
    { icone: Globe, titre: t('home.objectif.spheres.4.titre'), texte: t('home.objectif.spheres.4.texte') },
  ];

  const visionBullets = translateList(locale, 'home.vision.bullets');
  const noyauBullets = translateList(locale, 'home.noyau.bullets');

  return (
    <>
      <Hero />

      <StatBand />

      {/* ================= FILM DE LA MARQUE ================= */}
      <BrandJourney />

      {/* ================= VISION ================= */}
      <section className="section" id="vision">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="frame-img aspect-[4/3]">
              <img
                src="/images/action-education.jpg"
                alt="Illustration 3D du renouvellement de l'intelligence — un livre dont les pages deviennent des papillons"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glass absolute -bottom-8 -right-2 max-w-[15rem] rounded-2xl p-5 animate-float sm:-right-8">
              <p className="font-display text-3xl font-extrabold text-gradient">{t('home.vision.cardTitle')}</p>
              <p className="mt-2 text-xs leading-relaxed text-cream/65">{t('home.vision.cardText')}</p>
            </div>
            <div className="halo -left-10 top-10 h-56 w-56 bg-violet2-500/20" />
          </Reveal>

          <Reveal delay={1}>
            <span className="eyebrow">{t('home.vision.eyebrow')}</span>
            <h2 className="mt-5 text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
              {t('home.vision.title')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream/70">{t('home.vision.lead1')}</p>
            <p className="mt-4 text-sm leading-relaxed text-cream/55">{t('home.vision.lead2')}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {visionBullets.map((item) => (
                <li key={item} className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm text-cream/80">
                  <Butterfly width={17} height={17} className="shrink-0 text-gold-300" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/vision-mission" className="btn-gold mt-9">
              {t('home.vision.cta')}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="section" id="mission">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('home.mission.eyebrow')}
            title={t('home.mission.title')}
            subtitle={t('home.mission.subtitle')}
          />

          <div className="mt-16">
            <ActionCardGrid actions={actions.slice(0, 6)} />
          </div>

          <Reveal className="mt-12 text-center">
            <Link href="/actions" className="btn-ghost">
              {t('home.mission.cta')}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= MÉTAMORPHOSE ================= */}
      <MetamorphoseStage />

      {/* ================= OBJECTIF ================= */}
      <section className="section" id="objectif">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('home.objectif.eyebrow')}
            title={t('home.objectif.title')}
            subtitle={t('home.objectif.subtitle')}
          />

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SPHERES.map((s, i) => (
              <Reveal key={s.titre} delay={((i % 4) + 1) as 1 | 2 | 3}>
                <div className="card-3d group h-full rounded-3xl border border-white/10 bg-night-900/50 p-6 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/25 to-emerald2-500/20 text-gold-200 transition-transform duration-500 group-hover:scale-110">
                    <s.icone width={24} height={24} />
                  </span>
                  <h3 className="mt-5 text-base font-bold">{s.titre}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-cream/60">{s.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NOYAU DE 12 ================= */}
      <section className="section" id="noyau">
        <div className="container-x">
          <div className="glass relative overflow-hidden rounded-[2rem] px-7 py-12 sm:px-14">
            <div className="halo -left-16 -top-16 h-72 w-72 bg-gold-400/20 animate-pulse-glow" />
            <img
              src="/images/action-leadership.jpg"
              alt="Douze leaders sur une colline face à une ville"
              className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-20 lg:block"
            />
            <div className="relative max-w-2xl">
              <span className="eyebrow">{t('home.noyau.eyebrow')}</span>
              <h2 className="mt-5 text-3xl font-bold leading-[1.12] sm:text-4xl">
                {t('home.noyau.title')}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-cream/70">{t('home.noyau.lead')}</p>
              <ul className="mt-7 space-y-3">
                {noyauBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-cream/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/leaders" className="btn-gold">
                  {t('home.noyau.cta1')}
                </Link>
                <Link href="/contact" className="btn-ghost">
                  {t('home.noyau.cta2')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= YOUTUBE ================= */}
      <YouTubeSection videos={youtubeVideos} />

      {/* ================= TÉMOIGNAGES ================= */}
      <Testimonials />

      {/* ================= ACADÉMIE ================= */}
      <section className="section" id="academie">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">{t('home.academy.eyebrow')}</span>
            <h2 className="mt-5 text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
              {t('home.academy.title')}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream/70">{t('home.academy.lead')}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { k: `${totalLessons}`, v: t('home.academy.stat1') },
                { k: '4', v: t('home.academy.stat2') },
                { k: '100%', v: t('home.academy.stat3') },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl p-5">
                  <p className="font-display text-2xl font-extrabold text-gradient">{s.k}</p>
                  <p className="mt-1 text-xs text-cream/55">{s.v}</p>
                </div>
              ))}
            </div>
            <Link href="/academie" className="btn-emerald mt-9">
              {t('home.academy.cta')}
            </Link>
          </Reveal>

          <Reveal delay={1} className="relative">
            <div className="frame-img aspect-[4/3]">
              <img
                src="/images/action-ateliers.jpg"
                alt="Atelier de formation Metamorphoo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glass absolute -left-4 bottom-8 max-w-[16rem] rounded-2xl p-5 animate-float-slow sm:-left-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-200">
                {t('home.academy.cardTitle')}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-cream/65">{t('home.academy.cardText')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= DONS ================= */}
      <section className="section" id="soutenir">
        <div className="container-x">
          <div className="glass relative overflow-hidden rounded-[2rem] px-7 py-12 text-center sm:px-14">
            <img
              src="/images/action-humanitaire.jpg"
              alt="Action humanitaire Oasis de vie"
              className="absolute inset-0 h-full w-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/85 to-night-950" />
            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow">{t('home.dons.eyebrow')}</span>
              <h2 className="mt-5 text-3xl font-bold leading-[1.12] sm:text-4xl">
                {t('home.dons.title')}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-cream/70">{t('home.dons.lead')}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/dons" className="btn-gold">
                  {t('home.dons.cta1')}
                </Link>
                <Link href="/dons#nature" className="btn-ghost">
                  {t('home.dons.cta2')}
                </Link>
              </div>
              <PaymentBadges className="mt-9 justify-center" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= RÉSEAUX SOCIAUX ================= */}
      <section className="section" id="reseaux">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('home.reseaux.eyebrow')}
            title={t('home.reseaux.title')}
            subtitle={t('home.reseaux.subtitle')}
          />
          <SocialWall />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section" id="faq">
        <div className="container-x">
          <SectionHeading eyebrow={t('home.faq.eyebrow')} title={t('home.faq.title')} />
          <FaqAccordion />
        </div>
      </section>

      {/* ================= CANAL WHATSAPP ================= */}
      {site.contact.whatsappChannel && (
        <section className="section pt-0">
          <div className="container-x">
            <Reveal className="glass flex flex-col items-center gap-6 rounded-3xl px-7 py-10 text-center sm:px-14">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#25D366]/15 text-[#25D366]">
                📣
              </span>
              <h2 className="max-w-2xl text-2xl font-bold sm:text-3xl">{site.contact.whatsappChannelLabel}</h2>
              <p className="max-w-xl text-sm leading-relaxed text-cream/65">
                {t('home.reseaux.subtitle')}
              </p>
              <a
                href={site.contact.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                Rejoindre le canal
              </a>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
