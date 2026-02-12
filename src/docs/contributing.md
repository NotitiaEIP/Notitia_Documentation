# Contribuer

## Comment contribuer à Notitia ?

Nous accueillons les contributions avec enthousiasme ! Voici comment participer au projet.

## Prérequis

1. Lire la documentation d'[architecture](/docs/architecture)
2. Configurer votre [environnement de développement](/docs/installation)
3. Rejoindre notre serveur Discord

## Workflow de Contribution

### 1. Créer un ticket
Avant de commencer, **créez ou assignez-vous un ticket** sur Linear pour décrire votre contribution.

### 2. Brancher
```bash
# Créer une branche depuis main
git checkout -b feature/nom-de-la-feature
```

### 3. Développer
- Suivez les conventions de code du projet
- Écrivez des tests pour les nouvelles fonctionnalités
- Documentez vos changements

### 4. Committer
```bash
# Convention de commit
git commit -m "feat: description courte"
git commit -m "fix: correction du bug X"
git commit -m "docs: mise à jour de la doc"
```

### 5. Pull Request
- Décrivez clairement vos changements
- Liez le ticket Linear
- Attendez la code review

## Conventions

### Commits
Nous suivons la convention **Conventional Commits** :
- `feat:` — Nouvelle fonctionnalité
- `fix:` — Correction de bug
- `docs:` — Documentation
- `style:` — Formatage
- `refactor:` — Refactorisation
- `test:` — Ajout de tests
- `chore:` — Maintenance

### Code Style
- **JavaScript/TypeScript** — ESLint + Prettier
- **Python** — Black + Flake8
- **C/C++** (firmware) — clang-format

## Questions ?

N'hésitez pas à poser vos questions sur le serveur Discord ou à ouvrir une issue GitHub.
