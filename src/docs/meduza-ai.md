# Meduza — Assistant IA

## Présentation

**Meduza** est l'assistant IA au cœur de Notitia. C'est une entité personnalisée qui apprend de vos interactions pour devenir votre mémoire externalisée.

## Comment ça marche ?

```
Audio → Whisper (Transcription) → LLM (Résumé + Extraction)
                                         ↓
                                   Embeddings vectoriels
                                         ↓
                              Base de données locale (chiffrée)
                                         ↓
                        Meduza (Recherche sémantique + Réponses)
```

## Fonctionnalités

### 💬 Chat Conversationnel
Posez des questions naturelles à Meduza :

- *"Qu'a dit Marc lors de la réunion de lundi ?"*
- *"Quels étaient les 3 points clés du cours de ce matin ?"*
- *"Résume-moi ma semaine"*

### 🔍 Recherche Sémantique
Contrairement à une recherche par mots-clés, Meduza comprend le **sens** de votre question et retrouve les passages pertinents même s'ils n'utilisent pas les mêmes termes.

### 🗺️ Génération de Mindmaps
Meduza peut transformer n'importe quelle session en carte mentale interactive, facilitant :
- La **révision** rapide
- La **compréhension structurelle**
- Le **partage** avec les collaborateurs

### 📊 Analytics Personnels
- Statistiques sur vos interactions
- Tendances et sujets récurrents
- Suggestions proactives

## Modèles IA utilisés

| Composant | Modèle | Rôle |
|-----------|--------|------|
| Transcription | Whisper (base/small) | Audio → Texte |
| Résumé | Mistral / Phi-3 | Extraction d'informations |
| Embeddings | all-MiniLM | Vectorisation sémantique |
| Chat | Mistral / Phi-3 | Réponses conversationnelles |

> Tous les modèles sont optimisés en **quantization GGUF** pour fonctionner sur smartphone sans connexion cloud.

## Confidentialité

Meduza fonctionne **entièrement en local**. Aucune donnée ne quitte votre appareil. Le modèle IA tourne directement sur le processeur de votre smartphone, garantissant une confidentialité absolue.
