import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// 1. Skyscraper structure component
function Skyscraper({ position, width, height, depth, shape, floors, delay, time, scrollProgress }) {
  const meshRef = useRef()
  const scanLineRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      const t = time.current - delay
      const baseGrowth = Math.min(1, Math.max(0, t * 0.5)) // grows in 2 seconds
      const scrollGrowth = scrollProgress.current * 0.4
      const scaleY = Math.min(1, baseGrowth + scrollGrowth)
      
      meshRef.current.scale.y = scaleY
      // Adjust mesh position so it scales from the ground up (pivot point correction)
      meshRef.current.position.y = position[1] + (height * scaleY) / 2

      // Laser scan line sweeps vertically
      if (scanLineRef.current) {
        const sweep = Math.sin(time.current * 2) * 0.5 + 0.5 // 0 to 1 sweep
        scanLineRef.current.position.y = position[1] + height * scaleY * sweep
      }
    }
  })

  // Pre-calculate floor heights
  const floorPlates = []
  for (let i = 0; i <= floors; i++) {
    floorPlates.push(i / floors)
  }

  return (
    <group>
      {/* Scanning laser ring */}
      <mesh ref={scanLineRef} position={[position[0], position[1], position[2]]}>
        {shape === 'cylinder' ? (
          <ringGeometry args={[width / 2, width / 2 + 0.08, 32]} />
        ) : (
          <ringGeometry args={[width * 0.7, width * 0.7 + 0.06, 4]} />
        )}
        <meshBasicMaterial color="#E8A040" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Building mesh group */}
      <group ref={meshRef} position={[position[0], position[1], position[2]]}>
        {/* Core volume glass shader effect */}
        <mesh>
          {shape === 'cylinder' ? (
            <cylinderGeometry args={[width / 2, width / 2, height, 16]} />
          ) : (
            <boxGeometry args={[width, height, depth]} />
          )}
          <meshBasicMaterial color="#E8A040" transparent opacity={0.03} />
        </mesh>

        {/* Structural Column lines (Wireframe) */}
        <mesh>
          {shape === 'cylinder' ? (
            <cylinderGeometry args={[width / 2, width / 2, height, 16, 1, true]} />
          ) : (
            <boxGeometry args={[width, height, depth]} />
          )}
          <meshBasicMaterial color="#D4861A" wireframe transparent opacity={0.25} />
        </mesh>

        {/* Horizontal floor plates */}
        {floorPlates.map((f, i) => (
          <mesh key={i} position={[0, -height / 2 + f * height, 0]}>
            {shape === 'cylinder' ? (
              <cylinderGeometry args={[width / 2 + 0.02, width / 2 + 0.02, 0.02, 16]} />
            ) : (
              <boxGeometry args={[width + 0.04, 0.02, depth + 0.04]} />
            )}
            <meshBasicMaterial color="#C4B8A8" transparent opacity={0.15} />
          </mesh>
        ))}

        {/* Antennas / Spires for skyscrapers */}
        {height > 4 && (
          <mesh position={[0, height / 2 + 0.5, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 1, 4]} />
            <meshBasicMaterial color="#D4861A" />
          </mesh>
        )}
      </group>
    </group>
  )
}

// 2. Residential house structure component
function House({ position, width, height, depth, delay, time, scrollProgress }) {
  const groupRef = useRef()
  const scanLineRef = useRef()

  useFrame(() => {
    if (groupRef.current) {
      const t = time.current - delay
      const baseGrowth = Math.min(1, Math.max(0, t * 0.6))
      const scrollGrowth = scrollProgress.current * 0.4
      const scaleY = Math.min(1, baseGrowth + scrollGrowth)
      
      groupRef.current.scale.y = scaleY
      groupRef.current.position.y = position[1] + (height * scaleY) / 2

      if (scanLineRef.current) {
        const sweep = Math.sin(time.current * 2.5) * 0.5 + 0.5
        scanLineRef.current.position.y = position[1] + height * scaleY * sweep
      }
    }
  })

  return (
    <group>
      {/* Scanning laser ring */}
      <mesh ref={scanLineRef} position={[position[0], position[1], position[2]]}>
        <ringGeometry args={[width * 0.75, width * 0.75 + 0.05, 4]} />
        <meshBasicMaterial color="#E8A040" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* House structure */}
      <group ref={groupRef} position={[position[0], position[1], position[2]]}>
        {/* House Ground / Ceiling slabs */}
        <mesh position={[0, -height / 2, 0]}>
          <boxGeometry args={[width + 0.02, 0.02, depth + 0.02]} />
          <meshBasicMaterial color="#C4B8A8" transparent opacity={0.15} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[width + 0.02, 0.02, depth + 0.02]} />
          <meshBasicMaterial color="#C4B8A8" transparent opacity={0.15} />
        </mesh>

        {/* House Base walls */}
        <mesh position={[0, -height / 4, 0]}>
          <boxGeometry args={[width, height / 2, depth]} />
          <meshBasicMaterial color="#D4861A" wireframe transparent opacity={0.25} />
        </mesh>
        <mesh position={[0, -height / 4, 0]}>
          <boxGeometry args={[width, height / 2, depth]} />
          <meshBasicMaterial color="#E8A040" transparent opacity={0.02} />
        </mesh>

        {/* Roof (triangle spire / prism) */}
        <mesh position={[0, height / 4 + height / 8, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[width * 0.71, height / 2, 4]} />
          <meshBasicMaterial color="#D4861A" wireframe transparent opacity={0.35} />
        </mesh>
      </group>
    </group>
  )
}

// 3. Construction Tower Crane component
function TowerCrane({ time, scrollProgress }) {
  const jibRef = useRef()

  useFrame(() => {
    if (jibRef.current) {
      // Crane arm swings slowly back and forth, responsive to scroll
      jibRef.current.rotation.y = Math.sin(time.current * 0.15) * 0.4 + scrollProgress.current * 0.6
    }
  })

  return (
    <group position={[-1.6, -2.2, -1.8]}>
      {/* Crane base footprint */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.4]} />
        <meshBasicMaterial color="#C4B8A8" transparent opacity={0.3} />
      </mesh>

      {/* Vertical Lattice Tower (Mast) */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[0.12, 5, 0.12]} />
        <meshBasicMaterial color="#D4861A" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Rotating Jib assembly */}
      <group ref={jibRef} position={[0, 5, 0]}>
        {/* Cab */}
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.3, 0.35, 0.3]} />
          <meshBasicMaterial color="#C4B8A8" transparent opacity={0.4} />
        </mesh>

        {/* Front Long Jib Arm */}
        <mesh position={[1.4, 0, 0]}>
          <boxGeometry args={[2.8, 0.1, 0.1]} />
          <meshBasicMaterial color="#D4861A" wireframe transparent opacity={0.35} />
        </mesh>

        {/* Back Short Counterweight Jib */}
        <mesh position={[-0.7, 0, 0]}>
          <boxGeometry args={[1.4, 0.1, 0.1]} />
          <meshBasicMaterial color="#C4B8A8" wireframe transparent opacity={0.25} />
        </mesh>

        {/* Counterweight Block */}
        <mesh position={[-1.2, -0.15, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.2]} />
          <meshBasicMaterial color="#C4B8A8" transparent opacity={0.5} />
        </mesh>

        {/* Crane Peak (spire) */}
        <mesh position={[0, 0.45, 0]}>
          <coneGeometry args={[0.1, 0.6, 4]} />
          <meshBasicMaterial color="#D4861A" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Hoisting cable */}
        <mesh position={[2, -1.2, 0]}>
          <boxGeometry args={[0.015, 2.4, 0.015]} />
          <meshBasicMaterial color="#C4B8A8" transparent opacity={0.2} />
        </mesh>
        {/* Hook payload ball */}
        <mesh position={[2, -2.4, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color="#E8A040" />
        </mesh>
      </group>
    </group>
  )
}

// 4. Main Scene assembly
function ConstructionScene({ scrollProgress }) {
  const groupRef = useRef()
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta
    if (groupRef.current) {
      // Slower, elegant turntable rotation
      groupRef.current.rotation.y = time.current * 0.03 + scrollProgress.current * Math.PI * 0.25
      groupRef.current.rotation.x = Math.sin(time.current * 0.03) * 0.04
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ground blueprint CAD grid */}
      <gridHelper args={[16, 16, '#D4861A', '#C4B8A8']} position={[0, -2.2, 0]} opacity={0.12} transparent />

      {/* Central Skyscraper (Tallest Tower) */}
      <Skyscraper
        position={[0, -2.2, -0.8]}
        width={1.1}
        height={4.8}
        depth={1.1}
        shape="box"
        floors={8}
        delay={0.2}
        time={time}
        scrollProgress={scrollProgress}
      />

      {/* Left Skyscraper (Cylindrical Tower) */}
      <Skyscraper
        position={[-2.2, -2.2, -1.6]}
        width={1.0}
        height={3.8}
        depth={1.0}
        shape="cylinder"
        floors={6}
        delay={0.6}
        time={time}
        scrollProgress={scrollProgress}
      />

      {/* Right Skyscraper (Diamond Footprint Tower) */}
      <Skyscraper
        position={[2.2, -2.2, -1.6]}
        width={0.9}
        height={4.2}
        depth={0.9}
        shape="box"
        floors={7}
        delay={1.0}
        time={time}
        scrollProgress={scrollProgress}
      />

      {/* Left House */}
      <House
        position={[-1.2, -2.2, 0.6]}
        width={0.8}
        height={1.2}
        depth={0.8}
        delay={1.4}
        time={time}
        scrollProgress={scrollProgress}
      />

      {/* Right House */}
      <House
        position={[1.2, -2.2, 0.6]}
        width={0.9}
        height={1.3}
        depth={0.9}
        delay={1.8}
        time={time}
        scrollProgress={scrollProgress}
      />

      {/* Tower Crane */}
      <TowerCrane time={time} scrollProgress={scrollProgress} />

      {/* Minor details: floating architectural elements */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const r = 4.2
        return (
          <Float key={i} speed={1 + i * 0.15} rotationIntensity={0.5} floatIntensity={0.3}>
            <mesh position={[Math.cos(angle) * r, Math.sin(angle * 0.4) * 1.5, Math.sin(angle) * r]}>
              <boxGeometry args={[0.06, 0.06, 0.06]} />
              <meshBasicMaterial color="#D4861A" transparent opacity={0.4} />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

export default function HeroScene({ scrollProgress }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[8, 8, 8]} color="#D4861A" intensity={0.6} />
        <ConstructionScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
