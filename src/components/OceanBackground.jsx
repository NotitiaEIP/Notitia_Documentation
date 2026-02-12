import { useEffect, useRef } from 'react'
import './OceanBackground.css'

export default function OceanBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
      
      containerRef.current.style.setProperty('--scroll-depth', scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate bubbles
  const bubbles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    size: Math.random() * 15 + 5,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 8,
    opacity: Math.random() * 0.5 + 0.3,
  }))

  // Generate light rays
  const rays = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 5 + i * 12,
    width: Math.random() * 100 + 60,
    delay: i * 0.8,
    opacity: Math.random() * 0.3 + 0.1,
  }))

  // Generate particles (plankton/bioluminescence)
  const particles = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 20 + 15,
    color: Math.random() > 0.5 ? 'cyan' : 'purple',
  }))

  // Fish silhouettes (far background)
  const fishSchool = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    y: 30 + Math.random() * 50,
    delay: Math.random() * 20,
    duration: Math.random() * 30 + 25,
  }))

  return (
    <div className="ocean-background" ref={containerRef}>
      {/* Sky gradient layer */}
      <div className="ocean-layer sky-layer">
        {/* Clouds */}
        <div className="clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>
      </div>

      {/* Sun with realistic rays */}
      <div className="ocean-layer sun-layer">
        <div className="sun">
          <div className="sun-core"></div>
          <div className="sun-inner"></div>
          <div className="sun-outer"></div>
          <div className="sun-rays-container">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="sun-ray" style={{ transform: `rotate(${i * 30}deg)` }}></div>
            ))}
          </div>
          <div className="sun-flare"></div>
        </div>
      </div>

      {/* Water surface with waves */}
      <div className="ocean-layer surface-layer">
        <div className="water-surface">
          <svg className="waves" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path className="wave wave-1" d="M0,60 C320,100 420,20 720,60 C1020,100 1120,20 1440,60 L1440,120 L0,120 Z" />
            <path className="wave wave-2" d="M0,70 C280,30 380,90 720,50 C1060,10 1160,90 1440,50 L1440,120 L0,120 Z" />
            <path className="wave wave-3" d="M0,80 C360,40 460,100 720,60 C980,20 1080,100 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
        <div className="surface-reflection"></div>
      </div>

      {/* Underwater gradient */}
      <div className="ocean-layer underwater-gradient"></div>

      {/* Light rays from surface */}
      <div className="ocean-layer rays-layer">
        {rays.map(ray => (
          <div
            key={ray.id}
            className="light-ray"
            style={{
              left: `${ray.left}%`,
              width: `${ray.width}px`,
              animationDelay: `${ray.delay}s`,
              opacity: ray.opacity,
            }}
          />
        ))}
      </div>

      {/* Caustics (light patterns) */}
      <div className="ocean-layer caustics-layer">
        <div className="caustics"></div>
      </div>

      {/* Fish school silhouettes */}
      <div className="ocean-layer fish-layer">
        {fishSchool.map(fish => (
          <div
            key={fish.id}
            className="fish-silhouette"
            style={{
              width: `${fish.size}px`,
              height: `${fish.size * 0.5}px`,
              top: `${fish.y}%`,
              animationDelay: `${fish.delay}s`,
              animationDuration: `${fish.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Bubbles */}
      <div className="ocean-layer bubbles-layer">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className="bubble"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
              opacity: bubble.opacity,
            }}
          />
        ))}
      </div>

      {/* Bioluminescent particles */}
      <div className="ocean-layer particles-layer">
        {particles.map(p => (
          <div
            key={p.id}
            className={`particle particle-${p.color}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Deep sea vignette */}
      <div className="ocean-layer depth-vignette"></div>

      {/* Seabed hint at bottom */}
      <div className="ocean-layer seabed-layer"></div>
    </div>
  )
}
