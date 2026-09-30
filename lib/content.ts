import siteData from '@/content/site.json';
import actionsData from '@/content/actions.json';
import academyData from '@/content/academy.json';
import testimoniesData from '@/content/testimonies.json';
import faqData from '@/content/faq.json';
import galleryData from '@/content/gallery.json';
import videosData from '@/content/videos.json';

/* ---------------- Types ---------------- */

export type Social = {
  id: string;
  label: string;
  handle: string;
  url: string;
  channelId?: string;
  accent: string;
};

export type FormConfig = {
  titre: string;
  description: string;
  googleFormId: string;
  googleFormHeight: number;
  redirectThanks: string;
};

export type SiteConfig = typeof siteData;

export type Action = (typeof actionsData)[number];
export type AcademyModule = (typeof academyData)[number];
export type Lesson = AcademyModule['lecons'][number];
export type Testimony = (typeof testimoniesData)[number];
export type Faq = (typeof faqData)[number];
export type GalleryItem = (typeof galleryData)[number];
export type VideoItem = (typeof videosData)[number];

/* ---------------- Accesseurs ---------------- */

export const site = siteData as SiteConfig;
export const actions = actionsData as Action[];
export const academyModules = academyData as AcademyModule[];
export const testimonies = testimoniesData as Testimony[];
export const faq = faqData as Faq[];
export const gallery = galleryData as GalleryItem[];
export const videos = videosData as VideoItem[];

export const getForm = (id: keyof SiteConfig['forms']): FormConfig =>
  (siteData.forms as Record<string, FormConfig>)[id] ??
  ({ titre: 'Formulaire', description: '', googleFormId: '', googleFormHeight: 1200, redirectThanks: '/contact' } as FormConfig);

/** URL d'intégration (embed) d'un Google Form publié */
export function googleFormEmbedUrl(formId: string): string {
  if (!formId) return '';
  return `https://docs.google.com/forms/d/e/${formId}/viewform?embedded=true`;
}

/** URL publique (partage) d'un Google Form */
export function googleFormShareUrl(formId: string): string {
  if (!formId) return '';
  return `https://docs.google.com/forms/d/e/${formId}/viewform`;
}

export const socialById = (id: string): Social | undefined =>
  (siteData.socials as Social[]).find((s) => s.id === id);

/** Lien WhatsApp officiel du mouvement */
export const whatsappUrl =
  `https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}` +
  `?text=${encodeURIComponent(site.contact.whatsappMessage)}`;

export const totalLessons = academyModules.reduce((sum, m) => sum + m.lecons.length, 0);
