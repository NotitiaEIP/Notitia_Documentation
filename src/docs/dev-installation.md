# Installation & Configuration

## Prérequis

```bash
flutter --version     # >= 3.10.8
dart --version        # >= 3.10.8
```

## Installation rapide

```bash
# 1. Cloner le repo
git clone <repo-url>
cd MVP_Notitia

# 2. Dépendances Flutter
flutter pub get

# 3. Générer icônes et splash screen
dart run flutter_launcher_icons
dart run flutter_native_splash:create

# 4. Vérifier les plateformes
flutter devices
```

### Par plateforme

| Plateforme | Commande |
|---|---|
| **Android** | `flutter run -d <android-device-id>` |
| **iOS** | `cd ios && pod install --repo-update && cd .. && flutter run -d <ios-device-id>` |
| **Linux** | `sudo apt-get install clang cmake ninja-build libgtk-3-dev libasound2-dev && flutter run -d linux` |
| **Web** | `flutter run -d chrome` |

---

## APIs externes et clés

> **Sécurité** : Les clés API sont actuellement hardcodées. En production, elles doivent être externalisées.

| Service | Usage | Obtenir la clé |
|---|---|---|
| **Deepgram** | Transcription STT | [console.deepgram.com](https://console.deepgram.com) |
| **Mistral AI** | Correction transcriptions | [console.mistral.ai](https://console.mistral.ai) |
| **Google Gemini** | Embeddings + génération RAG | [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| **Anthropic Claude** | Mind maps premium | [console.anthropic.com](https://console.anthropic.com) |
| **Supabase** | Auth + profils | Projet Supabase → Settings → API |

---

## Stockage local

### Fichiers persistés

| Fichier | Contenu |
|---|---|
| `notitia_transcriptions.json` | Liste de Transcription |
| `notitia_mindmaps.json` | Liste de MindMap |
| `notitia_vectors.json` | TextChunks avec embeddings |

### SharedPreferences

| Clé | Type | Description |
|---|---|---|
| `notitia_meetings` | `List<String>` | Réunions en JSON |
| `notitia_guest_mode` | `bool` | Mode invité |
| `notitia_onboarded_<userId>` | `bool` | Onboarding par utilisateur |
| `app_language` | `String` | Langue (`fr` / `en`) |

---

## Système RAG

### Pipeline d'indexation

```
Transcription → Chunking (~300 chars, chevauchement 50)
    → Embedding Gemini (768 dimensions)
    → Stockage dans notitia_vectors.json
```

### Pipeline de question

```
Question → Embedding → Similarité cosinus → Top-5 chunks
    → Prompt RAG → Gemini génération → Réponse + sources
```

---

## Sécurité des clés API

### Option 1 — flutter_dotenv (dev)

```dart
// .env (ne pas committer)
DEEPGRAM_API_KEY=xxx
MISTRAL_API_KEY=xxx
GEMINI_API_KEY=xxx
```

### Option 2 — Serveur proxy (production)

Créer une API backend qui proxifie les appels IA, évitant d'exposer les clés côté client.

---

## Permissions par plateforme

### Android

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.NFC"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
<uses-permission android:name="android.permission.WAKE_LOCK"/>
```

### iOS

| Permission | Description |
|---|---|
| `NSMicrophoneUsageDescription` | Micro pour transcriptions |
| `NSSpeechRecognitionUsageDescription` | Transcription vocale |
| `NFCReaderUsageDescription` | Partage Tap-to-Share |

---

## Backend Python (optionnel)

Le dossier `ia_python/` contient un backend optionnel conservé comme référence :

| Fichier | Description |
|---|---|
| `notitia_api.py` | API FastAPI |
| `mistral_integration.py` | Intégration Mistral Python |
| `notitia_stt.py` | STT avec Whisper |
| `noise_reduction.py` | Réduction de bruit audio |
| `fusion_system.py` | Pipeline Whisper + Mistral |
| `notitia_gui.py` | Interface graphique desktop |
