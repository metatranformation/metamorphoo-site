# 02 — Formulaires Google & suivi automatique (100 % gratuit)

> Chaque formulaire du site est un **Google Form** connecté à un **Google Sheets**.
> Résultat : les demandes arrivent dans un tableur, avec notification par e-mail.

---

## 1. Créer un formulaire

1. Allez sur **https://forms.google.com** → *Formulaire vide*.
2. Donnez un titre (ex. « Nouveau venu Metamorphoo »).
3. Ajoutez vos questions. Conseil — utilisez toujours ces intitulés pour que le
   suivi soit homogène :
   - `Nom complet`
   - `E-mail`
   - `Téléphone / WhatsApp`
   - `Ville / Pays`
   - `Sujet` (liste de choix)
   - `Message`
4. Cliquez sur **« Envoyer »** (bouton violet en haut) → onglet **`< >`** (Intégrer).
5. **Copiez l'URL** affichée. Elle ressemble à :
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXX/viewform?embedded=true
   ```
6. L'**identifiant** du formulaire est la partie entre `/d/e/` et `/viewform` :
   ```
   1FAIpQLSdXXXXXXXXXXXXXXX      ← c'est cette valeur qu'il faut copier
   ```

## 2. Connecter le formulaire au site

Ouvrez `content/site.json`, section `forms`, et collez l'identifiant :

```json
"visiteur": {
  "titre": "Devenir visiteur / nouveau venu",
  "googleFormId": "1FAIpQLSdXXXXXXXXXXXXXXX",
  "googleFormHeight": 1400
}
```

| Clé | Rôle |
|---|---|
| `googleFormId` | L'identifiant copié ci-dessus |
| `googleFormHeight` | Hauteur d'affichage en pixels (1200–1800 selon le nombre de questions) |
| `titre` / `description` | Texte affiché au-dessus du formulaire |

### Les 9 emplacements prévus

| Clé dans `site.json` | Utilisé sur la page |
|---|---|
| `visiteur` | Accueil, Contact, Actions — enregistrement des nouveaux venus |
| `ouvrier` | Devenir Leader — recrutement des ouvriers / staff |
| `leader` | Devenir Leader — candidature au noyau de 12 |
| `formation` | Académie — inscription à la formation en ligne |
| `don` | Dons — promesse de don / partenariat |
| `donNature` | Dons — don en nature / matériel |
| `contact` | Contact — formulaire général |
| `newsletter` | Pied de page — lettre d'information |
| `priere` | Contact — demande de prière |

## 3. Suivi automatique (enregistrement dans Google Sheets)

Les formulaires intégrés dans des `<iframe>` ne transmettent pas les réponses au
site. Deux solutions, au choix :

### Option A — Google Forms + Google Sheets (la plus simple)
1. Dans votre Google Form : onglet **Réponses** → *Lier à Google Sheets* → *Créer une feuille de calcul*.
2. Chaque réponse est automatiquement ajoutée au tableur. ✅
3. Pour être prévenu : dans le tableur, *Outils → Paramètres de notification* → « Toute nouvelle réponse soumise ».

### Option B — Envoi direct au site (recommandé pour le suivi automatique complet)
Le site envoie aussi les données de ses propres formulaires (contact, don,
newsletter) vers un **Google Apps Script** :

1. Créez un Google Sheet nommé `METAMORPHOO — Suivi des formulaires`.
2. *Extensions → Apps Script*.
3. Collez le code de **`docs/google-apps-script.js`** (fourni dans ce dépôt).
4. *Déployer → Nouveau déploiement → Application Web* :
   - Exécuter en tant que : **moi**
   - Qui a accès : **tout le monde**
5. Copiez l'URL `…/exec` et renseignez-la :
   - dans Vercel : `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
   - dans `content/site.json` → `integrations.googleScriptUrl`
6. Redéployez le site.

Résultat : chaque message, don ou inscription arrive dans le tableur **et** déclenche un e-mail à `contactmetamorphoo@gmail.com`.

## 4. Vérification

- Ouvrez la page du site → le formulaire Google s'affiche à l'intérieur de la page.
- Faites un test avec vos propres coordonnées.
- Vérifiez le tableur : une nouvelle ligne doit apparaître.

## 5. Bonnes pratiques

- Un formulaire = un usage. Ne mélangez pas « nouveau venu » et « don ».
- Limitez-vous à 8 questions maximum (taux d'abandon).
- Activez *« Collecter les adresses e-mail »* seulement si nécessaire.
- Ajoutez la case de consentement (déjà présente dans le formulaire de contact du site).
- Testez le formulaire **sur téléphone** : la majorité de vos visiteurs viendront du mobile.
