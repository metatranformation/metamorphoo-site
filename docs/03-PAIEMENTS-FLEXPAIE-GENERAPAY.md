# 03 — Paiements en ligne : FlexPaie, GeneraPay & Mobile Money

> Le site est **déjà prêt** à recevoir les paiements en ligne.
> Aucune ligne de code à écrire : il suffit de renseigner les clés marchands.

---

## 1. Ce qui fonctionne dès maintenant (sans rien configurer)

| Moyen | Statut | Comment |
|---|---|---|
| Mobile Money (M-Pesa, Airtel Money, Orange Money) | ✅ Actif | Numéros affichés sur la page Dons |
| Virement bancaire | ✅ Actif | Coordonnées bancaires affichées |
| Espèces / en nature | ✅ Actif | Remise lors des activités ou au siège |
| Formulaire de promesse de don | ✅ Actif | Enregistre l'engagement dans le tableur |

Renseignez vos numéros et coordonnées bancaires dans `content/site.json` :

```json
"payments": {
  "mobileMoney": {
    "mpesa": "+243 XXX XXX XXX",
    "airtelMoney": "+243 XXX XXX XXX",
    "orangeMoney": "+243 XXX XXX XXX"
  },
  "banque": {
    "nom": "Nom de la banque",
    "compte": "CDxx XXXX XXXX XXXX",
    "swift": "XXXXCDKI",
    "titulaire": "METAMORPHOO MOVEMENT"
  }
}
```

## 2. Activer FlexPaie

FlexPaie est une solution de paiement en ligne utilisée en RDC (Mobile Money,
cartes bancaires, portefeuille).

1. Créez un compte marchand sur **https://flexpaie.com**.
2. Récupérez dans votre tableau de bord :
   - votre **identifiant marchand**,
   - votre **clé API** (secrète),
   - l'**URL de checkout** (page de paiement hébergée).
3. Renseignez dans Vercel (*Settings → Environment Variables*) :

| Variable | Valeur |
|---|---|
| `NEXT_PUBLIC_FLEXPAIE_MERCHANT` | votre identifiant marchand |
| `NEXT_PUBLIC_FLEXPAIE_CHECKOUT_URL` | ex. `https://pay.flexpaie.com/checkout` |
| `FLEXPAIE_API_KEY` | votre clé secrète (jamais exposée au public) |

4. Mettez à jour `content/site.json` :
```json
"flexpaie": { "url": "https://pay.flexpaie.com/checkout", "marchand": "VOTRE_ID" }
```
5. Redéployez.

Dès que `NEXT_PUBLIC_FLEXPAIE_MERCHANT` est défini, le bouton **FlexPaie**
passe automatiquement de « bientôt disponible » à « en ligne » sur la page Dons,
et le donateur est redirigé vers la page de paiement sécurisée avec le montant,
la devise, la fréquence et une **référence de transaction** (`MTA-…`).

### Intégration avancée (vérification automatique du paiement)
Pour valider les paiements sans intervention manuelle, il faudra une petite
fonction serveur (Vercel Serverless Function) qui :
1. reçoit le *webhook* FlexPaie,
2. vérifie la signature avec `FLEXPAIE_API_KEY`,
3. marque la référence comme payée dans le Google Sheet.

C'est l'étape « payante/technique » à prévoir après la mise en ligne de la V1.

## 3. Activer GeneraPay (SaaS Metamorphoo en développement)

GeneraPay étant développé en interne, le site l'attend déjà :

| Variable | Valeur |
|---|---|
| `NEXT_PUBLIC_GENERAPAY_MERCHANT` | identifiant marchand GeneraPay |
| `NEXT_PUBLIC_GENERAPAY_CHECKOUT_URL` | ex. `https://pay.generapay.cd/checkout` |
| `GENERAPAY_API_KEY` | clé API GeneraPay |

Le code de connexion se trouve dans **`lib/payments.ts`** (fonction
`buildCheckoutUrl`). Il suffit d'y ajouter les paramètres attendus par votre API
(devise, callback, référence…) — c'est la seule modification nécessaire.

## 4. Comment le don est traité (flux actuel)

```
1. Le visiteur choisit : type (offrande/dîme/don/vœu/partenariat/nature)
2. puis la fréquence (ponctuel / hebdo / mensuel / annuel)
3. puis le montant et la devise (USD / CDF / EUR)
4. puis ses coordonnées
5. puis le moyen de paiement
        ↓
6. Le site ENREGISTRE l'engagement (Google Sheet) + génère une référence
        ↓
7a. Provider en ligne configuré  → redirection vers la page de paiement
7b. Mobile Money / banque / espèces → instructions + référence à communiquer
        ↓
8. Le donateur peut envoyer la preuve de paiement sur WhatsApp
```

## 5. Recommandations financières

- **Ne stockez jamais** de données bancaires sur le site.
- Créez un **compte bancaire dédié** au mouvement (séparation des flux).
- Tenez un **registre des dons** (le Google Sheet fait ce travail).
- Éditez un **reçu** pour chaque don (même simple, par e-mail) : c'est une
  exigence légale et un gage de confiance pour les partenaires.
- Publiez un **rapport annuel** d'utilisation des fonds sur la page Dons.
- Pour les dons en nature, faites signer une **lettre de donation** précisant
  la valeur estimée.
