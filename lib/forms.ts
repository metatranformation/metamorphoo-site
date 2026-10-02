/**
 * Envoi des formulaires vers Google Sheets via Google Apps Script.
 * Solution 100 % gratuite : aucun serveur à payer, suivi automatique dans
 * un tableur + notification par e-mail (voir docs/google-apps-script.js).
 */

export type FormKind =
  | 'visiteur'
  | 'ouvrier'
  | 'leader'
  | 'formation'
  | 'don'
  | 'don-nature'
  | 'contact'
  | 'newsletter'
  | 'priere';

export type FormPayload = {
  kind: FormKind;
  [key: string]: unknown;
};

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

export const isFormBackendConfigured = Boolean(SCRIPT_URL);

export type SubmitResult = { ok: true; message: string } | { ok: false; message: string };

export async function submitForm(payload: FormPayload): Promise<SubmitResult> {
  if (!SCRIPT_URL) {
    // Mode démo : le site fonctionne, mais rien n'est enregistré.
    console.warn('[Metamorphoo] NEXT_PUBLIC_GOOGLE_SCRIPT_URL non configuré — envoi simulé.', payload);
    return {
      ok: true,
      message: 'Formulaire reçu (mode démonstration). Configurez le Google Apps Script pour enregistrer les données.',
    };
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      // text/plain évite le préflight CORS des Apps Scripts
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        ...payload,
        source: typeof window !== 'undefined' ? window.location.href : 'site',
        date: new Date().toISOString(),
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
    if (data && data.ok === false) throw new Error('Rejeté par le script');

    return { ok: true, message: 'Merci ! Votre demande a été enregistrée. Notre équipe vous contactera.' };
  } catch (error) {
    console.error('[Metamorphoo] Échec de l\'envoi du formulaire', error);
    return {
      ok: false,
      message:
        "L'envoi automatique a échoué. Réessayez ou écrivez-nous directement sur WhatsApp au +243 997 628 592.",
    };
  }
}
