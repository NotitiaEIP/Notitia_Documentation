import { useEffect, useRef } from 'react'
import './Jellyfish.css'
import jellyfishGif from '../assets/jellyfish.gif'

export default function Jellyfish() {
  const jellyfishRef = useRef(null)
  const posRef = useRef({ x: 100, y: 200 })
  const timeRef = useRef(0)

  useEffect(() => {
    const jellyfish = jellyfishRef.current
    if (!jellyfish) return

    let animationId
    let lastTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const delta = (now - lastTime) / 1000
      lastTime = now
      timeRef.current += delta

      // Get scroll position
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0

      // Calculate screen bounds with padding
      const padding = 100
      const minX = padding
      const maxX = window.innerWidth - padding

      // Slalom movement - goes from edge to edge
      const slalomSpeed = 0.3
      const slalomProgress = (Math.sin(timeRef.current * slalomSpeed) + 1) / 2
      const targetX = minX + slalomProgress * (maxX - minX)

      // Vertical position - follows scroll
      const baseY = 280 + scrollY * 0.5
      const floatY = Math.sin(timeRef.current * 1.5) * 20
      const targetY = baseY + floatY

      // Smooth interpolation
      posRef.current.x += (targetX - posRef.current.x) * 0.02
      posRef.current.y += (targetY - posRef.current.y) * 0.03

      // Rotation based on movement direction
      const movementDirection = targetX - posRef.current.x
      const rotation = movementDirection * 0.15

      jellyfish.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%) rotate(${rotation}deg)`

      // Opacity based on depth
      const opacity = 0.85 + scrollPercent * 0.15
      jellyfish.style.opacity = opacity

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div className="jellyfish-container" ref={jellyfishRef}>
      <div className="jellyfish-glow"></div>
      <img 
        src={jellyfishGif} 
        alt="Jellyfish" 
        className="jellyfish-gif"
      />
    </div>
  )
}
