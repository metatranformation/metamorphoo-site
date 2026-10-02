export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Numéro au format international sans espaces ni "+" (pour les liens wa.me) */
export function waNumber(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

/** Lien WhatsApp pré-rempli */
export function waLink(phone: string, message?: string): string {
  const base = `https://wa.me/${waNumber(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Numéro lisible : +243997628592 -> +243 997 628 592 */
export function formatPhone(phone: string): string {
  const digits = waNumber(phone);
  if (digits.length < 9) return phone;
  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`.trim();
}

/** Identifiant de vidéo YouTube à partir d'une URL ou d'un ID brut */
export function youtubeId(input: string): string {
  if (!input) return '';
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/,
    /^([\w-]{11})$/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }
  return '';
}

export function youtubeThumb(videoId: string, quality: 'max' | 'hq' | 'mq' = 'hq'): string {
  const map = { max: 'maxresdefault', hq: 'hqdefault', mq: 'mqdefault' } as const;
  return `https://i.ytimg.com/vi/${videoId}/${map[quality]}.jpg`;
}

/** Montant formaté selon la devise */
export function formatAmount(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

export function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
