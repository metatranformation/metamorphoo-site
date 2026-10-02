'use client';

import { useEffect } from 'react';

/**
 * Corrige l'attribut `lang` du document selon la langue de la route.
 * Le site est exporté en statique : chaque langue a son propre fichier HTML,
 * ce script synchrone garantit la bonne valeur avant le premier rendu.
 */
export function HtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    if (typeof document !== 'undefined' && document.documentElement.lang !== locale) {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
      }}
    />
  );
}

export default HtmlLang;
