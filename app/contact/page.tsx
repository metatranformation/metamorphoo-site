import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { GoogleFormEmbed } from '@/components/GoogleFormEmbed';
import { Clock, Mail, MapPin, Phone, WhatsappIcon } from '@/components/Icons';
import { getForm, site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez METAMORPHOO : WhatsApp +243 997 628 592, e-mail contactmetamorphoo@gmail.com, Goma en RDC. Devenez visiteur, demandez la prière ou proposez un partenariat.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const visiteur = getForm('visiteur');
  const priere = getForm('priere');
  const waNumber = site.contact.whatsapp.replace(/[^\d]/g, '');

  const cards = [
    {
      icone: WhatsappIcon,
      titre: 'WhatsApp (le plus rapide)',
      lignes: [site.contact.whatsappDisplay],
      action: { label: 'Ouvrir la discussion', href: `https://wa.me/${waNumber}?text=${encodeURIComponent(site.contact.whatsappMessage)}` },
      accent: 'text-[#25D366]',
    },
    {
      icone: Phone,
      titre: 'Téléphones',
      lignes: site.contact.phones,
      action: { label: 'Appeler', href: `tel:${site.contact.phones[0].replace(/\s/g, '')}` },
      accent: 'text-gold-300',
    },
    {
      icone: Mail,
      titre: 'E-mails',
      lignes: site.contact.emails,
      action: { label: 'Écrire un e-mail', href: `mailto:${site.contact.emails[0]}` },
      accent: 'text-violet2-400',
    },
    {
      icone: MapPin,
      titre: 'Siège & actions',
      lignes: [site.contact.address],
      action: { label: 'Voir sur la carte', href: '#carte' },
      accent: 'text-emerald2-400',
    },
    {
      icone: Clock,
      titre: 'Disponibilité',
      lignes: [site.contact.hours],
      accent: 'text-cream/70',
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Restons en contact"
        title={
          <>
            Écrivez-nous, nous vous <span className="text-gradient">répondons</span>
          </>
        }
        subtitle="Une question, une demande de prière, une invitation ou un partenariat ? Notre équipe est disponible sur WhatsApp et par e-mail."
        image="/images/hero-butterfly.jpg"
      />

      {/* ================= COORDONNÉES ================= */}
      <section className="section pt-8">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => (
              <Reveal key={c.titre} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="card-3d glass flex h-full flex-col rounded-3xl p-6">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-white/5 ${c.accent}`}>
                    <c.icone width={22} height={22} />
                  </span>
                  <h3 className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-cream/80">{c.titre}</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-cream/70">
                    {c.lignes.map((l) => (
                      <li key={l} className="break-words">
                        {l}
                      </li>
                    ))}
                  </ul>
                  {c.action && (
                    <a
                      href={c.action.href}
                      target={c.action.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-200 hover:text-gold-100"
                    >
                      {c.action.label} →
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORMULAIRE ================= */}
      <section className="section pt-0" id="ecrire">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Nous écrire"
              title={
                <>
                  Votre message va directement à <span className="text-gradient">l’équipe</span>
                </>
              }
              subtitle="Les messages sont enregistrés dans notre tableur de suivi et reçoivent une réponse sous 48 heures ouvrées."
              align="left"
            />
            <div className="mt-9">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8">
            <Reveal delay={1} className="glass rounded-3xl p-7">
              <h3 className="text-lg font-bold">Nouveau venu ?</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-cream/70">
                Enregistrez-vous en une minute : vous serez suivi, orienté vers une Église locale ou intégré à
                un noyau de leaders.
              </p>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent('Bonjour METAMORPHOO, je suis un nouveau venu et je souhaite être enregistré.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-6"
              >
                <WhatsappIcon width={17} height={17} /> M’enregistrer par WhatsApp
              </a>
            </Reveal>

            <Reveal delay={2} className="glass rounded-3xl p-7">
              <h3 className="text-lg font-bold">Demande de prière</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-cream/70">
                Notre équipe d’intercesseurs se tient avec vous, dans la confidentialité.
              </p>
              <a href="#formulaires" className="btn-ghost mt-6">
                Remplir le formulaire de prière
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= FORMULAIRES GOOGLE ================= */}
      <section className="section pt-0" id="formulaires">
        <div className="container-x">
          <SectionHeading
            eyebrow="Formulaires connectés"
            title={
              <>
                Enregistrement <span className="text-gradient">automatique</span>
              </>
            }
            subtitle="Ces formulaires Google alimentent directement notre tableur de suivi : chaque demande est notifiée à l’équipe."
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal delay={1}>
              <GoogleFormEmbed
                formId={visiteur.googleFormId}
                height={visiteur.googleFormHeight}
                titre={visiteur.titre}
                description={visiteur.description}
              />
            </Reveal>
            <Reveal delay={2}>
              <GoogleFormEmbed
                formId={priere.googleFormId}
                height={priere.googleFormHeight}
                titre={priere.titre}
                description={priere.description}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CARTE ================= */}
      <section className="section pt-0" id="carte">
        <div className="container-x">
          <Reveal className="overflow-hidden rounded-3xl border border-white/10">
            <iframe
              title="Carte — Goma, Nord-Kivu, RDC"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.contact.googleMapsQuery)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="420"
              loading="lazy"
              style={{ border: 0, filter: 'grayscale(0.35) contrast(1.05)' }}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
