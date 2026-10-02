# 08 — Langues & traductions (FR / EN / ES)

Le site METAMORPHOO est **entièrement multilingue** : français, anglais et espagnol.
Il n'existe **qu'un seul jeu de pages** — le texte change, pas l'adresse.

---

## 1. Comment ça marche

| Fichier | Rôle |
|---|---|
| `content/i18n/fr.json` | Dictionnaire **français** — c'est la référence |
| `content/i18n/en.json` | Dictionnaire anglais |
| `content/i18n/es.json` | Dictionnaire espagnol |
| `lib/i18n-core.ts` | Moteur de traduction : `translate()`, `translateList()`, `translateArray()`, `getObject()` |
| `lib/i18n.ts` | Lecture de la langue dans le cookie `NEXT_LOCALE` (côté serveur) |
| `components/I18nProvider.tsx` | Contexte React + hook `useI18n()` pour les composants interactifs |
| `components/LanguageSwitcher.tsx` | Le sélecteur 🇫🇷 / 🇬🇧 / 🇪🇸 dans l'en-tête |

**Règle de sécurité :** si une clé manque dans une langue, le site retombe
automatiquement sur le français. Le visiteur ne voit jamais de texte vide.

---

## 2. Modifier un texte existant

1. Ouvrez `content/i18n/fr.json`.
2. Cherchez la clé (exemple : `home.dons.eyebrow`).
3. Modifiez la valeur **dans les trois fichiers** (`fr.json`, `en.json`, `es.json`)
   pour garder les trois versions alignées.

```json
{
  "home": {
    "dons": {
      "eyebrow": "Mobilisation financière et matérielle"
    }
  }
}
```

---

## 3. Ajouter un nouveau texte

1. Ajoutez la clé dans les **trois** dictionnaires, au même endroit.
2. Utilisez-la :
   * dans une page (composant serveur) : `t('home.dons.eyebrow')`
   * dans un composant interactif : `const { t } = useI18n();` puis `t('home.dons.eyebrow')`
3. Vérifiez avec `npm run build` : si une clé est absente, le texte affiché
   ressemblera à `home.dons.eyebrow` (c'est le signal d'alerte).

---

## 4. Ajouter une quatrième langue (exemple : swahili)

1. Dupliquez `content/i18n/fr.json` → `content/i18n/sw.json` et traduisez les valeurs.
2. Dans `lib/i18n-core.ts` :
   ```ts
   import sw from '@/content/i18n/sw.json';
   export const LOCALES = ['fr', 'en', 'es', 'sw'] as const;
   const dictionaries = { fr, en, es, sw } as const;
   export const LOCALE_TAGS = { fr: 'fr-FR', en: 'en-US', es: 'es-ES', sw: 'sw-KE' };
   export const LOCALE_LABELS = {
     /* ... */
     sw: { label: 'Kiswahili', flag: '🇰🇪', short: 'SW' },
   };
   ```
3. Rien d'autre à changer : le sélecteur de langue et les pages se mettent à jour seuls.

---

## 5. Ce qui n'est pas traduit (et pourquoi)

* **Les contenus de données** restent dans `content/*.json` (formulaires Google,
  paramètres de paiement, coordonnées bancaires, identifiants de vidéos) : ce sont
  des données techniques, pas du texte affiché.
* **Les titres et descriptions des formulaires Google** sont traduits via
  `data.forms.<id>.{titre,description}` dans les dictionnaires.
* **Les images** sont communes aux trois langues.

---

## 6. Tester les trois langues

```bash
npm run dev
# puis, dans le navigateur, cliquez sur le sélecteur de langue en haut à droite.
```

Ou en ligne de commande (le cookie `NEXT_LOCALE` choisit la langue) :

```bash
curl -H "Cookie: NEXT_LOCALE=fr" http://localhost:3000/   # français
curl -H "Cookie: NEXT_LOCALE=en" http://localhost:3000/   # anglais
curl -H "Cookie: NEXT_LOCALE=es" http://localhost:3000/   # espagnol
```

---

*Dernière mise à jour : octobre 2026.*
