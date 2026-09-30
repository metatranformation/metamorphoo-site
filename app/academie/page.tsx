import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { AcademyClient } from '@/components/AcademyClient';
import { GoogleFormEmbed } from '@/components/GoogleFormEmbed';
import { ArrowRight, Check, Play, Shield, Users, WhatsappIcon } from '@/components/Icons';
import { getForm, site, totalLessons } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Metamorphoo Académie — Formation en ligne',
  description:
    'Formation chrétienne en ligne par vidéos YouTube : suivi de progression, validation du parcours puis appel en ligne ou en présentiel pour l’interview de validation.',
  alternates: { canonical: '/academie' },
};

const STEPS = [
  {
    icone: Play,
    titre: '1. Inscription',
    texte: 'Vous remplissez le formulaire d’inscription. Vous recevez un message de bienvenue et l’accès aux modules.',
  },
  {
    icone: Users,
    titre: '2. Formation en ligne',
    texte: `Vous suivez les ${totalLessons} leçons vidéo à votre rythme, sur YouTube, où que vous soyez.`,
  },
  {
    icone: Shield,
    titre: '3. Validation',
    texte: 'Vous validez votre parcours : questionnaire, puis appel en ligne ou en présentiel pour l’interview.',
  },
  {
    icone: Check,
    titre: '4. Intégration',
    texte: 'Vous êtes affecté à un noyau, un département ou une action selon votre appel et vos compétences.',
  },
];

export default function AcademiePage() {
  const form = getForm('formation');

  return (
    <>
      <PageHero
        breadcrumb="Académie"
        eyebrow="Metamorphoo Académie"
        title={
          <>
            Se former en ligne, puis passer l’<span className="text-gradient">interview de validation</span>
          </>
        }
        subtitle="Un parcours de transformation progressif, accessible gratuitement, qui prépare les croyants à devenir des acteurs du réveil."
        image="/images/action-education.jpg"
      />

      {/* ================= PARCOURS ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <SectionHeading
            eyebrow="Le parcours"
            title={
              <>
                Quatre étapes vers votre <span className="text-gradient">activation</span>
              </>
            }
            align="left"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.titre} delay={((i % 4) + 1) as 1 | 2 | 3}>
                <div className="glass h-full rounded-3xl p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-300/25 to-emerald2-500/20 text-gold-200">
                    <s.icone width={22} height={22} />
                  </span>
                  <h3 className="mt-5 text-base font-bold">{s.titre}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-cream/60">{s.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Modules + progression */}
          <div className="mt-16">
            <SectionHeading
              eyebrow="Modules de formation"
              title={
                <>
                  Le programme de la <span className="text-gradient">Métamorphoo Académie</span>
                </>
              }
              subtitle="Cochez les leçons terminées : votre progression est enregistrée sur cet appareil. Cliquez sur une leçon pour la visionner."
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
                <span className="eyebrow">Interview de validation</span>
                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                  Dernière étape : l’<span className="text-gradient">appel</span>
                </h2>
                <p className="mt-5 text-base leading-relaxed text-cream/70">
                  Une fois les vidéos terminées, vous validez votre parcours. Les candidats retenus sont appelés
                  en ligne ou en présentiel pour un entretien de validation avec l’équipe des visionnaires.
                </p>
                <ul className="mt-7 space-y-3">
                  {[
                    'Entretien en ligne (WhatsApp / Zoom) ou en présentiel à Goma',
                    'Vérification de l’appel, du caractère et de la disponibilité',
                    'Décision d’intégration communiquée sous 7 jours',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-cream/70">
                      <Check width={16} height={16} className="mt-0.5 shrink-0 text-emerald2-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a href="#inscription" className="btn-gold">
                    Valider mon parcours <ArrowRight width={16} height={16} />
                  </a>
                  <a
                    href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Bonjour METAMORPHOO, je souhaite valider mon parcours à la Métamorphoo Académie.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp"
                  >
                    <WhatsappIcon width={17} height={17} /> Planifier l’appel
                  </a>
                </div>
              </div>

              <div className="frame-img aspect-[4/3]">
                <img
                  src="/images/action-conferences.jpg"
                  alt="Entretien de validation Metamorphoo"
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
            eyebrow="Inscription"
            title={
              <>
                Rejoindre la <span className="text-gradient">promotion</span> en cours
              </>
            }
            subtitle="Remplissez le formulaire : votre candidature est enregistrée automatiquement dans notre tableur de suivi."
          />
          <div className="mt-12">
            <GoogleFormEmbed
              formId={form.googleFormId}
              height={form.googleFormHeight}
              titre={form.titre}
              description={form.description}
            />
          </div>
          <Reveal className="mt-10 text-center text-xs text-cream/40">
            Un problème avec le formulaire ?{' '}
            <Link href="/contact" className="text-gold-200 underline-offset-4 hover:underline">
              Écrivez-nous
            </Link>{' '}
            ou appelez-nous sur WhatsApp.
          </Reveal>
        </div>
      </section>
    </>
  );
}
