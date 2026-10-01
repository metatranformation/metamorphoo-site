import { cookies } from 'next/headers';
import {
  DEFAULT_LOCALE,
  isLocale,
  translate,
  type Locale,
  type Translate,
} from './i18n-core';

/* ============================================================
   METAMORPHOO — Accès serveur à la langue (cookie NEXT_LOCALE)
   ============================================================ */

export * from './i18n-core';

/** Langue courante, lue depuis le cookie (côté serveur). */
export async function getLocale(): Promise<Locale> {
  try {
    const store = cookies();
    const value = store.get('NEXT_LOCALE')?.value;
    if (isLocale(value)) return value;
  } catch {
    /* hors contexte requête */
  }
  return DEFAULT_LOCALE;
}

/** Fonction de traduction prête à l'emploi pour les composants serveur. */
export async function getT(): Promise<Translate> {
  const locale = await getLocale();
  return (path: string) => translate(locale, path);
}
