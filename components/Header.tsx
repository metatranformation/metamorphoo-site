'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Close, Menu } from './Icons';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/vision-mission', label: 'Vision & Mission' },
  { href: '/actions', label: 'Nos Actions' },
  { href: '/academie', label: 'Académie' },
  { href: '/leaders', label: 'Devenir Leader' },
  { href: '/medias', label: 'Médias' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <a href="#contenu" className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-full bg-gold-400 px-5 py-2 text-sm font-semibold text-night-950">
        Aller au contenu
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-expo',
          scrolled
            ? 'border-b border-white/10 bg-night-950/80 py-2.5 backdrop-blur-2xl'
            : 'border-b border-transparent py-5',
        )}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Link href="/" aria-label="METAMORPHOO - Accueil" className="shrink-0">
            <Logo size={scrolled ? 38 : 44} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-[0.82rem] font-medium tracking-wide transition-colors duration-300',
                  isActive(item.href)
                    ? 'text-gold-200'
                    : 'text-cream/70 hover:text-cream',
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-4 -bottom-0.5 h-px origin-left bg-gradient-to-r from-gold-300 to-emerald2-400 transition-transform duration-500 ease-expo',
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dons" className="btn-gold hidden !px-6 !py-2.5 !text-[0.8rem] sm:inline-flex">
              Faire un don
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="glass grid h-11 w-11 place-items-center rounded-full text-cream lg:hidden"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-night-950/95 backdrop-blur-2xl transition-all duration-500 ease-expo lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="container-x flex flex-1 flex-col justify-center gap-2 pt-24 pb-10">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ transitionDelay: `${i * 45}ms` }}
              className={cn(
                'border-b border-white/5 py-4 font-display text-2xl transition-all duration-500',
                open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                isActive(item.href) ? 'text-gold-200' : 'text-cream/80',
              )}
            >
              <span className="mr-3 text-xs font-sans text-gold-300/60">0{i + 1}</span>
              {item.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/dons" className="btn-gold w-full">
              Faire un don
            </Link>
            <Link href="/contact" className="btn-ghost w-full">
              Devenir visiteur
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
