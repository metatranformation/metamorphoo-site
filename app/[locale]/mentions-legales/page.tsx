import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/content';
import { localeFromParams, localePath, translate, translateArray, translateList } from '@/lib/i18n';
import { getObject, LOCALE_TAGS } from '@/lib/i18n-core';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  return {
    title: t('legal.title'),
    description: t('legal.subtitle'),
    alternates: { canonical: '/mentions-legales' },
  };
}

const BLOCK_IDS = ['editeur', 'nature', 'hebergement', 'propriete', 'dons', 'contact'] as const;

export default async function MentionsLegalesPage({ params }: { params: { locale: string } }) {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  const labels = getObject(locale, 'legal.blocks.editeur.labels');

  const blocks = BLOCK_IDS.map((id) => ({
    id,
    titre: t(`legal.blocks.${id}.titre`),
    contenu: translateList(locale, `legal.blocks.${id}.contenu`),
  }));

  const editeur = blocks[0];
  const contact = blocks[blocks.length - 1];

  return (
    <>
      <PageHero
        breadcrumb={t('legal.title')}
        eyebrow={t('legal.eyebrow')}
        title={t('legal.title')}
        subtitle={t('legal.subtitle')}
        image="/images/stage-chrysalis.jpg"
      />

      <section className="section pt-8">
        <div className="container-x max-w-3xl space-y-8">
          <Reveal className="glass rounded-3xl p-7">
            <h2 className="text-xl font-bold">{editeur.titre}</h2>
            <div className="mt-4 space-y-2.5">
              <p className="text-sm leading-relaxed text-cream/70">
                {site.brand.fullName} — {site.brand.baseline}.
              </p>
              <p className="text-sm leading-relaxed text-cream/70">
                {labels.address} : {site.contact.address}.
              </p>
              <p className="text-sm leading-relaxed text-cream/70">
                {labels.phone} : {site.contact.whatsappDisplay}.
              </p>
              <p className="text-sm leading-relaxed text-cream/70">
                {labels.email} : {site.contact.emails.join(', ')}.
              </p>
              <p className="text-sm leading-relaxed text-cream/70">
                {labels.founders} : {site.brand.founders}.
              </p>
            </div>
          </Reveal>

          {blocks.slice(1, -1).map((block, i) => (
            <Reveal key={block.id} delay={((i % 3) + 1) as 1 | 2 | 3} className="glass rounded-3xl p-7">
              <h2 className="text-xl font-bold">{block.titre}</h2>
              <div className="mt-4 space-y-2.5">
                {block.contenu.map((ligne) => (
                  <p key={ligne} className="text-sm leading-relaxed text-cream/70">
                    {ligne}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}

          <Reveal className="glass rounded-3xl p-7">
            <h2 className="text-xl font-bold">{contact.titre}</h2>
            <div className="mt-4 space-y-2.5">
              {contact.contenu.map((ligne) => (
                <p key={ligne} className="text-sm leading-relaxed text-cream/70">
                  {ligne} {site.contact.emails[0]} · WhatsApp {site.contact.whatsappDisplay}.
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="text-center text-xs text-cream/40">
            {t('legal.updated')} : {new Date().toLocaleDateString(LOCALE_TAGS[locale], { month: 'long', year: 'numeric' })}
          </Reveal>
        </div>
      </section>
    </>
  );
}
