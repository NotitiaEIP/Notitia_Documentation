import { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import './JellyfishScene.css'

/* ─── CONSTANTS ─── */
const DEPTH_RANGE = 60
const CAMERA_START_Y = 2
const CAMERA_END_Y = -DEPTH_RANGE + 5

/* ─── JELLYFISH MODEL ─── */
function JellyfishModel({ scrollProgress = 0 }) {
  const groupRef = useRef()
  const obj = useLoader(OBJLoader, '/models/Jellyfish1.obj')
  const mouseRef = useRef({ x: 0, y: 0 })
  const meshesRef = useRef([])
  const originalPositionsRef = useRef([])
  const scrollTiltRef = useRef(0)

  const scene = useMemo(() => {
    const cloned = obj.clone()
    const meshes = []
    const originals = []

    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#8a5cf5'),
          emissive: new THREE.Color('#4a1d9e'),
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.88,
          roughness: 0.15,
          metalness: 0.05,
          transmission: 0.4,
          thickness: 0.5,
          side: THREE.DoubleSide,
        })
        // Store reference and original vertex positions for animation
        meshes.push(child)
        const posAttr = child.geometry.attributes.position
        originals.push(new Float32Array(posAttr.array))
      }
    })

    meshesRef.current = meshes
    originalPositionsRef.current = originals
    return cloned
  }, [obj])

  // Compute bounding box to know which vertices are "top" (bell) vs "bottom" (tentacles)
  const boundsRef = useRef({ minY: 0, maxY: 1, midY: 0.5 })
  useMemo(() => {
    const box = new THREE.Box3()
    meshesRef.current.forEach((mesh) => {
      const geo = mesh.geometry
      geo.computeBoundingBox()
      box.union(geo.boundingBox)
    })
    boundsRef.current = {
      minY: box.min.y,
      maxY: box.max.y,
      midY: (box.min.y + box.max.y) * 0.5,
      rangeY: box.max.y - box.min.y || 1,
      minZ: box.min.z,
      maxZ: box.max.z,
      rangeZ: box.max.z - box.min.z || 1,
    }
  }, [scene])

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onWheel = (e) => {
      // deltaY > 0 = scroll down, deltaY < 0 = scroll up
      // Scroll UP → head UP (positive tilt)
      // Scroll DOWN → head DOWN (negative tilt)
      const impulse = THREE.MathUtils.clamp(-e.deltaY * 0.008, -1, 1)
      scrollTiltRef.current = THREE.MathUtils.clamp(
        scrollTiltRef.current + impulse, -0.8, 0.8
      )
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // ── Swim cycle: a rhythmic contraction (0→1→0) ──
    // Fast contraction, slow expansion — like a real jellyfish
    const swimCycle = t * 0.6 // speed of the swim
    const rawPhase = swimCycle % 1
    // Contraction: sharp sine pulse
    const contraction = Math.pow(Math.sin(rawPhase * Math.PI), 1.5)
    // Propulsion: jellyfish moves up slightly during contraction
    const propulsion = contraction * 0.15

    // ── Vertex deformation ──
    const { minY, maxY, rangeY } = boundsRef.current

    meshesRef.current.forEach((mesh, mi) => {
      const posAttr = mesh.geometry.attributes.position
      const orig = originalPositionsRef.current[mi]
      if (!orig) return

      for (let i = 0; i < posAttr.count; i++) {
        const ox = orig[i * 3]
        const oy = orig[i * 3 + 1]
        const oz = orig[i * 3 + 2]

        // Normalized height: 0 = bottom (tentacles), 1 = top (bell)
        const normalizedY = (oy - minY) / rangeY

        // Distance from center axis (for radial deformation)
        const dist = Math.sqrt(ox * ox + oz * oz)

        let nx = ox, ny = oy, nz = oz

        if (normalizedY > 0.4) {
          // ── BELL (upper part) ── contracts inward + squishes down during pulse
          const bellFactor = (normalizedY - 0.4) / 0.6 // 0→1 within bell
          const squeeze = contraction * bellFactor * 0.25

          // Radial contraction (pull inward)
          const radialScale = 1 - squeeze * 0.6
          nx = ox * radialScale
          nz = oz * radialScale

          // Vertical squish (push down slightly)
          ny = oy - squeeze * rangeY * 0.08
        } else {
          // ── TENTACLES (lower part) ── wave and trail behind during propulsion
          const tentacleFactor = 1 - normalizedY / 0.4 // 0 at middle, 1 at bottom

          // During contraction, tentacles spread outward and trail
          const spread = contraction * tentacleFactor * 0.3
          const angle = Math.atan2(oz, ox)
          nx = ox + Math.cos(angle) * spread * dist * 0.4
          nz = oz + Math.sin(angle) * spread * dist * 0.4

          // Tentacles wave with organic undulation
          const wave = Math.sin(t * 0.8 + tentacleFactor * 4 + dist * 2) * tentacleFactor * 0.12
          const wave2 = Math.cos(t * 0.6 + tentacleFactor * 3) * tentacleFactor * 0.08
          nx += wave
          nz += wave2

          // Tentacles drag downward during expansion (relaxation)
          ny = oy - (1 - contraction) * tentacleFactor * 0.1
        }

        posAttr.array[i * 3] = nx
        posAttr.array[i * 3 + 1] = ny
        posAttr.array[i * 3 + 2] = nz
      }

      posAttr.needsUpdate = true
      mesh.geometry.computeVertexNormals()
    })

    // ── Descent: jellyfish descends slowly with scroll ──
    const slowScroll = scrollProgress * 0.4
    const targetY = 2 - slowScroll * DEPTH_RANGE + Math.sin(t * 0.15) * 0.2 + propulsion
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y, targetY, 0.03
    )

    // ── Zigzag horizontal movement ──
    // Combines multiple sine waves at different frequencies for a natural zigzag
    const zigzag = Math.sin(t * 0.18) * 1.8 + Math.sin(t * 0.07) * 0.8 + Math.cos(t * 0.12) * 0.5
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x, zigzag, 0.02
    )
    // Slight Z zigzag too for depth
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z, Math.cos(t * 0.14) * 0.6 + Math.sin(t * 0.09) * 0.3, 0.02
    )

    // ── Head tilt based on scroll POSITION ──
    // Top of page (scrollProgress=0) → head UP (+45°)
    // Bottom of page (scrollProgress=1) → head DOWN (-45°)
    const scrollTilt = (1 - scrollProgress * 2) * Math.PI / 4

    // Lean into the zigzag direction (derivative of zigzag for banking)
    const zigzagVel = Math.cos(t * 0.18) * 0.18 * 1.8 + Math.cos(t * 0.07) * 0.07 * 0.8
    const bankAngle = THREE.MathUtils.clamp(zigzagVel * 0.3, -0.25, 0.25)

    const wobbleX = Math.sin(t * 0.15) * 0.02
    const wobbleZ = Math.cos(t * 0.1) * 0.02
    const mouseInfluenceX = mouseRef.current.y * 0.03
    const mouseInfluenceY = mouseRef.current.x * 0.06

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, scrollTilt + wobbleX + mouseInfluenceX, 0.15
    )
    groupRef.current.rotation.y += (mouseInfluenceY + Math.sin(t * 0.25) * 0.1 - groupRef.current.rotation.y) * 0.02
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z, -bankAngle + wobbleZ, 0.03
    )

    // Overall scale pulse synced with swim — bigger scale (1.3)
    const pulse = 1 + contraction * 0.04
    groupRef.current.scale.setScalar(1.3 * pulse)
  })

  return (
    <group ref={groupRef} scale={1.3} position={[0, 2, 0]}>
      <primitive object={scene} />
      {/* Bioluminescent glow around jellyfish */}
      <pointLight color="#7040ff" intensity={2} distance={8} decay={2} />
      <pointLight color="#ff40c0" intensity={0.8} distance={5} decay={2} position={[0, -0.5, 0]} />
    </group>
  )
}

/* ─── FLOATING PARTICLES (plankton/bioluminescence) ─── */
function Particles({ count = 400 }) {
  const meshRef = useRef()
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = -Math.random() * DEPTH_RANGE * 1.2
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      const r = Math.random()
      if (r < 0.33) {
        col[i * 3] = 0.3; col[i * 3 + 1] = 0.8; col[i * 3 + 2] = 1
      } else if (r < 0.66) {
        col[i * 3] = 0.6; col[i * 3 + 1] = 0.3; col[i * 3 + 2] = 1
      } else {
        col[i * 3] = 1; col[i * 3 + 1] = 1; col[i * 3 + 2] = 1
      }
    }
    return { positions: pos, colors: col }
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    const posArr = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArr[i * 3] += Math.sin(t * 0.08 + i) * 0.0003
      posArr[i * 3 + 1] += Math.sin(t * 0.05 + i * 0.5) * 0.0002
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─── RISING BUBBLES ─── */
function Bubbles({ count = 80 }) {
  const meshRef = useRef()
  const initialPositions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = -Math.random() * DEPTH_RANGE * 1.3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  const positions = useMemo(() => new Float32Array(initialPositions), [initialPositions])

  useFrame((state) => {
    if (!meshRef.current) return
    const posArr = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += 0.0008 + Math.random() * 0.0004
      posArr[i * 3] += Math.sin(state.clock.getElapsedTime() * 0.08 + i) * 0.0003
      if (posArr[i * 3 + 1] > 5) {
        posArr[i * 3 + 1] = -DEPTH_RANGE - Math.random() * 10
        posArr[i * 3] = (Math.random() - 0.5) * 20
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#80d0ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─── LIGHT RAYS from surface ─── */
function LightRays() {
  const groupRef = useRef()
  const rays = useMemo(() => {
    const arr = []
    for (let i = 0; i < 6; i++) {
      const x = (Math.random() - 0.5) * 16
      const z = (Math.random() - 0.5) * 8
      arr.push({ x, z, width: Math.random() * 0.8 + 0.3, height: 30 + Math.random() * 20 })
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      if (child.material) {
        child.material.opacity = 0.03 + Math.sin(t * 0.08 + i * 2) * 0.015
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, 5, 0]}>
      {rays.map((ray, i) => (
        <mesh key={i} position={[ray.x, -ray.height / 2, ray.z]} rotation={[0, 0, (Math.random() - 0.5) * 0.15]}>
          <planeGeometry args={[ray.width, ray.height]} />
          <meshBasicMaterial
            color="#6090ff"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ─── SEAWEED ─── */
function Seaweed({ position, height = 3, color = '#1a4a2a' }) {
  const meshRef = useRef()
  const geometry = useMemo(() => {
    const pts = []
    const segments = 8
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      pts.push(new THREE.Vector3(Math.sin(t * Math.PI * 0.3) * 0.2, t * height, 0))
    }
    const curve = new THREE.CatmullRomCurve3(pts)
    return new THREE.TubeGeometry(curve, 12, 0.04, 6, false)
  }, [height])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.z = Math.sin(t * 0.2 + position[0]) * 0.08
    meshRef.current.rotation.x = Math.sin(t * 0.12 + position[2]) * 0.04
  })

  return (
    <mesh ref={meshRef} geometry={geometry} position={position}>
      <meshStandardMaterial color={color} roughness={0.8} emissive={color} emissiveIntensity={0.1} />
    </mesh>
  )
}

/* ─── SEAWEED CLUSTER ─── */
function SeaweedCluster() {
  const seaweeds = useMemo(() => {
    const arr = []
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 16
      const baseY = -DEPTH_RANGE - 2
      const h = Math.random() * 3 + 1.5
      const colors = ['#0d3a1a', '#1a5a2a', '#0a2e15', '#15482a', '#1e6535']
      arr.push({ position: [x, baseY, z], height: h, color: colors[Math.floor(Math.random() * colors.length)] })
    }
    return arr
  }, [])

  return (
    <group>
      {seaweeds.map((sw, i) => (
        <Seaweed key={i} position={sw.position} height={sw.height} color={sw.color} />
      ))}
    </group>
  )
}

/* ─── ROCKS on the seabed ─── */
function Rocks() {
  const rocks = useMemo(() => {
    const arr = []
    for (let i = 0; i < 25; i++) {
      const x = (Math.random() - 0.5) * 35
      const z = (Math.random() - 0.5) * 18
      const baseY = -DEPTH_RANGE - 2.5
      const scale = Math.random() * 0.8 + 0.3
      arr.push({ position: [x, baseY, z], scale, rotY: Math.random() * Math.PI * 2 })
    }
    return arr
  }, [])

  return (
    <group>
      {rocks.map((rock, i) => (
        <mesh key={i} position={rock.position} rotation={[0, rock.rotY, 0]} scale={rock.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#1a1a30" roughness={0.95} metalness={0.05} emissive="#0a0a1a" emissiveIntensity={0.1} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── SANDY SEABED ─── */
function Seabed() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -DEPTH_RANGE - 3, 0]}>
      <planeGeometry args={[60, 40, 60, 40]} />
      <meshStandardMaterial color="#0c0c20" roughness={1} metalness={0} emissive="#060612" emissiveIntensity={0.3} />
    </mesh>
  )
}

/* ─── CAMERA CONTROLLER ─── follows jellyfish descent ─── */
function CameraController({ scrollProgress }) {
  const { camera } = useThree()

  useFrame(() => {
    const slowScroll = scrollProgress * 0.4
    const targetY = THREE.MathUtils.lerp(CAMERA_START_Y, CAMERA_END_Y, slowScroll)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03)
    camera.lookAt(0, camera.position.y - 1, 0)
  })

  return null
}

/* ─── DEPTH FOG & DARKENING ─── */
function DepthDarkening({ scrollProgress }) {
  const { scene } = useThree()

  useFrame(() => {
    const slow = scrollProgress * 0.4
    const nearFog = THREE.MathUtils.lerp(8, 3, slow)
    const farFog = THREE.MathUtils.lerp(30, 10, slow)
    const r = THREE.MathUtils.lerp(0.02, 0.005, slow)
    const g = THREE.MathUtils.lerp(0.02, 0.003, slow)
    const b = THREE.MathUtils.lerp(0.1, 0.015, slow)

    if (scene.fog) {
      scene.fog.near = nearFog
      scene.fog.far = farFog
      scene.fog.color.setRGB(r, g, b)
    }
    scene.background = new THREE.Color(r, g, b)
  })

  return null
}

/* ─── DEPTH ZONE LIGHTS ─── */
function DepthLights({ scrollProgress }) {
  const surfaceLightRef = useRef()
  const deepLightRef = useRef()
  const ambientRef = useRef()

  useFrame(() => {
    const slow = scrollProgress * 0.4
    if (surfaceLightRef.current) {
      surfaceLightRef.current.intensity = THREE.MathUtils.lerp(0.6, 0.02, slow)
    }
    if (deepLightRef.current) {
      const deepFactor = slow > 0.5 ? (1 - slow) * 2 : slow * 1.5
      deepLightRef.current.intensity = deepFactor * 0.8
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(0.3, 0.04, slow)
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.3} color="#1a0a3e" />
      <directionalLight ref={surfaceLightRef} position={[0, 20, 5]} intensity={0.6} color="#4060cc" />
      <pointLight ref={deepLightRef} position={[0, -DEPTH_RANGE * 0.7, 0]} intensity={0} color="#2040aa" distance={20} decay={2} />
      <pointLight position={[-5, -DEPTH_RANGE * 0.5, 3]} intensity={0.3} color="#ff30aa" distance={12} decay={2} />
      <pointLight position={[5, -DEPTH_RANGE * 0.3, -3]} intensity={0.2} color="#3080ff" distance={10} decay={2} />
    </>
  )
}

/* ─── MAIN SCENE ─── */
function Scene({ scrollProgress }) {
  return (
    <>
      <DepthDarkening scrollProgress={scrollProgress} />
      <DepthLights scrollProgress={scrollProgress} />
      <CameraController scrollProgress={scrollProgress} />
      <fog attach="fog" args={['#050520', 8, 30]} />

      <JellyfishModel scrollProgress={scrollProgress} />
      <Particles />
      <Bubbles />
      <SeaweedCluster />
      <Rocks />
      <Seabed />
    </>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#6a3de8" wireframe transparent opacity={0.3} />
    </mesh>
  )
}

export default function JellyfishScene({ scrollProgress = 0 }) {
  return (
    <div className="jellyfish-scene">
      <Canvas
        camera={{ position: [0, CAMERA_START_Y, 8], fov: 55 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
      {/* CSS depth overlay for extra darkening */}
      <div
        className="depth-overlay"
        style={{ opacity: scrollProgress * 0.6 }}
      />
    </div>
  )
}
