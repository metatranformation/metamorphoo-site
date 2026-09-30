# 04 — Mettre le site à jour facilement (sans coder)

> Trois méthodes, de la plus simple à la plus technique.
> **99 % des mises à jour se font par la méthode 1.**

---

## Méthode 1 — L'interface d'administration (Decap CMS)

Une interface web, comme WordPress, accessible à l'adresse :
**`https://votre-domaine.com/admin/`**

### Installation (une seule fois)

**Option A — si le site est hébergé sur Netlify (le plus simple, gratuit)**
1. Hébergez le site sur Netlify au lieu de Vercel (même simplicité, gratuit).
2. *Site settings → Identity → Enable Identity*.
3. *Identity → Services → Git gateway → Enable*.
4. *Identity → Invite users* → invitez les personnes autorisées par e-mail.
5. Dans `public/admin/config.yml`, remplacez le bloc `backend:` par :
   ```yaml
   backend:
     name: github-gateway
     branch: main
   ```

**Option B — si le site reste sur Vercel**
1. Créez une **OAuth App** sur GitHub :
   *Settings → Developer settings → OAuth Apps → New OAuth App*
   - Homepage URL : `https://votre-domaine.com`
   - Authorization callback URL : `https://decap-oauth.netlify.app/callback`
2. Notez le *Client ID* et le *Client Secret*.
3. Déployez le proxy OAuth sur Netlify (gratuit) : bouton
   *« Deploy to Netlify »* sur https://decap-oauth.netlify.app/
4. Renseignez le Client ID/Secret dans les variables du site Netlify.
5. Dans `public/admin/config.yml`, vérifiez :
   ```yaml
   backend:
     name: github
     repo: metatranformation/metamorphoo-site
     branch: main
     base_url: https://decap-oauth.netlify.app
   ```

### Utilisation quotidienne

1. Ouvrez `https://votre-domaine.com/admin/` → *Login with GitHub*.
2. Choisissez la section à modifier :
   - **Informations générales** → contacts, réseaux sociaux, formulaires
   - **Nos Actions** → les 8 domaines d'action
   - **Agenda** → les prochaines activités
   - **Académie** → modules et leçons vidéo
   - **Témoignages / FAQ / Galerie / Vidéos**
3. Modifiez, cliquez **Enregistrer**.
4. Le menu propose *Brouillon → Prêt → Publier*. En cliquant **Publier**,
   le site se met à jour tout seul en 1 à 2 minutes.

> `publish_mode: editorial_workflow` est activé : une deuxième personne peut
> relire avant publication (utile pour une équipe).

---

## Méthode 2 — Modifier directement sur GitHub (aucune installation)

1. Ouvrez https://github.com/metatranformation/metamorphoo-site
2. Naviguez vers `content/` puis cliquez sur le fichier `.json` à modifier.
3. Cliquez sur l'icône **crayon** (Edit) en haut à droite.
4. Modifiez le texte (respectez les guillemets `"` et les virgules).
5. Descendez → *Commit changes* → **Commit changes**.
6. Le site se redéploie automatiquement en 1 à 2 minutes.

> Astuce : pour vérifier que votre JSON est valide, collez-le dans
> https://jsonlint.com avant d'enregistrer.

---

## Méthode 3 — En local (pour l'équipe technique)

```bash
npm install
npm run dev            # modifications visibles en direct
git add . && git commit -m "Mise à jour du contenu" && git push
```

---

## Que peut-on modifier, et où ?

| Je veux changer… | Fichier |
|---|---|
| Le numéro WhatsApp, les e-mails, l'adresse | `content/site.json` → `contact` |
| Les liens Facebook / Instagram / TikTok / YouTube | `content/site.json` → `socials` |
| Les chiffres clés de l'accueil | `content/site.json` → `stats` |
| Le texte d'une action (camps, conférences…) | `content/actions.json` |
| Les dates des prochaines activités | `content/agenda.json` |
| Les modules et leçons de la formation | `content/academy.json` |
| Les témoignages | `content/testimonies.json` |
| Les questions fréquentes | `content/faq.json` |
| Les photos de la galerie | `content/gallery.json` |
| Les identifiants des Google Forms | `content/site.json` → `forms` |
| Les moyens de paiement | `content/site.json` → `payments` |
| Le logo | remplacer `public/logo.svg` (même nom) |
| Les images | remplacer les fichiers dans `public/images/` (mêmes noms) |

## Règles d'or

1. **Ne changez jamais les noms de fichiers** d'images : le site les cherche par leur nom.
2. **Gardez le même format JSON** : guillemets doubles, virgule entre chaque élément, pas de virgule après le dernier.
3. **Optimisez vos images** avant de les ajouter : largeur max 1920 px, format `.jpg` qualité 80 %, poids < 300 Ko (outil gratuit : https://squoosh.app).
4. **Testez sur téléphone** après chaque modification importante.
5. Faites une **sauvegarde** : GitHub conserve tout l'historique, vous pouvez toujours revenir en arrière.
