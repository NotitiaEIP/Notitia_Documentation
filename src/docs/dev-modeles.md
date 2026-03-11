# Modèles de données

## Transcription

```dart
class Transcription {
  final String id;          // Timestamp ms (ex: "1741234567890")
  String title;             // Titre auto ou personnalisé
  String content;           // Texte de la transcription
  final DateTime createdAt;
  DateTime updatedAt;
}
```

**Persisté dans :** `notitia_transcriptions.json` (documents locaux)

---

## Meeting + MeetingParticipant

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

**Persisté dans :** `SharedPreferences` clé `notitia_meetings`

---

## MindMap + MindMapNode

```dart
enum MindMapNodeType {
  root, topic, subtopic, idea, action,
  question, decision, person, date, location, emotion, reference
}

class MindMapNode {
  final String id;
  final String label;          // Texte max 8 mots
  final String? description;
  final String? sourceText;    // Passage exact de la transcription
  final MindMapNodeType type;
  final List<String> childIds;
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

**Persisté dans :** `notitia_mindmaps.json`

---

## UserProfile

```dart
class UserProfile {
  final String id;          // UUID Supabase
  final String? email;
  final String? username;
  final String? avatarUrl;  // URL Supabase Storage
  final DateTime createdAt;
  final DateTime? updatedAt;
}
```

**Stocké dans :** table `profiles` Supabase

---

## TextChunk (Vector Store)

```dart
class TextChunk {
  final String id;
  final String transcriptionId;
  final String text;              // Fragment ~300-500 chars
  final List<double> embedding;   // Vecteur 768 dimensions (Gemini)
  final DateTime createdAt;
  final Map<String, String> metadata;
}
```

**Persisté dans :** `notitia_vectors.json`
