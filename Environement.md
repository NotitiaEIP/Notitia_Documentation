# 📘 Documentation de l’Environnement de Travail  
# Projet : NOTITIA

---

## 1. Présentation du projet

**Nom du projet :** Notitia  
**Contexte :** Projet scolaire réalisé sur une durée de 3 ans par une équipe de 6 étudiants.  
**Niveau technique de l’équipe :** Intermédiaire à avancé  

### 🎯 Objectif principal

Développer une application mobile capable de :

- 🎙 Enregistrer une conversation
- 📝 Transcrire automatiquement la conversation
- 🤖 Utiliser l’intelligence artificielle pour :
  - Générer des résumés
  - Répondre à des questions
  - Créer des documents PDF structurés

### 📌 Problématique

Environ 70 % des informations d’une journée sont oubliées.  
Notitia vise à conserver, structurer et exploiter intelligemment les conversations.

### 👥 Public cible

Grand public (étudiants, professionnels, entreprises, particuliers).

---

## 2. Architecture du Système

### 🏗 Architecture choisie : Client – Serveur

Application Mobile  
⬇  
API Backend  
⬇  
Base de Données  
⬇  
Services d’Intelligence Artificielle  

### ✔ Justification du choix

- Séparation claire des responsabilités
- Scalabilité possible
- Architecture professionnelle
- Maintenabilité sur 3 ans
- Compatible avec un système d’abonnement

---

## 3. Technologies Utilisées

---

### 📱 Frontend Mobile

- **Framework :** Flutter  
- **Langage :** Dart  
- **Plateformes cibles :** iOS & Android  
- **Architecture interne :** Clean Architecture simplifiée  
- **State management :** Riverpod (ou Provider)

#### Pourquoi Flutter ?

- Développement cross-platform
- Code unique pour iOS et Android
- Performances proches du natif
- Communauté active

---

### ⚙ Backend

- **Langage :** Python  
- **Framework :** FastAPI  
- **Type d’API :** RESTful  

#### Avantages

- Développement rapide
- Documentation automatique (Swagger)
- Excellente compatibilité avec l’IA
- Haute performance

---

### 🗄 Base de Données

- **SGBD :** PostgreSQL  
- **Type :** Relationnel (SQL)  
- **Hébergement :** Serveur distant sous Linux (Ubuntu)

#### Données stockées

- Comptes utilisateurs
- Abonnements

---

### 🤖 Intelligence Artificielle

- **Fournisseur :** API OpenAI  
- **Transcription :** Modèle Whisper  
- **Résumé & Questions/Réponses :** Modèles GPT  

#### Fonctionnalités IA

- Résumé automatique
- Reformulation intelligente
- Réponse aux questions basées sur la transcription
- Génération de contenu structuré pour PDF

---

### 📄 Génération PDF

- Génération côté backend
- Bibliothèque Python (ex : ReportLab)
- Création de documents structurés téléchargeables

---

## 4. Environnement Matériel

- **Système d’exploitation :** Ubuntu  
- **Serveur :** Linux distant  
- **Machine de développement :** Environnement local Ubuntu  
---

## 5. Environnement Logiciel

- **IDE :** Visual Studio Code  
- **Versioning :** Git  
- **Plateforme de gestion de code :** GitHub  
- **Méthodologie :** Agile  
- **Conteneurisation recommandée :** Docker  
- **Gestion des variables sensibles :** Fichier `.env`

---

## 6. Sécurité

- Authentification obligatoire
- Système d’abonnement
- JWT (JSON Web Token)
- Hashage des mots de passe (bcrypt)
- HTTPS
- Gestion des rôles utilisateurs
- Protection des variables d’environnement

---

## 7. Fonctionnement Général

1. L’utilisateur enregistre une conversation
2. L’audio est immédiatement transcrit
3. La transcription est enregistrée en base de données
4. L’utilisateur peut :
   - Générer un résumé
   - Poser des questions
   - Exporter la conversation en PDF

---

## 8. Organisation de l’Équipe

Équipe de 6 personnes.

### Répartition recommandée :

- 2 développeurs Frontend
- 2 développeurs Backend
- 2 Developpeurs hardware / sécurité

---

## 9. Gestion de Projet

- Méthode Agile
- Sprints de 3 semaines
- Réunions hebdomadaires
- Utilisation de GitHub Projects (Kanban)

---

## 10. Scalabilité et Évolutions Futures

Projet prévu sur 3 ans.

### Évolutions possibles :

- Version entreprise
- Stockage cloud
- Partage collaboratif
- Analyse avancée des conversations
- Personnalisation des modèles IA
- Extension web

--- 