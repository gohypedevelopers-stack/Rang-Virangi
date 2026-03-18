"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Model({ url, fastSpin }: { url: string; fastSpin: boolean }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      // Combine horizontal and vertical rotation for a "flipping" feel
      modelRef.current.rotation.y = t * (fastSpin ? 5 : 0.5);
      modelRef.current.rotation.x = Math.sin(t * 0.5) * 2; // Powerful vertical flip back and forth
    }
  });

  return (
    <primitive ref={modelRef} object={scene} scale={2.5} rotation={[0, 0, 0]} />
  );
}

export default function CoinModel() {
  const [isMobile, setIsMobile] = useState(false);
  const [fastSpin, setFastSpin] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="w-full h-full flex items-center justify-center pointer-events-auto touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={() => setFastSpin(true)}
      onPointerUp={() => setFastSpin(false)}
      onPointerLeave={() => setFastSpin(false)}
      onPointerCancel={() => setFastSpin(false)}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 5] }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={false}>
            <Model url="/rv.glb" fastSpin={fastSpin} />
          </Stage>
        </Suspense>

        {/* Orbit controls handle the rotation smoothly */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI} 
          minPolarAngle={0}       
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/rv.glb");

