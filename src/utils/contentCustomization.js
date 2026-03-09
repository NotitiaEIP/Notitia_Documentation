const HOME_CONTENT_KEY = 'notitia-home-content'
const CUSTOM_DOCS_KEY = 'notitia-custom-docs'
const CUSTOM_FILES_KEY = 'notitia-custom-files'

export const DEFAULT_HOME_CONTENT = {
  heroSupertitle: 'Mémoire Augmentée',
  heroTitleLine1: 'LIBÉREZ VOTRE',
  heroTitleLine2: 'ESPRIT',
  heroDescription:
    "Notitia est votre assistant de mémoire augmentée. Il enregistre, indexe et organise vos échanges grâce à l'IA locale — pour ne plus jamais rien oublier.",
  heroPrimaryButton: 'Explorer la documentation',
  heroSecondaryButton: 'Personnaliser le design',
}

function safeParse(raw, fallback) {
  try {
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function loadHomeContent() {
  if (typeof window === 'undefined') return DEFAULT_HOME_CONTENT
  const stored = safeParse(localStorage.getItem(HOME_CONTENT_KEY), {})
  return { ...DEFAULT_HOME_CONTENT, ...stored }
}

export function saveHomeContent(content) {
  if (typeof window === 'undefined') return
  localStorage.setItem(
    HOME_CONTENT_KEY,
    JSON.stringify({ ...DEFAULT_HOME_CONTENT, ...content }),
  )
}

export function loadCustomDocs() {
  if (typeof window === 'undefined') return []
  return safeParse(localStorage.getItem(CUSTOM_DOCS_KEY), [])
}

export function saveCustomDocs(docs) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CUSTOM_DOCS_KEY, JSON.stringify(docs))
}

export function loadCustomFiles() {
  if (typeof window === 'undefined') return []
  return safeParse(localStorage.getItem(CUSTOM_FILES_KEY), [])
}

export function saveCustomFiles(files) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CUSTOM_FILES_KEY, JSON.stringify(files))
}
