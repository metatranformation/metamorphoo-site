import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Logo } from '@/components/Logo';
import { ActionCardGrid } from '@/components/ActionCardGrid';
import { ArrowRight, Book, Butterfly, Globe, Heart, Sparkle, Users } from '@/components/Icons';
import { actions, site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Vision & Mission',
  description:
    'La transformation holistique pour le réveil authentique et durable dans les nations : origine, ADN, mission, objectif, cibles, stratégie de mobilisation et charte graphique de METAMORPHOO.',
  alternates: { canonical: '/vision-mission' },
};

const TIMELINE = [
  {
    date: 'Juillet 2023',
    titre: 'La retraite de la jeunesse Chrisco',
    texte:
      'Lors d’une retraite organisée avec la jeunesse de Chrisco (circonscription de Goma), le couple Pasteur – Entrepreneur – Chantre Fidèle BUMBA OBUTU et son épouse Clarice BUMBA reçoivent de Dieu l’inspiration de METAMORPHOO.',
  },
  {
    date: 'Le fondement',
    titre: 'Romains 12:2',
    texte:
      '« Soyez transformés par le renouvellement de l’intelligence. » La métamorphose devient l’ADN, le nom et la méthode du mouvement.',
  },
  {
    date: 'La confirmation',
    titre: 'Paroles prophétiques',
    texte:
      'Le mouvement est confirmé par des paroles prophétiques de l’Apôtre Hary Das (de son vivant) et de plusieurs patriarches à travers le monde.',
  },
  {
    date: 'L’attise',
    titre: 'La vision de l’œuvre Chrisco',
    texte:
      'Attisé par la vision de l’œuvre Chrisco expliquée au point 4 par l’Apôtre Samuel Emmanuel Dikanakina : le réveil de l’Église qui impactera des nations et des gouvernements.',
  },
];

const SPHERES = [
  { icone: Sparkle, titre: 'L’esprit', texte: 'Relation avec Dieu' },
  { icone: Heart, titre: 'L’âme et le corps', texte: 'Émotions, volonté, pensées, corps' },
  { icone: Book, titre: 'L’éducation', texte: 'Intelligence et savoir' },
  { icone: Users, titre: 'Les professions', texte: 'Impact dans le travail' },
  { icone: Globe, titre: 'La société et les nations', texte: 'Communautés, villes, gouvernements' },
];

const ACCOMPAGNEMENT = [
  {
    titre: 'Orientées vers une Église locale',
    texte: 'Les personnes sans Église d’attache sont orientées vers une Église de la place, pour y être réellement disciples.',
  },
  {
    titre: 'Encadrées dans le mouvement',
    texte: 'Celles qui le souhaitent sont encadrées directement dans METAMORPHOO et intégrées à la vie du noyau.',
  },
  {
    titre: 'Intégrées dans la vision des Triomphes',
    texte: 'Participation au projet des Triomphes, en cours de construction par le couple porteur de la vision.',
  },
];

const PALETTE = [
  { nom: 'Nuit profonde', hex: '#04060F', usage: 'Fond principal, profondeur, mystère' },
  { nom: 'Or transformation', hex: '#F5B942', usage: 'Titres, appels à l’action, lumière' },
  { nom: 'Émeraude de vie', hex: '#2ED39B', usage: 'Actions humanitaires, validation' },
  { nom: 'Violet de l’Esprit', hex: '#7C5CFF', usage: 'Accents spirituels, chrysalide' },
  { nom: 'Crème', hex: '#F7F3EA', usage: 'Textes courants' },
];

export default function VisionMissionPage() {
  return (
    <>
      <PageHero
        breadcrumb="Vision & Mission"
        eyebrow="Vision · Mission · ADN"
        title={
          <>
            Une vision de <span className="text-gradient">transformation</span> et de réveil
          </>
        }
        subtitle="METAMORPHOO MOVEMENT — la transformation holistique pour le réveil authentique et durable dans les nations."
        image="/images/stage-chrysalis.jpg"
      />

      {/* ================= VISION ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <Reveal className="glass relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] px-7 py-14 text-center sm:px-16">
            <div className="halo left-1/2 top-0 h-64 w-64 -translate-x-1/2 bg-gold-400/20 animate-pulse-glow" />
            <span className="eyebrow relative">Notre vision</span>
            <p className="relative mt-7 font-display text-2xl font-bold leading-snug sm:text-4xl sm:leading-tight">
              « La transformation holistique pour le <span className="text-gradient">réveil authentique</span> et
              durable dans les nations. »
            </p>
            <p className="relative mt-7 text-sm text-cream/50">
              {site.brand.verse} — <span className="text-gold-200">{site.brand.verseRef}</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= ORIGINE ================= */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow="Origine et ADN"
            title={
              <>
                Comment est né <span className="text-gradient">METAMORPHOO</span>
              </>
            }
            subtitle="Un mouvement du Saint-Esprit pour les nations, né d'une rencontre avec Dieu et confirmé par des voix prophétiques."
          />

          <div className="relative mt-16">
            <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold-300/60 via-emerald2-400/40 to-transparent sm:block" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <Reveal key={item.titre} delay={((i % 4) + 1) as 1 | 2 | 3} className="relative sm:pl-16">
                  <span className="absolute left-0 top-2 hidden h-8 w-8 place-items-center rounded-full border border-gold-300/50 bg-night-950 sm:grid">
                    <span className="h-2 w-2 rounded-full bg-gold-300 shadow-glow" />
                  </span>
                  <div className="glass rounded-2xl p-6 sm:p-7">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-gold-200/80">
                      {item.date}
                    </p>
                    <h3 className="mt-2 text-xl font-bold">{item.titre}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/70">{item.texte}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mx-auto mt-12 max-w-3xl rounded-2xl border border-violet2-500/30 bg-violet2-500/10 p-7 text-center">
            <p className="text-sm leading-relaxed text-cream/75">
              <strong className="text-violet2-400">METAMORPHOO n’est pas une Église</strong>, mais un mouvement
              du Saint-Esprit pour les nations. C’est une plateforme missionnaire qui peut faire naître des
              Églises.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow="Mission"
            title={
              <>
                Former, équiper et <span className="text-gradient">activer</span> les croyants
              </>
            }
            subtitle="Devenir des acteurs du réveil, à travers des actions contextualisées selon les besoins spécifiques de chaque nation."
          />
          <div className="mt-16">
            <ActionCardGrid actions={actions} />
          </div>
        </div>
      </section>

      {/* ================= OBJECTIF ================= */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow="Objectif"
            title={
              <>
                Un réveil <span className="text-gradient">holistique</span> en 5 sphères
              </>
            }
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {SPHERES.map((s, i) => (
              <Reveal key={s.titre} delay={((i % 4) + 1) as 1 | 2 | 3}>
                <div className="card-3d h-full rounded-3xl border border-white/10 bg-night-900/50 p-6 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/25 to-emerald2-500/20 text-gold-200">
                    <s.icone width={24} height={24} />
                  </span>
                  <h3 className="mt-5 text-base font-bold">{s.titre}</h3>
                  <p className="mt-2 text-xs text-cream/50">{s.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 glass rounded-3xl p-7 sm:p-9">
            <h3 className="text-lg font-bold">Cibles</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              Toutes les sphères de la société vivant dans un état de sommeil spirituel, moral ou intellectuel
              dans chaque nation : familles, Églises, communautés, villes, nations, domaines professionnels
              (médecins, avocats, politiciens, intellectuels…), milieux intellectuels et entrepreneuriaux.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= ACCOMPAGNEMENT ================= */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow="Accompagnement"
            title={
              <>
                Les nouvelles âmes ne sont jamais <span className="text-gradient">abandonnées</span>
              </>
            }
            subtitle="Trois voies d'intégration, selon la situation de chacun."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {ACCOMPAGNEMENT.map((item, i) => (
              <Reveal key={item.titre} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="glass h-full rounded-3xl p-7">
                  <span className="font-display text-4xl font-extrabold text-white/10">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-bold">{item.titre}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{item.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CHARTE GRAPHIQUE ================= */}
      <section className="section pt-0" id="charte">
        <div className="container-x">
          <SectionHeading
            eyebrow="Charte graphique"
            title={
              <>
                L’identité visuelle <span className="text-gradient">METAMORPHOO</span>
              </>
            }
            subtitle="Un papillon dont les veines dessinent un « M », la chrysalide violette sur l'aile : la métamorphose comme signature."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <Reveal className="glass flex flex-col items-center justify-center rounded-3xl p-10 text-center">
              <Logo size={120} withWordmark={false} />
              <p className="mt-6 font-display text-2xl font-extrabold tracking-[0.16em]">METAMORPHOO</p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-gold-300/80">
                Movement
              </p>
              <div className="divider-glow my-7 w-full" />
              <p className="text-xs leading-relaxed text-cream/50">
                Le logo se décline en version monochrome (or, crème, nuit) pour l’impression, les tissus et les
                réseaux sociaux. Fichier source : <code className="rounded bg-white/10 px-1.5 py-0.5">public/logo.svg</code>.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-400 text-night-950">
                  <Logo size={26} withWordmark={false} />
                </span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cream text-night-950">
                  <Logo size={26} withWordmark={false} />
                </span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-night-950">
                  <Logo size={26} withWordmark={false} />
                </span>
              </div>
            </Reveal>

            <div className="space-y-6">
              <Reveal delay={1} className="glass rounded-3xl p-7">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-200">Palette chromatique</h3>
                <div className="mt-5 space-y-3">
                  {PALETTE.map((c) => (
                    <div key={c.hex} className="flex items-center gap-4">
                      <span
                        className="h-11 w-11 shrink-0 rounded-xl border border-white/15"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-cream">{c.nom}</span>
                        <span className="block text-[0.7rem] text-cream/50">{c.usage}</span>
                      </span>
                      <code className="rounded bg-white/10 px-2 py-1 text-[0.7rem] text-gold-200">{c.hex}</code>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={2} className="glass rounded-3xl p-7">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-200">Typographie</h3>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/40">Titres — Playfair Display / Georgia</p>
                    <p className="mt-1 font-display text-3xl font-bold">Transformation & Réveil</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/40">Textes — Inter / system-ui</p>
                    <p className="mt-1 text-sm text-cream/70">
                      Former, équiper et activer les croyants pour devenir des acteurs du réveil dans les nations.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Or', 'Émeraude', 'Violet', 'Nuit', 'Crème'].map((t) => (
                    <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-[0.68rem] text-cream/60">
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-10 text-center">
            <Link href="/medias" className="btn-ghost">
              Voir les médias & la galerie <ArrowRight width={16} height={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= CITATION ================= */}
      <section className="section pt-0">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-gold-300/25 px-7 py-14 text-center sm:px-16">
            <img src="/images/hero-butterfly.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-night-950/80 via-night-950/90 to-night-950" />
            <div className="relative">
              <Butterfly width={40} height={40} className="mx-auto text-gold-300" />
              <p className="mx-auto mt-6 max-w-3xl font-display text-xl font-bold leading-relaxed sm:text-3xl">
                « Chaque croyant transformé devient une oasis de vie, et chaque nation touchée devient un
                témoignage. »
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-gold">
                  Rejoindre le mouvement
                </Link>
                <Link href="/dons" className="btn-ghost">
                  Soutenir la vision
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
