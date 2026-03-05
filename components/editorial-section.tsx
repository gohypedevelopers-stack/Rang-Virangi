"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function EditorialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const editorialItems = [
    {
      image: "/products/bombay-sapphire-sage-tee-back.jpeg",
      label: "ROBOSEXUAL",
      sublabel: "Love Is Just Another Simulation",
    },
    {
      image: "/products/rage-tiger-black-tee-back.jpeg",
      label: "BOMBAY SAPPHIRE",
      sublabel: "Unleash The Beast Within",
    },
    {
      image: "/products/sugar-daddy-navy-tee-back.jpeg",
      label: "SUGAR DADDY",
      sublabel: "Dripping In Dollars",
    },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-black overflow-hidden">
      {/* Editorial — asymmetric bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left: large featured card */}
        <div
          ref={(el) => {
            imagesRef.current[0] = el;
          }}
          className="group relative hidden md:block"
          style={{ opacity: 0 }}
        >
          <Link href="/shop" className="block">
            <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden bg-neutral-950">
              <Image
                src={editorialItems[0].image}
                alt={editorialItems[0].label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p className="text-neutral-400 text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2">
                  {editorialItems[0].sublabel}
                </p>
                <h3 className="text-white text-2xl md:text-4xl font-black tracking-tight">
                  {editorialItems[0].label}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                  <span>Shop Now</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right: 2 stacked cards */}
        <div className="grid grid-rows-2 gap-0">
          {editorialItems.slice(1).map((item, i) => (
            <div
              key={item.label}
              ref={(el) => {
                imagesRef.current[i + 1] = el;
              }}
              className="group relative"
              style={{ opacity: 0 }}
            >
              <Link href="/shop" className="block h-full">
                <div className="relative h-full min-h-[280px] md:min-h-0 overflow-hidden bg-neutral-950">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                    <p className="text-neutral-400 text-[9px] uppercase tracking-[0.4em] mb-1.5">
                      {item.sublabel}
                    </p>
                    <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
                      {item.label}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest group-hover:text-white transition-colors">
                      <span>Shop Now</span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
