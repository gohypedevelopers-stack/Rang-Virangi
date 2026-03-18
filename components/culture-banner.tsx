"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CultureBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".culture-banner-image",
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
      className="w-full h-full relative overflow-hidden bg-neutral-200"
    >
      <div className="relative w-full h-full culture-banner-image">
        <Link href="/product/1" className="block cursor-pointer w-full h-full">
          <Image
            src="/culture-banner.png"
            alt="Rang Virangi Culture Symphony Tour"
            fill
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            priority
          />
        </Link>
      </div>
    </section>
  );
}
