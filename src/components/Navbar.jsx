import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import notitiaLogo from '../../assets/notitia-logo.png'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img src={notitiaLogo} alt="Notitia" className="navbar-logo-image" />
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {isHome ? (
            <>
              <button onClick={() => scrollTo('about')} className="nav-link-btn">
                Comprendre
              </button>
              <button onClick={() => scrollTo('how-it-works')} className="nav-link-btn">
                Fonctionnement
              </button>
              <button onClick={() => scrollTo('advantage')} className="nav-link-btn">
                Avantages
              </button>
              <button onClick={() => scrollTo('industries')} className="nav-link-btn">
                Cas d'usage
              </button>
            </>
          ) : (
            <Link to="/">Accueil</Link>
          )}
          <Link
            to="/docs"
            className={location.pathname.startsWith('/docs') ? 'active' : ''}
          >
            Documentation
          </Link>
          <Link
            to="/customize"
            className={location.pathname.startsWith('/customize') ? 'active' : ''}
          >
            Personnaliser
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <Link to="/docs" className="navbar-cta">
            Démarrer{' '}
            <span className="cta-arrow">→</span>
          </Link>
        </div>

        <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>
    </nav>
  )
}
