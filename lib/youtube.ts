/**
 * Récupération des dernières vidéos YouTube via le flux RSS public.
 * Aucune clé API nécessaire, aucun coût, aucune limite de quota.
 * Flux utilisé : https://www.youtube.com/feeds/videos.xml?channel_id=XXXX
 */

export type YoutubeVideo = {
  videoId: string;
  titre: string;
  publieLe: string;
  vignette: string;
  vues: string;
};

const FEED = 'https://www.youtube.com/feeds/videos.xml';

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

export async function getLatestVideos(channelId: string, limit = 6): Promise<YoutubeVideo[]> {
  if (!channelId) return [];
  try {
    const res = await fetch(`${FEED}?channel_id=${channelId}`, {
      next: { revalidate: 3600 }, // cache 1 heure
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const entries = xml.split('<entry>').slice(1);
    const videos: YoutubeVideo[] = [];

    for (const entry of entries) {
      const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
      const dateMatch = entry.match(/<published>([^<]+)<\/published>/);
      const viewsMatch = entry.match(/views="(\d+)"/);
      if (!idMatch) continue;

      videos.push({
        videoId: idMatch[1],
        titre: titleMatch ? decodeEntities(titleMatch[1].trim()) : 'Vidéo Metamorphoo',
        publieLe: dateMatch ? dateMatch[1] : '',
        vignette: `https://i.ytimg.com/vi/${idMatch[1]}/hqdefault.jpg`,
        vues: viewsMatch ? Number(viewsMatch[1]).toLocaleString('fr-FR') : '',
      });
      if (videos.length >= limit) break;
    }
    return videos;
  } catch (error) {
    console.error('[Metamorphoo] Flux YouTube indisponible', error);
    return [];
  }
}
