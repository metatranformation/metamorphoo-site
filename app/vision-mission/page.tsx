import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Logo } from '@/components/Logo';
import { ActionCardGrid } from '@/components/ActionCardGrid';
import { ArrowRight, Book, Butterfly, Globe, Heart, Sparkle, Users } from '@/components/Icons';
import { actions, site } from '@/lib/content';
import { getLocale, getT, translateArray } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t('vision.title'),
    description: t('vision.subtitle'),
    alternates: { canonical: '/vision-mission' },
  };
}

const SPHERE_ICONS = [Sparkle, Heart, Book, Users, Globe];

export default async function VisionMissionPage() {
  const t = await getT();
  const locale = await getLocale();

  const timeline = translateArray<{ date: string; titre: string; texte: string }>(locale, 'vision.origin.timeline');
  const spheres = translateArray<{ titre: string; texte: string }>(locale, 'vision.objectif.spheres');
  const accompagnement = translateArray<{ titre: string; texte: string }>(locale, 'vision.accompagnement.items');
  const palette = translateArray<{ nom: string; hex: string; usage: string }>(locale, 'vision.charte.palette');

  return (
    <>
      <PageHero
        breadcrumb={t('vision.eyebrow')}
        eyebrow={t('vision.eyebrow')}
        title={
          <>
            {t('vision.title')}
          </>
        }
        subtitle={t('vision.subtitle')}
        image="/images/stage-chrysalis.jpg"
      />

      {/* ================= VISION ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <Reveal className="glass relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] px-7 py-14 text-center sm:px-16">
            <div className="halo left-1/2 top-0 h-64 w-64 -translate-x-1/2 bg-gold-400/20 animate-pulse-glow" />
            <span className="eyebrow relative">{t('vision.eyebrow')}</span>
            <p className="relative mt-7 font-display text-2xl font-bold leading-snug sm:text-4xl sm:leading-tight">
              {t('vision.quote')}
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
            eyebrow={t('vision.origin.eyebrow')}
            title={t('vision.origin.title')}
            subtitle={t('vision.origin.subtitle')}
          />

          <div className="relative mt-16">
            <div className="absolute left-4 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gold-300/60 via-emerald2-400/40 to-transparent sm:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
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
            <p className="text-sm leading-relaxed text-cream/75">{t('vision.origin.note')}</p>
          </Reveal>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('vision.mission.eyebrow')}
            title={t('vision.mission.title')}
            subtitle={t('vision.mission.subtitle')}
          />
          <div className="mt-16">
            <ActionCardGrid actions={actions} />
          </div>
        </div>
      </section>

      {/* ================= OBJECTIF ================= */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading eyebrow={t('vision.objectif.eyebrow')} title={t('vision.objectif.title')} />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {spheres.map((s, i) => {
              const Icon = SPHERE_ICONS[i] ?? Sparkle;
              return (
                <Reveal key={s.titre} delay={((i % 4) + 1) as 1 | 2 | 3}>
                  <div className="card-3d h-full rounded-3xl border border-white/10 bg-night-900/50 p-6 text-center">
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/25 to-emerald2-500/20 text-gold-200">
                      <Icon width={24} height={24} />
                    </span>
                    <h3 className="mt-5 text-base font-bold">{s.titre}</h3>
                    <p className="mt-2 text-xs text-cream/50">{s.texte}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12 glass rounded-3xl p-7 sm:p-9">
            <h3 className="text-lg font-bold">{t('vision.objectif.cibles.titre')}</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">{t('vision.objectif.cibles.texte')}</p>
          </Reveal>
        </div>
      </section>

      {/* ================= ACCOMPAGNEMENT ================= */}
      <section className="section pt-0">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('vision.accompagnement.eyebrow')}
            title={t('vision.accompagnement.title')}
            subtitle={t('vision.accompagnement.subtitle')}
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {accompagnement.map((item, i) => (
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
            eyebrow={t('vision.charte.eyebrow')}
            title={t('vision.charte.title')}
            subtitle={t('vision.charte.subtitle')}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <Reveal className="glass flex flex-col items-center justify-center rounded-3xl p-10 text-center">
              <Logo size={130} withWordmark={false} animated />
              <p className="mt-6 font-display text-2xl font-extrabold tracking-[0.16em]">METAMORPHOO</p>
              <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-gold-300/80">
                Movement
              </p>
              <div className="divider-glow my-7 w-full" />
              <p className="text-xs leading-relaxed text-cream/50">{t('vision.charte.logoCaption')}</p>
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
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-200">
                  {t('vision.charte.paletteTitle')}
                </h3>
                <div className="mt-5 space-y-3">
                  {palette.map((c) => (
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
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold-200">
                  {t('vision.charte.typoTitle')}
                </h3>
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/40">
                      {t('vision.charte.typoDisplay')}
                    </p>
                    <p className="mt-1 font-display text-3xl font-bold">Transformation &amp; Réveil</p>
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/40">
                      {t('vision.charte.typoBody')}
                    </p>
                    <p className="mt-1 text-sm text-cream/70">{t('vision.charte.typoSample')}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal className="mt-10 text-center">
            <Link href="/medias" className="btn-ghost">
              {t('vision.charte.cta')} <ArrowRight width={16} height={16} />
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
                {t('vision.closing.quote')}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-gold">
                  {t('vision.closing.cta1')}
                </Link>
                <Link href="/dons" className="btn-ghost">
                  {t('vision.closing.cta2')}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
