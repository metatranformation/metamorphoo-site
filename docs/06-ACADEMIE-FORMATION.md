# 06 — Metamorphoo Académie : formation en ligne & validation

> Le parcours complet est déjà en place : vidéos → progression → validation →
> appel (en ligne ou en présentiel) → intégration.

---

## 1. Le fonctionnement pour l'étudiant

1. **Inscription** via le formulaire Google « formation » (page Académie).
2. **Formation** : 4 modules, leçons vidéo YouTube, à suivre à son rythme.
3. **Progression** : chaque leçon peut être cochée « terminée » ; l'avancement
   est enregistré dans le navigateur (localStorage) et affiché en %.
4. **Validation** : une fois le parcours terminé, l'étudiant valide sa
   candidature (formulaire Google).
5. **Interview** : l'équipe l'appelle en ligne (WhatsApp/Zoom) ou le convoque
   en présentiel à Goma.
6. **Intégration** : affectation à un noyau, un département ou une action.

## 2. Ajouter ou modifier un module

Fichier : `content/academy.json`

```json
{
  "id": "fondements",
  "titre": "Module 1 – Fondements de la transformation",
  "niveau": "Fondation",
  "duree": "3 semaines",
  "image": "/images/stage-chrysalis.jpg",
  "objectifs": [
    "Comprendre la métamorphose selon Romains 12:2"
  ],
  "lecons": [
    {
      "titre": "La chenille, la chrysalide et le papillon",
      "videoId": "dQw4w9WgXcQ",
      "duree": "18 min",
      "resume": "Une image biblique de la transformation."
    }
  ]
}
```

### Trouver l'identifiant d'une vidéo YouTube
L'URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ` donne l'identifiant
**`dQw4w9WgXcQ`** (les 11 caractères après `?v=`).

> ⚠️ Les identifiants `dQw4w9WgXcQ` actuellement dans le fichier sont des
> **exemples** : remplacez-les par les vraies vidéos de la chaîne Metamorphoo.

### Règles
- Un module = 2 à 5 leçons de 15 à 30 minutes.
- Gardez l'ordre pédagogique : fondements → caractère → réveil → leadership.
- Ajoutez une image par module (format paysage, 1200 × 800 px).

## 3. Suivre les candidats

Le formulaire Google « formation » + le Google Sheet associé vous donnent :

| Colonne conseillée dans le Sheet | Usage |
|---|---|
| Date | horodatage automatique |
| Nom / E-mail / Téléphone | contact |
| Module souhaité | orientation |
| Statut | `Nouveau` → `En formation` → `Entretien` → `Retenu` / `Ajourné` |
| Date de l'entretien | planification |
| Décision | commentaire de l'équipe |

Ajoutez simplement ces colonnes dans votre Google Form : elles arriveront
automatiquement dans le tableur lié.

## 4. Organisation des entretiens

- **En ligne** : WhatsApp vidéo ou Zoom (gratuit jusqu'à 40 min).
- **En présentiel** : au siège de Goma ou lors d'un camp.
- Durée conseillée : 30 minutes.
- Grille d'évaluation simple : appel / caractère / disponibilité / compétence.

## 5. Évolutions possibles (plus tard)

| Besoin | Solution |
|---|---|
| Certificat de fin de formation | génération PDF via Google Docs |
| Quiz notés | Google Forms (section « Quiz ») |
| Cours protégés par mot de passe | espace membre (voir `docs/07`) |
| Paiement des formations avancées | module don/paiement existant |
| Suivi fin de progression | Google Sheet + colonne « % terminé » |
