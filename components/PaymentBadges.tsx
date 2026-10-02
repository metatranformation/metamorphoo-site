'use client';

import { Lock } from './Icons';
import { useI18n } from './I18nProvider';

const BADGES = ['FlexPaie', 'GeneraPay', 'M-Pesa', 'Airtel Money', 'Orange Money', 'Virement bancaire', 'Espèces'];

/** Bandeau des moyens de paiement acceptés. */
export function PaymentBadges({ className = '' }: { className?: string }) {
  const { t } = useI18n();

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-cream/40">
        <Lock width={13} height={13} /> {t('footer.payments')}
      </span>
      {BADGES.map((b) => (
        <span
          key={b}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.7rem] font-medium text-cream/70"
        >
          {b}
        </span>
      ))}
    </div>
  );
}

export default PaymentBadges;
