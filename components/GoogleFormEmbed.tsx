import { ArrowUpRight, Globe } from './Icons';
import { googleFormEmbedUrl, googleFormShareUrl } from '@/lib/content';

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
  if (!formId) {
    return (
      <div className={`glass rounded-3xl border-dashed p-8 text-center ${className}`}>
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold-400/15 text-gold-200">
          <Globe width={22} height={22} />
        </span>
        <h3 className="mt-4 text-lg font-bold text-cream">Formulaire à connecter</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-cream/60">
          Ce formulaire Google n’est pas encore relié au site. Créez-le sur{' '}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-gold-200">forms.google.com</code>, puis
          collez son identifiant dans <code className="rounded bg-white/10 px-1.5 py-0.5 text-gold-200">content/site.json</code>{' '}
          (section <code className="rounded bg-white/10 px-1.5 py-0.5 text-gold-200">forms</code>). Guide
          détaillé : <code className="rounded bg-white/10 px-1.5 py-0.5 text-gold-200">docs/02-GOOGLE-FORMS-ET-SUIVI.md</code>.
        </p>
        <p className="mt-4 text-xs text-cream/40">
          En attendant, écrivez-nous sur WhatsApp au +243 997 628 592 — nous répondons rapidement.
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
          title={titre || 'Formulaire Metamorphoo'}
          className="w-full rounded-[1.25rem] bg-white"
          style={{ height }}
          loading="lazy"
        >
          Chargement du formulaire…
        </iframe>
      </div>
      <a
        href={googleFormShareUrl(formId)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-cream/50 transition-colors hover:text-gold-200"
      >
        Ouvrir le formulaire dans un nouvel onglet <ArrowUpRight width={13} height={13} />
      </a>
    </div>
  );
}

export default GoogleFormEmbed;
