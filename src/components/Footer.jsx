import { Link } from 'react-router-dom'
import { FaGithub, FaDiscord } from 'react-icons/fa'
import notitiaLogo from '../../assets/notitia-logo.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src={notitiaLogo} alt="Notitia" className="footer-logo-image" />
          </div>
          <p className="footer-tagline">
            Libérez votre esprit, nous gardons le reste.
          </p>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" aria-label="Discord">
              <FaDiscord size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Produit</h4>
          <Link to="/docs/introduction">Introduction</Link>
          <Link to="/docs/architecture">Architecture</Link>
          <Link to="/docs/meduza-ai">Meduza AI</Link>
          <Link to="/docs/notitia-node">Notitia Node</Link>
        </div>

        <div className="footer-links-group">
          <h4>Ressources</h4>
          <Link to="/docs">Documentation</Link>
          <Link to="/docs/installation">Installation</Link>
          <Link to="/docs/contributing">Contribuer</Link>
          <Link to="/docs/roadmap">Roadmap</Link>
        </div>

        <div className="footer-links-group">
          <h4>Projet</h4>
          <Link to="/docs/team">L'Équipe</Link>
          <Link to="/docs/security">Sécurité</Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Notitia — EIP Epitech 2026. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
