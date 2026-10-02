import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { ActionCardGrid } from '@/components/ActionCardGrid';
import { GoogleFormEmbed } from '@/components/GoogleFormEmbed';
import { Calendar, Check, MapPin } from '@/components/Icons';
import { actions, getForm, site } from '@/lib/content';
import agenda from '@/content/agenda.json';
import { localeFromParams, localePath, translate, translateArray, translateList } from '@/lib/i18n';
import { LOCALE_TAGS } from '@/lib/i18n-core';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  return {
    title: t('actions.title'),
    description: t('actions.subtitle'),
    alternates: { canonical: '/actions' },
  };
}

export default async function ActionsPage({ params }: { params: { locale: string } }) {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  const form = getForm('visiteur');
  const tag = LOCALE_TAGS[locale];
  const agendaText = translateArray<{ id: string; titre: string; description: string }>(
    locale,
    'data.agenda',
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(tag, { day: 'numeric', month: 'long', year: 'numeric' });

  const textFor = (i: number) => agendaText[i] ?? { titre: '', description: '' };

  return (
    <>
      <PageHero
        breadcrumb={t('actions.eyebrow')}
        eyebrow={t('actions.eyebrow')}
        title={t('actions.title')}
        subtitle={t('actions.subtitle')}
        image="/images/action-camps.jpg"
      />

      {/* ================= GRILLE ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <ActionCardGrid actions={actions} />
        </div>
      </section>

      {/* ================= DÉTAIL ================= */}
      <section className="section pt-0">
        <div className="container-x space-y-20">
          {actions.map((action, i) => {
            const titre = t(`data.actions.${action.id}.titre`);
            const categorie = t(`data.actions.${action.id}.categorie`);
            const contenu = t(`data.actions.${action.id}.contenu`);
            const points = [0, 1, 2, 3, 4]
              .map((k) => t(`data.actions.${action.id}.points.${k}`))
              .filter((v) => v && !v.startsWith('data.'));

            return (
              <Reveal
                key={action.id}
                className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>figure]:order-2' : ''}`}
              >
                <figure className="frame-img aspect-[16/11]">
                  <img
                    src={action.image}
                    alt={`${titre} — Metamorphoo`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </figure>

                <div>
                  <span className="eyebrow">{categorie}</span>
                  <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">{titre}</h2>
                  <p className="mt-5 text-base leading-relaxed text-cream/70">{contenu}</p>
                  <ul className="mt-7 space-y-3">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-cream/70">
                        <Check width={16} height={16} className="mt-0.5 shrink-0 text-emerald2-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={localePath(locale, '/contact')} className="btn-gold">
                      {t('actions.cta')}
                    </Link>
                    <a
                      href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`${t('actions.whatsappMsg')} ${titre}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                    >
                      {t('actions.cta2')}
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================= AGENDA ================= */}
      <section className="section pt-0" id="agenda">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('actions.agenda.eyebrow')}
            title={t('actions.agenda.title')}
            subtitle={t('actions.agenda.subtitle')}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {agenda.map((event, i) => {
              const txt = textFor(i);
              return (
                <Reveal key={event.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <article className="card-3d glass flex h-full flex-col rounded-3xl p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-gold-300/40 bg-gold-400/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-200">
                        {event.type}
                      </span>
                      <Calendar width={20} height={20} className="text-cream/30" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold leading-snug">{txt.titre}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream/60">{txt.description}</p>
                    <dl className="mt-6 space-y-2 text-xs text-cream/50">
                      <div className="flex items-center gap-2.5">
                        <Calendar width={14} height={14} className="text-gold-300" />
                        <dt className="sr-only">{t('actions.agenda.date')}</dt>
                        <dd>
                          {formatDate(event.date)} · {event.heure}
                        </dd>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin width={14} height={14} className="text-emerald2-400" />
                        <dt className="sr-only">{t('actions.agenda.lieu')}</dt>
                        <dd>{event.lieu}</dd>
                      </div>
                    </dl>
                    <Link
                      href={localePath(locale, '/contact')}
                      className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-gold-200 hover:text-gold-100"
                    >
                      {t('actions.agenda.register')}
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= INSCRIPTION ================= */}
      <section className="section pt-0" id="inscription">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow={t('actions.inscription.eyebrow')}
            title={t('actions.inscription.title')}
            subtitle={t('actions.inscription.subtitle')}
          />
          <div className="mt-12">
            <GoogleFormEmbed
              formId={form.googleFormId}
              height={form.googleFormHeight}
              titre={t('data.forms.visiteur.titre')}
              description={t('data.forms.visiteur.description')}
            />
          </div>
        </div>
      </section>
    </>
  );
}
