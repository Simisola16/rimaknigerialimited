import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function StructuralGrid({ scrollProgress }) {
  const groupRef = useRef()
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta
    if (groupRef.current) {
      groupRef.current.rotation.y = timeRef.current * 0.08 + scrollProgress.current * Math.PI * 0.5
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.05) * 0.1 + scrollProgress.current * 0.3
      groupRef.current.position.z = -scrollProgress.current * 3
    }
  })

  // Create wireframe building geometry
  const buildingGeo = new THREE.BoxGeometry(2.5, 4, 2.5)
  const floorGeo = new THREE.BoxGeometry(2.8, 0.02, 2.8)
  const pillarGeo = new THREE.BoxGeometry(0.05, 4, 0.05)

  const wireMat = new THREE.MeshBasicMaterial({
    color: '#D4861A',
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  })

  const lineMat = new THREE.MeshBasicMaterial({
    color: '#C4B8A8',
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  })

  const goldMat = new THREE.MeshBasicMaterial({
    color: '#E8A040',
    wireframe: false,
    transparent: true,
    opacity: 0.06,
  })

  const pillarPositions = [
    [-1.2, 0, -1.2], [1.2, 0, -1.2],
    [-1.2, 0, 1.2], [1.2, 0, 1.2],
  ]

  const floorPositions = [-2, -1, 0, 1, 2]

  return (
    <group ref={groupRef}>
      {/* Main building wireframe */}
      <mesh geometry={buildingGeo} material={wireMat} />
      <mesh geometry={buildingGeo} material={goldMat} />

      {/* Floor plates */}
      {floorPositions.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} geometry={floorGeo} material={lineMat} />
      ))}

      {/* Corner pillars */}
      {pillarPositions.map((pos, i) => (
        <mesh key={i} position={pos} geometry={pillarGeo}>
          <meshBasicMaterial color="#D4861A" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Outer structural rings */}
      {[0, 1, 2].map((i) => (
        <mesh key={`ring-${i}`} position={[0, -2 + i * 2, 0]}>
          <torusGeometry args={[2.2 + i * 0.2, 0.01, 8, 40]} />
          <meshBasicMaterial color="#D4861A" transparent opacity={0.2} />
        </mesh>
      ))}

      {/* Floating small cubes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const r = 3.5
        return (
          <Float key={`float-${i}`} speed={1 + i * 0.2} rotationIntensity={1} floatIntensity={0.5}>
            <mesh position={[Math.cos(angle) * r, Math.sin(angle * 0.5) * 1.5, Math.sin(angle) * r]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshBasicMaterial color="#D4861A" transparent opacity={0.6} />
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
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#D4861A" intensity={0.5} />
        <StructuralGrid scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
