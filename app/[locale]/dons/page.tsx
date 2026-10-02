import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { DonationWidget } from '@/components/DonationWidget';
import { GoogleFormEmbed } from '@/components/GoogleFormEmbed';
import { PaymentBadges } from '@/components/PaymentBadges';
import { Check, Handshake, Heart, Lock, Shield } from '@/components/Icons';
import { getForm, site } from '@/lib/content';
import { localeFromParams, localePath, translate, translateArray, translateList } from '@/lib/i18n';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  return {
    title: t('dons.title'),
    description: t('dons.subtitle'),
    alternates: { canonical: '/dons' },
  };
}

export default async function DonsPage({ params }: { params: { locale: string } }) {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  const donForm = getForm('don');
  const natureForm = getForm('donNature');
  const bank = site.payments.banque;
  const mm = site.payments.mobileMoney;
  const natureItems = translateList(locale, 'dons.nature.items');
  const transparence = translateList(locale, 'dons.transparence.items');

  const mobileRows = [
    { key: 'mpesa', label: 'M-Pesa', value: mm.mpesa },
    { key: 'airtelMoney', label: 'Airtel Money', value: mm.airtelMoney },
    { key: 'orangeMoney', label: 'Orange Money', value: mm.orangeMoney },
  ];

  const bankRows = [
    { key: 'bankNom', label: t('dons.paiement.bankNom'), value: bank.nom },
    { key: 'bankTitulaire', label: t('dons.paiement.bankTitulaire'), value: bank.titulaire },
    { key: 'bankCompte', label: t('dons.paiement.bankCompte'), value: bank.compte },
    { key: 'bankSwift', label: t('dons.paiement.bankSwift'), value: bank.swift },
  ];

  return (
    <>
      <PageHero
        breadcrumb={t('dons.title')}
        eyebrow={t('dons.eyebrow')}
        title={t('dons.title')}
        subtitle={t('dons.subtitle')}
        image="/images/action-humanitaire.jpg"
      />

      {/* ================= WIDGET ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('dons.widget.eyebrow')}
            title={t('dons.widget.title')}
            subtitle={t('dons.widget.subtitle')}
            align="left"
          />
          <div className="mt-12">
            <DonationWidget />
          </div>
        </div>
      </section>

      {/* ================= DON EN NATURE ================= */}
      <section className="section pt-0" id="nature">
        <div className="container-x">
          <div className="glass relative overflow-hidden rounded-[2rem] px-7 py-12 sm:px-14">
            <div className="halo -left-16 -bottom-16 h-72 w-72 bg-emerald2-500/20" />
            <div className="relative grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="eyebrow">{t('dons.nature.eyebrow')}</span>
                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">{t('dons.nature.title')}</h2>
                <p className="mt-5 text-base leading-relaxed text-cream/70">{t('dons.nature.lead')}</p>
                <ul className="mt-7 space-y-3">
                  {natureItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-cream/70">
                      <Check width={16} height={16} className="mt-0.5 shrink-0 text-emerald2-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <GoogleFormEmbed
                  formId={natureForm.googleFormId}
                  height={natureForm.googleFormHeight}
                  titre={t('data.forms.donNature.titre')}
                  description={t('data.forms.donNature.description')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOYENS DE PAIEMENT ================= */}
      <section className="section pt-0" id="paiement">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('dons.paiement.eyebrow')}
            title={t('dons.paiement.title')}
            subtitle={t('dons.paiement.subtitle')}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal delay={1} className="glass rounded-3xl p-7">
              <h3 className="flex items-center gap-2.5 text-lg font-bold">
                <Heart width={19} height={19} className="text-gold-300" /> {t('dons.paiement.mobile')}
              </h3>
              <dl className="mt-6 space-y-4 text-sm">
                {mobileRows.map((row) => (
                  <div
                    key={row.key}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"
                  >
                    <dt className="text-cream/50">{row.label}</dt>
                    <dd className="font-semibold text-cream">{row.value || t('dons.paiement.toCommunicate')}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-relaxed text-cream/40">{t('dons.paiement.mobileNote')}</p>
            </Reveal>

            <Reveal delay={2} className="glass rounded-3xl p-7">
              <h3 className="flex items-center gap-2.5 text-lg font-bold">
                <Shield width={19} height={19} className="text-emerald2-400" /> {t('dons.paiement.bank')}
              </h3>
              <dl className="mt-6 space-y-4 text-sm">
                {bankRows.map((row) => (
                  <div
                    key={row.key}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-3"
                  >
                    <dt className="text-cream/50">{row.label}</dt>
                    <dd className="text-right font-semibold text-cream">
                      {row.value || t('dons.paiement.toCommunicate')}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-relaxed text-cream/40">
                {t('dons.paiement.bankNote')} {site.contact.emails[0]}.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <PaymentBadges />
          </Reveal>

          <Reveal className="mt-10 glass rounded-3xl p-7">
            <h3 className="flex items-center gap-2.5 text-lg font-bold">
              <Lock width={18} height={18} className="text-violet2-400" /> {t('dons.paiement.onlineTitle')}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">{t('dons.paiement.onlineText')}</p>
          </Reveal>
        </div>
      </section>

      {/* ================= PROMESSE DE DON ================= */}
      <section className="section pt-0" id="promesse">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow={t('dons.promesse.eyebrow')}
            title={t('dons.promesse.title')}
            subtitle={t('dons.promesse.subtitle')}
          />
          <div className="mt-12">
            <GoogleFormEmbed
              formId={donForm.googleFormId}
              height={donForm.googleFormHeight}
              titre={t('data.forms.don.titre')}
              description={t('data.forms.don.description')}
            />
          </div>
        </div>
      </section>

      {/* ================= TRANSPARENCE ================= */}
      <section className="section pt-0">
        <div className="container-x">
          <div className="glass relative overflow-hidden rounded-[2rem] px-7 py-12 sm:px-14">
            <div className="halo -right-16 -top-16 h-72 w-72 bg-gold-400/18" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span className="eyebrow">{t('dons.transparence.eyebrow')}</span>
                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                  {t('dons.transparence.title')}
                </h2>
                <ul className="mt-7 space-y-3.5">
                  {transparence.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-cream/70">
                      <Check width={16} height={16} className="mt-0.5 shrink-0 text-emerald2-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="frame-img aspect-[4/3]">
                <img
                  src="/images/action-humanitaire.jpg"
                  alt={t('dons.nature.title')}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-4 text-center">
            <span className="flex items-center gap-2 text-xs text-cream/40">
              <Handshake width={15} height={15} /> {t('dons.transparence.footer')}{' '}
              <a href={`mailto:${site.contact.emails[0]}`} className="text-gold-200">
                {site.contact.emails[0]}
              </a>
            </span>
          </Reveal>
        </div>
      </section>
    </>
  );
}
