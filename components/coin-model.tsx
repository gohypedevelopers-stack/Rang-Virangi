"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, Environment } from "@react-three/drei";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const mouseTiltRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (mouseTiltRef.current) {
      // 1. Direct mapping of mouse to rotation.
      // Setting rotation multiplier higher than Math.PI (3.14) to achieve 180+ degrees
      // of rotation when the cursor hits the extreme top or bottom of the screen.
      const targetRotationX = -state.mouse.y * 3.5; // Up/down tilt 180+
      const targetRotationY = state.mouse.x * 3.5;  // Left/right tilt 180+

      // Increased interpolation factor (0.15 -> 0.3) for a much faster,
      // more responsive snap tracking your cursor from slow to fast movements.
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
  return (
    <div className="w-full h-[80vh] flex items-center justify-center pointer-events-auto">
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 5] }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} adjustCamera={false}>
            <Model url="/rv.glb" />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/rv.glb");
