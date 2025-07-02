import * as THREE from 'three'
import { useTexture } from "@react-three/drei"
import { useRef } from "react"
import { ThreeElements } from '@react-three/fiber'

export function Beam({ children, position, stride = 4, width = 8, ...props }: {
  children: React.ReactNode
  position?: THREE.Vector3
  stride?: number
  width?: number
} & ThreeElements['group']) {
  const streaks = useRef(null)
  const glow = useRef(null)
  const reflect = useRef(null)
  const [streakTexture, glowTexture] = useTexture(['/textures/lensflare/lensflare2.png', '/textures/lensflare/lensflare0_bw.jpg'])

  const obj = new THREE.Object3D()
  const f = new THREE.Vector3()
  const t = new THREE.Vector3()
  const n = new THREE.Vector3()

  const config = {
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  }

  let i = 0
  let range = 0

  return (
    <group position={position}>
      {children}
    </group>
  )
}