# 📝 NOTITIA — Documentation Complète

> **Version :** 1.0.0+1 · **Plateforme :** iOS, Android, Web, Linux, macOS, Windows  
> **Stack :** Flutter / Dart — Backend Supabase — IA : Deepgram, Mistral, Gemini, Claude  
> **Dernière mise à jour :** Mars 2026

---

# TABLE DES MATIÈRES

## 🧑‍💼 PARTIE 1 — Guide Utilisateur
1. [Présentation de l'application](#1-présentation-de-lapplication)
2. [Premiers pas](#2-premiers-pas)
3. [L'interface principale](#3-linterface-principale)
4. [Capture vocale](#4-capture-vocale)
5. [Historique des notes](#5-historique-des-notes)
6. [Recherche](#6-recherche)
7. [Assistant IA](#7-assistant-ia)
8. [Mind Map](#8-mind-map)
9. [Mode Réunion](#9-mode-réunion)
10. [Tap-to-Share (NFC)](#10-tap-to-share-nfc)
11. [Meduza — Ta mascotte IA](#11-meduza--ta-mascotte-ia)
12. [Profil et Paramètres](#12-profil-et-paramètres)
13. [Plans d'abonnement](#13-plans-dabonnement)
14. [FAQ Utilisateur](#14-faq-utilisateur)

## 🛠️ PARTIE 2 — Documentation Technique
1. [Vue d'ensemble de l'architecture](#tech-1-vue-densemble-de-larchitecture)
2. [Structure du projet](#tech-2-structure-du-projet)
3. [Modèles de données](#tech-3-modèles-de-données)
4. [Services](#tech-4-services)
5. [Pages et écrans](#tech-5-pages-et-écrans)
6. [Widgets réutilisables](#tech-6-widgets-réutilisables)
7. [Navigation et routing](#tech-7-navigation-et-routing)
8. [Thème et Design System](#tech-8-thème-et-design-system)
9. [Authentification](#tech-9-authentification)
10. [APIs externes et clés](#tech-10-apis-externes-et-clés)
11. [Stockage local](#tech-11-stockage-local)
12. [Système RAG et base vectorielle](#tech-12-système-rag-et-base-vectorielle)
13. [Format de fichier .notitia](#tech-13-format-de-fichier-notitia)
14. [NFC Tap-to-Share](#tech-14-nfc-tap-to-share)
15. [Foreground Service (écoute background)](#tech-15-foreground-service-écoute-background)
16. [Home Widget natif](#tech-16-home-widget-natif)
17. [Internationalisation (i18n)](#tech-17-internationalisation-i18n)
18. [Installation développeur](#tech-18-installation-développeur)
19. [Variables d'environnement et sécurité](#tech-19-variables-denvironnement-et-sécurité)
20. [Backend Python (optionnel)](#tech-20-backend-python-optionnel)

---

---

# 🧑‍💼 PARTIE 1 — GUIDE UTILISATEUR

---

## 1. Présentation de l'application

**Notitia** est un assistant mémoire intelligent qui capture ce que tu dis, l'organise automatiquement, et te permet de le retrouver en un instant.

### Ce que Notitia fait pour toi

| Fonctionnalité | Description |
|---|---|
| 🎙️ **Capture vocale** | Parle, Notitia transcrit en temps réel avec une précision professionnelle |
| 🤖 **Correction IA** | Mistral AI corrige automatiquement ta transcription (ponctuation, fautes) |
| 📚 **Historique** | Toutes tes notes classées par date, consultables, éditables |
| 🔍 **Recherche** | Retrouve n'importe quelle note par mot-clé instantanément |
| 💬 **Assistant IA** | Pose des questions sur tes notes, l'IA puise dans tout ton historique |
| 🧠 **Mind Map** | Transforme une note en carte mentale visuelle en un clic |
| 👥 **Réunion** | Lance une session partagée, les participants reçoivent la transcription en live |
| 📡 **Tap-to-Share** | Approche deux téléphones et partage une note via NFC |
| 📱 **Widget** | Lance une capture directement depuis l'écran d'accueil de ton téléphone |

### Disponible sur
- 📱 **Android** (recommandé — fonctionnalités NFC et widget complètes)
- 🍎 **iOS** (widget WidgetKit, NFC selon modèle)
- 🌐 **Web** (fonctionnalités de base — pas de micro natif)
- 🖥️ **Linux / macOS / Windows** (version bureau)

---

## 2. Premiers pas

### 2.1 Créer un compte

Au premier lancement de l'application :

1. **Splash screen** → l'application charge et vérifie ton état de connexion
2. **Écran de choix** → trois options :
   - **Se connecter** — tu as déjà un compte Notitia
   - **Créer un compte** — inscription avec email + mot de passe
   - **Continuer sans compte** — mode invité (données locales uniquement, pas de sync)

### 2.2 Inscription

- Renseigne ton **email** et un **mot de passe**
- Tu peux aussi te connecter via **Google** ou **GitHub** (OAuth)
- Une fois inscrit, un email de confirmation peut être envoyé selon la configuration

### 2.3 Connexion avec OTP

Si tu préfères ne pas utiliser de mot de passe, une connexion par **code à usage unique (OTP)** envoyé sur ton email est disponible.

### 2.4 L'onboarding

La première fois que tu te connectes, un guide cinématique en **5 étapes** t'explique les fonctionnalités principales, accompagné de **Meduza**, ta mascotte méduse IA. L'onboarding est réalisé une seule fois par compte.

---

## 3. L'interface principale

L'écran principal est une **barre de navigation** en bas avec 5 onglets :

```
[ HISTORIQUE ]  [ RÉUNION ]  [🎙️ CAPTURE]  [ MINDMAP ]  [ ASSISTANT ]
```

- **L'onglet CAPTURE** (centre) est mis en avant avec un bouton circulaire flottant — c'est l'action principale
- Le bouton de **profil** est accessible depuis les pages principales (en haut à droite)
- **Meduza** apparaît en superposition flottante lors des événements importants (écoute, succès, erreur, traitement IA)

---

## 4. Capture vocale

C'est le cœur de Notitia. La page de capture permet d'enregistrer ta voix et de la convertir en texte.

### 4.1 Démarrer une capture

1. Appuie sur le **bouton microphone** central
2. Parle naturellement — la transcription apparaît en temps réel
3. Appuie à nouveau pour **arrêter**
4. La note est **sauvegardée automatiquement**

### 4.2 Moteur de transcription

Notitia propose deux moteurs :

| Moteur | Description | Qualité |
|---|---|---|
| **Deepgram Nova-3** (défaut) | Cloud, WebSocket temps réel, ultra précis | ⭐⭐⭐⭐⭐ |
| **Natif** (Google/Apple) | Embarqué sur l'appareil, fonctionne hors ligne | ⭐⭐⭐ |

> 💡 Deepgram est activé par défaut. Il nécessite une connexion internet.

### 4.3 Correction automatique par IA

Après la transcription, Notitia propose une **correction IA via Mistral** :
- Corrige les fautes d'orthographe et de grammaire
- Ajoute la ponctuation manquante
- Corrige les homophones courants (a/à, et/est, ou/où…)
- Supprime les hésitations (euh, hum)
- Deux niveaux : **Correction** (légère) ou **Amélioration** (restructuration complète)

### 4.4 Mode Écoute Active

Le **mode écoute active** maintient la capture active même quand le téléphone est verrouillé ou que l'application passe en arrière-plan. Idéal pour les réunions longues. Un **foreground service Android** avec notification persistante garantit la continuité.

### 4.5 Langues supportées

La capture vocale supporte le **français** et l'**anglais**. La langue est détectable automatiquement ou configurable manuellement dans les paramètres.

---

## 5. Historique des notes

L'onglet **HISTORIQUE** liste toutes tes transcriptions, les plus récentes en premier.

### Fonctionnalités

- **Scroll infini** — toutes tes notes dans une liste claire
- **Prévisualisation** — les 120 premiers caractères affichés pour chaque note
- **Date et heure** de création visible
- **Modifier** — ouvre l'éditeur de texte complet
- **Supprimer** — avec confirmation
- **Tap-to-Share** — partage la note par NFC depuis l'historique
- **Filtrer sur les réunions** — l'onglet historique peut être filtré pour n'afficher que les notes de réunions

### Éditeur de note

En appuyant sur une note, tu accèdes à l'**éditeur complet** qui permet de :
- Modifier le **titre** et le **contenu** librement
- Voir les dates de création et de dernière modification
- Sauvegarder les changements

---

## 6. Recherche

L'onglet **RECHERCHE** permet de retrouver n'importe quelle note par mots-clés.

### Comment ça fonctionne

- Tape un ou plusieurs mots dans la barre de recherche
- Les résultats apparaissent avec un **score de pertinence**
- Les **mots-clés trouvés** sont mis en évidence
- Un **extrait contextuel** montre où le mot apparaît dans la note
- Clique sur un résultat pour ouvrir l'éditeur

### Algorithme de score

| Critère | Points |
|---|---|
| Phrase exacte dans le contenu | +10 |
| Phrase exacte dans le titre | +8 |
| Tous les termes présents | +5 (bonus) |
| Chaque terme dans le contenu | +2 / occurrence |
| Chaque terme dans le titre | +3 |

> 🔜 La recherche sémantique par embeddings (requêtes en langage naturel) est prévue.

---

## 7. Assistant IA

L'onglet **ASSISTANT** est un **chatbot RAG** (Retrieval-Augmented Generation) qui répond à tes questions en s'appuyant sur toutes tes transcriptions.

### Comment l'utiliser

1. Tape ta question en langage naturel (ex : *"Qu'est-ce qu'on a décidé lors de la réunion du 5 mars ?"*)
2. L'assistant **cherche dans tes notes** les passages pertinents
3. Il génère une réponse contextualisée avec les **sources citées**

### Ce que l'assistant peut faire

- Retrouver des informations précises dans tes archives
- Résumer plusieurs notes sur un même sujet
- Répondre à des questions de type *"Qui a dit quoi ?"*, *"Quelle était la décision ?"*
- Conversations multi-tours (il se souvient du contexte de la conversation)

### Indexation automatique

L'assistant indexe automatiquement tes nouvelles transcriptions dès que tu ouvres l'onglet. Une barre de progression t'indique l'avancement. L'indexation est **incrémentale** : seules les nouvelles notes sont traitées.

---

## 8. Mind Map

L'onglet **MINDMAP** transforme tes notes en cartes mentales visuelles.

### Créer une Mind Map

1. Sélectionne une ou plusieurs transcriptions
2. Choisis le **moteur IA** :
   - **Gemini** (Google) — gratuit, recommandé
   - **Claude** (Anthropic) — premium, résultats plus riches
3. Appuie sur **Générer**
4. La mind map apparaît avec des nœuds colorés et interactifs

### Types de nœuds

| Icône | Type | Couleur |
|---|---|---|
| 🎯 | Sujet principal (root) | Rose néon |
| 📌 | Thème (topic) | Cyan néon |
| 📎 | Sous-thème (subtopic) | Violet |
| 💡 | Idée | Or |
| ✅ | Action à faire | Vert néon |
| ❓ | Question soulevée | Corail |
| ⚡ | Décision prise | Orange |
| 👤 | Personne citée | Améthyste |
| 📅 | Date / échéance | Bleu |
| 📍 | Lieu | Turquoise |
| 💭 | Sentiment | Rose |
| 🔗 | Référence | Gris |

### Fonctionnalités de visualisation

- **Vue radiale** — nœuds rayonnant depuis le centre
- **Vue arborescente** — organisation hiérarchique
- **Zoom et déplacement** tactile
- **Tap sur un nœud** → affiche le texte source exact depuis la transcription
- **Sauvegarde** des mind maps générées pour y revenir plus tard

---

## 9. Mode Réunion

L'onglet **RÉUNION** permet de mener des réunions collaboratives avec transcription en temps réel partagée entre tous les participants.

### Lancer une réunion (Hôte)

1. Appuie sur **Lancer une réunion**
2. Un **QR code** est généré avec l'IP locale de ton téléphone
3. Les participants scannent le QR code avec leur téléphone Notitia
4. La transcription que tu enregistres est **envoyée en temps réel** à tous les participants

### Rejoindre une réunion (Participant)

1. Appuie sur **Rejoindre une réunion**
2. **Scanne le QR code** affiché sur l'écran de l'hôte
3. Tu es connecté et reçois la transcription en direct

### Fin de réunion

- L'hôte appuie sur **Terminer**
- La transcription complète est **sauvegardée automatiquement** dans l'historique
- La réunion est accessible depuis l'onglet Historique (filtré "Réunions")

> ⚠️ **Important** : les participants doivent être sur le **même réseau Wi-Fi** que l'hôte. Aucun serveur cloud n'est nécessaire.

---

## 10. Tap-to-Share (NFC)

**Tap-to-Share** permet de partager une note entre deux téléphones en les approchant l'un de l'autre (Near Field Communication).

### Comment ça marche

**Pour envoyer :**
1. Ouvre une note dans l'historique
2. Appuie sur l'icône de partage NFC
3. Approche ton téléphone de l'autre téléphone
4. Un son et une vibration confirment le transfert

**Pour recevoir :**
1. Ouvre l'onglet Tap-to-Share
2. Choisis **Recevoir**
3. Approche ton téléphone de celui qui envoie
4. La note reçue est ajoutée à ton historique

### Format de fichier

Les notes sont transférées dans le **format .notitia** — un format binaire propriétaire chiffré (AES-256-CBC) compressé (zlib), garantissant la confidentialité pendant le transfert.

> ℹ️ Le NFC nécessite un téléphone compatible et que le NFC soit activé dans les paramètres.

---

## 11. Meduza — Ta mascotte IA

**Meduza** est une méduse animée qui te donne des retours visuels en temps réel sur ce que fait l'application.

### États de Meduza

| État | Quand | Couleur |
|---|---|---|
| 👋 Bonjour | Splash screen / Onboarding | Doux |
| 😴 Repos | Inactif (invisible par défaut) | Neutre |
| 🎙️ Écoute | Pendant l'enregistrement | Cyan pulsant |
| ⚙️ Traitement | Correction IA / Génération | Rotation + progression |
| 😊 Succès | Note sauvegardée, action réussie | Vert, rebond |
| 😕 Erreur | Problème de connexion, erreur | Rouge, tremblement |

Meduza n'est visible **que lors des événements importants** — elle n'est pas affichée en permanence pour ne pas distraire.

---

## 12. Profil et Paramètres

Accède au profil via le **bouton avatar** en haut à droite ou en appuyant sur l'icône dans la navigation.

### Ce que tu peux modifier

- **Pseudo** (username) affiché dans l'app
- **Photo de profil** (depuis la galerie ou l'appareil photo)
- **Langue** : Français / English
- **Thème visuel** : 5 thèmes disponibles
  - 🟣 Cyberpunk (rose néon + bleu nuit) — défaut
  - 🔵 Ocean (cyan + bleu marine)
  - 🟢 Forest (vert néon + vert sombre)
  - 🟠 Sunset (orange + marron)
  - 🟣 Violet (violet + indigo)
- **Déconnexion** du compte

---

## 13. Plans d'abonnement

Notitia propose **5 niveaux** d'abonnement :

| Plan | Prix | Description |
|---|---|---|
| 🆓 **Découverte** | Gratuit | Accès aux fonctionnalités de base |
| ⚡ **Essentiel** | Recommandé | Transcription avancée + correction IA |
| 💎 **Premium** | — | Assistant IA + Mind Maps + priorité |
| 🏢 **Entreprise** | Sur devis | Réunions illimitées + NFC + support |
| 🌐 **Notitia Hub** | Sur devis | Solution complète pour équipes |

> La page d'abonnement est accessible depuis le profil ou lors de l'onboarding.

---

## 14. FAQ Utilisateur

**Q : Mes notes sont-elles sauvegardées si je n'ai pas de compte ?**  
R : Oui, en mode invité les notes sont sauvegardées **localement** sur ton appareil. Elles ne sont pas synchronisées entre appareils et peuvent être perdues si tu réinstalle l'app.

**Q : Est-ce que Notitia fonctionne hors ligne ?**  
R : Partiellement. La transcription Deepgram nécessite internet. Le moteur natif (Google/Apple) fonctionne hors ligne. La correction IA et l'assistant nécessitent internet.

**Q : Comment accéder au widget depuis mon écran d'accueil ?**  
R : Sur Android, fais un appui long sur l'écran d'accueil → Widgets → recherche Notitia. Sur iOS, ajoute le widget depuis la vue Aujourd'hui.

**Q : La réunion fonctionne-t-elle à distance ?**  
R : Non, la réunion utilise le réseau local (Wi-Fi). Tous les participants doivent être sur le même réseau.

**Q : Mon NFC ne fonctionne pas, que faire ?**  
R : Vérifie que le NFC est activé dans Paramètres > Connexions > NFC. Le partage Bluetooth/Wi-Fi Direct est prévu comme fallback.

---
---

# 🛠️ PARTIE 2 — DOCUMENTATION TECHNIQUE

---

## Tech 1. Vue d'ensemble de l'architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        APPLICATION FLUTTER                       │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │  Pages   │  │ Widgets  │  │ Services │  │     Models       │ │
│  │ (UI)     │  │ (réutil.)│  │ (logique)│  │ (données)        │ │
│  └────┬─────┘  └──────────┘  └────┬─────┘  └──────────────────┘ │
│       │                           │                               │
└───────┼───────────────────────────┼───────────────────────────────┘
        │                           │
        ▼                           ▼
┌───────────────┐        ┌──────────────────────────────────────────┐
│  SUPABASE     │        │          APIs EXTERNES                    │
│  Auth + DB    │        │  Deepgram Nova-3 (STT WebSocket)          │
│  (Cloud)      │        │  Mistral AI (correction, API REST)        │
└───────────────┘        │  Google Gemini (embeddings + génération)  │
                         │  Anthropic Claude (mind maps)             │
┌───────────────┐        └──────────────────────────────────────────┘
│  STOCKAGE     │
│  LOCAL (JSON) │        ┌──────────────────────────────────────────┐
│  transcriptions│       │         NATIF (Platform Channels)        │
│  mind maps    │        │  NFC (MethodChannel com.notitia/nfc_share)│
│  vectors      │        │  Android Foreground Service               │
│  meetings     │        │  Home Widget (Android Kotlin / iOS Swift) │
└───────────────┘        └──────────────────────────────────────────┘
```

### Principes architecturaux

- **Architecture en couches** : Pages → Services → Modèles
- **Singleton** pour les services partagés (`AuthService`, `RAGService`, `GeminiService`, `MistralService`, `ClaudeService`, `VectorStoreService`)
- **ValueNotifier** pour la communication inter-onglets (refresh global)
- **StreamController broadcast** pour les états NFC et d'authentification
- **MethodChannel** pour les fonctionnalités natives (NFC)
- **Stockage 100% local** pour les notes (aucune donnée envoyée vers Supabase pour les notes en MVP)

---

## Tech 2. Structure du projet

```
MVP_Notitia/
│
├── lib/
│   ├── main.dart                    # Point d'entrée + NotitiaApp + MainNavigation
│   ├── theme.dart                   # NotitiaTheme (palette cyberpunk)
│   │
│   ├── config/
│   │   └── supabase_config.dart     # URL + anon key Supabase
│   │
│   ├── l10n/
│   │   ├── en.json                  # Traductions anglaises
│   │   └── fr.json                  # Traductions françaises
│   │
│   ├── models/
│   │   ├── transcription.dart       # Modèle Transcription
│   │   ├── meeting.dart             # Modèles Meeting + MeetingParticipant
│   │   ├── mind_map.dart            # Modèles MindMap + MindMapNode + enums
│   │   ├── user_preferences.dart    # Préférences utilisateur
│   │   └── email_otp_args.dart      # Args pour la page OTP
│   │
│   ├── pages/
│   │   ├── splash_screen.dart       # Écran de chargement initial
│   │   ├── onboarding_page.dart     # Guide interactif 5 étapes
│   │   ├── auth_choice_page.dart    # Choix auth/invité
│   │   ├── login_page.dart          # Connexion email + OAuth
│   │   ├── register_page.dart       # Inscription
│   │   ├── email_otp_page.dart      # Vérification OTP
│   │   ├── capture_page.dart        # 🎙️ Transcription vocale principale
│   │   ├── history_page.dart        # Historique des notes
│   │   ├── edit_page.dart           # Éditeur de note
│   │   ├── search_page.dart         # Recherche par mots-clés
│   │   ├── assistant_page.dart      # Chat RAG avec IA
│   │   ├── mind_map_page.dart       # Génération + visualisation mind maps
│   │   ├── meeting_page.dart        # Mode réunion collaborative
│   │   ├── tap_to_share_page.dart   # Partage NFC P2P
│   │   ├── profile_page.dart        # Profil + paramètres
│   │   └── subscription_page.dart   # Plans tarifaires
│   │
│   ├── services/
│   │   ├── auth_service.dart        # Authentification Supabase
│   │   ├── storage_service.dart     # Stockage JSON local
│   │   ├── deepgram_service.dart    # STT WebSocket Deepgram Nova-3
│   │   ├── mistral_service.dart     # Correction IA Mistral
│   │   ├── gemini_service.dart      # Embeddings + génération Gemini
│   │   ├── claude_service.dart      # Génération Claude Sonnet
│   │   ├── rag_service.dart         # RAG orchestrateur
│   │   ├── vector_store_service.dart# Base vectorielle locale (JSON)
│   │   ├── search_service.dart      # Recherche keyword-ranked
│   │   ├── mind_map_service.dart    # Génération mind maps
│   │   ├── meeting_service.dart     # Serveur HTTP local + WebSocket
│   │   ├── nfc_share_service.dart   # Bridge NFC Platform Channel
│   │   ├── local_share_manager.dart # Orchestrateur partage NFC
│   │   ├── notitia_file_service.dart# Sérialisation/chiffrement .notitia
│   │   ├── foreground_service.dart  # Service Android background
│   │   ├── home_widget_service.dart # Widget écran d'accueil
│   │   ├── widget_recording_service.dart # Enregistrement depuis widget
│   │   └── language_service.dart   # i18n JSON-based
│   │
│   └── widgets/
│       ├── meduza_widget.dart       # Mascotte animée (6 états)
│       ├── meduza_companion.dart    # Overlay flottant Meduza
│       ├── meduza_speech_bubble.dart# Bulle de texte Meduza
│       ├── mind_map_widget.dart     # Rendu interactif de mind map
│       ├── page_header.dart         # En-tête commun des pages
│       ├── pricing_cards.dart       # Cartes des plans tarifaires
│       ├── profile_button.dart      # Bouton avatar profil
│       └── pulsing_dot.dart         # Point clignotant (enregistrement)
│
├── assets/
│   ├── mascotte/                    # Assets visuels Meduza
│   └── sounds/                     # Sons feedback NFC
│
├── android/                         # Code natif Android (Gradle + Kotlin)
├── ios/                             # Code natif iOS (Xcode + Swift)
│   ├── Runner/NfcSharePlugin.swift  # Plugin NFC iOS natif
│   └── NotitiaWidget/               # Widget iOS (WidgetKit)
├── linux/                           # Support Linux (CMake)
├── macos/                           # Support macOS
├── web/                             # Support Web
├── windows/                         # Support Windows (CMake)
│
├── ia_python/                       # Scripts Python IA (optionnel)
│   ├── notitia_api.py               # API FastAPI
│   ├── mistral_integration.py       # Intégration Mistral Python
│   ├── notitia_stt.py               # STT Python (Whisper)
│   ├── noise_reduction.py           # Réduction de bruit audio
│   ├── fusion_system.py             # Fusion Whisper + Mistral
│   └── notitia_gui.py               # Interface graphique Python
│
├── pubspec.yaml                     # Dépendances Flutter
├── analysis_options.yaml            # Règles de linting Dart
└── setup.sh                         # Script d'installation
```

---

## Tech 3. Modèles de données

### 3.1 `Transcription`
```dart
class Transcription {
  final String id;      // Timestamp ms (ex: "1741234567890")
  String title;         // Titre auto ou personnalisé
  String content;       // Texte de la transcription
  final DateTime createdAt;
  DateTime updatedAt;
}
```
Persisté dans : `notitia_transcriptions.json` (documents locaux)

---

### 3.2 `Meeting` + `MeetingParticipant`
```dart
class Meeting {
  final String id;
  final String hostName;
  final DateTime startedAt;
  DateTime? endedAt;
  final List<MeetingParticipant> participants;
  String? transcriptionId;   // Lié à une Transcription après fin
}

class MeetingParticipant {
  final String id;
  final String name;
  final String ipAddress;
}
```
Persisté dans : `SharedPreferences` clé `notitia_meetings` (liste JSON)

---

### 3.3 `MindMap` + `MindMapNode`
```dart
enum MindMapNodeType {
  root, topic, subtopic, idea, action,
  question, decision, person, date, location, emotion, reference
}

class MindMapNode {
  final String id;
  final String label;          // Texte affiché max 8 mots
  final String? description;   // Détail du nœud
  final String? sourceText;    // Passage exact copié de la transcription
  final MindMapNodeType type;
  final List<String> childIds; // IDs des nœuds enfants
}

class MindMap {
  final String id;
  final String title;
  final String? summary;
  final MindMapNode root;
  final Map<String, MindMapNode> nodes;
  final DateTime createdAt;
  final List<String> sourceTranscriptionIds;
}
```
Persisté dans : `notitia_mindmaps.json` (documents locaux)

---

### 3.4 `UserProfile`
```dart
class UserProfile {
  final String id;          // UUID Supabase
  final String? email;
  final String? username;
  final String? avatarUrl;  // URL vers bucket Supabase Storage
  final DateTime createdAt;
  final DateTime? updatedAt;
}
```
Stocké dans : table `profiles` Supabase (miroir de `auth.users`)

---

### 3.5 `TextChunk` (Vector Store)
```dart
class TextChunk {
  final String id;
  final String transcriptionId;
  final String text;              // Fragment de texte (~300-500 chars)
  final List<double> embedding;   // Vecteur 768 dimensions (Gemini)
  final DateTime createdAt;
  final Map<String, String> metadata; // title, date
}
```
Persisté dans : `notitia_vectors.json` (documents locaux)

---

## Tech 4. Services

### 4.1 `AuthService` — Authentification Supabase
**Fichier :** `lib/services/auth_service.dart`  
**Pattern :** Singleton

| Méthode | Description |
|---|---|
| `initialize()` | Initialise le client Supabase (appelé dans `main()`) |
| `signInWithEmail(email, password)` | Connexion email/mot de passe |
| `signUpWithEmail(email, password)` | Création de compte |
| `signInWithGoogle()` | OAuth Google (PKCE flow) |
| `signInWithGitHub()` | OAuth GitHub (PKCE flow) |
| `signInWithOtp(email)` | Envoi code OTP par email |
| `verifyOtp(email, token)` | Vérification code OTP |
| `signOut()` | Déconnexion |
| `getProfile()` | Récupère le `UserProfile` depuis Supabase |
| `updateProfile(username, avatarUrl)` | Mise à jour du profil |
| `isGuestMode()` | Vérifie le mode invité (SharedPreferences) |
| `setGuestMode(bool)` | Bascule en mode invité |
| `isAuthenticated` | Getter : `currentUser != null` |
| `authStateChanges` | Stream des changements d'état auth |

**Configuration Supabase :** `lib/config/supabase_config.dart`
```dart
static const String supabaseUrl = 'https://ehizfqjftjdfzcosrmgh.supabase.co';
static const String supabaseAnonKey = 'sb_publishable_...';
```

---

### 4.2 `StorageService` — Stockage JSON local
**Fichier :** `lib/services/storage_service.dart`  
**Pattern :** Static class avec cache mémoire

| Méthode | Description |
|---|---|
| `loadAll()` | Charge toutes les transcriptions (avec cache) |
| `save(transcription)` | Insère ou met à jour une transcription |
| `delete(id)` | Supprime par ID |
| `invalidateCache()` | Force le rechargement depuis le disque |
| `loadAllMindMaps()` | Charge toutes les mind maps |
| `saveMindMap(mindMap)` | Sauvegarde une mind map |
| `deleteMindMap(id)` | Supprime une mind map |

**Fichiers créés :**
- `<documents>/notitia_transcriptions.json`
- `<documents>/notitia_mindmaps.json`

---

### 4.3 `DeepgramService` — Transcription temps réel
**Fichier :** `lib/services/deepgram_service.dart`

**Principe :** WebSocket bidirectionnel vers `wss://api.deepgram.com/v1/listen`  
Les chunks audio PCM 16-bit sont streamés via WebSocket, Deepgram renvoie des transcriptions partielles et finales.

| Propriété/Méthode | Description |
|---|---|
| `startListening()` | Ouvre WebSocket + démarre AudioRecorder |
| `stopListening()` | Envoie `{"type":"CloseStream"}` + ferme connexion |
| `onTranscript(text, isFinal)` | Callback texte reçu |
| `onError(error)` | Callback erreur |
| `onConnected()` | Callback connexion établie |
| `isListening` | Getter état |
| `displayText` | Texte complet + partiel en cours |

**Configuration :**
```dart
language = 'fr'       // Langue détectée
model = 'nova-3'      // Modèle Deepgram
sampleRate = 16000    // Hz
punctuate = true
smartFormat = true
interimResults = true // Résultats partiels temps réel
```

**Clé API :** `DeepgramService._apiKey` (à externaliser en production)

---

### 4.4 `MistralService` — Correction IA
**Fichier :** `lib/services/mistral_service.dart`  
**Pattern :** Singleton, API REST HTTPS

| Méthode | Description |
|---|---|
| `correctTranscription(text, level)` | Corrige une transcription |
| `enhanceText(text)` | Amélioration complète |

**Niveaux de correction (`CorrectionLevel`) :**
- `medium` : correction légère (orthographe + ponctuation)
- `full` : restructuration complète (supprime hésitations, améliore clarté)

**Modèle :** `mistral-small-latest`  
**URL :** `https://api.mistral.ai/v1/chat/completions`  
**Clé API :** `MistralService._apiKey`

---

### 4.5 `GeminiService` — Embeddings + Génération
**Fichier :** `lib/services/gemini_service.dart`  
**Pattern :** Singleton, API REST HTTPS

| Méthode | Description |
|---|---|
| `embed(text)` | Génère un vecteur 768 dimensions |
| `generate(prompt, systemPrompt)` | Génère du texte |

**Modèles :**
- Embedding : `gemini-embedding-001` (768 dimensions)
- Génération : `gemini-2.5-flash`

**Gestion rate limit :** retry automatique avec backoff (3 tentatives, délai ×10s)  
**Clé API :** `GeminiService._apiKey` (Google AI Studio)

---

### 4.6 `ClaudeService` — Génération (Mind Maps premium)
**Fichier :** `lib/services/claude_service.dart`  
**Pattern :** Singleton, API REST HTTPS

| Méthode | Description |
|---|---|
| `sendMessage(prompt, systemPrompt, model, maxTokens)` | Appel API Claude |
| `isConfigured` | Vérifie que la clé API est définie |

**Modèle :** `claude-sonnet-4-20250514`  
**URL :** `https://api.anthropic.com/v1/messages`  
**Clé API :** `ClaudeConfig.apiKey`

---

### 4.7 `VectorStoreService` — Base vectorielle locale
**Fichier :** `lib/services/vector_store_service.dart`  
**Pattern :** Singleton, JSON local

| Méthode | Description |
|---|---|
| `addChunks(chunks)` | Ajoute des chunks avec embeddings |
| `search(queryEmbedding, topK)` | Similarité cosinus → top K résultats |
| `isIndexed(transcriptionId)` | Vérifie si déjà indexé |
| `deleteByTranscriptionId(id)` | Supprime les chunks d'une transcription |
| `chunkCount` | Nombre total de chunks stockés |

**Chunking :** découpe en fragments ~300 chars avec chevauchement 50 chars  
**Similarité :** cosinus pur en Dart (pas de lib externe)  
**Fichier :** `<documents>/notitia_vectors.json`

---

### 4.8 `RAGService` — Orchestrateur RAG
**Fichier :** `lib/services/rag_service.dart`  
**Pattern :** Singleton

**Pipeline RAG :**
```
Question utilisateur
      ↓
GeminiService.embed(question)     # Embedding de la question
      ↓
VectorStoreService.search(emb)    # Top-5 chunks pertinents
      ↓
Build prompt avec contexte        # Question + chunks sources
      ↓
GeminiService.generate(prompt)    # Réponse finale
      ↓
ChatMessage avec sources citées   # Réponse + références
```

| Méthode | Description |
|---|---|
| `indexAllTranscriptions(onProgress)` | Indexe les nouvelles transcriptions |
| `ask(question)` | Pose une question, retourne `ChatMessage` |
| `clearHistory()` | Efface l'historique de conversation |
| `conversationHistory` | Liste immuable des messages |
| `getStats()` | Statistiques (nb transcriptions, chunks) |

**Historique multi-tours :** les 10 derniers messages sont inclus dans chaque prompt.

---

### 4.9 `SearchService` — Recherche keyword-ranked
**Fichier :** `lib/services/search_service.dart`  
**Pattern :** Static class

Implémente un moteur de recherche basé sur les scores de termes avec gestion des stop words français et anglais. Retourne des `SearchResult` avec score, termes matchés et extrait contextuel.

---

### 4.10 `MindMapService` — Génération de Mind Maps
**Fichier :** `lib/services/mind_map_service.dart`  
**Pattern :** Singleton

Prend une ou plusieurs transcriptions, les envoie à Gemini ou Claude avec un prompt expert structuré, puis parse le JSON retourné pour créer un objet `MindMap`.

Gère le **parsing robuste** : nettoyage du Markdown autour du JSON, extraction par regex si le modèle inclut des backticks, fallback sur une structure minimale en cas d'erreur.

---

### 4.11 `MeetingHostService` + `MeetingClientService`
**Fichier :** `lib/services/meeting_service.dart`

**Architecture réseau local :**
```
Hôte (HttpServer + WebSocket)
  ├── POST /join        → inscription participant
  ├── GET  /ws          → connexion WebSocket push
  └── push transcription → envoi temps réel à tous clients

Participants (WebSocket client)
  └── reçoit les mises à jour de transcription en push
```

`MeetingHostService` :
- Crée un `HttpServer` sur port aléatoire
- Détecte l'IP Wi-Fi locale
- Génère le QR code data (`http://IP:PORT`)
- Diffuse la transcription via WebSocket

`MeetingClientService` :
- Se connecte via `POST /join`
- Ouvre WebSocket vers `/ws`
- Callback `onTranscriptUpdate` pour les mises à jour

---

### 4.12 `NfcShareService` — Bridge NFC Platform Channel
**Fichier :** `lib/services/nfc_share_service.dart`

**Canal :** `MethodChannel('com.notitia/nfc_share')`

| Direction | Méthode | Description |
|---|---|---|
| Flutter → Natif | `isNfcAvailable()` | Vérifie la dispo NFC |
| Flutter → Natif | `writeToTag(base64)` | Écrit données sur tag NFC |
| Flutter → Natif | `readFromTag()` | Lance la lecture NFC |
| Flutter → Natif | `stopSession()` | Arrête la session NFC |
| Natif → Flutter | `onStateChanged(state)` | Changement d'état |
| Natif → Flutter | `onWriteComplete()` | Écriture terminée |
| Natif → Flutter | `onDataRead(base64)` | Données reçues |
| Natif → Flutter | `onError(message)` | Erreur NFC |

**Streams exposés :**
- `NfcShareService.stateStream → Stream<NfcShareState>`
- `NfcShareService.resultStream → Stream<NfcShareResult>`

**Code natif iOS :** `ios/Runner/NfcSharePlugin.swift`  
**Code natif Android :** à implémenter dans `android/app/src/`

---

### 4.13 `NotitiaFileService` — Format .notitia
**Fichier :** `lib/services/notitia_file_service.dart`

**Format binaire propriétaire :**
```
Offset  Taille  Description
0       4       Magic bytes : "NTIA"
4       1       Version : 0x01
5       1       Flags : bit0=compressed, bit1=encrypted
6       N       Payload : zlib(JSON) ou AES-256-CBC(zlib(JSON))
```

**Chiffrement 100% Dart :**
- PBKDF2-HMAC-SHA256 (100 000 itérations, 32 bytes) pour dériver la clé
- AES-256-CBC avec IV aléatoire 16 bytes préfixé au payload
- Aucune dépendance native

---

### 4.14 `ActiveListeningService` — Foreground Service
**Fichier :** `lib/services/foreground_service.dart`

Wrappeur autour de `flutter_foreground_task`. Démarre un **Foreground Service Android** avec :
- Notification persistante basse priorité (canal `notitia_active_listening`)
- Wake lock CPU pour maintenir la transcription active
- Heartbeat toutes les 60 secondes

| Méthode | Description |
|---|---|
| `ActiveListeningService.init()` | Initialisation (appelée dans main) |
| `ActiveListeningService.start()` | Démarre le service |
| `ActiveListeningService.stop()` | Arrête le service |
| `ActiveListeningService.isRunning` | État du service |

---

### 4.15 `HomeWidgetService` + `WidgetRecordingService`
**Fichier :** `lib/services/home_widget_service.dart`

Orchestrateur du widget écran d'accueil. Le service **natif Android (Kotlin)** gère l'enregistrement et le streaming Deepgram. Flutter vérifie au resume si une transcription en attente doit être traitée.

`HomeWidgetService.initialize()` → configure l'App Group iOS et vérifie les transcriptions en attente  
`HomeWidgetService.checkPendingTranscription()` → appelé dans `didChangeAppLifecycleState`

---

### 4.16 `LanguageService` — Internationalisation
**Fichier :** `lib/services/language_service.dart`  
**Pattern :** Singleton

```dart
LanguageService().translate('capture_title') // → "Capture" / "Capture"
LanguageService().changeLanguage('fr')        // Change la langue
LanguageService().currentLanguage            // 'fr' ou 'en'
```

Fichiers de traduction : `lib/l10n/fr.json` et `lib/l10n/en.json`

---

## Tech 5. Pages et écrans

### Flux de navigation au démarrage

```
main() → NotitiaApp
    └── SplashScreen (2s)
          ├── Authentifié + Onboardé → /main (MainNavigation)
          ├── Authentifié + Non onboardé → /onboarding
          ├── Mode invité → /main
          └── Non authentifié → /auth (AuthChoicePage)
```

### Détail des pages

| Fichier | Classe | Description |
|---|---|---|
| `splash_screen.dart` | `SplashScreen` | Chargement initial, logo Notitia, vérification auth |
| `onboarding_page.dart` | `OnboardingPage` | 5 étapes avec Meduza guide, AnimationController |
| `auth_choice_page.dart` | `AuthChoicePage` | 3 boutons : connexion / inscription / invité |
| `login_page.dart` | `LoginPage` | Form email+password, OAuth Google/GitHub, OTP redirect |
| `register_page.dart` | `RegisterPage` | Inscription email/password |
| `email_otp_page.dart` | `EmailOtpPage` | Saisie code OTP (widget Pinput 6 chiffres) |
| `capture_page.dart` | `CapturePage` | STT (Deepgram/natif), correction Mistral, mode actif |
| `history_page.dart` | `HistoryPage` | Liste transcriptions, suppression, navigation vers edit/share |
| `edit_page.dart` | `EditPage` | Éditeur titre + contenu, sauvegarde |
| `search_page.dart` | `SearchPage` | Barre recherche, debounce 300ms, liste résultats scorés |
| `assistant_page.dart` | `AssistantPage` | Chat RAG, indexation auto, sources affichées |
| `mind_map_page.dart` | `MindMapPage` | 3 onglets (générer/visu/sauvegardés), choix moteur IA |
| `meeting_page.dart` | `MeetingPage` | Hôte (QR + WebSocket) + Participant (scan QR) |
| `tap_to_share_page.dart` | `TapToSharePage` | Émetteur/récepteur NFC, animations cyberpunk |
| `profile_page.dart` | `ProfilePage` | Profil, username, avatar, langue, thème, déconnexion |
| `subscription_page.dart` | `SubscriptionPage` | Affichage des 5 plans tarifaires |

---

## Tech 6. Widgets réutilisables

### `MeduzaWidget`
**Fichier :** `lib/widgets/meduza_widget.dart`

Méduse animée avec 6 états (`MeduzaState`) :
- Chaque état déclenche des animations spécifiques (float, glow, spin, shake, bounce, pulse)
- Contrôleurs d'animation indépendants par état
- Props : `state`, `size`, `showGlow`

### `MeduzaFloatingOverlay`
**Fichier :** `lib/widgets/meduza_companion.dart`

Superposition flottante contenant `MeduzaWidget` + `MeduzaSpeechBubble`. Positionnée en bas de l'écran. Auto-dismissed après 4 secondes pour les états `happy`/`confused`. Bascule en `MeduzaState.idle` (invisible) quand aucun événement actif.

### `MeduzaSpeechBubble`
**Fichier :** `lib/widgets/meduza_speech_bubble.dart`

Bulle de texte contextuelle affichée à côté de Meduza. Styles : `normal`, `success`, `error`, `info`.

### `MindMapWidget`
**Fichier :** `lib/widgets/mind_map_widget.dart`

Rendu interactif de `MindMap` avec :
- Deux modes de vue : `radial` et `tree`
- Gestes : pinch-to-zoom, drag pour déplacer
- Tap sur nœud → callback avec le texte source
- Canvas `CustomPainter` pour le rendu des arcs

### `NotitiaPricingCards`
**Fichier :** `lib/widgets/pricing_cards.dart`

5 cartes de pricing avec animation glow. Props : `showCTAs`, `compact`.

### `PulsingDot`
**Fichier :** `lib/widgets/pulsing_dot.dart`

Point rouge animé indiquant l'enregistrement actif.

---

## Tech 7. Navigation et routing

**Navigation globale :** `GlobalKey<NavigatorState> navigatorKey` défini dans `main.dart`

### Routes nommées
```dart
'/main'        → MainNavigation (WithForegroundTask wrapper)
'/auth'        → AuthChoicePage
'/login'       → LoginPage
'/register'    → RegisterPage
'/email-otp'   → EmailOtpPage
'/profile'     → ProfilePage
'/onboarding'  → OnboardingPage
'/subscription'→ SubscriptionPage
```

### Navigation initiale
`SplashScreen` → vérifie l'état auth + onboarding et redirige  
Arguments supportés : `{fromOnboarding: true}` → active la transition fade depuis l'onboarding

### MainNavigation — 5 onglets
```
Index 0 : HistoryPage
Index 1 : MeetingPage
Index 2 : CapturePage  ← centre (bouton flottant surélevé)
Index 3 : MindMapPage
Index 4 : AssistantPage
```

Utilise `IndexedStack` pour préserver l'état de chaque onglet.  
Communication inter-onglets via `ValueNotifier<int> _refreshNotifier` incrémenté à chaque nouvelle transcription.

---

## Tech 8. Thème et Design System

**Fichier :** `lib/theme.dart`

### Palette cyberpunk
```dart
NotitiaTheme.deepBlue     = Color(0xFF00003F)  // Fond principal
NotitiaTheme.darkBlue     = Color(0xFF000830)  // Fond navbar / cartes
NotitiaTheme.neonPink     = Color(0xFFFF0178)  // Accent principal, CTA
NotitiaTheme.neonCyan     = Color(0xFF00E5FF)  // Accent secondaire
NotitiaTheme.white        = Colors.white        // Texte principal
NotitiaTheme.grey         = Color(0xFF8888AA)  // Texte inactif
NotitiaTheme.redRecording = Color(0xFFFF3366)  // Enregistrement, erreur
```

### Typography
- Police principale : **Orbitron** (Google Fonts) — tech/futuriste
- Police secondaire : **Poppins** (Google Fonts) — corps de texte lisible

### Thèmes utilisateur (5 options)
Définis dans `ProfilePage._themes` :
- Cyberpunk (défaut), Ocean, Forest, Sunset, Violet

---

## Tech 9. Authentification

### Flow PKCE (OAuth)
Supabase utilise le flow PKCE pour OAuth Google et GitHub, ce qui est plus sécurisé que le flow implicite.

### Modes d'authentification
1. **Email + Password** — standard
2. **Google OAuth** — `signInWithGoogle()`
3. **GitHub OAuth** — `signInWithGitHub()`
4. **Email OTP** — code 6 chiffres envoyé par email (UI : `Pinput`)
5. **Mode invité** — pas de compte, données locales uniquement (flag `SharedPreferences`)

### Gestion du profil Supabase
- Table `profiles` dans Supabase (miroir de `auth.users`)
- Création automatique du profil à l'inscription
- `avatar_url` → Supabase Storage bucket

### Onboarding scopé par utilisateur
`OnboardingService` utilise une clé `notitia_onboarded_userId` pour tracker l'onboarding par utilisateur, évitant qu'un utilisateur connecté sur un appareil partagé voie l'onboarding d'un autre utilisateur.

---

## Tech 10. APIs externes et clés

> ⚠️ **Sécurité** : Les clés API sont actuellement hardcodées dans le code source. **En production, elles doivent être externalisées** (variables d'environnement, flutter_dotenv, ou serveur proxy).

| Service | Fichier | Variable | Usage |
|---|---|---|---|
| **Deepgram** | `deepgram_service.dart` | `_apiKey` | Transcription STT temps réel |
| **Mistral AI** | `mistral_service.dart` | `_apiKey` | Correction transcriptions |
| **Google Gemini** | `gemini_service.dart` | `_apiKey` | Embeddings + génération RAG |
| **Anthropic Claude** | `claude_service.dart` | `ClaudeConfig.apiKey` | Génération mind maps premium |
| **Supabase** | `supabase_config.dart` | `supabaseUrl` + `supabaseAnonKey` | Auth + profils |

### Obtenir les clés API
- **Deepgram** : [console.deepgram.com](https://console.deepgram.com)
- **Mistral** : [console.mistral.ai](https://console.mistral.ai)
- **Gemini** : [aistudio.google.com](https://aistudio.google.com/app/apikey)
- **Claude** : [console.anthropic.com](https://console.anthropic.com)
- **Supabase** : Projet Supabase → Settings → API

---

## Tech 11. Stockage local

### Fichiers persistés (documents locaux de l'appareil)

| Fichier | Service | Contenu |
|---|---|---|
| `notitia_transcriptions.json` | `StorageService` | Liste de `Transcription` |
| `notitia_mindmaps.json` | `StorageService` | Liste de `MindMap` |
| `notitia_vectors.json` | `VectorStoreService` | Liste de `TextChunk` avec embeddings |

### SharedPreferences

| Clé | Type | Description |
|---|---|---|
| `notitia_meetings` | `List<String>` | Liste JSON des réunions |
| `notitia_guest_mode` | `bool` | Mode invité activé |
| `notitia_skip_auth` | `bool` | Auth ignorée |
| `notitia_onboarded` | `bool` | Onboarding global complété |
| `notitia_onboarded_<userId>` | `bool` | Onboarding par utilisateur |
| `app_language` | `String` | Langue sélectionnée ('fr' / 'en') |

### Cache mémoire
`StorageService` et `VectorStoreService` maintiennent un cache en mémoire (`List?`) pour éviter des lectures disque répétées. `invalidateCache()` force le rechargement.

---

## Tech 12. Système RAG et base vectorielle

### Architecture RAG locale

```
Transcription (texte)
    │
    ▼ Chunking (VectorStoreService.chunkText)
Chunks ~300 chars avec chevauchement 50 chars
    │
    ▼ Embedding (GeminiService.embed)
Vecteurs 768 dimensions
    │
    ▼ Stockage (VectorStoreService.addChunks)
notitia_vectors.json
```

**Lors d'une question :**
```
Question → embed → vecteur question
    │
    ▼ Similarité cosinus (VectorStoreService.search)
Top-5 chunks les plus proches
    │
    ▼ Prompt RAG (RAGService.ask)
"Réponds à la question basé sur ces notes:\n[chunks]\n\nQuestion: [question]"
    │
    ▼ GeminiService.generate
Réponse + sources citées
```

**Détection des doublons :** `VectorStoreService` garde en mémoire un `Set<String> _indexedTranscriptionIds` pour éviter de ré-indexer les transcriptions déjà traitées. Cette liste est reconstruite depuis le JSON au démarrage.

---

## Tech 13. Format de fichier .notitia

Format binaire structuré pour le partage NFC sécurisé.

```
[4 bytes] Magic     : 0x4E 0x54 0x49 0x41 ("NTIA")
[1 byte]  Version   : 0x01
[1 byte]  Flags     : bit0=zlib, bit1=AES-256-CBC
[N bytes] Payload   : données compressées/chiffrées
```

**Contenu JSON du payload :**
```json
{
  "metadata": {
    "app_version": "2.0",
    "created_at": "2026-03-11T10:30:00Z",
    "content_type": "transcription"
  },
  "content": { ...objet Transcription... }
}
```

**Types de contenu :** `transcription`, `mindMap`, `unknown`

---

## Tech 14. NFC Tap-to-Share

### Flux complet émetteur → récepteur

```
Émetteur                           Récepteur
CapturePage → TapToSharePage       TapToSharePage (mode receive)
    │                                   │
    ▼                                   ▼
LocalShareManager.startSending()   LocalShareManager.startReceiving()
    │                                   │
    ▼                                   │
NotitiaFileService.encode()            │ (NFC détecté côté natif)
    │                                   │
    ▼                                   ▼
NfcShareService.writeToTag(b64)    NfcShareService.readFromTag()
    │                                   │
    ▼                                   ▼
Code natif iOS/Android             Code natif iOS/Android
(NFC Tag Write)                    (NFC Tag Read)
    │                                   │
    ▼                                   ▼
onWriteComplete()                  onDataRead(base64)
    │                                   │
    ▼                                   ▼
Feedback (son + vibration)         NotitiaFileService.decode()
                                       │
                                       ▼
                                   StorageService.save(transcription)
```

**`LocalShareManager`** : ChangeNotifier qui orchestre le flux, expose `session` (état courant) et `onTranscriptionReceived` callback.

---

## Tech 15. Foreground Service (écoute background)

**Android seulement** (ignoré sur iOS, Web, Desktop)

Le `ActiveListeningService` utilise `flutter_foreground_task` pour :
1. Maintenir le process Flutter en vie quand l'app est en background
2. Afficher une notification persistante "Écoute active Notitia"
3. Activer le CPU wake lock pour éviter la suspension

La transcription vocale continue de tourner dans l'isolat Flutter principal — le foreground service ne fait que maintenir ce dernier en vie.

**Permissions requises Android :**
```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
<uses-permission android:name="android.permission.WAKE_LOCK"/>
```

---

## Tech 16. Home Widget natif

### Android
Le widget Android utilise un **Foreground Service Kotlin natif** (`NotitiaRecordingService.kt`) qui gère directement :
- L'enregistrement audio
- Le streaming vers Deepgram
- Le timer d'affichage
- L'arrêt de la session

Flutter ne fait que vérifier les transcriptions en attente au resume de l'application (`HomeWidgetService.checkPendingTranscription()`).

### iOS
Widget WidgetKit configuré dans le target `NotitiaWidget`. Utilise l'App Group `group.com.example.notitia` pour partager les données entre l'app principale et le widget.

---

## Tech 17. Internationalisation (i18n)

**Approche :** JSON-based, chargement depuis les assets.

**Fichiers :**
- `lib/l10n/fr.json` — traductions françaises
- `lib/l10n/en.json` — traductions anglaises

**Utilisation :**
```dart
final t = LanguageService().translate('key');
```

**Changement de langue :**
```dart
await LanguageService().changeLanguage('fr'); // recharge les traductions
```

**Clés communes :** `capture`, `history_title`, `assistant`, `mindmap`, `search`, `save`, `delete`, `cancel`, `delete_confirm`...

---

## Tech 18. Installation développeur

### Prérequis

```bash
flutter --version     # >= 3.10.8
dart --version        # >= 3.10.8
```

### Installation rapide

```bash
# 1. Cloner le repo
git clone <repo-url>
cd MVP_Notitia

# 2. Dépendances Flutter
flutter pub get

# 3. Générer icônes et splash screen
dart run flutter_launcher_icons
dart run flutter_native_splash:create

# 4. Vérifier les plateformes disponibles
flutter devices
```

### Android
```bash
cd android && ./gradlew clean && cd ..
flutter run -d <android-device-id>
```

### iOS
```bash
cd ios && pod install --repo-update && cd ..
flutter run -d <ios-device-id>
```

### Linux (bureau)
```bash
sudo apt-get install clang cmake ninja-build libgtk-3-dev libasound2-dev
flutter run -d linux
```

### Web
```bash
flutter run -d chrome
# Note : micro natif limité sur web, Deepgram WebSocket fonctionnel
```

### Backend Python (optionnel)
```bash
cd ia_python
pip install -r requirements.txt   # si requirements.txt existe
python notitia_api.py             # lance l'API FastAPI locale
```

---

## Tech 19. Variables d'environnement et sécurité

> ⚠️ Les clés API sont actuellement **en dur dans le code**. C'est acceptable pour un MVP mais **DOIT être corrigé avant un déploiement production**.

### Migration vers des variables d'environnement

**Option 1 — `flutter_dotenv` (recommandé pour le dev)**
```bash
flutter pub add flutter_dotenv
```
```dart
// .env (ne pas committer)
DEEPGRAM_API_KEY=xxx
MISTRAL_API_KEY=xxx
GEMINI_API_KEY=xxx
CLAUDE_API_KEY=xxx

// usage
final key = dotenv.env['DEEPGRAM_API_KEY']!;
```

**Option 2 — Serveur proxy (recommandé pour la production)**  
Créer une API backend (Node/Python/Supabase Edge Functions) qui proxifie les appels IA, évitant d'exposer les clés côté client.

### Permissions nécessaires par plateforme

**Android** (`android/app/src/main/AndroidManifest.xml`) :
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.NFC"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
<uses-permission android:name="android.permission.WAKE_LOCK"/>
```

**iOS** (`ios/Runner/Info.plist`) :
```xml
NSMicrophoneUsageDescription → "Notitia a besoin du micro pour les transcriptions"
NSSpeechRecognitionUsageDescription → "Utilisé pour la transcription vocale"
NFCReaderUsageDescription → "Pour le partage Tap-to-Share entre téléphones"
```

---

## Tech 20. Backend Python (optionnel)

Le dossier `ia_python/` contient un backend Python optionnel **qui n'est plus requis** pour la version Flutter directe. Il est conservé comme référence ou pour des usages avancés.

| Fichier | Description |
|---|---|
| `notitia_api.py` | API FastAPI : endpoints `/transcribe`, `/enhance`, `/search` |
| `mistral_integration.py` | Intégration Mistral via API Python |
| `notitia_stt.py` | STT avec Whisper (OpenAI) |
| `noise_reduction.py` | Réduction de bruit audio (noisereduce) |
| `fusion_system.py` | Pipeline Whisper + Mistral combinés |
| `notitia_gui.py` | Interface graphique Tkinter/Qt pour tests desktop |

---

## Diagramme de dépendances des services

```
main.dart
 ├── AuthService.initialize()
 ├── LanguageService.initialize()
 ├── ActiveListeningService.init()
 ├── NfcShareService.init()
 ├── NotitiaFileService.cleanupAllTempFiles()
 └── HomeWidgetService.initialize()
      └── WidgetRecordingService.processPendingTranscription()

CapturePage
 ├── DeepgramService (WebSocket STT)
 ├── speech_to_text (natif STT)
 ├── MistralService (correction)
 └── StorageService (sauvegarde)

AssistantPage
 └── RAGService
      ├── GeminiService (embed + generate)
      ├── VectorStoreService (search + store)
      └── StorageService (loadAll)

MindMapPage
 └── MindMapService
      ├── GeminiService (gratuit)
      ├── ClaudeService (premium)
      └── StorageService

MeetingPage
 ├── MeetingHostService (HttpServer + WS)
 ├── MeetingClientService (WS client)
 └── DeepgramService

TapToSharePage
 └── LocalShareManager
      ├── NfcShareService (Platform Channel)
      └── NotitiaFileService (encode/decode)
```

---

* — Notitia v1.0.0+1*
