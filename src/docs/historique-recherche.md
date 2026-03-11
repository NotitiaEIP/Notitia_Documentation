# Historique & Recherche

## Historique des notes

L'onglet **Historique** liste toutes tes transcriptions, les plus récentes en premier.

### Fonctionnalités

- **Scroll infini** — toutes tes notes dans une liste claire
- **Prévisualisation** — les 120 premiers caractères affichés pour chaque note
- **Date et heure** de création visible
- **Modifier** — ouvre l'éditeur de texte complet
- **Supprimer** — avec confirmation
- **Tap-to-Share** — partage la note par NFC depuis l'historique
- **Filtrer sur les réunions** — n'afficher que les notes de réunions

### Éditeur de note

En appuyant sur une note, tu accèdes à l'**éditeur complet** :

- Modifier le **titre** et le **contenu** librement
- Voir les dates de création et de dernière modification
- Sauvegarder les changements

---

## Recherche

L'onglet **Recherche** permet de retrouver n'importe quelle note par mots-clés.

### Comment ça fonctionne

- Tape un ou plusieurs mots dans la barre de recherche
- Les résultats apparaissent avec un **score de pertinence**
- Les **mots-clés trouvés** sont mis en évidence
- Un **extrait contextuel** montre où le mot apparaît dans la note
- Clique sur un résultat pour ouvrir l'éditeur

### Algorithme de score

| Critère | Points |
|---|---|
| Phrase exacte dans le contenu | +10 |
| Phrase exacte dans le titre | +8 |
| Tous les termes présents | +5 (bonus) |
| Chaque terme dans le contenu | +2 / occurrence |
| Chaque terme dans le titre | +3 |

> La recherche sémantique par embeddings (requêtes en langage naturel) est prévue.
