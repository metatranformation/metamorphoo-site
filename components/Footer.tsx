'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './Logo';
import { SocialLinks } from './SocialLinks';
import { ArrowRight, Check, Mail, MapPin, Phone } from './Icons';
import { actions, site } from '@/lib/content';
import { submitForm } from '@/lib/forms';
import { useI18n } from './I18nProvider';
import { localePath } from '@/lib/i18n-core';

export function Footer() {
  const { t, locale } = useI18n();
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

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

  return (
    <footer className="relative z-10 mt-10 border-t border-white/10 bg-night-950/80">
      {/* Bandeau d'appel */}
      <div className="container-x -mt-px">
        <div className="glass relative -translate-y-10 overflow-hidden rounded-3xl px-7 py-9 sm:px-12">
          <div className="halo -left-10 -top-16 h-48 w-48 bg-gold-400/25" />
          <div className="halo -bottom-20 right-0 h-56 w-56 bg-emerald2-500/20" />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow mb-3">{t('footer.cta.eyebrow')}</p>
              <h3 className="max-w-xl text-2xl font-bold leading-snug sm:text-3xl">
                {t('footer.cta.title')}
              </h3>
              <p className="mt-2 max-w-lg text-sm text-cream/65">{t('footer.cta.text')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={localePath(locale, '/contact')} className="btn-gold">
                {t('footer.cta.cta1')} <ArrowRight width={16} height={16} />
              </Link>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                {t('footer.cta.cta2')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 pb-14 pt-4 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo size={46} animated />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/60">{t('footer.tagline')}</p>
          <p className="mt-4 max-w-sm text-xs italic leading-relaxed text-gold-200/70">
            {site.brand.verse} <span className="not-italic">— {site.brand.verseRef}</span>
          </p>
          <SocialLinks className="mt-6" />
          {site.contact.whatsappChannel && (
            <a
              href={site.contact.whatsappChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald2-300 transition-colors hover:text-emerald2-400"
            >
              📣 {site.contact.whatsappChannelLabel}
            </a>
          )}
        </div>

        <nav aria-label={t('nav.footerNav')}>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200/80">
            {t('nav.footerNav')}
          </h4>
          <ul className="space-y-2.5 text-sm text-cream/60">
            {[
              { href: localePath(locale, '/vision-mission'), key: 'nav.vision' },
              { href: localePath(locale, '/actions'), key: 'nav.actions' },
              { href: localePath(locale, '/academie'), key: 'nav.academy' },
              { href: localePath(locale, '/leaders'), key: 'nav.leaders' },
              { href: localePath(locale, '/medias'), key: 'nav.media' },
              { href: localePath(locale, '/dons'), key: 'nav.donate' },
              { href: localePath(locale, '/contact'), key: 'nav.contact' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-200">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('nav.footerActions')}>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200/80">
            {t('nav.footerActions')}
          </h4>
          <ul className="space-y-2.5 text-sm text-cream/60">
            {actions.slice(0, 6).map((a) => (
              <li key={a.id}>
                <Link href={localePath(locale, '/actions')} className="transition-colors hover:text-gold-200">
                  {t(`data.actions.${a.id}.titre`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold-200/80">
            {t('nav.footerContact')}
          </h4>
          <ul className="space-y-3 text-sm text-cream/65">
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
              {t('footer.newsletter')}
            </label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletterPlaceholder')}
                className="field !py-2.5"
              />
              <button
                type="submit"
                disabled={state === 'sending'}
                className="btn-gold !px-5 !py-2.5"
                aria-label={t('footer.newsletter')}
              >
                {state === 'done' ? <Check width={18} height={18} /> : <ArrowRight width={18} height={18} />}
              </button>
            </div>
            <p className="mt-2 text-[0.7rem] text-cream/45">
              {state === 'done'
                ? t('footer.newsletterOk')
                : state === 'error'
                  ? t('footer.newsletterError')
                  : t('footer.newsletterNote')}
            </p>
          </form>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.brand.fullName} — {site.contact.address}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link href={localePath(locale, '/mentions-legales')} className="hover:text-gold-200">
              {t('footer.legal')}
            </Link>
            <Link href={localePath(locale, '/confidentialite')} className="hover:text-gold-200">
              {t('footer.privacy')}
            </Link>
            <span className="hidden sm:inline">·</span>
            <span>{t('footer.madeWith')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
