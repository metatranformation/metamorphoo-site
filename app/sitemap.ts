import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://metamorphoo.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/vision-mission', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/actions', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/academie', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/leaders', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/medias', priority: 0.7, changeFrequency: 'daily' as const },
    { path: '/dons', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return pages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternateLanguages: { 'fr-CD': `${SITE_URL}${page.path}` },
  }));
}

export const dynamic = 'force-static';
