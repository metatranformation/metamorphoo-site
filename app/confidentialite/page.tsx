import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/content';
import { getLocale, getT, translateList } from '@/lib/i18n';
import { LOCALE_TAGS } from '@/lib/i18n-core';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t('legal.privacyTitle'),
    description: t('legal.privacySubtitle'),
    alternates: { canonical: '/confidentialite' },
  };
}

const BLOCK_IDS = ['donnees', 'finalite', 'conservation', 'droits', 'cookies', 'securite'] as const;

export default async function ConfidentialitePage() {
  const t = await getT();
  const locale = await getLocale();

  const blocks = BLOCK_IDS.map((id) => ({
    id,
    titre: t(`legal.privacy.${id}.titre`),
    contenu: translateList(locale, `legal.privacy.${id}.contenu`),
  }));

  return (
    <>
      <PageHero
        breadcrumb={t('legal.privacyTitle')}
        eyebrow={t('legal.privacyEyebrow')}
        title={t('legal.privacyTitle')}
        subtitle={t('legal.privacySubtitle')}
        image="/images/stage-caterpillar.jpg"
      />

      <section className="section pt-8">
        <div className="container-x max-w-3xl space-y-8">
          {blocks.map((block, i) => (
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
            <h2 className="text-xl font-bold">{t('legal.privacy.contact.titre')}</h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
              {t('legal.privacy.contact.texte')} {site.contact.emails[0]}.
            </p>
          </Reveal>

          <Reveal className="text-center text-xs text-cream/40">
            {t('legal.updated')} : {new Date().toLocaleDateString(LOCALE_TAGS[locale], { month: 'long', year: 'numeric' })}
          </Reveal>
        </div>
      </section>
    </>
  );
}
