# Architecture

## Vue d'ensemble

L'architecture de Notitia repose sur le principe du **Edge AI** — le traitement des données s'effectue directement sur l'appareil de l'utilisateur, garantissant confidentialité et performance.

```
┌──────────────────────────────────────────────┐
│                 Notitia Node                  │
│  ┌─────────┐  ┌─────────┐  ┌──────────────┐ │
│  │ Micro 1 │  │ Micro 2 │  │ LED Ring     │ │
│  │ (MEMS)  │  │ (MEMS)  │  │ Transparence │ │
│  └────┬────┘  └────┬────┘  └──────────────┘ │
│       └──────┬─────┘                          │
│          ESP32-S3                              │
│       (Bluetooth Sync)                        │
└──────────┬───────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────┐
│              Application Mobile               │
│  ┌──────────────────────────────────────────┐ │
│  │        Whisper (Transcription)           │ │
│  ├──────────────────────────────────────────┤ │
│  │     LLM Local (Mistral / Phi-3)         │ │
│  ├──────────────────────────────────────────┤ │
│  │       Meduza (Recherche Sémantique)     │ │
│  ├──────────────────────────────────────────┤ │
│  │      Mindmap Generator                  │ │
│  └──────────────────────────────────────────┘ │
│              Stockage Local Chiffré           │
└──────────────────────────────────────────────┘
```

## Stack Technique

### Traitement Audio
- **Whisper** — Modèle de transcription OpenAI, optimisé pour le edge
- **Preprocessing** — Réduction de bruit et séparation des locuteurs

### Intelligence Artificielle
- **LLM Local** — Mistral / Phi-3 optimisé en quantization (GGUF)
- **Embeddings** — Modèle local pour la recherche sémantique vectorielle
- **Mindmap Engine** — Génération de cartes mentales structurées

### Sécurité
- **Chiffrement E2EE** — AES-256 pour le stockage local
- **Zero-Knowledge Architecture** — Le serveur ne voit jamais les données en clair
- **RGPD Compliant** — Traitement 100% local

### Connectivité
- **Bluetooth LE** — Sync avec le Notitia Node
- **API REST** — Intégrations Notion, Slack, Calendriers
- **WebSocket** — Sync temps réel entre appareils

## Principes de Design

1. **Privacy by Design** — La confidentialité n'est pas une feature, c'est le fondement
2. **Offline First** — Tout fonctionne sans connexion internet
3. **Edge Computing** — Le traitement IA se fait sur l'appareil
4. **Modular** — Chaque composant est indépendant et remplaçable
