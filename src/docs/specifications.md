# Spécifications Techniques

## Hardware — Notitia Node

### Processeur
- **MCU** : ESP32-S3-WROOM-1 (N16R8)
- **CPU** : Dual-core Xtensa LX7 @ 240 MHz
- **RAM** : 8 MB PSRAM
- **Flash** : 16 MB

### Audio
- **Microphones** : 2x MEMS I2S (ICS-43434 ou équivalent)
- **Sampling Rate** : 16 kHz (optimisé pour la parole)
- **Bit Depth** : 16-bit
- **SNR** : > 65 dB

### Connectivité
- **Bluetooth** : 5.0 LE
- **Protocole** : Custom GATT Profile
- **Portée** : ~10m en intérieur

### Énergie
- **Batterie** : LiPo 500mAh
- **Autonomie** : ~8h enregistrement, ~48h veille
- **Charge** : USB-C, ~1.5h pour charge complète

### Physique
- **Dimensions** : 45 x 45 x 12 mm
- **Poids** : ~25g
- **Protection** : IP54

## Software

### Modèles IA

| Modèle | Taille | Usage |
|--------|--------|-------|
| Whisper Tiny | ~75 MB | Transcription légère |
| Whisper Base | ~150 MB | Transcription standard |
| Whisper Small | ~500 MB | Transcription haute qualité |
| Phi-3 Mini (Q4) | ~2 GB | Résumé et extraction |
| Mistral 7B (Q4) | ~4 GB | Chat avancé |
| all-MiniLM-L6 | ~25 MB | Embeddings sémantiques |

### Formats supportés

- Audio : WAV, FLAC, OGG
- Export : Markdown, JSON, PDF
- Sync : Protocol Buffers over BLE

### Compatibilité

| Plateforme | Status |
|------------|--------|
| iOS 16+ | 🟡 En développement |
| Android 12+ | 🟡 En développement |
| macOS 13+ | 🔵 Planifié |
| Windows 11 | 🔵 Planifié |
| Linux | 🔵 Planifié |
| Apple Watch | 🔵 Planifié |
