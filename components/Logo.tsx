import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  /** Afficher le texte META MORPHOO à côté du symbole */
  withWordmark?: boolean;
  /** Taille du symbole en pixels */
  size?: number;
  /** Animation douce (battement d'ailes) */
  animated?: boolean;
};

/**
 * Logo officiel METAMORPHOO.
 * Symbole : un « M » formé de deux ailes de feu, surmonté d'une flamme
 * (la transformation / le Saint-Esprit). Dégradé orange officiel de la marque.
 */
export function Logo({ className, withWordmark = true, size = 44, animated = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={cn('shrink-0 drop-shadow-[0_0_16px_rgba(249,162,39,0.5)]', animated && 'logo-wing logo-flame')}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFC44D" />
            <stop offset="0.35" stopColor="#F9A227" />
            <stop offset="0.7" stopColor="#F4731F" />
            <stop offset="1" stopColor="#DD2B18" />
          </linearGradient>
          <linearGradient id="logoShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className={animated ? 'logo-wing-left' : undefined}>
          <path d="M 18 40 C 14 90, 52 142, 100 178 C 86 140, 72 88, 68 40 C 48 32, 32 32, 18 40 Z" fill="url(#logoGrad)" />
          <path d="M 26 46 C 24 88, 56 134, 96 168 C 84 134, 72 90, 68 48 C 52 42, 38 42, 26 46 Z" fill="url(#logoShine)" />
        </g>
        <g className={animated ? 'logo-wing-right' : undefined}>
          <path d="M 182 40 C 186 90, 148 142, 100 178 C 114 140, 128 88, 132 40 C 152 32, 168 32, 182 40 Z" fill="url(#logoGrad)" />
          <path d="M 174 46 C 176 88, 144 134, 104 168 C 116 134, 128 90, 132 48 C 148 42, 162 42, 174 46 Z" fill="url(#logoShine)" />
        </g>
        <g className={animated ? 'logo-flame' : undefined}>
          <path d="M 100 4 C 113 24, 126 40, 126 55 C 126 72, 114 84, 100 84 C 86 84, 74 72, 74 55 C 74 40, 87 24, 100 4 Z" fill="url(#logoGrad)" />
          <path d="M 100 14 C 110 30, 120 43, 120 55 C 120 68, 111 77, 100 77 C 89 77, 80 68, 80 55 C 80 43, 90 30, 100 14 Z" fill="url(#logoShine)" opacity="0.65" />
        </g>
      </svg>

      {withWordmark && (
        <span className="flex flex-col leading-[0.92]">
          <span className="bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600 bg-clip-text font-display text-[1.3rem] font-extrabold tracking-[-0.01em] text-transparent">
            META
          </span>
          <span className="bg-gradient-to-br from-gold-200 via-gold-400 to-gold-600 bg-clip-text font-display text-[1.3rem] font-extrabold tracking-[-0.01em] text-transparent">
            MORPHOO
          </span>
        </span>
      )}
    </span>
  );
}

export default Logo;
