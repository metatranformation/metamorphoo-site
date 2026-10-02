import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { GoogleFormEmbed } from '@/components/GoogleFormEmbed';
import { Clock, Mail, MapPin, Phone, WhatsappIcon } from '@/components/Icons';
import { getForm, site } from '@/lib/content';
import { localeFromParams, localePath, translate, translateArray, translateList } from '@/lib/i18n';

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  return {
    title: t('contact.title'),
    description: t('contact.subtitle'),
    alternates: { canonical: '/contact' },
  };
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const locale = localeFromParams(params);
  const t = (path: string) => translate(locale, path);
  const visiteur = getForm('visiteur');
  const priere = getForm('priere');
  const waNumber = site.contact.whatsapp.replace(/[^\d]/g, '');

  const cards = [
    {
      icone: WhatsappIcon,
      titre: t('contact.cards.whatsapp'),
      lignes: [site.contact.whatsappDisplay],
      action: {
        label: t('contact.cards.whatsappCta'),
        href: `https://wa.me/${waNumber}?text=${encodeURIComponent(site.contact.whatsappMessage)}`,
      },
      accent: 'text-[#25D366]',
    },
    {
      icone: Phone,
      titre: t('contact.cards.phones'),
      lignes: site.contact.phones,
      action: { label: t('contact.cards.call'), href: `tel:${site.contact.phones[0].replace(/\s/g, '')}` },
      accent: 'text-gold-300',
    },
    {
      icone: Mail,
      titre: t('contact.cards.emails'),
      lignes: site.contact.emails,
      action: { label: t('contact.cards.write'), href: `mailto:${site.contact.emails[0]}` },
      accent: 'text-violet2-400',
    },
    {
      icone: MapPin,
      titre: t('contact.cards.address'),
      lignes: [site.contact.address],
      action: { label: t('contact.cards.map'), href: '#carte' },
      accent: 'text-emerald2-400',
    },
    {
      icone: Clock,
      titre: t('contact.cards.hours'),
      lignes: [site.contact.hours],
      accent: 'text-cream/70',
    },
  ];

  return (
    <>
      <PageHero
        breadcrumb={t('contact.title')}
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
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
              eyebrow={t('contact.form.eyebrow')}
              title={t('contact.form.title')}
              subtitle={t('contact.form.subtitle')}
              align="left"
            />
            <div className="mt-9">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-8">
            <Reveal delay={1} className="glass rounded-3xl p-7">
              <h3 className="text-lg font-bold">{t('contact.new.title')}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-cream/70">{t('contact.new.text')}</p>
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(t('contact.newMsg'))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-6"
              >
                <WhatsappIcon width={17} height={17} /> {t('contact.new.cta')}
              </a>
            </Reveal>

            <Reveal delay={2} className="glass rounded-3xl p-7">
              <h3 className="text-lg font-bold">{t('contact.priere.title')}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-cream/70">{t('contact.priere.text')}</p>
              <a href="#formulaires" className="btn-ghost mt-6">
                {t('contact.priere.cta')}
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= FORMULAIRES GOOGLE ================= */}
      <section className="section pt-0" id="formulaires">
        <div className="container-x">
          <SectionHeading
            eyebrow={t('contact.forms.eyebrow')}
            title={t('contact.forms.title')}
            subtitle={t('contact.forms.subtitle')}
          />

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal delay={1}>
              <GoogleFormEmbed
                formId={visiteur.googleFormId}
                height={visiteur.googleFormHeight}
                titre={t('data.forms.visiteur.titre')}
                description={t('data.forms.visiteur.description')}
              />
            </Reveal>
            <Reveal delay={2}>
              <GoogleFormEmbed
                formId={priere.googleFormId}
                height={priere.googleFormHeight}
                titre={t('data.forms.priere.titre')}
                description={t('data.forms.priere.description')}
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
              title={t('contact.mapTitle')}
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
