import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  HiOutlineLightBulb,
  HiOutlineShieldCheck,
  HiOutlineCube,
  HiOutlineLightningBolt,
  HiOutlineChip,
  HiOutlineGlobe,
  HiOutlineMicrophone,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineMap,
  HiOutlineLockClosed,
} from 'react-icons/hi'
import OceanBackground from '../components/OceanBackground'
import Jellyfish from '../components/Jellyfish'
import './Home.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
}

const features = [
  {
    icon: <HiOutlineLightBulb size={28} />,
    title: 'Meduza AI',
    desc: 'Assistant IA personnalisé qui répond à vos questions grâce à la recherche sémantique.',
    color: '#9001f5',
  },
  {
    icon: <HiOutlineShieldCheck size={28} />,
    title: 'Zero-Knowledge',
    desc: 'Architecture E2EE — vos données restent chiffrées et ne quittent jamais votre appareil.',
    color: '#01008e',
  },
  {
    icon: <HiOutlineCube size={28} />,
    title: 'Mindmaps',
    desc: 'Génération de cartes mentales interactives pour mémoriser et comprendre structurellement.',
    color: '#fe00ea',
  },
  {
    icon: <HiOutlineLightningBolt size={28} />,
    title: 'Edge AI',
    desc: 'Traitement 100% local — Whisper et LLM tournent directement sur votre smartphone.',
    color: '#ff0178',
  },
  {
    icon: <HiOutlineChip size={28} />,
    title: 'Notitia Node',
    desc: 'Module hardware avec double micros MEMS et LED de transparence pour le consentement.',
    color: '#9001f5',
  },
  {
    icon: <HiOutlineGlobe size={28} />,
    title: 'Intégrations',
    desc: 'Connectivité avec Notion, Slack, Calendriers et Apple Watch.',
    color: '#01008e',
  },
]

const stats = [
  { value: '70%', label: "d'infos perdues en 24h" },
  { value: '6', label: 'membres dans l\'équipe' },
  { value: '3 ans', label: 'de développement' },
  { value: '100%', label: 'local & chiffré' },
]

export default function Home() {
  return (
    <div className="home">
      {/* Ocean Background */}
      <OceanBackground />
      
      {/* Jellyfish that follows cursor */}
      <Jellyfish />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
        </div>

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.div className="hero-badge" variants={fadeUp} custom={0}>
            <span className="badge-dot" />
            EIP Epitech 2026
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1}>
            Libérez votre esprit,
            <br />
            <span className="gradient-text">nous gardons le reste.</span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={fadeUp} custom={2}>
            Notitia est votre mémoire augmentée. Un assistant IA qui enregistre, indexe et 
            organise vos échanges pour ne plus jamais rien oublier.
          </motion.p>

          <motion.div className="hero-actions" variants={fadeUp} custom={3}>
            <Link to="/docs" className="btn btn-primary">
              Explorer la documentation
            </Link>
            <Link to="/docs/architecture" className="btn btn-secondary">
              Architecture →
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="hero-card glass">
            <div className="hero-card-header">
              <div className="hero-card-dots">
                <span /><span /><span />
              </div>
              <span className="hero-card-title">meduza.ai</span>
            </div>
            <div className="hero-card-body">
              <div className="chat-msg user">
                <span>Qu'a dit Marc lors de la réunion de lundi ?</span>
              </div>
              <div className="chat-msg bot">
                <span>Marc a proposé 3 points principaux : 1) Revoir l'architecture backend, 
                2) Prioriser le module de chiffrement, 3) Planifier la beta pour Q2 2025.</span>
              </div>
              <div className="chat-input">
                <span>Posez une question à Meduza...</span>
                <div className="chat-send">→</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <span className="stat-value gradient-text">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2>
            Tout ce qu'il faut pour ne{' '}
            <span className="gradient-text">plus rien oublier</span>
          </h2>
          <p>
            Une suite complète d'outils d'IA et de hardware pensés pour capturer, comprendre et 
            restituer vos connaissances.
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card glass"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className="feature-icon"
                style={{ background: `${f.color}15`, color: f.color }}
              >
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture Preview */}
      <section className="arch-section">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2>
            Architecture{' '}
            <span className="gradient-text">Edge AI</span>
          </h2>
          <p>
            Tout le traitement s'effectue localement sur votre appareil. 
            Aucune donnée ne transite sur le cloud.
          </p>
        </motion.div>

        <motion.div
          className="arch-diagram glass"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
        >
          <div className="arch-flow">
            <div className="arch-node">
              <div className="arch-node-icon"><HiOutlineMicrophone size={32} /></div>
              <span>Capture Audio</span>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <div className="arch-node-icon"><HiOutlineDocumentText size={32} /></div>
              <span>Whisper</span>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <div className="arch-node-icon"><HiOutlineSparkles size={32} /></div>
              <span>LLM Local</span>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <div className="arch-node-icon"><HiOutlineMap size={32} /></div>
              <span>Mindmap</span>
            </div>
            <div className="arch-arrow">→</div>
            <div className="arch-node">
              <div className="arch-node-icon"><HiOutlineLockClosed size={32} /></div>
              <span>Stockage Chiffré</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing */}
      <section className="pricing-section">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2>
            Un modèle{' '}
            <span className="gradient-text">simple et transparent</span>
          </h2>
          <p>Choisissez le plan qui correspond à vos besoins.</p>
        </motion.div>

        <div className="pricing-grid">
          <motion.div
            className="pricing-card glass"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h3>Gratuit</h3>
            <div className="price">
              0€<span>/mois</span>
            </div>
            <ul>
              <li>✓ Transcription de base</li>
              <li>✓ Résumés simples</li>
              <li>✗ Données supprimées après 7 jours</li>
              <li>✗ Mindmaps limitées</li>
              <li>✗ Pas de recherche sémantique</li>
            </ul>
            <Link to="/docs" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
              Commencer
            </Link>
          </motion.div>

          <motion.div
            className="pricing-card pricing-featured glass"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
          >
            <div className="pricing-badge">Populaire</div>
            <h3>Premium</h3>
            <div className="price">
              9,99€<span>/mois</span>
            </div>
            <ul>
              <li>✓ Archive illimitée</li>
              <li>✓ Mindmaps avancées</li>
              <li>✓ Recherche sémantique</li>
              <li>✓ Fonctions collaboratives</li>
              <li>✓ Support prioritaire</li>
            </ul>
            <Link to="/docs" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Choisir Premium
            </Link>
          </motion.div>

          <motion.div
            className="pricing-card glass"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <h3>Node Bundle</h3>
            <div className="price">
              149€<span> one-time</span>
            </div>
            <ul>
              <li>✓ Notitia Node hardware</li>
              <li>✓ Double micros MEMS I2S</li>
              <li>✓ LED de transparence</li>
              <li>✓ Mode Standalone</li>
              <li>✓ Premium offert (3 mois)</li>
            </ul>
            <Link to="/docs/notitia-node" className="btn btn-secondary" style={{ width: '100%', textAlign: 'center' }}>
              En savoir plus
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div
          className="cta-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2>Prêt à ne plus rien oublier ?</h2>
          <p>
            Découvrez la documentation complète et rejoignez le projet Notitia.
          </p>
          <div className="cta-actions">
            <Link to="/docs" className="btn btn-primary btn-lg">
              Explorer la documentation
            </Link>
            <a href="https://github.com" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
              Voir sur GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
