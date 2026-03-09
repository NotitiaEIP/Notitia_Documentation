import { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { docsConfig } from '../docs/config'
import { HiChevronDown, HiChevronRight, HiMenu, HiX } from 'react-icons/hi'
import { loadCustomDocs, loadCustomFiles } from '../utils/contentCustomization'
import DocChatbot from '../components/DocChatbot'
import './DocsLayout.css'

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const customDocs = loadCustomDocs()
  const customFiles = loadCustomFiles()

  const dynamicSections = [
    ...(customDocs.length
      ? [{ title: 'Pages personnalisées', items: customDocs.map((doc) => ({ title: doc.title, slug: doc.slug })) }]
      : []),
    ...(customFiles.length
      ? [{ title: 'Fichiers', items: [{ title: `Bibliothèque (${customFiles.length})`, slug: 'files-library' }] }]
      : []),
  ]

  const sections = [...docsConfig.sidebar, ...dynamicSections]

  return (
    <div className="docs-layout">
      <button className="docs-sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <HiX size={20} /> : <HiMenu size={20} />}
        <span>Menu</span>
      </button>

      <aside className={`docs-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="docs-sidebar-header">
          <h3>Documentation</h3>
          <span className="docs-version">v0.1.0</span>
        </div>
        <nav className="docs-nav">
          {sections.map((section, i) => (
            <SidebarSection key={i} section={section} currentPath={location.pathname} onNavigate={() => setSidebarOpen(false)} />
          ))}
        </nav>
      </aside>

      <div className="docs-content">
        <Outlet />
      </div>

      <DocChatbot />
    </div>
  )
}

function SidebarSection({ section, currentPath, onNavigate }) {
  const hasActive = section.items.some(item => currentPath === `/docs/${item.slug}`)
  const [open, setOpen] = useState(hasActive || true)

  return (
    <div className="sidebar-section">
      <button className="sidebar-section-title" onClick={() => setOpen(!open)}>
        <span>{section.title}</span>
        {open ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
      </button>
      {open && (
        <ul className="sidebar-items">
          {section.items.map((item) => (
            <li key={item.slug}>
              <NavLink
                to={`/docs/${item.slug}`}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={onNavigate}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
