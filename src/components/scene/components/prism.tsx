import * as THREE from 'three'
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei"
import { type ThreeElements, type ThreeEvent } from "@react-three/fiber"

export function Prism({
  onPointerOver,
  onPointerOut,
  onPointerMove,
  ...props
}: {
  onPointerOver: (event: ThreeEvent<PointerEvent>) => void
  onPointerOut: (event: ThreeEvent<PointerEvent>) => void
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void 
} &  ThreeElements['group']) {
  const { nodes } = useGLTF('/gltf/prism.glb');

  return (
    <group {...props}>
      <mesh visible={false} scale={1.9} rotation={[Math.PI / 2, Math.PI, 0]} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onPointerMove={onPointerMove} >
        <cylinderGeometry args={[1, 1, 1, 3, 1]} />
      </mesh>
      {/* The visible hi-res prism */}
      <mesh position={[0, 0, 0.6]} renderOrder={10} scale={2} dispose={null} geometry={(nodes.Cone as THREE.Mesh).geometry}>
        <MeshTransmissionMaterial clearcoat={1} transmission={1} thickness={0.9} roughness={0} anisotropy={0.1} chromaticAberration={1} toneMapped={false} />
      </mesh>
    </group>
  )
}