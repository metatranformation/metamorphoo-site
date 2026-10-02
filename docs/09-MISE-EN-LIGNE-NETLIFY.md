# 09 — Mettre le site en ligne sur Netlify (gratuit)

Ce guide vous fait passer de « le site fonctionne sur mon ordinateur » à
« le site est accessible sur internet à une adresse `*.netlify.app` ».

**Durée : environ 10 minutes. Coût : 0 Fbu.**

---

## Ce dont vous avez besoin

- Un compte **GitHub** (vous en avez déjà un : `metatranformation`)
- Un compte **Netlify** gratuit — [app.netlify.com](https://app.netlify.com)
  (bouton **Sign up → Sign up with GitHub**, c'est le plus simple)

---

## Étape 1 — Connecter le dépôt GitHub

1. Allez sur [app.netlify.com](https://app.netlify.com) et connectez-vous.
2. Cliquez sur **Add new site → Import an existing project**.
3. Choisissez **GitHub** (autorisez Netlify à lire vos dépôts si on vous le demande).
4. Dans la liste, cherchez **`metamorphoo-site`** et cliquez dessus.

> Le dépôt ne apparaît pas ? Cliquez sur *« Configure the Netlify app on GitHub »*
> et donnez à Netlify l'accès au dépôt `metamorphoo-site`.

---

## Étape 2 — Vérifier les réglages de build

Netlify lit automatiquement le fichier `netlify.toml` qui est déjà dans le projet.
Les champs doivent être **exactement** ceux-ci :

| Réglage | Valeur |
|---|---|
| **Branch to deploy** | `arena/01a0f370-metamorphoo-site` |
| **Build command** | `npm run build` |
| **Publish directory** | `.next` |
| **Functions directory** | *(laisser vide)* |

Si les valeurs sont déjà pré-remplies, **n'y touchez pas** : c'est bon signe.

---

## Étape 3 — Ajouter les variables d'environnement (optionnel mais recommandé)

Sur la même page, cliquez sur **Add environment variables** et ajoutez :

| Clé | Valeur |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://VOTRE-NOM.netlify.app` *(à corriger après le 1er déploiement)* |
| `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` | l'identifiant de votre chaîne YouTube (voir `docs/05-RESEAUX-SOCIAUX.md`) |

> `NEXT_PUBLIC_SITE_URL` sert au sitemap et aux liens partagés. Vous pourrez la
> corriger après coup dans **Site settings → Environment variables**, puis
> relancer un déploiement avec **Deploys → Trigger deploy → Deploy site**.

---

## Étape 4 — Déployer

1. Cliquez sur **Deploy site**.
2. Attendez **2 à 4 minutes** (vous voyrez les logs défiler).
3. Quand c'est terminé, Netlify affiche une adresse verte du type :
   **`https://metamorphoo-abc123.netlify.app`**

🎉 **Le site est en ligne.** Envoyez cette adresse à qui vous voulez.

---

## Étape 5 — Personnaliser l'adresse (gratuit)

1. **Site configuration → Site details → Change site name**
2. Choisissez un nom court, par exemple `metamorphoo`
3. La nouvelle adresse devient **`https://metamorphoo.netlify.app`**

---

## Les mises à jour automatiques

C'est l'avantage principal de cette méthode :

```
Vous modifiez un fichier  →  git push  →  Netlify redéploie tout seul
```

Chaque `git push` sur la branche `arena/01a0f370-metamorphoo-site` déclenche
un nouveau déploiement automatiquement. Vous n'avez plus rien à faire.

Pour voir l'historique : onglet **Deploys** dans Netlify.

---

## Plus tard : le vrai nom de domaine

Quand vous serez prêt (et si vous avez un budget d'environ 10 – 12 $/an) :

1. **Netlify → Domain management → Add a domain**
2. Entrez `metamorphoo.org` (ou `.com`)
3. Suivez les indications pour payer et pointer les DNS
4. Netlify active le certificat HTTPS automatiquement

En attendant, le site fonctionne parfaitement sur l'adresse `.netlify.app`.

---

## Dépannage

| Problème | Solution |
|---|---|
| Le build échoue | Regardez les logs dans l'onglet **Deploys**. Envoyez-moi le message d'erreur. |
| Page blanche | Videz le cache : **Deploys → Trigger deploy → Clear cache and deploy site** |
| Les images ne s'affichent pas | Vérifiez que le dossier `public/images/` est bien présent sur GitHub |
| Les formulaires ne marchent pas | Renseignez `googleFormId` dans `content/site.json` (voir `docs/02-GOOGLE-FORMS-ET-SUIVI.md`) |
| La langue ne change pas | Videz le cache du navigateur, ou testez en navigation privée |

---

*Dernière mise à jour : octobre 2026.*
