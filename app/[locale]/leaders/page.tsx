import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { GoogleFormEmbed } from '@/components/GoogleFormEmbed';
import { Check, Heart, Users } from '@/components/Icons';
import { getForm, site } from '@/lib/content';
import { localeFromParams, localePath, translate, translateArray, translateList } from '@/lib/i18n';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  return {
    title: t('leaders.title'),
    description: t('leaders.subtitle'),
    alternates: { canonical: '/leaders' },
  };
}

export default async function LeadersPage({ params }: { params: { locale: string } }) {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  const leaderForm = getForm('leader');
  const workerForm = getForm('ouvrier');

  const criteres = translateArray<{ titre: string; texte: string }>(locale, 'leaders.criteres.items');
  const responsabilites = translateList(locale, 'leaders.responsabilites.items');
  const departements = translateArray<{ nom: string; detail: string }>(locale, 'leaders.departements');

  return (
    <>
      <PageHero
        breadcrumb={t('leaders.eyebrow')}
        eyebrow={t('leaders.eyebrow')}
        title={t('leaders.title')}
        subtitle={t('leaders.subtitle')}
        image="/images/action-leadership.jpg"
      />

      {/* ================= CRITÈRES ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('leaders.criteres.eyebrow')}
            title={t('leaders.criteres.title')}
            subtitle={t('leaders.criteres.subtitle')}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {criteres.map((c, i) => (
              <Reveal key={c.titre} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="glass h-full rounded-3xl p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/25 to-emerald2-500/20 text-gold-200">
                    <Heart width={22} height={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{c.titre}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{c.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESPONSABILITÉS ================= */}
      <section className="section pt-0">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">{t('leaders.responsabilites.eyebrow')}</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              {t('leaders.responsabilites.title')}
            </h2>
            <ul className="mt-8 space-y-4">
              {responsabilites.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm leading-relaxed text-cream/70">
                  <Check width={17} height={17} className="mt-0.5 shrink-0 text-emerald2-400" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-9 glass rounded-2xl p-6">
              <p className="flex items-start gap-3 text-xs leading-relaxed text-cream/60">
                <Users width={17} height={17} className="mt-0.5 shrink-0 text-gold-300" />
                {t('leaders.responsabilites.note')}
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} className="frame-img aspect-[4/5]">
            <img
              src="/images/action-leadership.jpg"
              alt={t('leaders.responsabilites.title')}
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* ================= CANDIDATURE LEADER ================= */}
      <section className="section pt-0" id="candidature">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow={t('leaders.candidature.eyebrow')}
            title={t('leaders.candidature.title')}
            subtitle={t('leaders.candidature.subtitle')}
          />
          <div className="mt-12">
            <GoogleFormEmbed
              formId={leaderForm.googleFormId}
              height={leaderForm.googleFormHeight}
              titre={t('data.forms.leader.titre')}
              description={t('data.forms.leader.description')}
            />
          </div>
        </div>
      </section>

      {/* ================= RECRUTEMENT OUVRIERS ================= */}
      <section className="section pt-0" id="ouvriers">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('leaders.ouvriers.eyebrow')}
            title={t('leaders.ouvriers.title')}
            subtitle={t('leaders.ouvriers.subtitle')}
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {departements.map((d, i) => (
              <Reveal key={d.nom} delay={((i % 4) + 1) as 1 | 2 | 3}>
                <div className="card-3d h-full rounded-2xl border border-white/10 bg-night-900/50 p-5">
                  <h3 className="text-sm font-bold text-gold-100">{d.nom}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-cream/50">{d.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 max-w-4xl">
            <GoogleFormEmbed
              formId={workerForm.googleFormId}
              height={workerForm.googleFormHeight}
              titre={t('data.forms.ouvrier.titre')}
              description={t('data.forms.ouvrier.description')}
            />
          </div>

          <Reveal className="mt-10 text-center text-xs text-cream/40">
            {t('leaders.ouvriers.fallback')}{' '}
            <a
              href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-200"
            >
              {site.contact.whatsappDisplay}
            </a>{' '}
            {t('footer.or')} {site.contact.emails[0]}
          </Reveal>
        </div>
      </section>
    </>
  );
}
