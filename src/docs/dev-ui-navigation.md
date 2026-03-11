# UI, Navigation & Thème

## Pages et écrans

### Flux de navigation au démarrage

```
main() → NotitiaApp
    └── SplashScreen (2s)
          ├── Authentifié + Onboardé → /main
          ├── Authentifié + Non onboardé → /onboarding
          ├── Mode invité → /main
          └── Non authentifié → /auth
```

### Détail des pages

| Page | Description |
|---|---|
| `SplashScreen` | Chargement initial, logo, vérification auth |
| `OnboardingPage` | 5 étapes avec Meduza guide |
| `AuthChoicePage` | 3 boutons : connexion / inscription / invité |
| `LoginPage` | Email+password, OAuth Google/GitHub, OTP |
| `RegisterPage` | Inscription email/password |
| `EmailOtpPage` | Saisie code OTP (Pinput 6 chiffres) |
| `CapturePage` | STT (Deepgram/natif), correction Mistral |
| `HistoryPage` | Liste transcriptions, suppression |
| `EditPage` | Éditeur titre + contenu |
| `SearchPage` | Barre recherche, debounce 300ms, résultats scorés |
| `AssistantPage` | Chat RAG, indexation auto, sources |
| `MindMapPage` | 3 onglets (générer/visu/sauvegardés) |
| `MeetingPage` | Hôte (QR + WebSocket) + Participant (scan) |
| `TapToSharePage` | Émetteur/récepteur NFC |
| `ProfilePage` | Profil, langue, thème, déconnexion |
| `SubscriptionPage` | 5 plans tarifaires |

---

## Widgets réutilisables

### MeduzaWidget

Méduse animée avec 6 états (`MeduzaState`) — chaque état déclenche des animations spécifiques (float, glow, spin, shake, bounce, pulse).

### MeduzaFloatingOverlay

Superposition flottante contenant MeduzaWidget + bulle de texte. Auto-dismissed après 4 secondes.

### MindMapWidget

Rendu interactif avec deux modes de vue (radial et arbre), gestes tactiles (pinch-to-zoom, drag), et rendu Canvas via `CustomPainter`.

### Autres widgets

| Widget | Description |
|---|---|
| `NotitiaPricingCards` | 5 cartes de pricing avec animation glow |
| `PageHeader` | En-tête commun des pages |
| `ProfileButton` | Bouton avatar profil |
| `PulsingDot` | Point rouge animé (enregistrement actif) |
| `MeduzaSpeechBubble` | Bulle de texte contextuelle |

---

## Navigation et routing

### Routes nommées

| Route | Page |
|---|---|
| `/main` | MainNavigation (5 onglets) |
| `/auth` | AuthChoicePage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/email-otp` | EmailOtpPage |
| `/profile` | ProfilePage |
| `/onboarding` | OnboardingPage |
| `/subscription` | SubscriptionPage |

### MainNavigation — 5 onglets

| Index | Onglet |
|---|---|
| 0 | HistoryPage |
| 1 | MeetingPage |
| 2 | CapturePage (bouton flottant central) |
| 3 | MindMapPage |
| 4 | AssistantPage |

Utilise `IndexedStack` pour préserver l'état. Communication inter-onglets via `ValueNotifier`.

---

## Thème et Design System

### Palette cyberpunk

| Token | Couleur | Usage |
|---|---|---|
| `deepBlue` | `#00003F` | Fond principal |
| `darkBlue` | `#000830` | Fond navbar / cartes |
| `neonPink` | `#FF0178` | Accent principal, CTA |
| `neonCyan` | `#00E5FF` | Accent secondaire |
| `white` | `#FFFFFF` | Texte principal |
| `grey` | `#8888AA` | Texte inactif |
| `redRecording` | `#FF3366` | Enregistrement, erreur |

### Typographie

- **Orbitron** (Google Fonts) — police tech/futuriste pour les titres
- **Poppins** (Google Fonts) — corps de texte lisible

### 5 thèmes utilisateur

Cyberpunk (défaut), Ocean, Forest, Sunset, Violet — configurables dans le profil.
