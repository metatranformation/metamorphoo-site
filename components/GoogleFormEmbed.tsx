'use client';

import { ArrowUpRight, Globe } from './Icons';
import { googleFormEmbedUrl, googleFormShareUrl } from '@/lib/content';
import { useI18n } from './I18nProvider';

type GoogleFormEmbedProps = {
  formId: string;
  height?: number;
  titre?: string;
  description?: string;
  className?: string;
};

/**
 * Intègre un Google Form publié (« Envoyer » > < >).
 * Si aucun formulaire n'est encore configuré, un encart d'aide s'affiche :
 * le site reste pleinement fonctionnel en attendant.
 */
export function GoogleFormEmbed({
  formId,
  height = 1400,
  titre,
  description,
  className = '',
}: GoogleFormEmbedProps) {
  const { t } = useI18n();

  if (!formId) {
    return (
      <div className={`glass rounded-3xl border-dashed p-8 text-center ${className}`}>
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold-400/15 text-gold-200">
          <Globe width={22} height={22} />
        </span>
        <h3 className="mt-4 text-lg font-bold text-cream">{t('footer.form.title')}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream/60">
          {t('footer.form.text')}
        </p>
        <p className="mt-4 text-xs text-cream/40">
          {t('footer.form.note')}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {(titre || description) && (
        <div className="mb-5">
          {titre && <h3 className="text-xl font-bold text-cream">{titre}</h3>}
          {description && <p className="mt-1.5 text-sm text-cream/60">{description}</p>}
        </div>
      )}
      <div className="glass overflow-hidden rounded-3xl p-1.5">
        <iframe
          src={googleFormEmbedUrl(formId)}
          title={titre || 'Metamorphoo'}
          className="w-full rounded-[1.25rem] bg-white"
          style={{ height }}
          loading="lazy"
        >
          {t('footer.form.loading')}
        </iframe>
      </div>
      <a
        href={googleFormShareUrl(formId)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-cream/50 transition-colors hover:text-gold-200"
      >
        {t('footer.form.open')} <ArrowUpRight width={13} height={13} />
      </a>
    </div>
  );
}

export default GoogleFormEmbed;
