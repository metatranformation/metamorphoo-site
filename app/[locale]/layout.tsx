import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';
import { HtmlLang } from '@/components/HtmlLang';
import { LOCALES, localeFromParams, localePath, translate, type Locale } from '@/lib/i18n';

/** Génère les 3 versions statiques du site : /fr, /en, /es. */
export function generateStaticParams(): { locale: Locale }[] {
  return LOCALES.map((locale) => ({ locale }));
}

/** Métadonnées par défaut ; chaque page affine son titre via son propre generateMetadata. */
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = localeFromParams(params);

  return {
    description: translate(locale, 'meta.description'),
    alternates: {
      languages: {
        'fr-CD': localePath('fr', '/'),
        en: localePath('en', '/'),
        es: localePath('es', '/'),
      },
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = localeFromParams(params);
  if (!LOCALES.includes(locale)) notFound();

  return (
    <I18nProvider locale={locale}>
      <HtmlLang locale={locale} />
      <Header />
      {children}
      <Footer />
    </I18nProvider>
  );
}
