import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { AcademyClient } from '@/components/AcademyClient';
import { GoogleFormEmbed } from '@/components/GoogleFormEmbed';
import { ArrowRight, Check, Play, Shield, Users, WhatsappIcon } from '@/components/Icons';
import { getForm, site, totalLessons } from '@/lib/content';
import { getLocale, getT, translateArray, translateList } from '@/lib/i18n';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t('academy.title'),
    description: t('academy.subtitle'),
    alternates: { canonical: '/academie' },
  };
}

const STEP_ICONS = [Play, Users, Shield, Check];

export default async function AcademiePage() {
  const t = await getT();
  const form = getForm('formation');
  const locale = await getLocale();
  const steps = translateArray<{ titre: string; texte: string }>(locale, 'academy.steps');
  const bullets = translateList(locale, 'academy.validation.bullets');

  return (
    <>
      <PageHero
        breadcrumb={t('academy.eyebrow')}
        eyebrow={t('academy.eyebrow')}
        title={t('academy.title')}
        subtitle={t('academy.subtitle')}
        image="/images/action-education.jpg"
      />

      {/* ================= PARCOURS ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('academy.parcoursEyebrow')}
            title={t('academy.parcoursTitle')}
            align="left"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? Play;
              return (
                <Reveal key={s.titre} delay={((i % 4) + 1) as 1 | 2 | 3}>
                  <div className="glass h-full rounded-3xl p-6">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/25 to-emerald2-500/20 text-gold-200">
                      <Icon width={22} height={22} />
                    </span>
                    <h3 className="mt-5 text-base font-bold">{s.titre}</h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-cream/60">
                      {s.texte.replace('{lessons}', String(totalLessons))}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Modules + progression */}
          <div className="mt-16">
            <SectionHeading
              eyebrow={t('academy.modules.eyebrow')}
              title={t('academy.modules.title')}
              subtitle={t('academy.modules.subtitle')}
              align="left"
            />
            <AcademyClient />
          </div>
        </div>
      </section>

      {/* ================= VALIDATION ================= */}
      <section className="section pt-0" id="validation">
        <div className="container-x">
          <div className="glass relative overflow-hidden rounded-[2rem] px-7 py-12 sm:px-14">
            <div className="halo -right-16 -top-16 h-72 w-72 bg-violet2-500/22" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="eyebrow">{t('academy.validation.eyebrow')}</span>
                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                  {t('academy.validation.title')}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-cream/70">
                  {t('academy.validation.lead')}
                </p>
                <ul className="mt-7 space-y-3">
                  {bullets.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-cream/70">
                      <Check width={16} height={16} className="mt-0.5 shrink-0 text-emerald2-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#inscription-form" className="btn-gold">
                    {t('academy.validation.cta')} <ArrowRight width={16} height={16} />
                  </a>
                  <a
                    href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(t('academy.whatsappValidate'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <WhatsappIcon width={17} height={17} /> {t('academy.validation.cta2')}
                  </a>
                </div>
              </div>

              <div className="frame-img aspect-[4/3]">
                <img
                  src="/images/action-conferences.jpg"
                  alt={t('academy.validation.title')}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INSCRIPTION ================= */}
      <section className="section pt-0" id="inscription-form">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow={t('academy.inscription.eyebrow')}
            title={t('academy.inscription.title')}
            subtitle={t('academy.inscription.subtitle')}
          />
          <div className="mt-12">
            <GoogleFormEmbed
              formId={form.googleFormId}
              height={form.googleFormHeight}
              titre={t('data.forms.formation.titre')}
              description={t('data.forms.formation.description')}
            />
          </div>
          <Reveal className="mt-10 text-center text-xs text-cream/40">
            {t('academy.formFallback')}{' '}
            <Link href="/contact" className="text-gold-200 underline-offset-4 hover:underline">
              {t('academy.write')}
            </Link>{' '}
            {t('academy.orCall')}
          </Reveal>
        </div>
      </section>
    </>
  );
}
