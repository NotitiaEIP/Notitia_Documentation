# Notitia Node

## Présentation

Le **Notitia Node** est un module hardware optionnel conçu pour les professionnels et particuliers exigeants qui souhaitent une capture audio de haute fidélité.

## Spécifications Matérielles

| Composant | Détail |
|-----------|--------|
| **Processeur** | ESP32-S3 (Dual-core Xtensa LX7) |
| **Microphones** | 2x MEMS I2S haute fidélité |
| **Connectivité** | Bluetooth 5.0 LE |
| **Indicateur** | Anneau LED RGB (transparence) |
| **Autonomie** | ~8h d'enregistrement continu |
| **Stockage** | Flash interne pour mode standalone |

## Modes de Fonctionnement

### 🔗 Mode Connecté
Le Node se synchronise en **temps réel** avec l'application mobile via Bluetooth LE. L'audio est streamé et traité instantanément.

### 📴 Mode Standalone
En l'absence de connexion Bluetooth, le Node **stocke localement** les enregistrements dans sa mémoire flash. La synchronisation s'effectue automatiquement à la prochaine connexion.

## LED de Transparence

L'anneau LED est un élément central de l'approche éthique :

| Couleur | Signification |
|---------|--------------|
| 🔴 **Rouge** | Enregistrement en cours |
| 🔵 **Bleu** | Connecté à l'application |
| 🟢 **Vert** | Synchronisation terminée |
| ⚪ **Blanc** | Mode veille / prêt |
| 🟡 **Jaune** | Batterie faible |

## Design

Le Notitia Node est conçu pour être :
- **Discret** mais **visible** (éthique oblige)
- **Portable** — format compact, clip intégré
- **Robuste** — boîtier résistant pour usage quotidien

## Prix

Le Notitia Node sera commercialisé à environ **149€**, incluant souvent une période d'abonnement Premium gratuite.
