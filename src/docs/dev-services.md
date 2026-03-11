# Services

Tous les services suivent le **pattern Singleton** et communiquent via des callbacks ou des streams.

## AuthService — Authentification Supabase

| Méthode | Description |
|---|---|
| `signInWithEmail(email, password)` | Connexion email/mot de passe |
| `signUpWithEmail(email, password)` | Création de compte |
| `signInWithGoogle()` | OAuth Google (PKCE flow) |
| `signInWithGitHub()` | OAuth GitHub (PKCE flow) |
| `signInWithOtp(email)` | Envoi code OTP |
| `verifyOtp(email, token)` | Vérification code OTP |
| `signOut()` | Déconnexion |
| `getProfile()` / `updateProfile()` | Gestion profil Supabase |
| `isGuestMode()` / `setGuestMode()` | Mode invité (local) |

---

## StorageService — Stockage JSON local

| Méthode | Description |
|---|---|
| `loadAll()` | Charge toutes les transcriptions (avec cache) |
| `save(transcription)` | Insère ou met à jour |
| `delete(id)` | Supprime par ID |
| `loadAllMindMaps()` | Charge les mind maps |
| `saveMindMap()` / `deleteMindMap()` | Gestion mind maps |

**Fichiers :** `notitia_transcriptions.json`, `notitia_mindmaps.json`

---

## DeepgramService — Transcription temps réel

WebSocket bidirectionnel vers `wss://api.deepgram.com/v1/listen`. Les chunks audio PCM 16-bit sont streamés, Deepgram renvoie des transcriptions partielles et finales.

| Propriété | Description |
|---|---|
| `startListening()` | Ouvre WebSocket + AudioRecorder |
| `stopListening()` | Ferme la connexion |
| `onTranscript(text, isFinal)` | Callback texte reçu |
| `displayText` | Texte complet + partiel |

**Config :** `language=fr`, `model=nova-3`, `sampleRate=16000`, `interimResults=true`

---

## MistralService — Correction IA

API REST vers `https://api.mistral.ai/v1/chat/completions` avec le modèle `mistral-small-latest`.

- **medium** : correction légère (orthographe + ponctuation)
- **full** : restructuration complète (supprime hésitations)

---

## GeminiService — Embeddings + Génération

| Méthode | Description |
|---|---|
| `embed(text)` | Vecteur 768 dimensions (`gemini-embedding-001`) |
| `generate(prompt)` | Génération texte (`gemini-2.5-flash`) |

**Rate limit :** retry automatique avec backoff (3 tentatives, délai ×10s)

---

## ClaudeService — Mind Maps premium

Modèle `claude-sonnet-4-20250514` via `https://api.anthropic.com/v1/messages`. Utilisé pour la génération de mind maps plus riches.

---

## VectorStoreService — Base vectorielle locale

| Méthode | Description |
|---|---|
| `addChunks(chunks)` | Ajoute des chunks avec embeddings |
| `search(queryEmbedding, topK)` | Similarité cosinus → top K |
| `isIndexed(transcriptionId)` | Vérifie si déjà indexé |

**Chunking :** ~300 chars avec chevauchement 50 chars. **Similarité :** cosinus pur en Dart.

---

## RAGService — Orchestrateur RAG

Pipeline complet :

```
Question → embed → vecteur
    → VectorStoreService.search → Top-5 chunks
    → Build prompt avec contexte
    → GeminiService.generate → Réponse + sources
```

**Historique multi-tours :** les 10 derniers messages inclus dans chaque prompt.

---

## MeetingHostService + MeetingClientService

**Architecture réseau local :**

| Endpoint | Description |
|---|---|
| `POST /join` | Inscription participant |
| `GET /ws` | Connexion WebSocket push |

L'hôte crée un `HttpServer` sur port aléatoire, détecte l'IP Wi-Fi, génère le QR code et diffuse la transcription via WebSocket.

---

## NfcShareService — Bridge NFC

Canal : `MethodChannel('com.notitia/nfc_share')`

| Direction | Méthode |
|---|---|
| Flutter → Natif | `isNfcAvailable()`, `writeToTag()`, `readFromTag()`, `stopSession()` |
| Natif → Flutter | `onStateChanged()`, `onWriteComplete()`, `onDataRead()`, `onError()` |

---

## NotitiaFileService — Format .notitia

Format binaire propriétaire pour le partage NFC sécurisé :

| Offset | Taille | Description |
|---|---|---|
| 0 | 4 | Magic bytes : `"NTIA"` |
| 4 | 1 | Version : `0x01` |
| 5 | 1 | Flags : bit0=compressed, bit1=encrypted |
| 6 | N | Payload : zlib(JSON) ou AES-256-CBC(zlib(JSON)) |

**Chiffrement :** PBKDF2-HMAC-SHA256 (100 000 itérations) + AES-256-CBC, 100% Dart.

---

## Autres services

| Service | Description |
|---|---|
| **ActiveListeningService** | Foreground Service Android pour capture en arrière-plan |
| **HomeWidgetService** | Widget écran d'accueil (Kotlin natif / WidgetKit iOS) |
| **LanguageService** | Internationalisation JSON (`fr.json`, `en.json`) |
| **SearchService** | Recherche keyword-ranked avec scoring |
| **MindMapService** | Génération mind maps via Gemini ou Claude |
