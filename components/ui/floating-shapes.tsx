"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const shapes = [
  {
    type: "square",
    color: "bg-neutral-200",
    size: "w-24 h-24",
    top: "20%",
    left: "80%",
  },
  {
    type: "square",
    color: "bg-black",
    size: "w-20 h-20",
    top: "40%",
    left: "50%",
  },
];

export function FloatingShapes({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    shapesRef.current.forEach((shape, i) => {
      if (!shape) return;

      // Random floating animation
      gsap.to(shape, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        rotation: "random(-15, 15)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.2,
      });

      // Mouse interaction
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 50; // value between -25 and 25
        const yPos = (clientY / window.innerHeight - 0.5) * 50;

        gsap.to(shape, {
          x: xPos * (i + 1) * 0.5, // Parallax effect
          y: yPos * (i + 1) * 0.5,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        gsap.killTweensOf(shape);
      };
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className,
      )}
    >
      {shapes.map((shape, index) => (
        <div
          key={index}
          ref={(el) => {
            shapesRef.current[index] = el;
          }}
          className={cn(
            "absolute opacity-60 backdrop-blur-3xl",
            shape.type === "circle" &&
              `rounded-full ${shape.color} ${shape.size}`,
            shape.type === "square" &&
              `rounded-xl ${shape.color} ${shape.size} rotate-12`,
            shape.type === "triangle" &&
              `w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent ${shape.color} rotate-45`,
          )}
          style={{ top: shape.top, left: shape.left }}
        />
      ))}
    </div>
  );
}
