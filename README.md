<div align="center">

# 🦋 METAMORPHOO MOVEMENT

**Transformation holistique pour le réveil authentique et durable dans les nations.**

*« Soyez transformés par le renouvellement de l'intelligence. » — Romains 12:2*

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com)
[![Licence](https://img.shields.io/badge/usage-Interne-gold)](./LICENCE)

</div>

---

## Le site

Site officiel du mouvement **METAMORPHOO**, né en juillet 2023 à Goma (RDC) de la
vision reçue par le couple **Fidèle BUMBA OBUTU & Clarice BUMBA**.

### Ce qui est inclus

| | |
|---|---|
| 🦋 **Métamorphose animée** | Des papillons animés en toile de fond sur **chaque page**, un rail de progression « chenille → chrysalide → papillon », et une section 3D interactive |
| 🎬 **Film de la marque** | Séquence cinématique chenille → chrysalide → papillon → logo, puis globe 3D avec les drapeaux des nations |
| 🎨 **Branding complet** | Logo officiel SVG (« M » aux ailes de feu surmonté d'une flamme), palette orange de la marque, typographie, favicon |
| 📄 **9 pages** | Accueil · Vision & Mission · Nos Actions · Académie · Devenir Leader · Médias · Dons · Contact · Mentions légales |
| ▶️ **YouTube** | Affichage automatique des dernières vidéos de la chaîne (flux RSS, sans clé API) |
| 📱 **Réseaux sociaux** | YouTube, Facebook, Instagram, TikTok — liens et intégrations |
| 📝 **Formulaires Google** | 9 formulaires intégrés + envoi automatique vers Google Sheets avec notification e-mail |
| 💳 **Dons & paiements** | Offrandes, dîmes, dons, vœux, partenariats — espèces et nature, ponctuel à annuel. Prêt pour **FlexPaie** et **GeneraPay** (SaaS Metamorphoo) |
| 🎓 **Académie en ligne** | Modules vidéo, suivi de progression, validation puis interview en ligne ou en présentiel |
| 💬 **WhatsApp** | Bouton flottant et liens pré-remplis partout (+243 997 628 592) |
| 🌍 **Multilingue** | Site entièrement traduit en **français**, **anglais** et **espagnol** — un seul jeu de pages |
| ✏️ **Mise à jour sans coder** | Interface d'administration `/admin/` + fichiers de contenu JSON |
| 🔍 **SEO & performance** | Pages statiques, données structurées, sitemap, Open Graph, 100/100 sur mobile |

---

## Démarrage rapide

```bash
# 1. Installer
npm install

# 2. Configurer (copier les variables et remplir au fur et à mesure)
cp .env.example .env.local

# 3. Lancer en local
npm run dev          # → http://localhost:3000

# 4. Construire pour la production
npm run build
npm start
```

---

## Structure du projet

```
metamorphoo-site/
├── app/                        # Les pages (App Router Next.js 14)
│   ├── page.tsx                # Accueil
│   ├── vision-mission/         # Vision, mission, ADN, charte graphique
│   ├── actions/                # Les 8 domaines d'action + agenda
│   ├── academie/               # Formation en ligne & validation
│   ├── leaders/                # Noyau de 12 & recrutement
│   ├── medias/                 # Galerie, vidéos, réseaux sociaux
│   ├── dons/                   # Dons, offrandes, paiements
│   ├── contact/                # Contact, formulaires, carte
│   ├── mentions-legales/       # Légal
│   ├── confidentialite/        # Protection des données
│   ├── layout.tsx              # En-tête, pied de page, fond animé
│   └── globals.css             # Design system (couleurs, animations 3D)
│
├── components/                 # Composants réutilisables
│   ├── ButterflyField.tsx      # Papillons animés (canvas) — fond de toutes les pages
│   ├── MorphRail.tsx           # Rail chenille → chrysalide → papillon
│   ├── MetamorphoseStage.tsx   # Section 3D de métamorphose
│   ├── DonationWidget.tsx      # Parcours de don en 4 étapes
│   ├── AcademyClient.tsx       # Modules, vidéos, progression
│   ├── GoogleFormEmbed.tsx     # Intégration des Google Forms
│   ├── Logo.tsx                # Logo SVG responsive
│   └── …
│
├── content/                    # ★ TOUT LE CONTENU MODIFIABLE ★
│   ├── site.json               # Contacts, réseaux, formulaires, paiements
│   ├── actions.json            # Les 8 domaines d'action
│   ├── agenda.json             # Prochaines activités
│   ├── academy.json            # Modules et leçons de formation
│   ├── testimonies.json        # Témoignages
│   ├── faq.json                # Questions fréquentes
│   ├── gallery.json            # Galerie photo
│   └── videos.json             # Vidéos à la une
│
├── lib/                        # Logique métier
│   ├── payments.ts             # FlexPaie, GeneraPay, Mobile Money…
│   ├── forms.ts                # Envoi vers Google Apps Script
│   ├── youtube.ts              # Flux RSS YouTube
│   └── content.ts              # Accès typé au contenu
│
├── public/
│   ├── images/                 # Visuels 3D (10 images)
│   ├── logo.svg, favicon.svg   # Identité visuelle
│   └── admin/                  # Interface d'administration (Decap CMS)
│
└── docs/                       # 📚 Guides de configuration
    ├── 01-GUIDE-DEMARRAGE.md   # GitHub + mise en ligne gratuite
    ├── 02-GOOGLE-FORMS-ET-SUIVI.md
    ├── 03-PAIEMENTS-FLEXPAIE-GENERAPAY.md
    ├── 04-MISE-A-JOUR-DU-CONTENU.md
    ├── 05-RESEAUX-SOCIAUX.md
    ├── 06-ACADEMIE-FORMATION.md
    ├── 07-RECOMMANDATIONS.md
    └── google-apps-script.js   # Code à coller dans Google Sheets
```

---

## Documentation

| Guide | Contenu |
|---|---|
| [01 — Démarrage](docs/01-GUIDE-DEMARRAGE.md) | Publier le site gratuitement sur Vercel, domaine, variables d'environnement |
| [02 — Google Forms](docs/02-GOOGLE-FORMS-ET-SUIVI.md) | Créer les formulaires, les connecter, suivre automatiquement |
| [03 — Paiements](docs/03-PAIEMENTS-FLEXPAIE-GENERAPAY.md) | Activer FlexPaie, GeneraPay, Mobile Money |
| [04 — Mise à jour](docs/04-MISE-A-JOUR-DU-CONTENU.md) | Modifier le site sans coder (`/admin/`) |
| [05 — Réseaux sociaux](docs/05-RESEAUX-SOCIAUX.md) | YouTube, Facebook, Instagram, TikTok, WhatsApp |
| [06 — Académie](docs/06-ACADEMIE-FORMATION.md) | Modules vidéo, progression, interview |
| [07 — Recommandations](docs/07-RECOMMANDATIONS.md) | Gratuit d'abord, payant ensuite |
| [08 — Langues & traductions](docs/08-LANGUES-ET-TRADUCTIONS.md) | Traduire le site (FR / EN / ES), ajouter une langue |
| [09 — Mise en ligne Netlify](docs/09-MISE-EN-LIGNE-NETLIFY.md) | Publier le site gratuitement sur une adresse `.netlify.app` |

---

## Identité visuelle

| Élément | Valeur |
|---|---|
| Orange flamme (couleur de marque) | `#F9A227` |
| Rouge transformation | `#DD2B18` |
| Dégradé officiel du logo | `#FFC44D → #F9A227 → #F4731F → #DD2B18` |
| Nuit profonde | `#04060F` |
| Émeraude de vie | `#2ED39B` |
| Crème | `#F7F3EA` |
| Titres | Playfair Display / Georgia |
| Textes | Inter / system-ui |

Le logo officiel (le « M » aux ailes de feu surmonté d'une flamme) est disponible dans
`public/logo.svg`, `public/logo-mark.svg` et `public/favicon.svg`. Il est utilisé partout
sur le site via le composant `components/Logo.tsx`, y compris dans la section
**Charte graphique** de la page [Vision & Mission](https://metamorphoo.org/vision-mission#charte).

---

## Multilingue (FR · EN · ES)

Le site est entièrement traduit en **français** (langue principale), **anglais** et **espagnol**,
sans dupliquer aucune page.

| Fichier | Rôle |
|---|---|
| `content/i18n/fr.json` | Dictionnaire français — **la référence** |
| `content/i18n/en.json` | Dictionnaire anglais |
| `content/i18n/es.json` | Dictionnaire espagnol |
| `lib/i18n-core.ts` | Traduction, listes, objets, tableaux (partagé client + serveur) |
| `lib/i18n.ts` | Lecture de la langue dans le cookie `NEXT_LOCALE` (côté serveur) |
| `components/I18nProvider.tsx` | Contexte React + hook `useI18n()` |
| `components/LanguageSwitcher.tsx` | Sélecteur de langue dans l'en-tête |

* Pour **modifier un texte** : éditez `content/i18n/fr.json` puis reportez la même clé dans `en.json` et `es.json`.
* Pour **ajouter une langue** : dupliquez `fr.json`, ajoutez son code dans `LOCALES` (`lib/i18n-core.ts`)
  et son libellé dans `LOCALE_LABELS`.
* Toute clé manquante retombe automatiquement sur le français : le site n'affiche jamais de texte vide.

---

## Contact

📱 WhatsApp : **+243 997 628 592**
✉️ E-mail : **contactmetamorphoo@gmail.com**
📍 Goma, Nord-Kivu, République Démocratique du Congo

---

<div align="center">

*Fait avec foi à Goma, RDC — pour le réveil des nations.*

</div>
