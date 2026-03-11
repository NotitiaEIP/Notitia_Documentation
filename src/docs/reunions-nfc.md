# Réunions & Partage NFC

## Mode Réunion

L'onglet **Réunion** permet de mener des réunions collaboratives avec transcription en temps réel partagée entre tous les participants.

### Lancer une réunion (Hôte)

1. Appuie sur **Lancer une réunion**
2. Un **QR code** est généré avec l'IP locale de ton téléphone
3. Les participants scannent le QR code avec leur téléphone Notitia
4. La transcription est **envoyée en temps réel** à tous les participants

### Rejoindre une réunion (Participant)

1. Appuie sur **Rejoindre une réunion**
2. **Scanne le QR code** affiché sur l'écran de l'hôte
3. Tu reçois la transcription en direct

### Fin de réunion

- L'hôte appuie sur **Terminer**
- La transcription complète est **sauvegardée automatiquement** dans l'historique
- Accessible depuis l'onglet Historique (filtré "Réunions")

> **Important** : les participants doivent être sur le **même réseau Wi-Fi** que l'hôte. Aucun serveur cloud n'est nécessaire.

---

## Tap-to-Share (NFC)

**Tap-to-Share** permet de partager une note entre deux téléphones en les approchant l'un de l'autre (Near Field Communication).

### Envoyer une note

1. Ouvre une note dans l'historique
2. Appuie sur l'icône de partage NFC
3. Approche ton téléphone de l'autre téléphone
4. Un son et une vibration confirment le transfert

### Recevoir une note

1. Ouvre l'onglet Tap-to-Share
2. Choisis **Recevoir**
3. Approche ton téléphone de celui qui envoie
4. La note reçue est ajoutée à ton historique

### Format de fichier

Les notes sont transférées dans le **format .notitia** — un format binaire propriétaire chiffré (AES-256-CBC) compressé (zlib), garantissant la confidentialité pendant le transfert.

> Le NFC nécessite un téléphone compatible et que le NFC soit activé dans les paramètres.
