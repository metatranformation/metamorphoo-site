# 01 — Guide de démarrage : GitHub + mise en ligne GRATUITE

> Objectif : publier la première version du site Metamorphoo sur Internet,
> **sans payer quoi que ce soit**, avec une adresse professionnelle.

---

## A. Ce que vous avez déjà

Le code complet du site est dans ce dépôt GitHub. Il contient :

| Dossier | Contenu |
|---|---|
| `app/` | Les 9 pages du site (accueil, vision, actions, académie, leaders, médias, dons, contact, légal) |
| `components/` | Les éléments visuels : papillons animés, métamorphose 3D, cartes, formulaires |
| `content/*.json` | **Tout le texte modifiable** (contacts, actions, agenda, modules, témoignages…) |
| `public/images/` | Les visuels 3D et le logo |
| `public/admin/` | L'interface d'administration (Decap CMS) pour modifier sans coder |
| `docs/` | Les guides de configuration |

---

## B. Mettre le site en ligne avec Vercel (gratuit)

1. Allez sur **https://vercel.com** → *Sign Up* → choisissez **« Continue with GitHub »**.
2. Autorisez Vercel à accéder à vos dépôts (seulement `metamorphoo-site`).
3. Cliquez **« Add New… » → Project**.
4. Sélectionnez le dépôt **metamorphoo-site** → **Import**.
5. Réglages de build (Vercel les détecte tout seul) :
   - Framework : **Next.js**
   - Build Command : `next build`
   - Output Directory : `.next`
6. Cliquez **Deploy**. ⏱️ 1 à 2 minutes.
7. Vous obtenez une adresse : `https://metamorphoo-site.vercel.app` — **le site est en ligne**.

### Mises à jour automatiques
Chaque modification publiée sur GitHub redéploie le site automatiquement.
Vous n'avez donc **jamais** à manipuler des fichiers techniques.

---

## C. Connecter le nom de domaine (recommandé)

| Étape | Action |
|---|---|
| 1 | Achetez le domaine (voir `docs/07-RECOMMANDATIONS.md`). Ex. : `metamorphoo.org` |
| 2 | Dans Vercel : *Settings → Domains → Add* → entrez `metamorphoo.org` et `www.metamorphoo.org` |
| 3 | Chez votre registrar, modifiez les DNS : enregistrement **A** → `76.76.21.21` et **CNAME** `www` → `cname.vercel-dns.com` |
| 4 | Attendez 10 min à 24 h. Vercel génère automatiquement le certificat HTTPS 🔒 |

---

## D. Variables d'environnement (plus tard, quand tout est prêt)

Dans Vercel : *Settings → Environment Variables*.
Copiez le contenu de `.env.example` et remplissez les valeurs au fur et à mesure :

| Variable | Quand la remplir |
|---|---|
| `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` | après l'étape « Google Forms » (`docs/02`) |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` | après l'étape « Réseaux sociaux » (`docs/05`) |
| `NEXT_PUBLIC_FLEXPAIE_MERCHANT` / `FLEXPAIE_API_KEY` | à l'activation de FlexPaie (`docs/03`) |
| `NEXT_PUBLIC_GENERAPAY_MERCHANT` / `GENERAPAY_API_KEY` | au lancement de GeneraPay (`docs/03`) |
| `NEXT_PUBLIC_SITE_URL` | dès que le domaine est actif (ex. `https://metamorphoo.org`) |

Après chaque ajout de variable : **Deployments → ⋯ → Redeploy**.

---

## E. Travailler en local (optionnel, pour l'équipe technique)

```bash
git clone https://github.com/metatranformation/metamorphoo-site.git
cd metamorphoo-site
npm install
cp .env.example .env.local      # puis remplissez vos valeurs
npm run dev                     # http://localhost:3000
```

---

## F. Ordre de mise en œuvre recommandé

1. ✅ Mise en ligne (ce guide) → le site est visible avec le contenu de démonstration
2. ✅ Remplir `content/site.json` : WhatsApp, e-mails, liens des réseaux sociaux
3. ✅ Créer les Google Forms et brancher le suivi (`docs/02`)
4. ✅ Donner l'accès à l'interface d'administration (`docs/04`)
5. ✅ Ajouter les vraies vidéos YouTube (`docs/05` et `docs/06`)
6. ✅ Activer les paiements en ligne (`docs/03`)
7. 🌐 Acheter et connecter le nom de domaine
