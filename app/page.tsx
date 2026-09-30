import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { StatBand } from '@/components/StatBand';
import { ActionCardGrid } from '@/components/ActionCardGrid';
import { MetamorphoseStage } from '@/components/MetamorphoseStage';
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
import { youtubeId, youtubeThumb } from '@/lib/utils';

export const revalidate = 3600;

const SPHERES = [
  {
    icone: Sparkle,
    titre: 'L’esprit',
    texte: 'La relation avec Dieu restaurée et continuellement renouvelée.',
  },
  {
    icone: Heart,
    titre: 'L’âme et le corps',
    texte: 'Les émotions, la volonté, les pensées et le corps rendus à leur dessein.',
  },
  {
    icone: Book,
    titre: 'L’éducation',
    texte: 'L’intelligence et le savoir au service de la vérité et de la nation.',
  },
  {
    icone: Users,
    titre: 'Les professions',
    texte: 'Un impact concret dans le travail : médecine, droit, politique, entreprise, arts.',
  },
  {
    icone: Globe,
    titre: 'La société et les nations',
    texte: 'Des communautés, des villes et des gouvernements touchés par le réveil.',
  },
];

export default async function HomePage() {
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
      <Hero />

      <StatBand />

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
              <p className="font-display text-3xl font-extrabold text-gradient">Romains 12:2</p>
              <p className="mt-2 text-xs leading-relaxed text-cream/70">
                « Ne vous conformez pas au siècle présent… » Le texte fondateur du mouvement.
              </p>
            </div>
            <div className="halo -left-10 top-10 h-56 w-56 bg-violet2-500/20" />
          </Reveal>

          <Reveal delay={1}>
            <span className="eyebrow">Notre vision</span>
            <h2 className="mt-5 text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
              La transformation holistique pour le <span className="text-gradient">réveil authentique</span> et
              durable dans les nations
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream/70">
              Né en {site.brand.founded} d’une retraite avec la jeunesse de Chrisco (circonscription de Goma),
              METAMORPHOO est porté par le couple {site.brand.founders}. Le mouvement est confirmé par des
              paroles prophétiques et attisé par la vision de l’œuvre Chrisco : le réveil de l’Église qui
              impactera des nations et des gouvernements.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/50">{site.brand.legalNote}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Former et équiper les croyants',
                'Activer les acteurs du réveil',
                'Contextualiser chaque action',
                'Accompagner les nouvelles âmes',
              ].map((item) => (
                <li key={item} className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm text-cream/80">
                  <Butterfly width={17} height={17} className="shrink-0 text-gold-300" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href="/vision-mission" className="btn-gold mt-9">
              Lire la vision complète
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="section" id="mission">
        <div className="container-x">
          <SectionHeading
            eyebrow="Notre mission"
            title={
              <>
                Former, équiper et <span className="text-gradient">activer</span> les croyants
              </>
            }
            subtitle="Chaque action est contextualisée selon les besoins spécifiques de réveil : familles, Églises, communautés, villes, nations, domaines professionnels, intellectuels et entrepreneuriat."
          />

          <div className="mt-16">
            <ActionCardGrid actions={actions.slice(0, 6)} />
          </div>

          <Reveal className="mt-12 text-center">
            <Link href="/actions" className="btn-ghost">
              Découvrir les 8 domaines d’action
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
            eyebrow="Notre objectif"
            title={
              <>
                Déclencher un réveil <span className="text-gradient">holistique</span>
              </>
            }
            subtitle="Un réveil qui ne laisse aucun domaine de côté : de la relation avec Dieu jusqu’à l’impact sur les nations."
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
              <span className="eyebrow">Stratégie de mobilisation</span>
              <h2 className="mt-5 text-3xl font-bold leading-[1.12] sm:text-4xl">
                Un noyau de <span className="text-gradient">12 leaders clés</span> dans chaque ville
              </h2>
              <p className="mt-5 text-base leading-relaxed text-cream/70">
                Un critère unique : <em>« avoir le fardeau du réveil et être prêt au sacrifice pour
                l’accomplir »</em>. Ces leaders, issus de différentes Églises et domaines professionnels,
                organisent les actions METAMORPHOO dans leur zone sous l’orientation des visionnaires, avec un
                contact permanent pour être prêts à toute activation divine.
              </p>
              <ul className="mt-7 space-y-3">
                {[
                  'Réunions régulières en ligne et en présentiel, surtout avant chaque grande action',
                  'Responsables des besoins organisationnels de chaque action',
                  'Accompagnement des nouvelles âmes : orientation vers une Église locale, encadrement dans le mouvement ou intégration dans la vision des Triomphes',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-cream/70">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/leaders" className="btn-gold">
                  Devenir leader clé
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Nous rejoindre
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
            <span className="eyebrow">Metamorphoo Académie</span>
            <h2 className="mt-5 text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
              La formation en ligne, puis l’<span className="text-gradient">interview de validation</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-cream/70">
              Suivez des modules vidéo sur YouTube, à votre rythme, où que vous soyez. Votre progression est
              enregistrée. À la fin du parcours, vous validez votre candidature : vous êtes ensuite appelé en
              ligne ou en présentiel pour l’entretien de validation.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { k: `${totalLessons}`, v: 'leçons vidéo' },
                { k: '4', v: 'modules progressifs' },
                { k: '100%', v: 'gratuit & en ligne' },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl p-5">
                  <p className="font-display text-2xl font-extrabold text-gradient">{s.k}</p>
                  <p className="mt-1 text-xs text-cream/50">{s.v}</p>
                </div>
              ))}
            </div>
            <Link href="/academie" className="btn-emerald mt-9">
              Commencer la formation
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-200">Validation</p>
              <p className="mt-2 text-xs leading-relaxed text-cream/70">
                Vidéos terminées → questionnaire → appel en ligne ou présentiel → intégration.
              </p>
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
            <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/80 to-night-950" />
            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow">Soutenir le mouvement</span>
              <h2 className="mt-5 text-3xl font-bold leading-[1.12] sm:text-4xl">
                Offrandes, dons, dîmes et <span className="text-gradient">partenariats</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-cream/70">
                Metamorphoo est une organisation chrétienne à but non lucratif. Dieu reste le bailleur de fonds
                par excellence : offrandes, dons, vœux et partenaires de soutien ponctuel, hebdomadaire,
                mensuel et annuel — en espèces comme en nature.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/dons" className="btn-gold">
                  Faire un don / soutenir
                </Link>
                <Link href="/dons#nature" className="btn-ghost">
                  Don en nature
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
            eyebrow="Communication & visibilité"
            title={
              <>
                Suivez-nous sur nos <span className="text-gradient">espaces numériques</span>
              </>
            }
            subtitle="Facebook, Instagram, YouTube, TikTok, groupes et chaînes WhatsApp : le mouvement est vivant partout, rejoignez la communauté."
          />
          <SocialWall />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section" id="faq">
        <div className="container-x">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title={
              <>
                Tout ce que vous devez <span className="text-gradient">savoir</span>
              </>
            }
          />
          <FaqAccordion />
        </div>
      </section>
    </>
  );
}
