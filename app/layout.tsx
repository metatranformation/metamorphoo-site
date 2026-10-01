import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ButterflyField } from '@/components/ButterflyField';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MorphRail } from '@/components/MorphRail';
import { ScrollProgress } from '@/components/ScrollProgress';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { I18nProvider } from '@/components/I18nProvider';
import { site } from '@/lib/content';
import { DEFAULT_LOCALE, getDictionary, getLocale, translate, type Locale } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://metamorphoo.org';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = (path: string) => translate(locale, path);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('meta.title'),
      template: `%s · ${site.brand.fullName}`,
    },
    description: t('meta.description'),
    keywords: [
      'Metamorphoo',
      'mouvement du Saint-Esprit',
      'réveil',
      'transformation',
      'Romains 12:2',
      'Goma',
      'RDC',
      'camps spirituels',
      'leadership chrétien',
      'formation chrétienne en ligne',
      'revival',
      'transformation',
      'avivamiento',
    ],
    authors: [{ name: site.brand.fullName }],
    creator: site.brand.fullName,
    publisher: site.brand.fullName,
    applicationName: site.brand.fullName,
    category: 'religion',
    alternates: {
      canonical: '/',
      languages: {
        'fr-CD': '/',
        en: '/',
        es: '/',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'en_US',
      url: SITE_URL,
      siteName: site.brand.fullName,
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'METAMORPHOO' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: site.brand.fullName,
      description: t('meta.description'),
      images: ['/images/og-image.jpg'],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/favicon.svg' }],
      shortcut: ['/favicon.svg'],
    },
    manifest: '/manifest.webmanifest',
  };
}

export const viewport: Viewport = {
  themeColor: '#04060F',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'NGO'],
  name: site.brand.fullName,
  alternateName: 'METAMORPHOO',
  slogan: site.brand.tagline,
  foundingDate: '2023-07',
  email: site.contact.emails[0],
  telephone: site.contact.whatsapp,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Goma',
    addressRegion: 'Nord-Kivu',
    addressCountry: 'CD',
  },
  sameAs: site.socials.map((s) => s.url),
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  availableLanguage: [
    { '@type': 'Language', name: 'French' },
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Spanish' },
  ],
  description:
    'Plateforme missionnaire de formation, équipement et activation des croyants pour le réveil des nations.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale: Locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="relative min-h-screen overflow-x-hidden">
        {/* Fond animé : papillons en métamorphose (toutes les pages) */}
        <ButterflyField />

        <I18nProvider locale={locale}>
          <ScrollProgress />
          <Header />

          <main id="contenu" className="relative z-10">
            {children}
          </main>

          <Footer />
          <MorphRail />
          <WhatsAppButton />
        </I18nProvider>
      </body>
    </html>
  );
}

export { DEFAULT_LOCALE };
