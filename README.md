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
| 🎨 **Branding complet** | Logo SVG (papillon dont les veines dessinent un « M »), palette, typographie, favicon, manifest PWA |
| 📄 **9 pages** | Accueil · Vision & Mission · Nos Actions · Académie · Devenir Leader · Médias · Dons · Contact · Mentions légales |
| ▶️ **YouTube** | Affichage automatique des dernières vidéos de la chaîne (flux RSS, sans clé API) |
| 📱 **Réseaux sociaux** | YouTube, Facebook, Instagram, TikTok — liens et intégrations |
| 📝 **Formulaires Google** | 9 formulaires intégrés + envoi automatique vers Google Sheets avec notification e-mail |
| 💳 **Dons & paiements** | Offrandes, dîmes, dons, vœux, partenariats — espèces et nature, ponctuel à annuel. Prêt pour **FlexPaie** et **GeneraPay** (SaaS Metamorphoo) |
| 🎓 **Académie en ligne** | Modules vidéo, suivi de progression, validation puis interview en ligne ou en présentiel |
| 💬 **WhatsApp** | Bouton flottant et liens pré-remplis partout (+243 997 628 592) |
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

---

## Identité visuelle

| Élément | Valeur |
|---|---|
| Nuit profonde | `#04060F` |
| Or transformation | `#F5B942` |
| Émeraude de vie | `#2ED39B` |
| Violet de l'Esprit | `#7C5CFF` |
| Crème | `#F7F3EA` |
| Titres | Playfair Display / Georgia |
| Textes | Inter / system-ui |

---

## Contact

📱 WhatsApp : **+243 997 628 592**
✉️ E-mail : **contactmetamorphoo@gmail.com**
📍 Goma, Nord-Kivu, République Démocratique du Congo

---

<div align="center">

*Fait avec foi à Goma, RDC — pour le réveil des nations.*

</div>
