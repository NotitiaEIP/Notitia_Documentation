# Sécurité & Vie Privée

## Philosophie : Ethical by Design

Notitia adopte une approche fondamentalement éthique de l'enregistrement audio. La vie privée n'est pas une option — c'est le pilier de notre architecture.

## Architecture Zero-Knowledge

```
┌─────────────────────────────────────────┐
│            Appareil Utilisateur         │
│                                         │
│  Audio → Whisper → LLM → Stockage      │
│                           Chiffré       │
│                           (AES-256)     │
│                                         │
│  Clé de chiffrement = dérivée du       │
│  mot de passe utilisateur              │
└─────────────────────────────────────────┘
         │
         │  Données chiffrées uniquement
         │  (si sync activée)
         ▼
┌─────────────────────────────────────────┐
│           Serveur (optionnel)           │
│                                         │
│  ❌ Pas d'accès aux données en clair   │
│  ❌ Pas de clé de déchiffrement        │
│  ✅ Stockage de blobs chiffrés         │
│  ✅ Sync entre appareils               │
└─────────────────────────────────────────┘
```

## Mécanismes de Consentement

### 🔴 LED de Transparence (Hardware)
Le Notitia Node intègre un **anneau LED rouge** visible qui s'active automatiquement pendant l'enregistrement.

### 📱 QR Code de Consentement
Pour les réunions collaboratives, un **système de QR Code** permet aux participants de donner leur consentement numérique.

### 📞 Annonce Vocale
Pour les appels téléphoniques, une **annonce automatique** informe l'interlocuteur de l'enregistrement.

## Conformité RGPD

| Principe RGPD | Implémentation Notitia |
|----------------|----------------------|
| Minimisation | Seules les données nécessaires sont traitées |
| Limitation | Traitement 100% local |
| Transparence | LED + QR Code + Annonces |
| Droit à l'oubli | Suppression complète en un clic |
| Portabilité | Export standard des données |
| Sécurité | E2EE + Zero-Knowledge |

## Chiffrement

- **Algorithme** : AES-256-GCM
- **Dérivation de clé** : Argon2id
- **Transport** : TLS 1.3 (si sync cloud)
- **Stockage** : Chiffrement au repos sur l'appareil

## Audit & Transparence

Le code source des composants de sécurité sera publié en **open-source** pour permettre des audits indépendants.
