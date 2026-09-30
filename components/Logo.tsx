import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  /** Afficher le texte METAMORPHOO à côté du papillon */
  withWordmark?: boolean;
  /** Taille du papillon en pixels */
  size?: number;
};

/**
 * Logo METAMORPHOO — papillon dont les veines dessinent un « M ».
 * Le point violet sur l'aile supérieure symbolise la chrysalide.
 */
export function Logo({ className, withWordmark = true, size = 44 }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        className="shrink-0 drop-shadow-[0_0_18px_rgba(245,185,66,0.45)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lgGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFE9B0" />
            <stop offset="0.45" stopColor="#F5B942" />
            <stop offset="1" stopColor="#B87A12" />
          </linearGradient>
          <linearGradient id="lgEmerald" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0E9473" />
            <stop offset="0.5" stopColor="#2ED39B" />
            <stop offset="1" stopColor="#5FE3B3" />
          </linearGradient>
          <linearGradient id="lgViolet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9E86FF" />
            <stop offset="1" stopColor="#5E3FE0" />
          </linearGradient>
        </defs>
        <path d="M244 236 C 196 108 84 92 62 158 C 40 224 128 268 244 262 Z" fill="url(#lgGold)" />
        <path d="M268 236 C 316 108 428 92 450 158 C 472 224 384 268 268 262 Z" fill="url(#lgGold)" />
        <path d="M244 268 C 208 340 132 396 92 372 C 52 348 96 268 244 276 Z" fill="url(#lgEmerald)" />
        <path d="M268 268 C 304 340 380 396 420 372 C 460 348 416 268 268 276 Z" fill="url(#lgEmerald)" />
        <g fill="none" stroke="#04060F" strokeOpacity="0.5" strokeWidth="10" strokeLinecap="round">
          <path d="M244 254 C 216 190 176 150 132 146" />
          <path d="M268 254 C 296 190 336 150 380 146" />
          <path d="M244 274 C 216 322 180 352 138 358" />
          <path d="M268 274 C 296 322 332 352 374 358" />
        </g>
        <ellipse cx="256" cy="196" rx="26" ry="34" fill="url(#lgViolet)" opacity="0.95" />
        <path d="M256 196 C 268 240 268 330 256 392 C 244 330 244 240 256 196 Z" fill="url(#lgGold)" />
        <circle cx="256" cy="188" r="20" fill="#FFE9B0" />
        <g fill="none" stroke="#FFE9B0" strokeWidth="10" strokeLinecap="round">
          <path d="M248 172 C 232 140 214 124 196 116" />
          <path d="M264 172 C 280 140 298 124 316 116" />
        </g>
        <circle cx="196" cy="116" r="12" fill="#F5B942" />
        <circle cx="316" cy="116" r="12" fill="#F5B942" />
      </svg>

      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.35rem] font-extrabold tracking-[0.16em] text-cream">
            METAMORPHOO
          </span>
          <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-gold-300/80">
            Movement
          </span>
        </span>
      )}
    </span>
  );
}

export default Logo;
