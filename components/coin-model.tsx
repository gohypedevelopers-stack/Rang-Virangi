"use client";

import React, { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Model({ url, isMobile }: { url: string; isMobile: boolean }) {
  const { scene } = useGLTF(url);
  const mouseTiltRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (isMobile) return; // Let OrbitControls handle mobile interactions

    if (mouseTiltRef.current) {
      const targetRotationX = -state.mouse.y * 3.5;
      const targetRotationY = state.mouse.x * 3.5;

      mouseTiltRef.current.rotation.x = THREE.MathUtils.lerp(
        mouseTiltRef.current.rotation.x,
        targetRotationX,
        0.3
      );
      mouseTiltRef.current.rotation.y = THREE.MathUtils.lerp(
        mouseTiltRef.current.rotation.y,
        targetRotationY,
        0.3
      );
    }
  });

  return (
    <group ref={mouseTiltRef}>
      <primitive object={scene} scale={3} rotation={[0, 0, 0]} />
    </group>
  );
}

export default function CoinModel() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={`w-full h-[50vh] md:h-[80vh] flex items-center justify-center pointer-events-auto ${isMobile ? 'touch-none' : ''}`}>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 5] }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={false}>
            <Model url="/rv.glb" isMobile={isMobile} />
          </Stage>
        </Suspense>
        {isMobile && (
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={false}
            dampingFactor={0.05}
          />
        )}
      </Canvas>
    </div>
  );
}

useGLTF.preload("/rv.glb");
