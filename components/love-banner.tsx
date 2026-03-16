"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LoveBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".love-banner-image",
        { scale: 1.05, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
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
      <div className="relative w-full love-banner-image">
        <Link href="/product/5" className="block cursor-pointer">
          <Image
            src="/love-robot-banner.png"
            alt="Love Simulation Collection"
            width={2880}
            height={1400}
            className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.02]"
            priority
          />
        </Link>
      </div>
    </section>
  );
}
