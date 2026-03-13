# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Formulaire de pitch (Formspree)

La page `/pitch` envoie le formulaire en `POST` JSON vers l'URL Formspree définie dans:

- `VITE_FORMSPREE_ENDPOINT`

Configuration rapide:

1. Créer un formulaire sur Formspree
2. Copier `.env.example` vers `.env`
3. Remplacer l'URL par votre endpoint Formspree, par exemple `https://formspree.io/f/xzzabcde`
4. Redémarrer le serveur Vite (`npm run dev`)

Consulter les soumissions:

1. Ouvrir le dashboard Formspree
2. Sélectionner votre formulaire
3. Voir les entrées reçues, les emails, et les champs transmis
