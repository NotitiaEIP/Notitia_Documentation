# Architecture Technique

> **Stack :** Flutter / Dart — Backend Supabase — IA : Deepgram, Mistral, Gemini, Claude

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION FLUTTER                        │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐ │
│  │  Pages   │  │ Widgets  │  │ Services │  │   Models    │ │
│  │  (UI)    │  │ (réutil.)│  │ (logique)│  │  (données)  │ │
│  └────┬─────┘  └──────────┘  └────┬─────┘  └─────────────┘ │
└───────┼───────────────────────────┼─────────────────────────┘
        │                           │
        ▼                           ▼
┌───────────────┐        ┌──────────────────────────────────┐
│   SUPABASE    │        │       APIs EXTERNES               │
│  Auth + DB    │        │  Deepgram Nova-3 (STT WebSocket)  │
│  (Cloud)      │        │  Mistral AI (correction, REST)    │
└───────────────┘        │  Gemini (embeddings + génération) │
                         │  Claude (mind maps premium)       │
┌───────────────┐        └──────────────────────────────────┘
│   STOCKAGE    │
│  LOCAL (JSON) │        ┌──────────────────────────────────┐
│ transcriptions│        │     NATIF (Platform Channels)     │
│  mind maps    │        │  NFC (com.notitia/nfc_share)      │
│  vectors      │        │  Android Foreground Service        │
│  meetings     │        │  Home Widget (Kotlin / Swift)      │
└───────────────┘        └──────────────────────────────────┘
```

### Principes architecturaux

- **Architecture en couches** : Pages → Services → Modèles
- **Singleton** pour les services partagés (AuthService, RAGService, GeminiService, etc.)
- **ValueNotifier** pour la communication inter-onglets (refresh global)
- **StreamController broadcast** pour les états NFC et d'authentification
- **MethodChannel** pour les fonctionnalités natives (NFC)
- **Stockage 100% local** pour les notes (aucune donnée envoyée vers le cloud pour les notes)

---

## Structure du projet

```
MVP_Notitia/
├── lib/
│   ├── main.dart                    # Point d'entrée + MainNavigation
│   ├── theme.dart                   # NotitiaTheme (palette cyberpunk)
│   ├── config/
│   │   └── supabase_config.dart     # URL + anon key Supabase
│   ├── l10n/
│   │   ├── en.json                  # Traductions anglaises
│   │   └── fr.json                  # Traductions françaises
│   ├── models/                      # Modèles de données
│   ├── pages/                       # Écrans de l'application
│   ├── services/                    # Logique métier + APIs
│   └── widgets/                     # Composants UI réutilisables
├── assets/
│   ├── mascotte/                    # Assets visuels Meduza
│   └── sounds/                      # Sons feedback NFC
├── android/                         # Code natif Android (Kotlin)
├── ios/                             # Code natif iOS (Swift)
├── ia_python/                       # Backend Python (optionnel)
└── pubspec.yaml                     # Dépendances Flutter
```

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
