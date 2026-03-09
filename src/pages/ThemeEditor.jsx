import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  applyTheme,
  DEFAULT_THEME,
  loadTheme,
  resetTheme,
  saveTheme,
} from '../utils/themeCustomization'
import {
  DEFAULT_HOME_CONTENT,
  loadCustomDocs,
  loadCustomFiles,
  loadHomeContent,
  saveCustomDocs,
  saveCustomFiles,
  saveHomeContent,
} from '../utils/contentCustomization'
import './ThemeEditor.css'

const colorSections = [
  {
    title: 'Marque',
    fields: [
      { key: 'navy', label: 'Bleu nuit' },
      { key: 'blue', label: 'Bleu' },
      { key: 'purple', label: 'Violet' },
      { key: 'magenta', label: 'Magenta' },
      { key: 'pink', label: 'Rose' },
      { key: 'brandUi1', label: 'Accent UI 1' },
      { key: 'brandUi2', label: 'Accent UI 2' },
      { key: 'brandUi3', label: 'Accent UI 3' },
    ],
  },
  {
    title: 'Fonds',
    fields: [
      { key: 'bgPrimary', label: 'Fond principal' },
      { key: 'bgSecondary', label: 'Fond secondaire' },
      { key: 'bgTertiary', label: 'Fond tertiaire' },
      { key: 'bgSidebar', label: 'Fond sidebar' },
      { key: 'bgCode', label: 'Fond code' },
      { key: 'surfaceSolid', label: 'Fond hero/loading' },
      { key: 'surfaceDeep', label: 'Fond profond' },
      { key: 'surfaceDeeper', label: 'Fond très profond' },
    ],
  },
  {
    title: 'Texte & UI',
    fields: [
      { key: 'textPrimary', label: 'Texte principal' },
      { key: 'textSecondary', label: 'Texte secondaire' },
      { key: 'textTertiary', label: 'Texte tertiaire' },
      { key: 'textAccent', label: 'Texte accent' },
      { key: 'heroTagText', label: 'Texte tags clairs' },
    ],
  },
  {
    title: 'Bordures (rgba accepté)',
    fields: [
      { key: 'borderColor', label: 'Bordure standard', allowText: true },
      { key: 'borderHover', label: 'Bordure hover', allowText: true },
      { key: 'bgCard', label: 'Fond carte', allowText: true },
      { key: 'bgCardHover', label: 'Fond carte hover', allowText: true },
    ],
  },
]

const radiusFields = [
  { key: 'radiusSm', label: 'Radius S', min: 2, max: 16 },
  { key: 'radiusMd', label: 'Radius M', min: 4, max: 24 },
  { key: 'radiusLg', label: 'Radius L', min: 8, max: 36 },
  { key: 'radiusXl', label: 'Radius XL', min: 10, max: 48 },
]

const isHexColor = (value) => /^#[0-9a-fA-F]{6}$/.test(value)
const toSlug = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export default function ThemeEditor() {
  const [theme, setTheme] = useState(loadTheme)
  const [homeContent, setHomeContent] = useState(loadHomeContent)
  const [customDocs, setCustomDocs] = useState(loadCustomDocs)
  const [customFiles, setCustomFiles] = useState(loadCustomFiles)
  const [docTitle, setDocTitle] = useState('')
  const [docSlug, setDocSlug] = useState('')
  const [docContent, setDocContent] = useState('# Nouveau document\n\nÉcrivez votre contenu ici...')

  const handleColorChange = (key, value) => {
    const nextTheme = { ...theme, [key]: value }
    setTheme(nextTheme)
    applyTheme(nextTheme)
    saveTheme(nextTheme)
  }

  const handleRadiusChange = (key, value) => {
    const nextTheme = { ...theme, [key]: Number(value) }
    setTheme(nextTheme)
    applyTheme(nextTheme)
    saveTheme(nextTheme)
  }

  const hasCustomTheme = useMemo(
    () => JSON.stringify(theme) !== JSON.stringify(DEFAULT_THEME),
    [theme],
  )

  const handleReset = () => {
    const defaults = resetTheme()
    setTheme(defaults)
  }

  const handleHomeContentChange = (key, value) => {
    const next = { ...homeContent, [key]: value }
    setHomeContent(next)
    saveHomeContent(next)
  }

  const handleResetHomeText = () => {
    setHomeContent(DEFAULT_HOME_CONTENT)
    saveHomeContent(DEFAULT_HOME_CONTENT)
  }

  const handleSaveCustomDoc = () => {
    const normalizedSlug = toSlug(docSlug || docTitle)
    if (!docTitle.trim() || !normalizedSlug || !docContent.trim()) return

    const nextDocs = [
      ...customDocs.filter((doc) => doc.slug !== normalizedSlug),
      {
        title: docTitle.trim(),
        slug: normalizedSlug,
        content: docContent,
        createdAt: Date.now(),
      },
    ]
    setCustomDocs(nextDocs)
    saveCustomDocs(nextDocs)
    setDocSlug(normalizedSlug)
  }

  const handleDeleteCustomDoc = (slug) => {
    const nextDocs = customDocs.filter((doc) => doc.slug !== slug)
    setCustomDocs(nextDocs)
    saveCustomDocs(nextDocs)
  }

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const handleAddFiles = async (event) => {
    const selected = Array.from(event.target.files || [])
    if (!selected.length) return

    const converted = await Promise.all(
      selected.map(async (file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: file.name,
        type: file.type,
        size: file.size,
        dataUrl: await readFileAsDataUrl(file),
        createdAt: Date.now(),
      })),
    )

    const nextFiles = [...customFiles, ...converted]
    setCustomFiles(nextFiles)
    saveCustomFiles(nextFiles)
    event.target.value = ''
  }

  const handleDeleteFile = (id) => {
    const nextFiles = customFiles.filter((file) => file.id !== id)
    setCustomFiles(nextFiles)
    saveCustomFiles(nextFiles)
  }

  return (
    <section className="theme-editor-page">
      <div className="theme-editor-container">
        <header className="theme-editor-header">
          <p className="theme-editor-kicker">Personnalisation</p>
          <h1>Modifier le style du site</h1>
          <p>
            Changez les couleurs de toute l'interface (accueil, docs, navbar, cartes)
            et les niveaux d'arrondi. Les réglages
            sont sauvegardés automatiquement dans votre navigateur.
          </p>
        </header>

        <div className="theme-editor-grid">
          <article className="theme-editor-panel">
            <h2>Palette</h2>
            <div className="theme-editor-controls">
              {colorSections.map((section) => (
                <div key={section.title} className="theme-editor-group">
                  <h3>{section.title}</h3>
                  {section.fields.map((field) => (
                    <label key={field.key} className="theme-editor-control">
                      <span>{field.label}</span>
                      <div className="theme-editor-control-right">
                        {isHexColor(theme[field.key]) && (
                          <input
                            type="color"
                            value={theme[field.key]}
                            onChange={(e) => handleColorChange(field.key, e.target.value)}
                          />
                        )}
                        <input
                          type="text"
                          value={theme[field.key]}
                          onChange={(e) => handleColorChange(field.key, e.target.value)}
                          className={field.allowText ? 'theme-text-token wide' : 'theme-text-token'}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              ))}

              <div className="theme-editor-group">
                <h3>Arrondis</h3>
                {radiusFields.map((field) => (
                  <label key={field.key} className="theme-editor-control range">
                    <span>{field.label}</span>
                    <div className="theme-editor-control-right">
                      <input
                        type="range"
                        min={field.min}
                        max={field.max}
                        step="1"
                        value={theme[field.key]}
                        onChange={(e) => handleRadiusChange(field.key, e.target.value)}
                      />
                      <strong>{theme[field.key]}px</strong>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </article>

          <article className="theme-editor-preview">
            <h2>Aperçu</h2>
            <div className="preview-card">
              <p className="preview-tag">Live preview</p>
              <h3>Notitia UI Studio</h3>
              <p>
                Cette carte utilise vos variables CSS. Naviguez ensuite sur le
                site pour vérifier le rendu.
              </p>
              <div className="preview-actions">
                <Link to="/" className="preview-btn primary">
                  Retour accueil
                </Link>
                <Link to="/docs" className="preview-btn secondary">
                  Voir docs
                </Link>
              </div>
            </div>
          </article>
        </div>

        <section className="theme-editor-content-tools">
          <article className="theme-editor-panel">
            <h2>Texte de la page d'accueil</h2>
            <div className="theme-editor-controls">
              <label className="theme-editor-control">
                <span>Badge hero</span>
                <input
                  type="text"
                  value={homeContent.heroSupertitle}
                  onChange={(e) => handleHomeContentChange('heroSupertitle', e.target.value)}
                  className="theme-text-token wide"
                />
              </label>
              <label className="theme-editor-control">
                <span>Titre ligne 1</span>
                <input
                  type="text"
                  value={homeContent.heroTitleLine1}
                  onChange={(e) => handleHomeContentChange('heroTitleLine1', e.target.value)}
                  className="theme-text-token wide"
                />
              </label>
              <label className="theme-editor-control">
                <span>Titre ligne 2</span>
                <input
                  type="text"
                  value={homeContent.heroTitleLine2}
                  onChange={(e) => handleHomeContentChange('heroTitleLine2', e.target.value)}
                  className="theme-text-token wide"
                />
              </label>
              <label className="theme-editor-control textarea">
                <span>Description</span>
                <textarea
                  value={homeContent.heroDescription}
                  onChange={(e) => handleHomeContentChange('heroDescription', e.target.value)}
                  rows={4}
                />
              </label>
              <label className="theme-editor-control">
                <span>Bouton principal</span>
                <input
                  type="text"
                  value={homeContent.heroPrimaryButton}
                  onChange={(e) => handleHomeContentChange('heroPrimaryButton', e.target.value)}
                  className="theme-text-token wide"
                />
              </label>
              <label className="theme-editor-control">
                <span>Bouton secondaire</span>
                <input
                  type="text"
                  value={homeContent.heroSecondaryButton}
                  onChange={(e) => handleHomeContentChange('heroSecondaryButton', e.target.value)}
                  className="theme-text-token wide"
                />
              </label>
              <button type="button" className="theme-inline-btn" onClick={handleResetHomeText}>
                Réinitialiser les textes accueil
              </button>
            </div>
          </article>

          <article className="theme-editor-panel">
            <h2>Ajouter une page de documentation</h2>
            <div className="theme-editor-controls">
              <label className="theme-editor-control">
                <span>Titre</span>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="theme-text-token wide"
                  placeholder="Ex: Guide API"
                />
              </label>
              <label className="theme-editor-control">
                <span>Slug</span>
                <input
                  type="text"
                  value={docSlug}
                  onChange={(e) => setDocSlug(toSlug(e.target.value))}
                  className="theme-text-token wide"
                  placeholder="guide-api"
                />
              </label>
              <label className="theme-editor-control textarea">
                <span>Contenu Markdown</span>
                <textarea
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                  rows={8}
                />
              </label>
              <button type="button" className="theme-inline-btn" onClick={handleSaveCustomDoc}>
                Sauvegarder la page
              </button>
              <div className="custom-list">
                {customDocs.map((doc) => (
                  <div key={doc.slug} className="custom-list-row">
                    <a href={`/docs/${doc.slug}`}>{doc.title}</a>
                    <button type="button" onClick={() => handleDeleteCustomDoc(doc.slug)}>
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="theme-editor-panel">
            <h2>Ajouter des fichiers</h2>
            <div className="theme-editor-controls">
              <label className="theme-editor-control">
                <span>Importer</span>
                <input type="file" multiple onChange={handleAddFiles} />
              </label>
              <p className="theme-help-text">
                Les fichiers sont visibles dans la documentation via la page « Bibliothèque ».
              </p>
              <div className="custom-list">
                {customFiles.map((file) => (
                  <div key={file.id} className="custom-list-row">
                    <a href={file.dataUrl} download={file.name}>{file.name}</a>
                    <button type="button" onClick={() => handleDeleteFile(file.id)}>
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        <div className="theme-editor-footer">
          <span>
            {hasCustomTheme
              ? 'Personnalisation active'
              : 'Thème par défaut actif'}
          </span>
          <button type="button" onClick={handleReset}>
            Réinitialiser
          </button>
        </div>
      </div>
    </section>
  )
}
