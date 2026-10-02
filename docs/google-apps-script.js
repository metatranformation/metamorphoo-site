/**
 * ============================================================
 *  METAMORPHOO — Google Apps Script : formulaires → Google Sheets
 *  Coût : 0 $ (offre gratuite Google)
 * ============================================================
 *
 *  ÉTAPES :
 *  1. Créez un Google Sheet (sheets.google.com) nommé
 *     « METAMORPHOO — Suivi des formulaires ».
 *  2. Menu Extensions → Apps Script.
 *  3. Collez CE CODE, enregistrez (Ctrl+S).
 *  4. Cliquez sur « Déployer » → « Nouveau déploiement »
 *     → type « Application Web » :
 *        - Exécuter en tant que : moi
 *        - Qui a accès : tout le monde
 *  5. Copiez l'URL du Web App (…/exec) et collez-la dans
 *     NEXT_PUBLIC_GOOGLE_SCRIPT_URL (.env.local) ET
 *     content/site.json → integrations.googleScriptUrl
 *  6. Revalidez l'autorisation lors du premier test.
 *
 *  Chaque envoi crée/met à jour une feuille par type de formulaire
 *  (visiteur, ouvrier, leader, formation, don, don-nature, contact,
 *  newsletter, priere) et envoie un e-mail de notification.
 */

const EMAIL_NOTIFICATION = 'contactmetamorphoo@gmail.com'; // <-- à adapter
const NOM_DU_TABLEUR = 'METAMORPHOO'; // préfixe des feuilles

const COLONNES = [
  'Date',
  'Type',
  'Nom',
  'E-mail',
  'Téléphone',
  'Ville',
  'Sujet / Détail',
  'Montant',
  'Devise',
  'Fréquence',
  'Moyen de paiement',
  'Référence',
  'Message',
  'Source',
  'Statut',
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);

    var type = (data.kind || 'contact').toString();
    var feuille = obtenirFeuille(type);

    if (feuille.getLastRow() === 0) {
      feuille.appendRow(COLONNES);
      feuille.getRange(1, 1, 1, COLONNES.length).setFontWeight('bold');
      feuille.setFrozenRows(1);
    }

    feuille.appendRow([
      new Date(),
      type,
      data.nom || data.name || '',
      data.email || '',
      data.telephone || data.phone || '',
      data.ville || data.city || '',
      data.sujet || data.typeLabel || data.titre || '',
      data.amount || '',
      data.currency || '',
      data.frequency || '',
      data.providerLabel || data.provider || '',
      data.reference || '',
      data.message || data.msg || '',
      data.source || '',
      'Nouveau',
    ]);

    envoyerNotification(data, type);
    lock.releaseLock();

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, message: 'Enregistré' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, erreur: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function obtenirFeuille(type) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var nom = NOM_DU_TABLEUR + ' — ' + type;
  var feuille = ss.getSheetByName(nom);
  if (!feuille) {
    feuille = ss.insertSheet(nom);
  }
  return feuille;
}

function envoyerNotification(data, type) {
  try {
    var sujet = '[METAMORPHOO] Nouvelle demande : ' + type;
    var lignes = [];
    for (var cle in data) {
      if (data.hasOwnProperty(cle) && cle !== 'kind') {
        lignes.push(cle + ' : ' + data[cle]);
      }
    }
    MailApp.sendEmail({
      to: EMAIL_NOTIFICATION,
      subject: sujet,
      htmlBody:
        '<h2>Nouvelle demande reçue</h2>' +
        '<p><strong>Type :</strong> ' +
        type +
        '</p><ul>' +
        lignes
          .map(function (l) {
            return '<li>' + l + '</li>';
          })
          .join('') +
        '</ul><hr><p style="font-size:12px;color:#666">Message automatique du site metamorphoo.org</p>',
    });
  } catch (e) {
    // L'e-mail est secondaire : on ne bloque jamais l'enregistrement.
  }
}

/** Test manuel : Exécuter → doPost (facultatif) */
function test() {
  Logger.log('Script Metamorphoo opérationnel.');
}
