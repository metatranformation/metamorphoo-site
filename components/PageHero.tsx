import Link from 'next/link';
import type { ReactNode } from 'react';
import { ChevronDown } from './Icons';

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  breadcrumb?: string;
};

/** Bandeau d'en-tête des pages intérieures. */
export function PageHero({ eyebrow, title, subtitle, image, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[54svh] items-end overflow-hidden pb-14 pt-36">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/70 to-night-950/40" />
        </>
      )}
      <div className="halo -left-20 top-0 h-72 w-72 bg-gold-400/18" />
      <div className="halo -right-10 bottom-0 h-72 w-72 bg-emerald2-500/18" />

      <div className="container-x relative">
        {breadcrumb && (
          <nav className="mb-5 flex items-center gap-2 text-xs text-cream/40" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-gold-200">
              Accueil
            </Link>
            <ChevronDown width={13} height={13} className="-rotate-90" />
            <span className="text-gold-200/80">{breadcrumb}</span>
          </nav>
        )}
        <p className="eyebrow animate-rise-fade">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-[1.06] animate-rise-fade sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/70 animate-rise-fade sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageHero;
