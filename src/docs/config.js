/**
 * Documentation sidebar & content navigation config.
 * 
 * To add a new doc page:
 * 1. Create a .md file in /src/docs/
 * 2. Add an entry in the `sidebar` array below.
 * 3. The slug must match the filename (without .md)
 */

export const docsConfig = {
  defaultDoc: 'introduction',

  sidebar: [
    {
      title: 'Pour Commencer',
      items: [
        { title: 'Introduction', slug: 'introduction' },
        { title: 'Architecture', slug: 'architecture' },
        { title: 'Installation', slug: 'installation' },
      ],
    },
    {
      title: 'Guide Utilisateur',
      items: [
        { title: 'Prise en main', slug: 'guide-utilisateur' },
        { title: 'Capture Vocale', slug: 'capture-vocale' },
        { title: 'Historique & Recherche', slug: 'historique-recherche' },
        { title: 'Assistant IA & Mind Map', slug: 'assistant-mindmap' },
        { title: 'Réunions & NFC', slug: 'reunions-nfc' },
        { title: 'Profil & FAQ', slug: 'profil-faq' },
      ],
    },
    {
      title: 'Documentation Technique',
      items: [
        { title: 'Architecture', slug: 'dev-architecture' },
        { title: 'Modèles de données', slug: 'dev-modeles' },
        { title: 'Services', slug: 'dev-services' },
        { title: 'UI & Navigation', slug: 'dev-ui-navigation' },
        { title: 'Installation Dev', slug: 'dev-installation' },
      ],
    },
    {
      title: 'Software',
      items: [
        { title: 'Application Mobile', slug: 'mobile-app' },
        { title: 'Meduza — Assistant IA', slug: 'meduza-ai' },
        { title: 'Sécurité & Vie Privée', slug: 'security' },
      ],
    },
    {
      title: 'Hardware',
      items: [
        { title: 'Notitia Node', slug: 'notitia-node' },
        { title: 'Spécifications', slug: 'specifications' },
      ],
    },
    {
      title: 'Projet',
      items: [
        { title: 'Roadmap', slug: 'roadmap' },
        { title: "L'Équipe", slug: 'team' },
        { title: 'Contribuer', slug: 'contributing' },
      ],
    },
  ],
}
