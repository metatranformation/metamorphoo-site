'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/content';
import { WhatsappIcon } from './Icons';
import { useI18n } from './I18nProvider';

/** Bouton flottant WhatsApp — apparaît après le premier écran. */
export function WhatsAppButton() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const href = `https://wa.me/${site.contact.whatsapp.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
    site.contact.whatsappMessage,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t('footer.whatsappFloatAria')} ${site.contact.whatsappDisplay}`}
      className={`group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[#25D366] py-3.5 pl-4 pr-5 font-semibold text-night-950 shadow-[0_18px_45px_-12px_rgba(37,211,102,0.9)] transition-all duration-500 ease-expo sm:bottom-7 sm:right-7 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <span className="relative grid place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
        <WhatsappIcon width={24} height={24} />
      </span>
      <span className="hidden text-sm sm:inline">{t('footer.whatsappFloat')}</span>
    </a>
  );
}

export default WhatsAppButton;
