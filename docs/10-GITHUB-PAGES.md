# 10 — Publier sur GitHub Pages (gratuit, sans quitter GitHub)

Le site est maintenant **100 % statique** : plus besoin de serveur, il fonctionne
sur n'importe quel hébergeur de fichiers. GitHub Pages est inclus avec votre dépôt.

**Coût : 0 Fbu. Adresse obtenue : `https://metatranformation.github.io/metamorphoo-site/`**

---

## Où on en est

Le déploiement automatique est **déjà écrit et déjà testé** :

| Étape | État |
|---|---|
| Workflow `.github/workflows/deploy-pages.yml` | ✅ écrit |
| `npm ci` + `npm run build` sur les serveurs GitHub | ✅ **réussi en 50 secondes** |
| Génération des 36 pages statiques (`/fr`, `/en`, `/es`) | ✅ vérifié |
| Publication finale | ⏳ **en attente d'une seule activation** |

---

## L'unique chose qu'il vous reste à faire — 1 clic

GitHub exige que l'option « Pages » soit activée à la main, une seule fois.

1. Ouvrez :
   **https://github.com/metatranformation/metamorphoo-site/settings/pages**
2. Dans la section **« Build and deployment »**, à la ligne **Source**,
   choisissez : **`GitHub Actions`**
   (au lieu de « Deploy from a branch »)
3. C'est tout. Aucun autre réglage à toucher.

---

## Ensuite, tout est automatique

Le workflow se relance et publie le site en 1 à 2 minutes.

Votre adresse sera :

> ### https://metatranformation.github.io/metamorphoo-site/

Vous pouvez la partager immédiatement.

---

## Vérifier que ça marche

1. Allez dans l'onglet **Actions** du dépôt :
   https://github.com/metatranformation/metamorphoo-site/actions
2. Le workflow **« Deploy to GitHub Pages »** doit afficher une coche verte ✅
3. Cliquez sur le lien du déploiement pour ouvrir le site

### Testez les 3 langues

| Adresse | Langue |
|---|---|
| `/metamorphoo-site/fr/` | Français |
| `/metamorphoo-site/en/` | Anglais |
| `/metamorphoo-site/es/` | Espagnol |

La racine `/metamorphoo-site/` redirige automatiquement vers le français.

---

## Comment le site est construit

```
app/[locale]/page.tsx        →  /fr/  ·  /en/  ·  /es/
app/[locale]/dons/page.tsx   →  /fr/dons  ·  /en/dons  ·  /es/dons
app/[locale]/actions/…       →  /fr/actions  ·  /en/actions  ·  /es/actions
… (10 pages × 3 langues = 30 pages + sitemap, robots, 404)
```

La langue fait partie de l'adresse. C'est ce que Google recommande : chaque langue
est indexée séparément, et le bouton 🇫🇷/🇬🇧/🇪🇸 change l'adresse sans recharger le contenu.

---

## Les mises à jour

Chaque `git push` sur la branche `arena/01a0f370-metamorphoo-site` relance
automatiquement le build et la publication. Vous n'avez plus rien à faire.

---

## Dépannage

| Problème | Solution |
|---|---|
| `Error: Ensure GitHub Pages has been enabled` | Vous n'avez pas fait l'étape 1 ci-dessus |
| Page blanche / assets manquants | Vérifiez que `NEXT_PUBLIC_BASE_PATH` vaut `/metamorphoo-site` dans le workflow |
| Le workflow ne se déclenche pas | Onglet **Actions** → *« I understand my workflows, enable them »* |
| 404 sur une page | Attendez 1 minute : GitHub Pages met en cache quelques instants |

---

## Alternative : revenir sur Netlify plus tard

Le fichier `netlify.toml` est toujours présent. Si vous voulez Netlify plus tard
(par exemple pour un nom de domaine personnalisé), il suffira de reconnecter le
dépôt dans l'interface Netlify — mais il faudra alors retirer `output: 'export'`
de `next.config.js` pour retrouver le rendu serveur.

---

*Dernière mise à jour : octobre 2026.*
