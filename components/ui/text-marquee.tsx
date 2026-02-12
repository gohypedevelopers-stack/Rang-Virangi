"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface TextMarqueeProps {
  text: string;
  className?: string;
  direction?: "left" | "right";
  speed?: number; // duration in seconds for one full cycle
}

export function TextMarquee({
  text,
  className,
  direction = "left",
  speed = 20,
}: TextMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // We have two identical sets of content in the scroller.
    // To scroll seamlessly, we move the scroller by 50% of its width (which is exactly one set of content).
    // When it reaches -50%, we reset it to 0.

    const context = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      if (direction === "left") {
        tl.to(scroller, {
          xPercent: -50,
          duration: speed,
        });
      } else {
        // For right direction, we start at -50% and move to 0
        gsap.set(scroller, { xPercent: -50 });
        tl.to(scroller, {
          xPercent: 0,
          duration: speed,
        });
      }
    }, containerRef);

    return () => context.revert();
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden whitespace-nowrap w-full select-none flex",
        className,
      )}
    >
      <div ref={scrollerRef} className="flex min-w-full w-max">
        {/* First copy */}
        <div className="flex shrink-0 items-center">
          {/* Repeat text multiple times to ensure it fills screen if short */}
          {[...Array(16)].map((_, i) => (
            <span key={`1-${i}`} className="mx-6">
              {text}
            </span>
          ))}
        </div>
        {/* Second copy for seamless loop */}
        <div className="flex shrink-0 items-center">
          {[...Array(16)].map((_, i) => (
            <span key={`2-${i}`} className="mx-6">
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
