'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Handshake,
  Heart,
  Lock,
  WhatsappIcon,
} from './Icons';
import { site } from '@/lib/content';
import { useI18n } from './I18nProvider';
import {
  buildCheckoutUrl,
  buildReference,
  listProviders,
  manualInstructions,
  type PaymentIntent,
  type PaymentProviderId,
} from '@/lib/payments';
import { submitForm } from '@/lib/forms';
import { cn, formatAmount } from '@/lib/utils';

const PRESETS: Record<string, number[]> = {
  USD: [25, 50, 100, 250, 500],
  CDF: [25000, 50000, 100000, 250000, 500000],
  EUR: [20, 50, 100, 200, 500],
};

const TYPE_IDS = ['offrande', 'dime', 'don', 'voeu', 'partenariat', 'projet', 'nature'] as const;
const FREQ_IDS = ['ponctuel', 'hebdomadaire', 'mensuel', 'annuel'] as const;
const CURRENCIES = ['USD', 'CDF', 'EUR'] as const;

type Step = 0 | 1 | 2 | 3;

const LOCALE_TAG: Record<string, string> = { fr: 'fr-FR', en: 'en-US', es: 'es-ES' };

export function DonationWidget() {
  const providers = useMemo(() => listProviders(), []);
  const { t, locale, translateList } = useI18n();

  const STEPS = translateList('dons.widget.steps');
  const tag = LOCALE_TAG[locale] ?? 'fr-FR';

  const [step, setStep] = useState<Step>(0);
  const [type, setType] = useState(site.typesDon[0].id);
  const [frequency, setFrequency] = useState<PaymentIntent['frequency']>('ponctuel');
  const [currency, setCurrency] = useState<'USD' | 'CDF' | 'EUR'>('USD');
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState('');
  const [provider, setProvider] = useState<PaymentProviderId>('mpesa');
  const [identity, setIdentity] = useState({ nom: '', email: '', telephone: '', message: '' });
  const [anonyme, setAnonyme] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [reference, setReference] = useState('');
  const [instructions, setInstructions] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedType = { id: type, label: t(`dons.types.${type}.label`), detail: t(`dons.types.${type}.detail`) };
  const isNature = type === 'nature';
  const selectedProvider = providers.find((p) => p.id === provider);

  const finalAmount = Number(custom || amount) || 0;

  const canContinue = () => {
    if (step === 1) return finalAmount > 0;
    if (step === 2) return anonyme || (identity.nom.trim().length > 1 && /.+@.+\..+/.test(identity.email));
    return Boolean(provider);
  };

  const submit = async () => {
    setStatus('sending');
    const ref = buildReference({ provider, amount: finalAmount, currency, type, frequency });
    setReference(ref);

    await submitForm({
      kind: isNature ? 'don-nature' : 'don',
      type,
      typeLabel: selectedType?.label,
      frequency,
      amount: finalAmount,
      currency,
      provider,
      providerLabel: selectedProvider?.label,
      reference: ref,
      ...(anonyme ? { nom: 'Anonyme' } : identity),
    });

    const checkoutUrl = buildCheckoutUrl({
      provider,
      amount: finalAmount,
      currency,
      type,
      frequency,
      donorEmail: anonyme ? undefined : identity.email,
      donorPhone: anonyme ? undefined : identity.telephone,
      reference: ref,
    });

    if (checkoutUrl) {
      setStatus('done');
      window.location.href = checkoutUrl;
      return;
    }

    setInstructions(manualInstructions(provider, { provider, amount: finalAmount, currency, type, frequency, reference: ref }));
    setStatus('done');
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]">
      {/* ---------------- Colonne formulaire ---------------- */}
      <div className="glass rounded-3xl p-6 sm:p-9">
        {/* Progression */}
        <ol className="mb-8 flex items-center gap-2">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  'grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold transition-all duration-500',
                  i <= step ? 'bg-gold-300 text-night-950' : 'bg-white/10 text-cream/40',
                )}
              >
                {i < step ? <Check width={14} height={14} /> : i + 1}
              </span>
              <span className={cn('hidden text-[0.7rem] font-medium sm:block', i <= step ? 'text-cream' : 'text-cream/40')}>
                {label}
              </span>
              {i < STEPS.length - 1 && <span className={cn('h-px flex-1 transition-colors duration-500', i < step ? 'bg-gold-300' : 'bg-white/10')} />}
            </li>
          ))}
        </ol>

        {/* Étape 1 : type + fréquence */}
        {step === 0 && (
          <div className="animate-rise-fade">
            <h3 className="text-lg font-bold">{t('dons.widget.step1Title')}</h3>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {TYPE_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setType(id)}
                  className={cn(
                    'rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300',
                    type === id
                      ? 'border-gold-300 bg-gold-300/15 text-gold-100'
                      : 'border-white/10 text-cream/70 hover:border-white/30 hover:text-cream',
                  )}
                >
                  {t(`dons.types.${id}.label`)}
                </button>
              ))}
            </div>
            {<p className="mt-3 text-xs text-cream/50">{selectedType.detail}</p>}

            <h3 className="mt-9 text-lg font-bold">{t('dons.widget.step1Freq')}</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {FREQ_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFrequency(id as PaymentIntent['frequency'])}
                  className={cn(
                    'rounded-2xl border p-4 text-left transition-all duration-300',
                    frequency === id ? 'border-emerald2-400 bg-emerald2-500/10' : 'border-white/10 hover:border-white/25',
                  )}
                >
                  <span className="block text-sm font-semibold text-cream">{t(`dons.frequences.${id}.label`)}</span>
                  <span className="mt-1 block text-[0.7rem] text-cream/50">{t(`dons.frequences.${id}.detail`)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Étape 2 : montant */}
        {step === 1 && (
          <div className="animate-rise-fade">
            <h3 className="text-lg font-bold">{t('dons.widget.step2Title')} {selectedType.label.toLowerCase()}</h3>

            <div className="mt-5 flex gap-2">
              {CURRENCIES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setCurrency(code as 'USD' | 'CDF' | 'EUR');
                    setAmount(PRESETS[code][1]);
                    setCustom('');
                  }}
                  className={cn(
                    'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300',
                    currency === code ? 'border-gold-300 bg-gold-300/15 text-gold-100' : 'border-white/10 text-cream/60 hover:text-cream',
                  )}
                >
                  {code} — {t(`dons.devises.${code}`)}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PRESETS[currency].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setAmount(p);
                    setCustom('');
                  }}
                  className={cn(
                    'rounded-2xl border py-4 font-display text-lg font-bold transition-all duration-300',
                    !custom && amount === p
                      ? 'border-gold-300 bg-gold-300/15 text-gold-100'
                      : 'border-white/10 text-cream/70 hover:border-white/30 hover:text-cream',
                  )}
                >
                  {p.toLocaleString(tag)}
                  <span className="ml-1 text-xs font-normal text-cream/40">{currency}</span>
                </button>
              ))}
            </div>

            <label className="label mt-7" htmlFor="don-montant">
              {t('dons.widget.other')}
            </label>
            <div className="flex items-center gap-3">
              <input
                id="don-montant"
                type="number"
                min={0}
                className="field"
                placeholder={`${t('dons.widget.amount')} · ${currency}`}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
              <span className="text-sm font-semibold text-cream/60">{currency}</span>
            </div>

            {isNature && (
              <p className="mt-6 rounded-xl border border-emerald2-400/25 bg-emerald2-500/10 p-4 text-xs leading-relaxed text-emerald2-100/80">
                {t('dons.widget.natureNote')}
              </p>
            )}
          </div>
        )}

        {/* Étape 3 : coordonnées */}
        {step === 2 && (
          <div className="animate-rise-fade">
            <h3 className="text-lg font-bold">{t('dons.widget.step3Title')}</h3>
            <p className="mt-2 text-xs text-cream/50">{t('dons.widget.step3Text')}</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="d-nom">
                  {t('dons.widget.name')}
                </label>
                <input id="d-nom" className="field" value={identity.nom} onChange={(e) => setIdentity({ ...identity, nom: e.target.value })} placeholder={t('dons.widget.namePlaceholder')} />
              </div>
              <div>
                <label className="label" htmlFor="d-email">
                  {t('dons.widget.email')}
                </label>
                <input id="d-email" type="email" className="field" value={identity.email} onChange={(e) => setIdentity({ ...identity, email: e.target.value })} placeholder="vous@exemple.com" />
              </div>
              <div>
                <label className="label" htmlFor="d-tel">
                  {t('dons.widget.phone')}
                </label>
                <input id="d-tel" className="field" value={identity.telephone} onChange={(e) => setIdentity({ ...identity, telephone: e.target.value })} placeholder="+243 …" />
              </div>
              <div className="sm:pt-6">
                <label className="flex items-center gap-3 text-sm text-cream/70">
                  <input type="checkbox" checked={anonyme} onChange={(e) => setAnonyme(e.target.checked)} className="h-4 w-4 rounded border-white/20 bg-night-900 accent-gold-400" />
                  {t('dons.widget.anonymous')}
                </label>
              </div>
              <div className="sm:col-span-2">
                <label className="label" htmlFor="d-msg">
                  {t('dons.widget.message')}
                </label>
                <textarea id="d-msg" rows={4} className="field resize-none" value={identity.message} onChange={(e) => setIdentity({ ...identity, message: e.target.value })} placeholder={t('dons.widget.messagePlaceholder')} />
              </div>
            </div>
          </div>
        )}

        {/* Étape 4 : paiement */}
        {step === 3 && (
          <div className="animate-rise-fade">
            <h3 className="text-lg font-bold">{t('dons.widget.step4Title')}</h3>
            <p className="mt-2 text-xs text-cream/50">{t('dons.widget.step4Text')}</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {providers.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProvider(p.id)}
                  className={cn(
                    'relative rounded-2xl border p-4 text-left transition-all duration-300',
                    provider === p.id ? 'border-gold-300 bg-gold-300/10' : 'border-white/10 hover:border-white/25',
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-cream">{p.label}</span>
                    {p.status === 'bientot' && (
                      <span className="rounded-full bg-violet2-500/25 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-violet2-400">
                        {t('dons.widget.soon')}
                      </span>
                    )}
                    {p.status === 'actif' && p.id !== 'especes' && (
                      <span className="rounded-full bg-emerald2-500/20 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-emerald2-300">
                        {t('dons.widget.online')}
                      </span>
                    )}
                  </span>
                  <span className="mt-1.5 block text-[0.72rem] leading-relaxed text-cream/50">{p.description}</span>
                </button>
              ))}
            </div>

            {selectedProvider?.instructions && (
              <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-cream/70">
                {selectedProvider.instructions}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button type="button" onClick={submit} disabled={status === 'sending'} className="btn-gold disabled:opacity-60">
                <Lock width={16} height={16} />
                {status === 'sending' ? t('dons.widget.confirming') : t('dons.widget.confirm')}
              </button>
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`${t('dons.widget.whatsappMsg')} (${selectedType.label}, ${t(`dons.frequences.${frequency}.label`)}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsappIcon width={17} height={17} /> {t('dons.widget.whatsappConfirm')}
              </a>
            </div>

            <p className="mt-4 flex items-center gap-2 text-[0.7rem] text-cream/40">
              <Lock width={13} height={13} /> {t('dons.widget.secure')}
            </p>
          </div>
        )}

        {/* Navigation */}
        {status !== 'done' && (
          <div className="mt-9 flex items-center justify-between border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
              disabled={step === 0}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-cream/40 transition-colors hover:text-cream disabled:opacity-30"
            >
              {t('dons.widget.back')}
            </button>
            {step < 3 ? (
              <button type="button" onClick={() => setStep((s) => (s + 1) as Step)} disabled={!canContinue()} className="btn-gold !px-7 !py-3 disabled:opacity-40">
                {t('dons.widget.next')} <ArrowRight width={16} height={16} />
              </button>
            ) : null}
          </div>
        )}

        {/* Confirmation */}
        {status === 'done' && (
          <div className="mt-8 animate-rise-fade rounded-2xl border border-emerald2-400/30 bg-emerald2-500/10 p-6">
            <p className="flex items-center gap-2 font-bold text-emerald2-200">
              <Check width={18} height={18} /> {t('dons.widget.successTitle')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream/75">
              {t('dons.widget.successText')}{' '}
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(reference);
                  setCopied(true);
                }}
                className="rounded bg-white/10 px-2 py-0.5 font-mono text-gold-200"
                title={t('dons.widget.copy')}
              >
                {reference} {copied ? '✓' : '⧉'}
              </button>
            </p>
            {instructions && <p className="mt-3 text-xs leading-relaxed text-cream/70">{instructions}</p>}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(`${t('dons.widget.whatsappProof')} ${reference}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp !py-2.5 !text-xs"
              >
                <WhatsappIcon width={15} height={15} /> {t('dons.widget.sendProof')}
              </a>
              <button
                type="button"
                onClick={() => {
                  setStatus('idle');
                  setStep(0);
                }}
                className="btn-ghost !py-2.5 !text-xs"
              >
                {t('dons.widget.newDon')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ---------------- Récapitulatif ---------------- */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="glass overflow-hidden rounded-3xl">
          <div className="relative h-36">
            <img src="/images/hero-butterfly.jpg" alt="" className="h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950 to-transparent" />
            <span className="absolute bottom-4 left-6 font-display text-lg font-bold">{t('dons.widget.summary')}</span>
          </div>
          <dl className="space-y-4 p-6 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-cream/50">{t('dons.widget.type')}</dt>
              <dd className="text-right font-semibold">{selectedType.label}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-cream/50">{t('dons.widget.frequency')}</dt>
              <dd className="font-semibold capitalize">{t(`dons.frequences.${frequency}.label`)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-cream/50">{t('dons.widget.amount')}</dt>
              <dd className="font-display text-2xl font-extrabold text-gradient">
                {finalAmount > 0 ? formatAmount(finalAmount, currency) : '—'}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-cream/50">{t('dons.widget.method')}</dt>
              <dd className="text-right font-semibold">{selectedProvider?.label}</dd>
            </div>
          </dl>
          <div className="border-t border-white/10 p-6">
            <p className="flex items-start gap-2.5 text-xs leading-relaxed text-cream/50">
              <Heart width={15} height={15} className="mt-0.5 shrink-0 text-gold-300" />
              {t('dons.widget.quote')}
            </p>
            <p className="mt-4 flex items-start gap-2.5 text-xs leading-relaxed text-cream/50">
              <Handshake width={15} height={15} className="mt-0.5 shrink-0 text-emerald2-400" />
              {t('dons.widget.partnerNote')}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default DonationWidget;
