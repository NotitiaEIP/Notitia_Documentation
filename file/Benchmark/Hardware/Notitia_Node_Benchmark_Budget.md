<div align="center">

# 🧠 NOTITIA NODE
### Benchmark Composants — Version Budget 💰

<img src="https://img.shields.io/badge/Version-Prototype%20Budget-orange?style=for-the-badge" alt="Version"/>
<img src="https://img.shields.io/badge/Budget-~80€-success?style=for-the-badge" alt="Budget"/>
<img src="https://img.shields.io/badge/Qualité-Correcte-yellow?style=for-the-badge" alt="Qualité"/>

---

*"Le prototype qui fait le job sans casser la tirelire"*

</div>

---

## ⚖️ Comparaison des Versions

| Critère | 🏆 Version Premium | 💰 Version Budget |
|:---|:---:|:---:|
| **Budget Total** | ~150€ | **~80€** |
| **Qualité Composants** | Excellente | Correcte |
| **Fiabilité** | Haute | Moyenne |
| **Risque de debug** | Faible | Moyen |
| **Délai livraison** | 2-3 jours (Amazon) | 2-4 semaines (AliExpress) |
| **Pour qui ?** | Deadline serrée, budget OK | Budget limité, temps disponible |

> ⚠️ **Attention :** La version budget implique des compromis sur la qualité et des délais de livraison plus longs (AliExpress). Prévoir du temps pour le debug.

---

## 📋 Table des Matières

- [🛒 Liste des Composants Budget](#-liste-des-composants-budget)
- [🔬 Comparatif Détaillé](#-comparatif-détaillé)
- [⚠️ Risques et Compromis](#️-risques-et-compromis)
- [📦 Liste Finale](#-liste-finale)

---

## 🛒 Liste des Composants Budget

### 📦 Kit Prototype Économique

> **Budget estimé : ~80€** (hors frais de port AliExpress)
> 
> ⏰ **Délai :** 2-4 semaines de livraison depuis la Chine

---

### 🎯 Composants Principaux

| # | Composant | Modèle Budget | Qté | Prix | Source |
|:---:|:---|:---|:---:|:---:|:---:|
| 1 | 🖥️ **Microcontrôleur** | **ESP32-S3-DevKitC-1 N8R2** (8MB Flash, 2MB PSRAM) | 1 | ~8€ | AliExpress |
| 2 | 🎙️ **Microphone MEMS** | **INMP441 I2S** (clone) | 2 | ~3€/pièce | AliExpress |
| 3 | 💡 **LED Ring** | **WS2812B Ring 12 LEDs** (45mm) | 1 | ~2€ | AliExpress |
| 4 | 💾 **Module SD** | **Module microSD SPI** (basique) | 1 | ~1€ | AliExpress |
| 5 | 💾 **Carte SD** | **Carte microSD 16 Go** (générique) | 1 | ~4€ | AliExpress |

---

### 🔋 Alimentation

| # | Composant | Modèle Budget | Qté | Prix | Source |
|:---:|:---|:---|:---:|:---:|:---:|
| 6 | 🔋 **Batterie LiPo** | **LiPo 3.7V 1000mAh** (générique, sans marque) | 1 | ~3€ | AliExpress |
| 7 | 🔌 **Module Charge** | **TP4056 Micro-USB** (basique) | 1 | ~0.50€ | AliExpress |

---

### 🔘 Interface Utilisateur

| # | Composant | Modèle Budget | Qté | Prix | Source |
|:---:|:---|:---|:---:|:---:|:---:|
| 8 | 🔘 **Bouton** | **Bouton poussoir 6mm** (tactile basique) | 2 | ~1€ | AliExpress |

---

### 🔧 Kit Prototypage

| # | Composant | Modèle Budget | Qté | Prix | Source |
|:---:|:---|:---|:---:|:---:|:---:|
| 9 | 🧪 **Breadboard** | **Breadboard 400 points** | 1 | ~1€ | AliExpress |
| 10 | 🔌 **Câbles Dupont** | **Kit 40 pcs M/M** | 1 | ~1€ | AliExpress |
| 11 | 🔗 **Câble USB** | **Câble Micro-USB 1m** | 1 | ~1€ | AliExpress |
| 12 | 📦 **Résistances** | **Kit résistances basique** | 1 | ~2€ | AliExpress |

---

## 🔬 Comparatif Détaillé

### 🖥️ Microcontrôleur

| Critère | 🏆 ESP32-S3 N16R8 (Premium) | 💰 ESP32-S3 N8R2 (Budget) |
|:---|:---:|:---:|
| **Prix** | ~22€ | **~8€** |
| **Flash** | 16 MB | 8 MB |
| **PSRAM** | 8 MB | 2 MB |
| **Buffer Audio** | 🟢 Large (longues sessions) | 🟡 Limité |
| **WiFi/BLE** | ✅ Identique | ✅ Identique |
| **Fiabilité** | 🟢 Espressif officiel | 🟡 Clone variable |
| **Économie** | - | **-14€** |

> 💡 **Verdict :** Le N8R2 suffit pour un proto basique, mais attention au buffer audio limité (2MB PSRAM). Peut nécessiter une gestion mémoire plus fine.

---

### 🎙️ Microphones

| Critère | 🏆 INMP441 Amazon (Premium) | 💰 INMP441 AliExpress (Budget) |
|:---|:---:|:---:|
| **Prix (x2)** | ~18€ | **~6€** |
| **Qualité PCB** | 🟢 Bonne | 🟡 Variable |
| **Soudures** | 🟢 Propres | 🟡 Parfois douteuses |
| **SNR réel** | 61 dB | ~55-60 dB (variable) |
| **Taux de défaut** | <5% | ~15-20% |
| **Économie** | - | **-12€** |

> ⚠️ **Risque :** Commander 3-4 unités au lieu de 2 pour compenser le taux de défaut. Prévoir du debug audio.

---

### 💡 LED Ring

| Critère | 🏆 WS2812B 16 LEDs 68mm | 💰 WS2812B 12 LEDs 45mm |
|:---|:---:|:---:|
| **Prix** | ~12€ | **~2€** |
| **Nombre LEDs** | 16 | 12 |
| **Diamètre** | 68mm (très visible) | 45mm (plus petit) |
| **Animations** | 🟢 Fluides | 🟡 OK |
| **Visibilité** | 🟢 Excellente | 🟡 Bonne |
| **Économie** | - | **-10€** |

> 💡 **Verdict :** 12 LEDs suffisent pour les états basiques. Moins impressionnant visuellement mais fonctionnel.

---

### 🔋 Batterie

| Critère | 🏆 EEMB 2000mAh | 💰 Générique 1000mAh |
|:---|:---:|:---:|
| **Prix** | ~15€ | **~3€** |
| **Capacité** | 2000 mAh | 1000 mAh |
| **Autonomie** | ~15-20h | ~6-8h |
| **Protection PCM** | ✅ Intégrée | ⚠️ Souvent absente |
| **Connecteur JST** | ✅ Inclus | ❌ À souder |
| **Sécurité** | 🟢 Haute | 🔴 Risque |
| **Économie** | - | **-12€** |

> ⚠️ **ATTENTION SÉCURITÉ :** Les batteries LiPo sans marque peuvent gonfler/exploser. **Toujours surveiller la charge** et ne jamais laisser sans surveillance. Ajouter un fusible si possible.

---

### 🔌 Module de Charge

| Critère | 🏆 TP4056 Type-C (DW01) | 💰 TP4056 Micro-USB |
|:---|:---:|:---:|
| **Prix** | ~10€ (pack 5) | **~0.50€** |
| **Connecteur** | USB-C | Micro-USB |
| **Protection** | ✅ DW01 complète | ⚠️ Basique |
| **Économie** | - | **-9.50€** |

---

## ⚠️ Risques et Compromis

### 🔴 Risques Majeurs (Version Budget)

| Risque | Impact | Mitigation |
|:---|:---|:---|
| 🔋 **Batterie sans protection** | Incendie potentiel | Surveiller la charge, ajouter fusible |
| 🎙️ **Micros défectueux** | Pas d'audio / bruit | Commander 4 au lieu de 2 |
| 📦 **Délai AliExpress** | 2-4 semaines | Commander tôt (deadline 13 mars !) |
| 🔧 **Debug supplémentaire** | +temps de dev | Prévoir 1 semaine de marge |
| 💾 **Carte SD corrompue** | Perte de données | Tester avant usage intensif |

### 🟡 Compromis Acceptables

| Compromis | Impact Réel |
|:---|:---|
| PSRAM 2MB vs 8MB | OK si gestion mémoire optimisée |
| 12 LEDs vs 16 LEDs | Visuellement moins impressionnant mais fonctionnel |
| Breadboard 400 pts | Plus serré mais suffisant |
| Bouton 6mm vs 12mm | Moins ergonomique, feeling cheap |

---

## 📦 Liste Finale — Version Budget

### 🧠 Composants Principaux

| # | Composant | Modèle | Prix |
|:---:|:---|:---|:---:|
| 1 | 🖥️ **Microcontrôleur** | ESP32-S3-DevKitC-1 N8R2 (8MB Flash, 2MB PSRAM) | **~8€** |
| 2 | 🎙️ **Microphones MEMS** | INMP441 I2S clone (x3 pour marge) | **~9€** |
| 3 | 💡 **Anneau LED** | WS2812B Ring 12 LEDs (45mm) | **~2€** |
| 4 | 💾 **Module microSD** | Module SPI basique | **~1€** |
| 5 | 💾 **Carte microSD** | 16 Go générique | **~4€** |
| 6 | 🔋 **Batterie LiPo** | 3.7V 1000mAh générique | **~3€** |
| 7 | 🔌 **Module de charge** | TP4056 Micro-USB | **~0.50€** |
| 8 | 🔘 **Boutons** | Poussoir 6mm (x5) | **~1€** |
| | | **Sous-total** | **~28.50€** |

---

### 🔧 Matériel de Prototypage

| # | Composant | Modèle | Prix |
|:---:|:---|:---|:---:|
| 9 | 🧪 **Breadboard** | 400 points | **~1€** |
| 10 | 🔌 **Câbles Dupont** | Kit 40 pcs M/M | **~1€** |
| 11 | 🔗 **Câble USB** | Micro-USB 1m | **~1€** |
| 12 | 📦 **Résistances** | Kit basique | **~2€** |
| | | **Sous-total** | **~5€** |

---

### 💰 Récapitulatif Final Budget

| Catégorie | Montant |
|:---|:---:|
| 🧠 Composants Principaux | **~28.50€** |
| 🔧 Matériel Prototypage | **~5€** |
| 📦 Frais de port AliExpress | ~10-15€ |
| **💰 TOTAL BUDGET** | **~45-50€** |

---

## ⚖️ Comparaison Finale

<div align="center">

| | 🏆 **Premium** | 💰 **Budget** | Économie |
|:---|:---:|:---:|:---:|
| **Coût Total** | ~150€ | ~50€ | **-100€** |
| **Délai Livraison** | 2-3 jours | 2-4 semaines | ❌ |
| **Fiabilité** | Haute | Moyenne | ❌ |
| **Temps Debug** | Faible | Élevé | ❌ |
| **Qualité Audio** | Excellente | Correcte | ❌ |
| **Sécurité Batterie** | ✅ | ⚠️ | ❌ |
| **Effet "Wow"** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ |

</div>

---

<div align="center">

*Document mis à jour le 12 Février 2026*

**Équipe Hardware Notitia** 🧠💰

*"Économiser intelligemment, c'est savoir quand investir."*

</div>
