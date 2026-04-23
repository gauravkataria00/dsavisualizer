import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Environment } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useStore } from '../../store'

function Bar({ value, index, total, maxVal, state }) {
  const meshRef = useRef()
  const height = (value / maxVal) * 8 + 0.2
  const width = Math.min(0.7, 12 / total)
  const gap = width + 0.15
  const x = (index - total / 2) * gap

  const color = useMemo(() => {
    if (state === 'sorted') return new THREE.Color('#00ff88')
    if (state === 'comparing') return new THREE.Color('#ffd700')
    if (state === 'swapping') return new THREE.Color('#ff0080')
    if (state === 'found') return new THREE.Color('#00f5ff')
    const t = value / maxVal
    return new THREE.Color().lerpColors(
      new THREE.Color('#1e3a5f'),
      new THREE.Color('#00f5ff'),
      t
    )
  }, [state, value, maxVal])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, height, delta * 8)
      meshRef.current.material.color.lerp(color, delta * 6)
      if (state === 'comparing' || state === 'swapping') {
        meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(Date.now() * 0.01) * 0.3
      } else {
        meshRef.current.material.emissiveIntensity = state === 'sorted' ? 0.3 : 0.1
      }
    }
  })

  return (
    <group position={[x, 0, 0]}>
      <mesh ref={meshRef} position={[0, height / 2, 0]} scale={[1, 1, 1]}>
        <boxGeometry args={[width, 1, width]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {total <= 25 && (
        <Text
          position={[0, height + 0.4, 0]}
          fontSize={0.25}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          {value}
        </Text>
      )}
    </group>
  )
}

function Grid() {
  return (
    <gridHelper
      args={[30, 30, '#1e3a5f', '#0f2040']}
      position={[0, 0, 0]}
    />
  )
}

function AxisLabel() {
  return (
    <>
      <Text position={[0, -0.5, 0]} fontSize={0.4} color="#1e3a5f" anchorX="center">
        INDEX →
      </Text>
      <Text position={[-8, 4, 0]} fontSize={0.35} color="#1e3a5f" anchorX="center" rotation={[0, 0, Math.PI / 2]}>
        VALUE →
      </Text>
    </>
  )
}

export default function BarVisualizer() {
  const { array, comparingIndices, swappingIndices, sortedIndices, foundIndex } = useStore()

  if (!array.length) return null

  const maxVal = Math.max(...array)

  const getState = (i) => {
    if (foundIndex === i) return 'found'
    if (sortedIndices.includes(i)) return 'sorted'
    if (swappingIndices.includes(i)) return 'swapping'
    if (comparingIndices.includes(i)) return 'comparing'
    return 'default'
  }

  return (
    <Canvas
      camera={{ position: [0, 5, 18], fov: 55 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 20, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#00f5ff" />
      <pointLight position={[10, 5, 10]} intensity={0.5} color="#9d4edd" />

      <Environment preset="night" />
      <Grid />
      <AxisLabel />

      {array.map((val, i) => (
        <Bar
          key={i}
          value={val}
          index={i}
          total={array.length}
          maxVal={maxVal}
          state={getState(i)}
        />
      ))}

      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={8}
        maxDistance={35}
      />
    </Canvas>
  )
}
