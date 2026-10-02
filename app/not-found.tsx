import Link from 'next/link';
import { Butterfly } from '@/components/Icons';
import { DEFAULT_LOCALE, localePath } from '@/lib/i18n';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center py-32">
      <div className="container-x text-center">
        <Butterfly width={56} height={56} className="mx-auto animate-float text-gold-300" />
        <p className="mt-8 font-display text-7xl font-extrabold text-gradient sm:text-8xl">404</p>
        <h1 className="mt-6 text-2xl font-bold sm:text-3xl">Cette page est encore en chrysalide…</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60">
          La page que vous cherchez n’existe pas ou a été déplacée. Revenez à l’accueil pour continuer votre
          visite.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href={localePath(DEFAULT_LOCALE, '/')} className="btn-gold">
            Retour à l’accueil
          </Link>
          <Link href={localePath(DEFAULT_LOCALE, '/contact')} className="btn-ghost">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
