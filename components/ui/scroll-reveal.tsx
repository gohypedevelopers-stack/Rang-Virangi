"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "scale-in" | "rotate-in";
  delay?: number;
  duration?: number;
}

export function ScrollReveal({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let fromVars: gsap.TweenVars = { opacity: 0, y: 50 };

    if (animation === "scale-in") {
      fromVars = { opacity: 0, scale: 0.8 };
    } else if (animation === "rotate-in") {
      fromVars = { opacity: 0, rotation: 10, y: 50 };
    }

    gsap.fromTo(element, fromVars, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: duration,
      delay: delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%", // Trigger when top of element hits 85% of viewport height
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [animation, delay, duration]);

  return (
    <div ref={elementRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
