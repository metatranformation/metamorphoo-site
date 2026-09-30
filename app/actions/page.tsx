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

export const metadata: Metadata = {
  title: 'Nos Actions',
  description:
    'Camps spirituels, conférences et séminaires, ateliers et formations, retraites et croisades de réveil, Leadership Master Class, concerts chrétiens et actions humanitaires Oasis de vie.',
  alternates: { canonical: '/actions' },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export default function ActionsPage() {
  const form = getForm('visiteur');

  return (
    <>
      <PageHero
        breadcrumb="Nos Actions"
        eyebrow="Mission en action"
        title={
          <>
            Huit domaines pour <span className="text-gradient">réveiller</span> une nation
          </>
        }
        subtitle="Des camps spirituels aux actions humanitaires, chaque action est contextualisée selon les besoins spécifiques de réveil de la ville, de la communauté ou de la nation."
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
          {actions.map((action, i) => (
            <Reveal
              key={action.id}
              className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:[&>figure]:order-2' : ''}`}
            >
              <figure className="frame-img aspect-[16/11]">
                <img
                  src={action.image}
                  alt={`${action.titre} — illustration 3D Metamorphoo`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </figure>

              <div>
                <span className="eyebrow">{action.categorie}</span>
                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">{action.titre}</h2>
                <p className="mt-5 text-base leading-relaxed text-cream/70">{action.contenu}</p>
                <ul className="mt-7 space-y-3">
                  {action.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-cream/70">
                      <Check width={16} height={16} className="mt-0.5 shrink-0 text-emerald2-400" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-gold">
                    Participer / s’inscrire
                  </Link>
                  <a
                    href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`Bonjour METAMORPHOO, je souhaite participer à : ${action.titre}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    Demander les dates
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= AGENDA ================= */}
      <section className="section pt-0" id="agenda">
        <div className="container-x">
          <SectionHeading
            eyebrow="Agenda"
            title={
              <>
                Prochaines <span className="text-gradient">activités</span>
              </>
            }
            subtitle="Modifiez librement ces dates dans le fichier content/agenda.json — elles se mettent à jour automatiquement sur le site."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {agenda.map((event, i) => (
              <Reveal key={event.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <article className="card-3d glass flex h-full flex-col rounded-3xl p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-gold-300/40 bg-gold-400/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-200">
                      {event.type}
                    </span>
                    <Calendar width={20} height={20} className="text-cream/30" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold leading-snug">{event.titre}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">{event.description}</p>
                  <dl className="mt-6 space-y-2 text-xs text-cream/50">
                    <div className="flex items-center gap-2.5">
                      <Calendar width={14} height={14} className="text-gold-300" />
                      <dt className="sr-only">Date</dt>
                      <dd>
                        {formatDate(event.date)} · {event.heure}
                      </dd>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin width={14} height={14} className="text-emerald2-400" />
                      <dt className="sr-only">Lieu</dt>
                      <dd>{event.lieu}</dd>
                    </div>
                  </dl>
                  <Link href="/contact" className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-gold-200 hover:text-gold-100">
                    Je m’inscris →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INSCRIPTION ================= */}
      <section className="section pt-0" id="inscription">
        <div className="container-x max-w-4xl">
          <SectionHeading
            eyebrow="Participer"
            title={
              <>
                Inscrivez-vous à une <span className="text-gradient">activité</span>
              </>
            }
            subtitle="Le formulaire enregistre automatiquement votre participation et prévient l'équipe d'organisation de votre ville."
          />
          <div className="mt-12">
            <GoogleFormEmbed
              formId={form.googleFormId}
              height={form.googleFormHeight}
              titre={form.titre}
              description={form.description}
            />
          </div>
        </div>
      </section>
    </>
  );
}
