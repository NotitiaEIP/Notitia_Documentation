# Installation

## Prérequis

> ⚠️ Notitia est actuellement en **développement actif**. Les instructions ci-dessous sont destinées aux contributeurs et testeurs.

### Environnement requis

| Outil | Version minimum |
|-------|----------------|
| Node.js | 18.x |
| Python | 3.10+ |
| Git | 2.x |
| Android Studio / Xcode | Dernière version |

## Installation rapide

### 1. Cloner le dépôt

```bash
git clone https://github.com/notitia-eip/notitia.git
cd notitia
```

### 2. Installer les dépendances

```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend mobile
cd ../mobile
npm install
```

### 3. Configuration

Créez un fichier `.env` à la racine :

```env
# Configuration locale
WHISPER_MODEL=base
LLM_MODEL=phi-3-mini
ENCRYPTION_KEY=your-local-key
```

### 4. Lancer en développement

```bash
# Démarrer le serveur de dev
npm run dev
```

## Structure du projet

```
notitia/
├── mobile/          # Application React Native
├── backend/         # Services IA locaux
├── hardware/        # Firmware ESP32-S3
├── shared/          # Types et utilitaires partagés
├── docs/            # Documentation (vous êtes ici)
└── scripts/         # Scripts d'automatisation
```

## Prochaines étapes

- Consulter l'[architecture](/docs/architecture) pour comprendre la stack
- Lire le guide [Contribuer](/docs/contributing) pour les conventions
