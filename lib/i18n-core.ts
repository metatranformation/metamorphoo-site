import fr from '@/content/i18n/fr.json';
import en from '@/content/i18n/en.json';
import es from '@/content/i18n/es.json';

/* ============================================================
   METAMORPHOO — Noyau multilingue (FR / EN / ES)
   Module partagé client + serveur (aucune dépendance serveur).
   - Le dictionnaire français est la référence.
   - Toute clé manquante retombe automatiquement sur le français.
   ============================================================ */

export const LOCALES = ['fr', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export const LOCALE_TAGS: Record<Locale, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  es: 'es-ES',
};

export const LOCALE_LABELS: Record<Locale, { label: string; flag: string; short: string }> = {
  fr: { label: 'Français', flag: '🇫🇷', short: 'FR' },
  en: { label: 'English', flag: '🇬🇧', short: 'EN' },
  es: { label: 'Español', flag: '🇪🇸', short: 'ES' },
};

const dictionaries = { fr, en, es } as const;

export type Dictionary = typeof fr;

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return (dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]) as Dictionary;
}

/** Résout un chemin pointé (« home.hero.title ») avec repli sur le français. */
export function translate(locale: Locale, path: string): string {
  const dict = dictionaries[locale] as Record<string, unknown>;
  const fallback = dictionaries[DEFAULT_LOCALE] as Record<string, unknown>;

  const read = (source: Record<string, unknown>): unknown =>
    path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, source);

  const value = read(dict) ?? read(fallback);
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  return path;
}

export type Translate = (path: string) => string;

/** Traduit une liste (tableau de chaînes) du dictionnaire. */
export function translateList(locale: Locale, path: string): string[] {
  const dict = dictionaries[locale] as Record<string, unknown>;
  const fallback = dictionaries[DEFAULT_LOCALE] as Record<string, unknown>;
  const read = (source: Record<string, unknown>): unknown =>
    path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, source);

  const value = read(dict) ?? read(fallback);
  return Array.isArray(value) ? (value as string[]) : [];
}

/** Récupère un objet du dictionnaire (ex. `legal.blocks.editeur.labels`). */
export function getObject(locale: Locale, path: string): Record<string, string> {
  const dict = dictionaries[locale] as Record<string, unknown>;
  const fallback = dictionaries[DEFAULT_LOCALE] as Record<string, unknown>;
  const read = (source: Record<string, unknown>): unknown =>
    path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, source);

  const value = read(dict) ?? read(fallback);
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, string>)
    : {};
}

/** Récupère un tableau d'objets du dictionnaire (ex. `vision.origin.timeline`). */
export function translateArray<T>(locale: Locale, path: string): T[] {
  const dict = dictionaries[locale] as Record<string, unknown>;
  const fallback = dictionaries[DEFAULT_LOCALE] as Record<string, unknown>;
  const read = (source: Record<string, unknown>): unknown =>
    path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, source);

  const value = read(dict) ?? read(fallback);
  return Array.isArray(value) ? (value as T[]) : [];
}
