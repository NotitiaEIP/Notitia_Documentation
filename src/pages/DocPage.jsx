import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { docsConfig } from '../docs/config'
import { loadCustomDocs, loadCustomFiles } from '../utils/contentCustomization'
import './DocPage.css'

// Import all markdown files from docs directory
const markdownModules = import.meta.glob('../docs/*.md', { query: '?raw', import: 'default', eager: true })

function getMarkdownContent(slug) {
  const key = `../docs/${slug}.md`
  return markdownModules[key] || null
}

function getCustomDocContent(slug) {
  const docs = loadCustomDocs()
  const found = docs.find((doc) => doc.slug === slug)
  return found?.content || null
}

function getFilesLibraryContent() {
  const files = loadCustomFiles()
  if (!files.length) {
    return '# 📁 Bibliothèque de fichiers\n\nAucun fichier ajouté.'
  }

  const items = files
    .map(
      (file) =>
        `- [${file.name}](${file.dataUrl}) — ${file.type || 'fichier'} — ${Math.round(
          file.size / 1024,
        )} KB`,
    )
    .join('\n')

  return `# 📁 Bibliothèque de fichiers\n\n${items}`
}

export default function DocPage({ slug: propSlug }) {
  const { slug: paramSlug } = useParams()
  const slug = paramSlug || propSlug || docsConfig.defaultDoc
  const [content, setContent] = useState('')

  useEffect(() => {
    const customMd = getCustomDocContent(slug)
    const md = customMd || getMarkdownContent(slug)

    if (slug === 'files-library') {
      setContent(getFilesLibraryContent())
    } else if (md) {
      setContent(md)
    } else {
      setContent(`# 📄 Page non trouvée\n\nLa page de documentation \`${slug}\` n'existe pas encore.\n\n[← Retour à l'introduction](/docs/introduction)`)
    }
    window.scrollTo(0, 0)
  }, [slug])

  // Find current doc info for prev/next navigation
  const customDocs = loadCustomDocs().map((doc) => ({ title: doc.title, slug: doc.slug }))
  const files = loadCustomFiles()
  const fileItems = files.length ? [{ title: 'Bibliothèque de fichiers', slug: 'files-library' }] : []
  const allDocs = [...docsConfig.sidebar.flatMap(s => s.items), ...customDocs, ...fileItems]
  const currentIndex = allDocs.findIndex(d => d.slug === slug)
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null

  return (
    <article className="doc-page">
      <div className="doc-markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          components={{
            a: ({ href, children, ...props }) => {
              if (href?.startsWith('/')) {
                return <a href={href} {...props}>{children}</a>
              }
              return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Prev / Next navigation */}
      <nav className="doc-nav">
        {prevDoc ? (
          <a href={`/docs/${prevDoc.slug}`} className="doc-nav-link prev">
            <span className="doc-nav-label">← Précédent</span>
            <span className="doc-nav-title">{prevDoc.title}</span>
          </a>
        ) : <div />}
        {nextDoc ? (
          <a href={`/docs/${nextDoc.slug}`} className="doc-nav-link next">
            <span className="doc-nav-label">Suivant →</span>
            <span className="doc-nav-title">{nextDoc.title}</span>
          </a>
        ) : <div />}
      </nav>
    </article>
  )
}
