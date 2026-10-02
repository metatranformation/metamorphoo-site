'use client';

import { createContext, useContext, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  DEFAULT_LOCALE,
  LOCALES,
  getDictionary,
  getObject,
  isLocale,
  translate,
  translateList,
  type Dictionary,
  type Locale,
  type Translate,
} from '@/lib/i18n-core';

type I18nContextValue = {
  locale: Locale;
  dict: Dictionary;
  t: Translate;
  translateList: (path: string) => string[];
  getObject: (path: string) => Record<string, string>;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 an

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const value: I18nContextValue = {
    locale,
    dict: getDictionary(locale),
    t: (path: string) => translate(locale, path),
    translateList: (path: string) => translateList(locale, path),
    getObject: (path: string) => getObject(locale, path),
    setLocale: (next: Locale) => {
      if (!isLocale(next) || next === locale) return;
      document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
      document.documentElement.lang = next;
      startTransition(() => {
        router.refresh();
      });
    },
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Repli silencieux : le site reste utilisable même hors provider.
    return {
      locale: DEFAULT_LOCALE,
      dict: getDictionary(DEFAULT_LOCALE),
      t: (path: string) => translate(DEFAULT_LOCALE, path),
      translateList: (path: string) => translateList(DEFAULT_LOCALE, path),
      getObject: (path: string) => getObject(DEFAULT_LOCALE, path),
      setLocale: () => undefined,
    };
  }
  return ctx;
}

export { LOCALES };
export default I18nProvider;
