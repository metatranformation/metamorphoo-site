import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { DonationWidget } from '@/components/DonationWidget';
import { GoogleFormEmbed } from '@/components/GoogleFormEmbed';
import { PaymentBadges } from '@/components/PaymentBadges';
import { Check, Handshake, Heart, Lock, Shield } from '@/components/Icons';
import { getForm, site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Dons, Offrandes & Soutien',
  description:
    'Soutenez METAMORPHOO : offrandes, dîmes, dons, vœux et partenariats, en espèces ou en nature, de façon ponctuelle, hebdomadaire, mensuelle ou annuelle. Mobile Money, virement, FlexPaie et GeneraPay.',
  alternates: { canonical: '/dons' },
};

const TRANSPARENCE = [
  'Dieu reste le bailleur de fonds par excellence du mouvement.',
  'Les offrandes collectées durant les activités financent directement les actions en cours.',
  'Les partenaires de soutien reçoivent un rapport régulier d’utilisation.',
  'Les portes restent ouvertes aux sponsors : églises, communautés, entreprises, ASBL, ONG et gouvernements, dans le respect des principes bibliques.',
];

export default function DonsPage() {
  const donForm = getForm('don');
  const natureForm = getForm('donNature');
  const bank = site.payments.banque;
  const mm = site.payments.mobileMoney;

  return (
    <>
      <PageHero
        breadcrumb="Dons & Soutien"
        eyebrow="Mobilisation financière et matérielle"
        title={
          <>
            Semer dans la <span className="text-gradient">vision</span>
          </>
        }
        subtitle="Metamorphoo est une organisation chrétienne à but non lucratif. Offrandes, dîmes, dons, vœux et partenariats — en espèces comme en nature, une fois ou chaque mois."
        image="/images/action-humanitaire.jpg"
      />

      {/* ================= WIDGET ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <SectionHeading
            eyebrow="Faire un don"
            title={
              <>
                Votre soutien en <span className="text-gradient">4 étapes</span>
              </>
            }
            subtitle="Choisissez le type de soutien, le montant, vos coordonnées et le moyen de paiement. Chaque engagement est enregistré et suivi."
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
                <span className="eyebrow">Don en nature</span>
                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                  Matériel, denrées, <span className="text-gradient">moyens</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-cream/70">
                  Les dons en nature sont essentiels : équipements audio et scène, denrées alimentaires,
                  moyens de transport, locaux, matériel médical et scolaire, fournitures pour les camps.
                </p>
                <ul className="mt-7 space-y-3">
                  {[
                    'Équipement son, lumière et scène pour les croisades',
                    'Denrées et eau potable pour Oasis de vie',
                    'Moyens de transport et logistique des camps',
                    'Matériel médical, scolaire et fournitures de bureau',
                  ].map((item) => (
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
                  titre={natureForm.titre}
                  description={natureForm.description}
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
            eyebrow="Moyens de paiement"
            title={
              <>
                Comment <span className="text-gradient">donner</span> concrètement
              </>
            }
            subtitle="Les paiements en ligne FlexPaie et GeneraPay sont en cours d’activation. Mobile Money, virement et espèces sont disponibles dès maintenant."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal delay={1} className="glass rounded-3xl p-7">
              <h3 className="flex items-center gap-2.5 text-lg font-bold">
                <Heart width={19} height={19} className="text-gold-300" /> Mobile Money
              </h3>
              <dl className="mt-6 space-y-4 text-sm">
                {[
                  { label: 'M-Pesa', value: mm.mpesa },
                  { label: 'Airtel Money', value: mm.airtelMoney },
                  { label: 'Orange Money', value: mm.orangeMoney },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-cream/50">{row.label}</dt>
                    <dd className="font-semibold text-cream">{row.value || 'À communiquer'}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-relaxed text-cream/40">
                Indiquez toujours la référence de transaction reçue par e-mail ou WhatsApp afin que votre don
                soit correctement affecté.
              </p>
            </Reveal>

            <Reveal delay={2} className="glass rounded-3xl p-7">
              <h3 className="flex items-center gap-2.5 text-lg font-bold">
                <Shield width={19} height={19} className="text-emerald2-400" /> Virement bancaire
              </h3>
              <dl className="mt-6 space-y-4 text-sm">
                {[
                  { label: 'Banque', value: bank.nom },
                  { label: 'Titulaire', value: bank.titulaire },
                  { label: 'Compte', value: bank.compte },
                  { label: 'SWIFT / IBAN', value: bank.swift },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-cream/50">{row.label}</dt>
                    <dd className="text-right font-semibold text-cream">{row.value || 'À communiquer'}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-xs leading-relaxed text-cream/40">
                Pour les églises, entreprises, ASBL et ONG : demandez une convention de partenariat à{' '}
                {site.contact.emails[0]}.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-10">
            <PaymentBadges />
          </Reveal>

          <Reveal className="mt-10 glass rounded-3xl p-7">
            <h3 className="flex items-center gap-2.5 text-lg font-bold">
              <Lock width={18} height={18} className="text-violet2-400" /> Paiement en ligne (bientôt)
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              <strong className="text-gold-200">FlexPaie</strong> et{' '}
              <strong className="text-gold-200">GeneraPay</strong> (plateforme SaaS développée par Metamorphoo)
              seront branchés sur cette page dès leur activation : il suffira de renseigner les clés
              marchands dans les variables d’environnement, sans modifier le site. Voir le guide{' '}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-gold-200">
                docs/03-PAIEMENTS-FLEXPAIE-GENERAPAY.md
              </code>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= PROMESSE DE DON ================= */}
      <section className="section pt-0" id="promesse">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow="Promesse de don"
            title={
              <>
                Devenir <span className="text-gradient">partenaire</span> de soutien
              </>
            }
            subtitle="Ponctuel, hebdomadaire, mensuel ou annuel : engagez-vous et recevez le rapport des actions financées."
          />
          <div className="mt-12">
            <GoogleFormEmbed
              formId={donForm.googleFormId}
              height={donForm.googleFormHeight}
              titre={donForm.titre}
              description={donForm.description}
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
                <span className="eyebrow">Transparence</span>
                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                  Une gestion <span className="text-gradient">fidèle</span> des ressources
                </h2>
                <ul className="mt-7 space-y-3.5">
                  {TRANSPARENCE.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm leading-relaxed text-cream/70">
                      <Check width={16} height={16} className="mt-0.5 shrink-0 text-emerald2-400" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="frame-img aspect-[4/3]">
                <img src="/images/action-humanitaire.jpg" alt="Action humanitaire Oasis de vie" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-4 text-center">
            <span className="flex items-center gap-2 text-xs text-cream/40">
              <Handshake width={15} height={15} /> Partenariats, sponsoring et mécénat :{' '}
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
