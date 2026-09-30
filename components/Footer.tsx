'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';
import { ArrowRight, Check, Mail, MapPin, Phone } from './Icons';
import { actions, site } from '@/lib/content';
import { submitForm } from '@/lib/forms';

export function Footer() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setState('sending');
    const res = await submitForm({ kind: 'newsletter', email });
    setState(res.ok ? 'done' : 'error');
    if (res.ok) setEmail('');
  };

  return (
    <footer className="relative z-10 mt-10 border-t border-white/10 bg-night-950/80">
      {/* Bandeau d'appel */}
      <div className="container-x -mt-px">
        <div className="glass relative -translate-y-10 overflow-hidden rounded-3xl px-7 py-9 sm:px-12">
          <div className="halo -left-10 -top-16 h-48 w-48 bg-gold-400/25" />
          <div className="halo -bottom-20 right-0 h-56 w-56 bg-emerald2-500/20" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow mb-3">Rejoindre le mouvement</p>
              <h3 className="max-w-xl text-2xl font-bold leading-snug sm:text-3xl">
                Prêt à entrer dans votre saison de{' '}
                <span className="text-gradient">transformation</span> ?
              </h3>
              <p className="mt-2 max-w-lg text-sm text-cream/70">
                Enregistrez-vous en une minute. Vous serez suivi, orienté et intégré à un noyau de leaders.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn-gold">
                Devenir visiteur <ArrowRight width={16} height={16} />
              </Link>
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 pb-14 pt-4 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo size={46} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">{site.brand.tagline}</p>
          <p className="mt-4 max-w-sm text-xs italic leading-relaxed text-gold-200/70">
            {site.brand.verse} <span className="not-italic">— {site.brand.verseRef}</span>
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Navigation du pied de page">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200/80">Navigation</h4>
          <ul className="space-y-2.5 text-sm text-cream/60">
            {[
              { href: '/vision-mission', label: 'Vision & Mission' },
              { href: '/actions', label: 'Nos Actions' },
              { href: '/academie', label: 'Metamorphoo Académie' },
              { href: '/leaders', label: 'Devenir Leader' },
              { href: '/medias', label: 'Médias & Galerie' },
              { href: '/dons', label: 'Dons & Soutien' },
              { href: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-200">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Actions">
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200/80">Nos actions</h4>
          <ul className="space-y-2.5 text-sm text-cream/60">
            {actions.slice(0, 6).map((a) => (
              <li key={a.id}>
                <Link href="/actions" className="transition-colors hover:text-gold-200">
                  {a.titre}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200/80">Contact</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-2.5">
              <MapPin width={17} height={17} className="mt-0.5 shrink-0 text-emerald2-400" />
              <span>{site.contact.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone width={17} height={17} className="mt-0.5 shrink-0 text-gold-300" />
              <a href={`tel:${site.contact.whatsapp}`} className="hover:text-gold-200">
                {site.contact.whatsappDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail width={17} height={17} className="mt-0.5 shrink-0 text-gold-300" />
              <a href={`mailto:${site.contact.emails[0]}`} className="break-all hover:text-gold-200">
                {site.contact.emails[0]}
              </a>
            </li>
          </ul>

          <form onSubmit={subscribe} className="mt-6">
            <label htmlFor="newsletter-email" className="label">
              Lettre Metamorphoo
            </label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="field !py-2.5"
              />
              <button
                type="submit"
                disabled={state === 'sending'}
                className="btn-gold !px-5 !py-2.5"
                aria-label="S'abonner"
              >
                {state === 'done' ? <Check width={18} height={18} /> : <ArrowRight width={18} height={18} />}
              </button>
            </div>
            <p className="mt-2 text-[0.7rem] text-cream/40">
              {state === 'done'
                ? 'Inscription enregistrée. Merci !'
                : state === 'error'
                  ? 'Échec de l\'inscription — écrivez-nous sur WhatsApp.'
                  : 'Dates des camps, conférences et enseignements.'}
            </p>
          </form>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.brand.fullName} — {site.contact.address}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href="/mentions-legales" className="hover:text-gold-200">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-gold-200">
              Confidentialité
            </Link>
            <span className="hidden sm:inline">·</span>
            <span>
              Fait avec foi à Goma, RDC — <span className="text-gold-200/70">Romains 12:2</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
