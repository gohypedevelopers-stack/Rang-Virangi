"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ImageBannerBottom() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle parallax effect on the image
      gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative overflow-hidden bg-black mt-1"
    >
      {/* Banner container - maintain original aspect ratio to avoid clipping */}
      <div className="relative w-full overflow-hidden flex items-center justify-center">
        <Image
          ref={imageRef}
          src="/banner-bottom.png"
          alt="Bottom Banner Artwork"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
