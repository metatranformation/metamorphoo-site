'use client';

import { useState } from 'react';
import { Check, Mail, WhatsappIcon } from './Icons';
import { site } from '@/lib/content';
import { submitForm } from '@/lib/forms';
import { useI18n } from './I18nProvider';
import { Reveal } from './Reveal';

export function ContactForm() {
  const { t, translateList } = useI18n();
  const SUJETS = translateList('contact.form.sujets');

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    ville: '',
    sujet: '',
    message: '',
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await submitForm({ kind: 'contact', ...form });
    setStatus(res.ok ? 'sent' : 'error');
  };

  if (status === 'sent') {
    return (
      <Reveal className="glass rounded-3xl p-9 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald2-500/20 text-emerald2-300">
          <Check width={26} height={26} />
        </span>
        <h3 className="mt-5 text-2xl font-bold">{t('contact.form.successTitle')}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/70">
          {t('contact.form.successText')}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <WhatsappIcon width={17} height={17} /> WhatsApp
          </a>
          <a href={`mailto:${site.contact.emails[0]}`} className="btn-ghost">
            <Mail width={17} height={17} /> {t('contact.form.email')}
          </a>
        </div>
      </Reveal>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-nom">
            {t('contact.form.name')} *
          </label>
          <input id="c-nom" required className="field" value={form.nom} onChange={set('nom')} placeholder="Votre nom" />
        </div>
        <div>
          <label className="label" htmlFor="c-email">
            {t('contact.form.email')} *
          </label>
          <input id="c-email" type="email" required className="field" value={form.email} onChange={set('email')} placeholder="vous@exemple.com" />
        </div>
        <div>
          <label className="label" htmlFor="c-tel">
            {t('contact.form.phone')}
          </label>
          <input id="c-tel" className="field" value={form.telephone} onChange={set('telephone')} placeholder="+243 …" />
        </div>
        <div>
          <label className="label" htmlFor="c-ville">
            {t('contact.form.city')}
          </label>
          <input id="c-ville" className="field" value={form.ville} onChange={set('ville')} placeholder="Goma, RDC" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="c-sujet">
            {t('contact.form.subject')}
          </label>
          <select id="c-sujet" className="field" value={form.sujet} onChange={set('sujet')}>
            {SUJETS.map((s) => (
              <option key={s} value={s} className="bg-night-900">
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="c-message">
            {t('contact.form.message')} *
          </label>
          <textarea
            id="c-message"
            required
            rows={5}
            className="field resize-none"
            value={form.message}
            onChange={set('message')}
            placeholder={t('contact.form.messagePlaceholder')}
          />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-cream/50">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-white/20 bg-night-900 accent-gold-400" />
        {t('contact.form.consent')}
      </label>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className="btn-gold disabled:opacity-60">
          {status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
        </button>
        <a
          href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <WhatsappIcon width={17} height={17} /> {t('contact.form.whatsappFast')}
        </a>
      </div>

      {status === 'error' && (
        <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs text-red-200">
          {t('contact.form.error')} {site.contact.whatsappDisplay}.
        </p>
      )}
    </form>
  );
}

export default ContactForm;
