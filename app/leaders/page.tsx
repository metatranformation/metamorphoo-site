import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { GoogleFormEmbed } from '@/components/GoogleFormEmbed';
import { Check, Heart, Users } from '@/components/Icons';
import { getForm, site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Devenir Leader & Recrutement',
  description:
    'Intégrez le noyau de 12 leaders clés de votre ville ou servez comme ouvrier dans un département Metamorphoo : accueil, intercession, logistique, louange, médias, humanitaire.',
  alternates: { canonical: '/leaders' },
};

const CRITERES = [
  {
    titre: 'Avoir le fardeau du réveil',
    texte: 'Une charge intérieure, reçue de Dieu, pour le réveil de sa ville et de sa nation. Ce n’est pas une fonction, c’est un poids spirituel.',
  },
  {
    titre: 'Être prêt au sacrifice',
    texte: 'Accepter de donner son temps, ses ressources et son confort pour l’accomplissement de la vision, sans chercher la première place.',
  },
  {
    titre: 'Vivre dans la communion',
    texte: 'Maintenir un contact permanent avec le couple visionnaire et les autres leaders, être prêt à toute activation divine.',
  },
];

const RESPONSABILITES = [
  'Organiser les actions METAMORPHOO dans sa zone, sous l’orientation des visionnaires',
  'Prendre en charge les besoins organisationnels de chaque aspect de chaque action',
  'Participer aux réunions régulières en ligne et en présentiel, surtout avant chaque grande action',
  'Accompagner les nouvelles âmes et les orienter vers une Église locale ou le mouvement',
  'Mobiliser les ressources, les prières et les partenaires de sa zone',
];

const DEPARTEMENTS = [
  { nom: 'Accueil & intégration', detail: 'Recevoir, orienter et suivre les nouveaux venus' },
  { nom: 'Intercession', detail: 'Couverture spirituelle des actions et des nations' },
  { nom: 'Logistique & protocol', detail: 'Organisation matérielle des camps et conférences' },
  { nom: 'Louange & arts', detail: 'Musique, chant, danse, productions scéniques' },
  { nom: 'Médias & communication', detail: 'Réseaux sociaux, photo, vidéo, presse' },
  { nom: 'Enseignement', detail: 'Supports pédagogiques, académie, formation' },
  { nom: 'Humanitaire — Oasis de vie', detail: 'Eau, santé, assistance, orphelinats' },
  { nom: 'Jeunesse & triomphes', detail: 'Encadrement des jeunes et projet Triomphes' },
];

export default function LeadersPage() {
  const leaderForm = getForm('leader');
  const workerForm = getForm('ouvrier');

  return (
    <>
      <PageHero
        breadcrumb="Devenir Leader"
        eyebrow="Noyau de 12 · Recrutement"
        title={
          <>
            Un noyau de <span className="text-gradient">12 leaders</span> dans chaque ville
          </>
        }
        subtitle="Un critère unique : avoir le fardeau du réveil et être prêt au sacrifice pour l’accomplir."
        image="/images/action-leadership.jpg"
      />

      {/* ================= CRITÈRES ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <SectionHeading
            eyebrow="Le critère unique"
            title={
              <>
                Qui peut devenir <span className="text-gradient">leader clé</span> ?
              </>
            }
            subtitle="Les leaders sont issus de différentes Églises et domaines professionnels et sociaux. Aucun titre n’est exigé : seulement un fardeau et une disponibilité."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {CRITERES.map((c, i) => (
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
            <span className="eyebrow">Responsabilités</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              Ce que porte un <span className="text-gradient">leader Metamorphoo</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {RESPONSABILITES.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm leading-relaxed text-cream/70">
                  <Check width={17} height={17} className="mt-0.5 shrink-0 text-emerald2-400" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-9 glass rounded-2xl p-6">
              <p className="flex items-start gap-3 text-xs leading-relaxed text-cream/60">
                <Users width={17} height={17} className="mt-0.5 shrink-0 text-gold-300" />
                Vous représentez une Église, une entreprise, une association ou une institution ? Votre
                leadership est précieux pour mobiliser votre sphère. Postulez : nous vous répondrons sous 7
                jours.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1} className="frame-img aspect-[4/5]">
            <img
              src="/images/action-leadership.jpg"
              alt="Leaders Metamorphoo réunis sur une colline"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* ================= CANDIDATURE LEADER ================= */}
      <section className="section pt-0" id="candidature">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow="Candidature"
            title={
              <>
                Postuler comme <span className="text-gradient">leader clé</span>
              </>
            }
            subtitle="Votre candidature est enregistrée automatiquement dans notre tableur de suivi, puis étudiée par les visionnaires."
          />
          <div className="mt-12">
            <GoogleFormEmbed
              formId={leaderForm.googleFormId}
              height={leaderForm.googleFormHeight}
              titre={leaderForm.titre}
              description={leaderForm.description}
            />
          </div>
        </div>
      </section>

      {/* ================= RECRUTEMENT OUVRIERS ================= */}
      <section className="section pt-0" id="ouvriers">
        <div className="container-x">
          <SectionHeading
            eyebrow="Recrutement des ouvriers"
            title={
              <>
                Servez dans un <span className="text-gradient">département</span>
              </>
            }
            subtitle="Le mouvement a besoin d’ouvriers dans tous les domaines. Choisissez votre département et candidatez en une minute."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEPARTEMENTS.map((d, i) => (
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
              titre={workerForm.titre}
              description={workerForm.description}
            />
          </div>

          <Reveal className="mt-10 text-center text-xs text-cream/40">
            Vous préférez échanger d’abord ? WhatsApp{' '}
            <a
              href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-200"
            >
              {site.contact.whatsappDisplay}
            </a>{' '}
            ou {site.contact.emails[0]}
          </Reveal>
        </div>
      </section>
    </>
  );
}
