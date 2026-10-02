import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { site } from '@/lib/content';
import { FacebookIcon, InstagramIcon, TiktokIcon, YoutubeIcon } from './Icons';

const ICONS: Record<string, (p: { width?: number; height?: number; className?: string }) => JSX.Element> = {
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
};

type SocialLinksProps = {
  className?: string;
  size?: number;
  withLabels?: boolean;
};

/** Liens vers les réseaux sociaux officiels (YouTube, Facebook, Instagram, TikTok). */
export function SocialLinks({ className, size = 18, withLabels = false }: SocialLinksProps) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-3', className)}>
      {site.socials.map((s) => {
        const Icon = ICONS[s.id];
        if (!Icon) return null;
        return (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${s.label} — ${s.handle}`}
              className="group glass flex items-center gap-2 rounded-full px-3.5 py-2.5 text-cream/70 transition-all duration-300 hover:-translate-y-1 hover:text-cream"
              style={{ ['--accent' as string]: s.accent } as CSSProperties}
            >
              <span className="transition-colors duration-300 group-hover:text-[var(--accent)]">
                <Icon width={size} height={size} />
              </span>
              {withLabels && <span className="text-xs font-medium">{s.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialLinks;
