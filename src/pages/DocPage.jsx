import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { docsConfig } from '../docs/config'
import './DocPage.css'

// Import all markdown files from docs directory
const markdownModules = import.meta.glob('../docs/*.md', { query: '?raw', import: 'default', eager: true })

function getMarkdownContent(slug) {
  const key = `../docs/${slug}.md`
  return markdownModules[key] || null
}

export default function DocPage({ slug: propSlug }) {
  const { slug: paramSlug } = useParams()
  const slug = paramSlug || propSlug || docsConfig.defaultDoc
  const [content, setContent] = useState('')

  useEffect(() => {
    const md = getMarkdownContent(slug)
    if (md) {
      setContent(md)
    } else {
      setContent(`# 📄 Page non trouvée\n\nLa page de documentation \`${slug}\` n'existe pas encore.\n\n[← Retour à l'introduction](/docs/introduction)`)
    }
    window.scrollTo(0, 0)
  }, [slug])

  // Find current doc info for prev/next navigation
  const allDocs = docsConfig.sidebar.flatMap(s => s.items)
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
