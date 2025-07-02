'use client'

import * as THREE from 'three'
import { useRef, useMemo, Suspense, useState, useCallback, useEffect } from 'react'
import { Canvas, ThreeEvent, useFrame, useLoader } from '@react-three/fiber'
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'
import { Prism } from './components/prism'
import { calculateRefractionAngle } from '@/lib/three-utils'
import { Rainbow } from './components/rainbow'
import { Beam } from './components/beam'

import { useControls } from 'leva'

const path = '/lut/F-6800-STD.cube' 

export default function Main() { 
  const cameraRef = useRef<THREE.Camera>(null);

  useControls('Camera', {
    distance: {
      value: 100,
      min: 50,
      max: 500,
      step: 1,
      onChange: (v, path, context) => updateCamera({ distance: v }),
    },
    phi: {
      value: 0,
      min: 0,
      max: Math.PI * 2,
      step: 0.1,
      label: 'Horizontal Angle',
      onChange: (v) => updateCamera({ phi: v }),
    },
    theta: {
      value: 0,
      min: 0,
      max: Math.PI,
      step: 0.1,
      label: 'Vertical Angle',
      onChange: (v) => updateCamera({ theta: v }),
    },
  })
  
  const stateRef = useRef({
    distance: 400,
    phi: 0,
    theta: Math.PI / 2,
  })
  
  function updateCamera(changes: Partial<typeof stateRef.current>) {
    Object.assign(stateRef.current, changes)
    const { distance, phi, theta } = stateRef.current
  
    if (cameraRef.current) {
      const x = distance * Math.sin(theta) * Math.cos(phi)
      const y = distance * Math.sin(theta) * Math.sin(phi)
      const z = distance * Math.cos(theta)
      cameraRef.current.position.set(x, y, z)
      cameraRef.current.lookAt(0, 0, 0)
      cameraRef.current.updateMatrixWorld()
    }
  }
  
  const texture = useLoader(LUTCubeLoader, path) as THREE.Texture
  return (
    <Canvas 
      orthographic 
      camera={{ position: [0, 0, 100], zoom: 70 }}
      onCreated={({ camera }) => {
        cameraRef.current = camera
      }}
    >
      <color attach="background" args={['black']} />
      <Suspense fallback={null}>
        <Scene />
        <EffectComposer>
          <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
          <LUT lut={texture} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

function Scene() {
  const [isPrismHit, hitPrism] = useState(false)
  const ambient = useRef<THREE.AmbientLight>(null)
  const spot = useRef<THREE.SpotLight>(null)
  const rainbow = useRef<THREE.Mesh>(null)

  const onPointerOut = useCallback(() => { 
    hitPrism(false)
    console.log('out')
   }, [])
  const onPointerOver = useCallback((e: ThreeEvent<PointerEvent>) => { 
    e.stopPropagation()
    console.log('over')
    hitPrism(true)
   }, [])

  const vec = new THREE.Vector3()
  const onPointerMove = useCallback(({ point, normal }: ThreeEvent<PointerEvent>) => {
    if (!normal || !rainbow.current) return
    
    // Calculate refraction angles
    let angleScreenCenter = Math.atan2(-point.y, -point.x)
    const normalAngle = Math.atan2(normal.y, normal.x)
    // The angle between the ray and the normal
    const incidentAngle = angleScreenCenter - normalAngle
    const refractionAngle = calculateRefractionAngle(incidentAngle)
    // Apply the refraction
    angleScreenCenter += refractionAngle
    rainbow.current.rotation.z = angleScreenCenter
  }, [])
  return (
    <>
      <ambientLight ref={ambient} intensity={1} />
      <pointLight position={[10, -10, 0]} intensity={0.05} />
      <pointLight position={[0, 10, 0]} intensity={0.05} />
      <pointLight position={[-10, 0, 0]} intensity={0.05} />
      <spotLight ref={spot} intensity={1} distance={7} angle={1} penumbra={1} position={[0, 0, 1]} />
      <Beam>
        <Prism position={[0, -0.5, 0]} onPointerOver={onPointerOver} onPointerOut={onPointerOut} onPointerMove={onPointerMove} />
      </Beam>
      <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} />
    </>
  )
}