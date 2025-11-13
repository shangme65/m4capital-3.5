'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function FloatingParticles() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.02;
  });
  return (
    <group ref={group}>
      <Stars radius={120} depth={50} count={4000} factor={4} saturation={0} fade speed={0.8} />
    </group>
  );
}

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} />
        <FloatingParticles />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,130,255,0.15),rgba(0,0,0,0.9))] mix-blend-screen animate-pulseSlow" />
    </div>
  );
};