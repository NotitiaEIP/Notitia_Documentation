# Capture Vocale

C'est le cœur de Notitia. La page de capture permet d'enregistrer ta voix et de la convertir en texte.

## Démarrer une capture

1. Appuie sur le **bouton microphone** central
2. Parle naturellement — la transcription apparaît en temps réel
3. Appuie à nouveau pour **arrêter**
4. La note est **sauvegardée automatiquement**

## Moteur de transcription

Notitia propose deux moteurs :

| Moteur | Description | Qualité |
|---|---|---|
| **Deepgram Nova-3** (défaut) | Cloud, WebSocket temps réel, ultra précis | ⭐⭐⭐⭐⭐ |
| **Natif** (Google/Apple) | Embarqué sur l'appareil, fonctionne hors ligne | ⭐⭐⭐ |

> Deepgram est activé par défaut et nécessite une connexion internet.

## Correction automatique par IA

Après la transcription, Notitia propose une **correction IA via Mistral** :

- Corrige les fautes d'orthographe et de grammaire
- Ajoute la ponctuation manquante
- Corrige les homophones courants (a/à, et/est, ou/où…)
- Supprime les hésitations (euh, hum)
- Deux niveaux : **Correction** (légère) ou **Amélioration** (restructuration complète)

## Mode Écoute Active

Le **mode écoute active** maintient la capture active même quand le téléphone est verrouillé ou que l'application passe en arrière-plan. Idéal pour les réunions longues.

Un **foreground service Android** avec notification persistante garantit la continuité.

## Langues supportées

La capture vocale supporte le **français** et l'**anglais**. La langue est détectable automatiquement ou configurable manuellement dans les paramètres.
