import type { MetadataRoute } from 'next';
import { LOCALES, localePath, type Locale } from '@/lib/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://metamorphoo.org';

const PAGES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'daily' | 'yearly' }[] =
  [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/vision-mission', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/actions', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/academie', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/leaders', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/medias', priority: 0.7, changeFrequency: 'daily' },
    { path: '/dons', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/confidentialite', priority: 0.3, changeFrequency: 'yearly' },
  ];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const page of PAGES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}${localePath(locale as Locale, page.path)}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            'fr-CD': `${SITE_URL}${localePath('fr', page.path)}`,
            en: `${SITE_URL}${localePath('en', page.path)}`,
            es: `${SITE_URL}${localePath('es', page.path)}`,
          },
        },
      });
    }
  }

  return entries;
}
