"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bannerImg from "../public/banner-love-sugar-daddy.png";

gsap.registerPlugin(ScrollTrigger);

export function ImageBanner() {
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
      className="w-full relative overflow-hidden bg-black"
    >
      {/* Banner container - maintain original aspect ratio to avoid clipping */}
      <div className="relative w-full overflow-hidden flex items-center justify-center">
        <Image
          src={bannerImg}
          alt="Love and Sugar Daddy Artwork"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />

        {/* Subtle gradient overlay to tie it into the dark theme */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>
    </section>
  );
}
