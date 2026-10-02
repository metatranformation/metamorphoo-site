import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
});

/* ---------------------- Réseaux sociaux ---------------------- */

export function YoutubeIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.1-2.1C18.5 3.5 12 3.5 12 3.5s-6.5 0-8.4.6A3 3 0 0 0 1.5 6.2C1 8.1 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 8.4.6 8.4.6s6.5 0 8.4-.6a3 3 0 0 0 2.1-2.1C23 15.9 23 12 23 12ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.7-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TiktokIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M16.6 2h-3v13.1a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.5a5.8 5.8 0 1 0 4.8 5.7V8.2a6.4 6.4 0 0 0 4 1.3V6.4a3.7 3.7 0 0 1-3.9-3.6c0-.3 0-.6.1-.8Z" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.8-.2a12 12 0 0 1-5.6-4.9c-.4-.7-.6-1.4-.4-2 .1-.5.7-1.4 1.2-1.6.3-.1.8-.1 1 .1l.9 1.6c.1.3 0 .5-.1.7l-.4.5c-.1.2-.2.4 0 .7.4.7 1.5 2 2.3 2.4.3.1.5.1.7-.1l.5-.6c.2-.2.4-.2.7-.1l1.5.9c.2.2.2.6.1 1.1Z" />
    </svg>
  );
}

/* ---------------------- Interface ---------------------- */

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2.5 2.5 0 0 1-2.7 2.5C10.5 18.4 5.6 13.5 4 6.7A2.5 2.5 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  );
}

export function Users(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 20a6.2 6.2 0 0 1 12.4 0M16.5 5.2a3.4 3.4 0 0 1 0 6.4M18 20a6.2 6.2 0 0 0-2.2-4.7" />
    </svg>
  );
}

export function Heart(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function Book(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
      <path d="M4 20.5V5.5M20 18H6.5A2.5 2.5 0 0 0 4 20.5" />
    </svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function Quote(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M9.5 5C6.5 6.4 5 8.9 5 12v7h6v-7H7.6c0-2 .8-3.4 2.6-4.2L9.5 5Zm9 0C15.5 6.4 14 8.9 14 12v7h6v-7h-3.4c0-2 .8-3.4 2.6-4.2L18.5 5Z" />
    </svg>
  );
}

export function Globe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l7.5 3v6c0 4.6-3.2 7.8-7.5 9-4.3-1.2-7.5-4.4-7.5-9V6Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

export function Handshake(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m3 12 4-4 3 3 3-3 4 4" />
      <path d="M8 15.5 10.5 18l3-3 2.5 2.5M3 12v4l4 4h5l2-2 2 2h2" />
    </svg>
  );
}

export function Butterfly(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 6.5c-1.6-3-5-4-6.6-1.6-1.4 2.2.3 5 3.6 5.6" />
      <path d="M12 6.5c1.6-3 5-4 6.6-1.6 1.4 2.2-.3 5-3.6 5.6" />
      <path d="M9.6 12.1C7 14 5.6 17 7.6 18.6c1.8 1.4 3.4-.4 4.4-3.2M14.4 12.1c2.6 1.9 4 4.9 2 6.5-1.8 1.4-3.4-.4-4.4-3.2" />
      <path d="M12 6.5V19" />
    </svg>
  );
}
