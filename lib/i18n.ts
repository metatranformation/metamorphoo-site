import { DEFAULT_LOCALE, LOCALES, resolveLocale, type Locale } from './i18n-core';

/* ============================================================
   METAMORPHOO — Accès à la langue pour les pages statiques
   La langue vient du segment d'URL (/fr, /en, /es).
   Export statique : aucun accès serveur à la requête.
   ============================================================ */

export * from './i18n-core';

export { DEFAULT_LOCALE, LOCALES };
export type { Locale };

/** Lit la langue depuis les paramètres de route. */
export function localeFromParams(params: { locale?: string } | undefined): Locale {
  return resolveLocale(params?.locale);
}
