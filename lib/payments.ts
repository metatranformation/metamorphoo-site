/**
 * Couche de paiement Metamorphoo.
 * Objectif : brancher facilement FlexPaie, GeneraPay (SaaS Metamorphoo en
 * développement), Mobile Money, virement bancaire et PayPal — sans réécrire
 * le site. Voir docs/03-PAIEMENTS-FLEXPAIE-GENERAPAY.md
 */

export type PaymentProviderId =
  | 'flexpaie'
  | 'generapay'
  | 'mpesa'
  | 'airtel-money'
  | 'orange-money'
  | 'virement'
  | 'especes'
  | 'paypal'
  | 'google-form';

export type PaymentIntent = {
  provider: PaymentProviderId;
  amount: number;
  currency: 'USD' | 'CDF' | 'EUR';
  type: string; // offrande, dime, don, voeu, partenariat, projet, nature
  frequency: 'ponctuel' | 'hebdomadaire' | 'mensuel' | 'annuel';
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  reference?: string;
};

export type ProviderStatus = 'actif' | 'bientot' | 'manuel';

export type PaymentProvider = {
  id: PaymentProviderId;
  label: string;
  description: string;
  status: ProviderStatus;
  instructions?: string;
  /** URL de paiement générée (redirection) si le provider le permet */
  checkoutUrl?: string;
  logoText?: string;
};

const env = (key: string): string => (typeof process !== 'undefined' ? process.env[key] || '' : '');

/** Référence unique de transaction, lisible par l'équipe financière */
export function buildReference(intent: PaymentIntent): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  const kind = intent.type.slice(0, 3).toUpperCase();
  return `MTA-${kind}-${stamp}-${rand}`;
}

/**
 * Construit l'URL de redirection vers la plateforme de paiement.
 * FlexPaie et GeneraPay sont des API « hosted checkout » : on redirige
 * l'utilisateur avec une référence, puis on vérifie le paiement côté back-office.
 */
export function buildCheckoutUrl(intent: PaymentIntent): string | undefined {
  const ref = intent.reference || buildReference(intent);
  const params = new URLSearchParams({
    amount: String(intent.amount),
    currency: intent.currency,
    reference: ref,
    description: `Metamorphoo - ${intent.type} (${intent.frequency})`,
  });
  if (intent.donorEmail) params.set('email', intent.donorEmail);
  if (intent.donorPhone) params.set('phone', intent.donorPhone);

  switch (intent.provider) {
    case 'flexpaie': {
      const base = env('NEXT_PUBLIC_FLEXPAIE_CHECKOUT_URL') || 'https://pay.flexpaie.com/checkout';
      const merchant = env('NEXT_PUBLIC_FLEXPAIE_MERCHANT');
      if (!merchant) return undefined;
      params.set('merchant', merchant);
      return `${base}?${params.toString()}`;
    }
    case 'generapay': {
      const base = env('NEXT_PUBLIC_GENERAPAY_CHECKOUT_URL') || 'https://pay.generapay.cd/checkout';
      const merchant = env('NEXT_PUBLIC_GENERAPAY_MERCHANT');
      if (!merchant) return undefined;
      params.set('merchant', merchant);
      return `${base}?${params.toString()}`;
    }
    case 'paypal': {
      const handle = env('NEXT_PUBLIC_PAYPAL_HANDLE');
      if (!handle) return undefined;
      return `https://www.paypal.com/paypalme/${handle}/${intent.amount}${intent.currency}`;
    }
    default:
      return undefined;
  }
}

/** Message de paiement manuel (Mobile Money, banque, espèces) */
export function manualInstructions(provider: PaymentProviderId, intent?: PaymentIntent): string {
  const ref = intent?.reference ? ` Référence à indiquer : ${intent.reference}.` : '';
  switch (provider) {
    case 'mpesa':
      return `Composez *126# ou utilisez l'application M-Pesa, menu « Paiement marchand ».${ref}`;
    case 'airtel-money':
      return `Composez *501# ou utilisez l'application Airtel Money.${ref}`;
    case 'orange-money':
      return `Composez *144# ou utilisez l'application Orange Money.${ref}`;
    case 'virement':
      return `Virement bancaire au compte du mouvement (coordonnées dans la section Virement).${ref}`;
    case 'especes':
      return `Remise en mains propres lors d'une activité ou au siège de Goma.${ref}`;
    case 'flexpaie':
      return 'Paiement en ligne sécurisé par FlexPaie (bientôt disponible).';
    case 'generapay':
      return 'Paiement en ligne GeneraPay — plateforme SaaS Metamorphoo en développement.';
    default:
      return '';
  }
}

/** Liste affichée sur la page Dons */
export function listProviders(): PaymentProvider[] {
  const hasFlex = Boolean(env('NEXT_PUBLIC_FLEXPAIE_MERCHANT'));
  const hasGenera = Boolean(env('NEXT_PUBLIC_GENERAPAY_MERCHANT'));
  return [
    {
      id: 'flexpaie',
      label: 'FlexPaie',
      description: 'Paiement en ligne, Mobile Money et cartes bancaires (RDC).',
      status: hasFlex ? 'actif' : 'bientot',
      instructions: hasFlex
        ? 'Vous serez redirigé vers la page sécurisée FlexPaie.'
        : 'Bientôt disponible — en attendant, utilisez Mobile Money ou le virement.',
    },
    {
      id: 'generapay',
      label: 'GeneraPay',
      description: 'Plateforme SaaS Metamorphoo (en développement).',
      status: hasGenera ? 'actif' : 'bientot',
      instructions: 'Intégration en cours de développement par l\'équipe Metamorphoo.',
    },
    {
      id: 'mpesa',
      label: 'M-Pesa',
      description: 'Vodacom M-Pesa — RDC.',
      status: env('NEXT_PUBLIC_MPESA_NUMBER') ? 'actif' : 'manuel',
    },
    {
      id: 'airtel-money',
      label: 'Airtel Money',
      description: 'Airtel Money — RDC.',
      status: env('NEXT_PUBLIC_AIRTEL_MONEY_NUMBER') ? 'actif' : 'manuel',
    },
    {
      id: 'orange-money',
      label: 'Orange Money',
      description: 'Orange Money — RDC.',
      status: env('NEXT_PUBLIC_ORANGE_MONEY_NUMBER') ? 'actif' : 'manuel',
    },
    {
      id: 'virement',
      label: 'Virement bancaire',
      description: 'Pour les partenaires, églises, entreprises et ONG.',
      status: 'manuel',
    },
    {
      id: 'especes',
      label: 'Espèces / en nature',
      description: 'Offrandes lors des activités, remise au siège de Goma.',
      status: 'manuel',
    },
  ];
}
