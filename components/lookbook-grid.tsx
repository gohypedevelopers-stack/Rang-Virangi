"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lookbookItems = [
  {
    label: "STREET ESSENTIAL",
    sublabel: "Oversized Comfort",
    span: "row-span-2",
    aspect: "aspect-[3/4]",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "MINIMAL DRAPE",
    sublabel: "Bamboo Blend",
    span: "",
    aspect: "aspect-square",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "DAILY ARMOR",
    sublabel: "Regular Fit",
    span: "",
    aspect: "aspect-square",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    label: "URBAN FLOW",
    sublabel: "Movement Ready",
    span: "col-span-2",
    aspect: "aspect-[16/9]",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
  },
];

export function LookbookGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const headingText = "THE LOOKBOOK";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Character-by-character heading reveal
      headingCharsRef.current.forEach((char, i) => {
        if (!char) return;
        gsap.fromTo(
          char,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Grid items clip-path wipe reveal
      gridItemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 1,
            delay: i * 0.12,
            ease: "power3.inOut",
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

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-20 md:py-28 px-4 md:px-8 border-t border-neutral-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Split-text heading */}
        <h2 className="text-center text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-14 md:mb-20">
          {headingText.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                headingCharsRef.current[i] = el;
              }}
              className="inline-block"
              style={{ opacity: 0 }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-auto">
          {lookbookItems.map((item, i) => (
            <div
              key={item.label}
              ref={(el) => {
                gridItemsRef.current[i] = el;
              }}
              className={`group relative overflow-hidden cursor-pointer ${item.span} ${item.aspect}`}
              style={{ opacity: 0 }}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes={
                  item.span === "col-span-2"
                    ? "(max-width: 768px) 100vw, 66vw"
                    : item.span === "row-span-2"
                      ? "(max-width: 768px) 50vw, 33vw"
                      : "(max-width: 768px) 50vw, 33vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/80" />

              {/* Content — always visible at bottom */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-1 transition-colors duration-300 group-hover:text-white/80">
                  {item.sublabel}
                </p>
                <h3 className="text-white text-sm md:text-lg font-bold tracking-wider transition-transform duration-300 group-hover:translate-x-2">
                  {item.label}
                </h3>
              </div>

              {/* Corner accent */}
              <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-t border-r border-white/15 group-hover:border-white/40 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
