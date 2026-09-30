# 05 — Réseaux sociaux : YouTube, Facebook, Instagram, TikTok

> Le site est conçu pour être **alimenté automatiquement** par vos réseaux.

---

## 1. Renseigner les liens (5 minutes)

Dans `content/site.json`, section `socials` :

```json
{
  "id": "youtube",
  "label": "YouTube",
  "handle": "@metamorphoo",
  "url": "https://www.youtube.com/@metamorphoo",
  "channelId": "UCxxxxxxxxxxxxxxxxxxxxxx",
  "accent": "#FF0033"
}
```

Ces liens sont utilisés dans : l'en-tête, le pied de page, la page Médias,
les boutons de partage et les données structurées Google (SEO).

---

## 2. YouTube — affichage automatique des dernières vidéos

### Trouver l'identifiant de votre chaîne
1. Ouvrez votre chaîne YouTube.
2. *Voir plus → Paramètres → Paramètres avancés* (ou regardez l'URL :
   `youtube.com/channel/UC…`).
3. Copiez la valeur commençant par **`UC`** (24 caractères).

### Le connecter au site
1. Dans Vercel : variable d'environnement
   `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID = UCxxxxxxxxxxxxxxxxxxxxxx`
2. **Ou** dans `content/site.json` → `integrations.youtubeChannelId`.
3. Redéployez.

### Résultat
La page d'accueil et la page Médias affichent **automatiquement** vos 6
dernières vidéos (titre, miniature, vues) grâce au flux RSS public de YouTube.
Aucune clé API, aucun quota, aucun coût. La mise à jour se fait toutes les heures.

> Si la chaîne n'est pas encore renseignée, le site affiche les vidéos de
> démonstration définies dans `content/videos.json` — pensez à les remplacer.

---

## 3. Facebook

Le site intègre le **plugin officiel Facebook** (fil de la page) sur la page
Médias. Il fonctionne dès que l'URL de votre page est correcte dans
`content/site.json`.

- Vérifiez que votre page est **publique** (sinon le plugin reste vide).
- Pour un affichage optimal, ajoutez une photo de couverture et une photo de profil.

---

## 4. Instagram

Instagram n'autorise plus l'affichage du fil sur un site externe sans API
officielle. Le site affiche donc :
- un lien vers votre profil,
- un aperçu visuel de vos plus belles photos.

**Pour aller plus loin (gratuit)** : l'outil https://behold.so ou
https://www.instagram.com/embeds/ génèrent un code d'intégration à coller dans
`components/SocialWall.tsx`.

---

## 5. TikTok

Même principe : un lien et une carte visuelle. TikTok fournit un code
d'intégration vidéo par vidéo (bouton *Partager → Intégrer*), à coller dans
`components/SocialWall.tsx` si vous souhaitez afficher une vidéo précise.

---

## 6. WhatsApp — le canal le plus important en RDC

Le numéro officiel **+243 997 628 592** est déjà intégré partout :
- bouton flottant sur toutes les pages,
- boutons d'action (don, inscription, contact),
- liens pré-remplis avec un message adapté au contexte.

**Forte recommandation** : utilisez **WhatsApp Business** (gratuit) avec :
- une photo de profil Metamorphoo,
- un message d'accueil automatique,
- des réponses rapides (« Je veux devenir visiteur », « Comment donner ? »…),
- un catalogue (pour les projets Triomphes / Oasis de vie).

---

## 7. Stratégie de contenu recommandée

| Plateforme | Fréquence | Contenu |
|---|---|---|
| YouTube | 2 / mois | enseignements complets, replays |
| Facebook | 3 / semaine | annonces, témoignages, événements |
| Instagram | 4 / semaine | photos, citations, coulisses |
| TikTok | 5 / semaine | extraits courts, versets |
| WhatsApp | quotidien | verset du jour, rappels d'activités |

Le site sert de **vitrine permanente** ; les réseaux servent à **amener du trafic**
vers le site (lien dans chaque bio).
