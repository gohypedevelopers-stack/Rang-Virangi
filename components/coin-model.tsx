"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useInView } from "framer-motion";

function Model({ url, fastSpin, inView }: { url: string; fastSpin: boolean; inView: boolean }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!inView) return;
    if (modelRef.current) {
      const t = state.clock.getElapsedTime();
      // Continuous 360 rotations on both axes
      modelRef.current.rotation.y = t * (fastSpin ? 5 : 0.8);
      modelRef.current.rotation.x = t * (fastSpin ? 3 : 0.4); 
    }
  });

  return (
    <primitive ref={modelRef} object={scene} scale={2.5} rotation={[0, 0, 0]} />
  );
}

export default function CoinModel() {
  const [fastSpin, setFastSpin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  // amount: 0 ensures it triggers as soon as even 1px is in view
  const isInView = useInView(containerRef, { amount: 0, margin: "100px" });

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center pointer-events-auto touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={() => setFastSpin(true)}
      onPointerUp={() => setFastSpin(false)}
      onPointerLeave={() => setFastSpin(false)}
      onPointerCancel={() => setFastSpin(false)}
    >
      <Canvas
        dpr={typeof window !== 'undefined' && window.devicePixelRatio > 1 ? [1, 1.5] : [1, 1]}
        camera={{ fov: 45, position: [0, 0, 5] }}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true
        }}
        frameloop={isInView ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={false}>
            <Model url="/rv.glb" fastSpin={fastSpin} inView={isInView} />
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
          makeDefault
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/rv.glb");

