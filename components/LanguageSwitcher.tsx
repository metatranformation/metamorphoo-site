'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LOCALES, LOCALE_LABELS, localePath, stripBasePath } from '@/lib/i18n-core';
import { useI18n } from './I18nProvider';
import { Globe } from './Icons';

/** Sélecteur de langue (FR / EN / ES) — navigue vers la même page dans l'autre langue. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, t } = useI18n();
  const router = useRouter();
  // usePathname() inclut le prefixe du depot GitHub Pages : on le retire
  const pathname = stripBasePath(usePathname() || '/');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('nav.language')}
        title={t('nav.language')}
        className="glass flex items-center gap-2 rounded-full px-3.5 py-2.5 text-xs font-semibold text-cream/75 transition-all duration-300 hover:text-cream"
      >
        <Globe width={16} height={16} />
        <span className="hidden sm:inline">{LOCALE_LABELS[locale].short}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="glass absolute right-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl py-1.5 shadow-card"
        >
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => {
                  // /fr/dons -> /en/dons : on remplace uniquement le prefixe de langue
                  const rest = pathname.replace(/^\/(fr|en|es)(?=\/|$)/, '') || '/';
                  router.push(localePath(code, rest));
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-200',
                  code === locale ? 'bg-gold-400/15 text-gold-100' : 'text-cream/70 hover:bg-white/6 hover:text-cream',
                )}
              >
                <span className="text-base leading-none">{LOCALE_LABELS[code].flag}</span>
                <span className="flex-1">{LOCALE_LABELS[code].label}</span>
                {code === locale && <span className="text-gold-300">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;
