'use client';

import { useState } from 'react';
import { Check, Mail, WhatsappIcon } from './Icons';
import { site } from '@/lib/content';
import { submitForm } from '@/lib/forms';
import { Reveal } from './Reveal';

const SUJETS = [
  'Devenir visiteur / nouveau venu',
  'Demande de prière',
  'Partenariat / soutien',
  'Invitation & organisation d’une action',
  'Presse & médias',
  'Autre sujet',
];

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({
    nom: '',
    email: '',
    telephone: '',
    ville: '',
    sujet: SUJETS[0],
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
        <h3 className="mt-5 text-2xl font-bold">Message reçu, merci !</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/70">
          Notre équipe vous répond sous 48 heures ouvrées. Pour une urgente, écrivez-nous directement sur
          WhatsApp.
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
            <Mail width={17} height={17} /> E-mail
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
            Nom complet *
          </label>
          <input id="c-nom" required className="field" value={form.nom} onChange={set('nom')} placeholder="Votre nom" />
        </div>
        <div>
          <label className="label" htmlFor="c-email">
            E-mail *
          </label>
          <input id="c-email" type="email" required className="field" value={form.email} onChange={set('email')} placeholder="vous@exemple.com" />
        </div>
        <div>
          <label className="label" htmlFor="c-tel">
            Téléphone / WhatsApp
          </label>
          <input id="c-tel" className="field" value={form.telephone} onChange={set('telephone')} placeholder="+243 …" />
        </div>
        <div>
          <label className="label" htmlFor="c-ville">
            Ville / Pays
          </label>
          <input id="c-ville" className="field" value={form.ville} onChange={set('ville')} placeholder="Goma, RDC" />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="c-sujet">
            Sujet
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
            Message *
          </label>
          <textarea
            id="c-message"
            required
            rows={5}
            className="field resize-none"
            value={form.message}
            onChange={set('message')}
            placeholder="Écrivez votre message, votre demande de prière ou votre projet…"
          />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-cream/50">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-white/20 bg-night-900 accent-gold-400" />
        J’accepte que mes informations soient utilisées pour être recontacté par METAMORPHOO (voir la
        politique de confidentialité).
      </label>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className="btn-gold disabled:opacity-60">
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
        </button>
        <a
          href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <WhatsappIcon width={17} height={17} /> Réponse rapide WhatsApp
        </a>
      </div>

      {status === 'error' && (
        <p className="mt-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-xs text-red-200">
          L’envoi automatique a échoué. Merci de réessayer ou de nous écrire sur WhatsApp au{' '}
          {site.contact.whatsappDisplay}.
        </p>
      )}
    </form>
  );
}

export default ContactForm;
