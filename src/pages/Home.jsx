import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useInView } from 'framer-motion'
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
import JellyfishScene from '../components/JellyfishScene'
import './Home.css'

/* ─── loading screen ─── */
function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setVisible(false)
            onComplete?.()
          }, 400)
          return 100
        }
        return p + Math.random() * 15 + 5
      })
    }, 120)
    return () => clearInterval(interval)
  }, [onComplete])

  if (!visible) return null

  return (
    <div className={`loading-screen ${progress >= 100 ? 'fade-out' : ''}`}>
      <div className="loading-grid">
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className="loading-block"
            style={{
              animationDelay: `${(i % 12) * 0.05 + Math.floor(i / 12) * 0.05}s`,
              opacity: progress >= 100 ? 0 : 1,
            }}
          />
        ))}
      </div>
      <div className="loading-center">
        <div className="loading-logo">N</div>
        <div className="loading-text-container">
          <div className="loading-line">Votre mémoire augmentée.</div>
          <div className="loading-line">Propulsée par l'IA.</div>
          <div className="loading-line right">Privée par design.</div>
        </div>
      </div>
      <span className="loading-progress">
        {Math.min(Math.round(progress), 100)}%
      </span>
    </div>
  )
}

/* ─── section label ─── */
function SectionLabel({ text }) {
  return (
    <span className="section-label">
      <span className="label-tag">{text}</span>
      <span className="label-bar-1" />
      <span className="label-bar-2" />
    </span>
  )
}

/* ─── blink dot ─── */
function BlinkDot({ color = 'white' }) {
  return (
    <span className="blink-indicator" style={{ borderColor: color }}>
      <span className="blink-dot" style={{ backgroundColor: color }} />
    </span>
  )
}

/* ─── features ─── */
const features = [
  {
    icon: <HiOutlineLightBulb size={22} />,
    title: 'Meduza AI',
    desc: 'Assistant IA personnalisé avec recherche sémantique dans vos données.',
  },
  {
    icon: <HiOutlineShieldCheck size={22} />,
    title: 'Zero-Knowledge',
    desc: 'Architecture E2EE — vos données ne quittent jamais votre appareil.',
  },
  {
    icon: <HiOutlineCube size={22} />,
    title: 'Mindmaps',
    desc: 'Cartes mentales interactives pour mémoriser et comprendre.',
  },
  {
    icon: <HiOutlineLightningBolt size={22} />,
    title: 'Edge AI',
    desc: 'Whisper et LLM tournent directement sur votre smartphone.',
  },
]

/* ─── use cases ─── */
const useCases = [
  {
    num: '01',
    title: 'Étudiants',
    desc: "Capturez vos cours automatiquement. Retrouvez l'essentiel en secondes.",
  },
  {
    num: '02',
    title: 'Professionnels',
    desc: 'Ne perdez plus une info de réunion. Capture, indexation et restitution.',
  },
  {
    num: '03',
    title: 'Chercheurs',
    desc: 'Organisez vos découvertes en mindmaps. Trouvez les connexions.',
  },
  {
    num: '04',
    title: 'Créatifs',
    desc: 'Gardez trace de chaque idée, brainstorm et conversation.',
  },
]

/* ─── marquee ─── */
function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="marquee-item">
            Notitia
            <span className="marquee-divider" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── MAIN COMPONENT ─── */
export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    return scrollYProgress.on('change', (v) => setScrollProgress(v))
  }, [scrollYProgress])

  const aboutRef = useRef(null)
  const howRef = useRef(null)
  const advantageRef = useRef(null)
  const industriesRef = useRef(null)

  const aboutInView = useInView(aboutRef, { once: true, margin: '-100px' })
  const howInView = useInView(howRef, { once: true, margin: '-100px' })
  const advantageInView = useInView(advantageRef, { once: true, margin: '-100px' })
  const industriesInView = useInView(industriesRef, { once: true, margin: '-100px' })

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    }),
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } },
  }

  return (
    <div className="home-solais" ref={containerRef}>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <JellyfishScene scrollProgress={scrollProgress} />

      {/* ═══════ HERO ═══════ */}
      <section className="solais-hero" id="hero">
        <div className="hero-overlay" />
        <motion.div
          className="hero-content"
          initial="hidden"
          animate={loaded ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.span className="hero-supertitle" variants={fadeUp} custom={0}>
            <span className="supertitle-tag">Mémoire Augmentée</span>
            <span className="supertitle-bar-1" />
            <span className="supertitle-bar-2" />
          </motion.span>

          <motion.h1 className="hero-title" variants={fadeUp} custom={1}>
            <span>LIBÉREZ VOTRE</span>
            <span className="title-row">
              <span className="title-line" />
              <span>ESPRIT</span>
            </span>
          </motion.h1>

          <motion.div className="hero-desc-row" variants={fadeUp} custom={2}>
            <p className="hero-description">
              <span className="hide-mobile">
                Notitia est votre assistant de mémoire augmentée. Il enregistre, indexe et organise 
                vos échanges grâce à l'IA locale —{' '}
              </span>
              pour ne plus jamais rien oublier.
            </p>
          </motion.div>

          <motion.div className="hero-actions" variants={fadeUp} custom={3}>
            <Link to="/docs" className="btn-solais primary large">
              <span className="btn-edge left" />
              <span className="btn-inner">Explorer la documentation</span>
              <span className="btn-edge right" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ delay: 2 }}
        >
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* ═══════ ABOUT ═══════ */}
      <section className="solais-section about-section" id="about" ref={aboutRef}>
        <motion.div
          className="section-content"
          initial="hidden"
          animate={aboutInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel text="Comprendre" />
          </motion.div>
          <motion.h2 className="section-title" variants={fadeUp} custom={1}>
            <span>Qu'est-ce que</span>
            <span className="title-row">
              <span className="title-line" />
              <span>Notitia ?</span>
            </span>
          </motion.h2>
          <motion.p className="section-desc" variants={fadeUp} custom={2}>
            Notitia transforme la façon dont vous interagissez avec l'information. 
            Votre IA locale capture tout et vous le restitue instantanément.
          </motion.p>

          <div className="about-features">
            {features.map((f, i) => (
              <motion.div key={i} className="about-feature-card" variants={fadeUp} custom={i + 3}>
                <div className="feature-header">
                  <BlinkDot />
                  <h3>{f.title}</h3>
                </div>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="solais-section how-section" id="how-it-works" ref={howRef}>
        <motion.div
          className="section-content centered"
          initial="hidden"
          animate={howInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel text="Comment ça marche" />
          </motion.div>
          <motion.h2 className="section-title centered" variants={fadeUp} custom={1}>
            <span>Découvrez votre</span>
            <span className="title-row">
              <span className="title-line" />
              <span>Mémoire augmentée</span>
            </span>
          </motion.h2>

          <div className="steps-grid">
            {[
              {
                num: '01', tag: 'Capture', title: 'Enregistrez automatiquement',
                desc: "Activez Notitia lors de vos réunions ou cours. L'audio est capturé en temps réel.",
              },
              {
                num: '02', tag: 'Analyse', title: 'Traitement local par IA',
                desc: 'Whisper transcrit, le LLM résume et indexe. Tout se passe localement.',
              },
              {
                num: '03', tag: 'Restitution', title: 'Retrouvez tout instantanément',
                desc: "Posez vos questions à Meduza AI. Explorez vos mindmaps.",
              },
            ].map((step, i) => (
              <motion.div key={i} className="step-card" variants={fadeUp} custom={i + 2}>
                <span className="step-label">
                  <span className="step-num">{step.num}</span>
                  <span className="step-tag">{step.tag}</span>
                  <span className="label-bar-1" />
                  <span className="label-bar-2" />
                </span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <Marquee />

      {/* ═══════ ARCHITECTURE / ADVANTAGE ═══════ */}
      <section className="solais-section arch-section" id="advantage" ref={advantageRef}>
        <motion.div
          className="section-content"
          initial="hidden"
          animate={advantageInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel text="Architecture Edge AI" />
          </motion.div>
          <motion.h2 className="section-title" variants={fadeUp} custom={1}>
            <span>Pourquoi choisir</span>
            <span className="title-row">
              <span className="title-line" />
              <span>Notitia ?</span>
            </span>
          </motion.h2>

          <div className="arch-flow-solais">
            {[
              { icon: <HiOutlineMicrophone size={28} />, label: 'Capture' },
              { icon: <HiOutlineDocumentText size={28} />, label: 'Whisper' },
              { icon: <HiOutlineSparkles size={28} />, label: 'LLM Local' },
              { icon: <HiOutlineMap size={28} />, label: 'Mindmap' },
              { icon: <HiOutlineLockClosed size={28} />, label: 'Chiffré E2E' },
            ].map((node, i) => (
              <motion.div key={i} className="arch-node-solais" variants={fadeUp} custom={i + 2}>
                <div className="arch-icon">{node.icon}</div>
                <span>{node.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="advantages-grid">
            {[
              { icon: <HiOutlineShieldCheck size={20} />, title: 'Vie privée absolue',
                desc: 'Aucune donnée ne quitte votre appareil. Vos conversations restent les vôtres.' },
              { icon: <HiOutlineLightningBolt size={20} />, title: 'Performance locale',
                desc: 'Transcription et résumés en temps réel, même sans connexion internet.' },
              { icon: <HiOutlineChip size={20} />, title: 'Hardware dédié',
                desc: 'Notitia Node avec double micros MEMS I2S et LED de consentement.' },
              { icon: <HiOutlineGlobe size={20} />, title: 'Écosystème ouvert',
                desc: 'Connectez à Notion, Slack, Calendriers et Apple Watch.' },
            ].map((adv, i) => (
              <motion.div key={i} className="advantage-card" variants={fadeUp} custom={i + 4}>
                <div className="adv-header">
                  <BlinkDot color="#9060ff" />
                  <h4>{adv.title}</h4>
                </div>
                <p>{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ USE CASES ═══════ */}
      <section className="solais-section industries-section" id="industries" ref={industriesRef}>
        <motion.div
          className="section-content"
          initial="hidden"
          animate={industriesInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel text="Cas d'usage" />
          </motion.div>
          <motion.h2 className="section-title" variants={fadeUp} custom={1}>
            <span>Trouvez votre</span>
            <span className="title-row">
              <span className="title-line" />
              <span>Usage</span>
            </span>
          </motion.h2>

          <div className="use-cases-grid">
            {useCases.map((uc, i) => (
              <motion.div key={i} className="use-case-card" variants={fadeUp} custom={i + 2}>
                <div className="uc-top">
                  <span className="uc-label">ai<span className="uc-divider" />{uc.num}</span>
                </div>
                <div className="uc-body">
                  <h4>{uc.title}</h4>
                  <p>{uc.desc}</p>
                </div>
                <div className="uc-bottom">
                  <div className="uc-bars">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <span key={j} className="uc-bar" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="solais-section cta-section">
        <motion.div
          className="section-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={stagger}
        >
          <div className="cta-layout">
            <div className="cta-main">
              <motion.h2 className="cta-title" variants={fadeUp} custom={0}>
                Prenez le contrôle de votre mémoire
              </motion.h2>
              <motion.p variants={fadeUp} custom={1}>
                Votre cerveau oublie 70% de l'information en 24h. Notitia vous donne le pouvoir de 
                tout retenir — en toute confidentialité.
              </motion.p>
              <motion.div variants={fadeUp} custom={2}>
                <Link to="/docs" className="btn-solais primary large">
                  <span className="btn-edge left" />
                  <span className="btn-inner">Explorer la documentation</span>
                  <span className="btn-edge right" />
                </Link>
              </motion.div>
            </div>
            <div className="cta-stats">
              {[
                { value: '70%', label: "d'infos perdues en 24h" },
                { value: '100%', label: 'local & chiffré' },
                { value: '6', label: "membres de l'équipe" },
              ].map((s, i) => (
                <motion.div key={i} className="cta-stat" variants={fadeUp} custom={i + 3}>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="cta-sellpoints">
            {[
              { title: 'Essayez Notitia', desc: 'Explorez la documentation complète.' },
              { title: 'Posez vos questions', desc: 'Meduza AI répond en temps réel.' },
              { title: 'Gardez tout', desc: "Ne perdez plus jamais une idée." },
            ].map((sp, i) => (
              <motion.div key={i} className="sellpoint" variants={fadeUp} custom={i + 6}>
                <div className="sp-header">
                  <BlinkDot />
                  <h5>{sp.title}</h5>
                </div>
                <p>{sp.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="big-logo-container">
        <span className="big-logo-text">NOTITIA</span>
      </div>
    </div>
  )
}
