"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  PresentationControls,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const autoRotateRef = useRef<THREE.Group>(null);
  const mouseTiltRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (autoRotateRef.current) {
      // Very slow continuous base rotation to not interfere with user
      autoRotateRef.current.rotation.y += 0.01;
    }

    if (mouseTiltRef.current) {
      // Subtle mouse influence (tilting)
      const targetRotationX = -state.mouse.y * 0.1;
      const targetRotationY = state.mouse.x * 0.1;

      mouseTiltRef.current.rotation.x = THREE.MathUtils.lerp(
        mouseTiltRef.current.rotation.x,
        targetRotationX,
        0.1
      );
      mouseTiltRef.current.rotation.y = THREE.MathUtils.lerp(
        mouseTiltRef.current.rotation.y,
        targetRotationY,
        0.1
      );
    }
  });

  return (
    <group ref={mouseTiltRef}>
      <group ref={autoRotateRef}>
        <primitive object={scene} scale={3} rotation={[0, 0, 0]} />
      </group>
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
          <PresentationControls
            speed={5.0} // High speed for immediate response while dragging
            global={true}
            cursor={true}
            snap={false}
            // @ts-ignore - config is supported by drei but may have type issues in some versions
            config={{ mass: 1, tension: 300, friction: 10 }} // Low mass and friction for "free" movement
            polar={[-Infinity, Infinity]}
            azimuth={[-Infinity, Infinity]}
          >
            <Stage environment="city" intensity={0.5} adjustCamera={false}>
              <Model url="/rv.glb" />
            </Stage>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/rv.glb");
