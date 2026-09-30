# 07 — Recommandations : outils gratuits d'abord, payants ensuite

> Philosophie : **la V1 ne doit rien coûter**. On passe au payant uniquement
> quand le trafic et les revenus le justifient.

---

## 1. Indispensable gratuit (à faire maintenant)

| Besoin | Outil recommandé | Coût |
|---|---|---|
| Dépôt du code | GitHub | 0 $ |
| Hébergement du site | Vercel (offre Hobby) | 0 $ |
| Formulaires + suivi | Google Forms + Google Sheets | 0 $ |
| Notifications e-mail | Gmail + Apps Script | 0 $ |
| Vidéos de formation | YouTube (publique ou « non répertoriée ») | 0 $ |
| WhatsApp | WhatsApp Business | 0 $ |
| Réunions en ligne | Google Meet / Zoom gratuit | 0 $ |
| Graphisme | Canva (offre gratuite) | 0 $ |
| Optimisation des images | Squoosh | 0 $ |
| Analytique | Vercel Analytics / Google Search Console | 0 $ |

## 2. À acheter rapidement (coûts faibles, forte valeur)

| Poste | Pourquoi | Coût indicatif |
|---|---|---|
| **Nom de domaine** (`.org` ou `.com`) | Crédibilité, e-mail professionnel, référencement | ~10–20 $/an |
| **Google Workspace** (ou Zoho Mail gratuit) | E-mails `contact@metamorphoo.org` au lieu de Gmail | 6 $/mois/utilisateur — **ou gratuit avec Zoho Mail** |
| **WhatsApp Business API** (plus tard) | Réponses automatisées, envoi groupé | variable |

## 3. Quand passer au payant (après la V1)

| Déclencheur | Passage au payant recommandé |
|---|---|
| Trafic > 100 Go/mois ou besoin de protection | Vercel Pro (20 $/mois) |
| Besoin de mots de passe / espace membres | Supabase / Memberstack (~0–25 $/mois) |
| Envoi de plus de 100 e-mails/jour | Brevo / Mailchimp (offres gratuites jusqu'à 300/jour) |
| Paiements en ligne | FlexPaie / GeneraPay (commission par transaction) |
| Plus de 10 000 visiteurs/mois | CDN / images optimisées (déjà inclus) |

## 4. Sécurité & sauvegardes (à ne jamais négliger)

1. **GitHub** conserve tout l'historique du site : c'est votre sauvegarde.
2. Activez la **double authentification** sur GitHub, Google et Vercel.
3. Ne mettez **jamais** une clé API dans un fichier du dépôt : utilisez les
   variables d'environnement Vercel.
4. Limitez l'accès au Google Sheet aux personnes de confiance.
5. Faites une **sauvegarde mensuelle** du Google Sheet (Fichier → Télécharger → CSV).

## 5. Référencement (SEO) — déjà en place

- Titres et descriptions optimisés sur chaque page.
- Données structurées *Organization / NGO* (schema.org).
- `sitemap.xml` et `robots.txt` générés automatiquement.
- Open Graph (aperçu sur Facebook, WhatsApp, LinkedIn).
- Site rapide, mobile-first, accessible.

**À faire après la mise en ligne** :
1. Créez un compte **Google Search Console** (gratuit) et soumettez le sitemap.
2. Créez une fiche **Google Business Profile** pour le siège de Goma.
3. Demandez aux églises partenaires de mettre un lien vers le site.

## 6. Plan de contenu pour les 3 premiers mois

| Mois | Priorité |
|---|---|
| 1 | Photos réelles des camps, vidéo de présentation de la vision |
| 2 | Témoignages filmés, page académie remplie |
| 3 | Agenda annuel, rapport d'utilisation des dons |

## 7. Ce que je recommande personnellement, par ordre

1. ✅ Publier la V1 maintenant (contenu de démonstration compris).
2. ✅ Mettre le vrai numéro WhatsApp et les vrais e-mails.
3. ✅ Créer les 3 Google Forms essentiels : **visiteur**, **formation**, **don**.
4. ✅ Acheter le nom de domaine et connecter-le.
5. ✅ Former 2 personnes à l'interface `/admin/`.
6. ✅ Remplacer progressivement les images 3D par des photos réelles des actions.
7. ⏳ Activer les paiements en ligne (FlexPaie puis GeneraPay).
8. ⏳ Envisager un espace membres si la formation devient payante.

## 8. Support technique

Pour toute modification au-delà du contenu texte (nouvelle page, nouvelle
fonctionnalité, intégration API), faites appel à un développeur web :
le code est documenté, en TypeScript, et suit une architecture standard
(Next.js + React + Tailwind CSS) — n'importe quel développeur peut reprendre
le projet.
