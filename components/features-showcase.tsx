"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path
          d="M24 4C18 4 14 10 14 16c0 8 10 20 10 20s10-12 10-20c0-6-4-12-10-12z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M24 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M18 32h12M20 36h8M22 40h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "ULTRA-SOFT",
    tagline: "Bamboo fibers 3× smoother than cotton",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M24 10v4M24 34v4M10 24h4M34 24h4M14 14l2.8 2.8M31.2 31.2l2.8 2.8M14 34l2.8-2.8M31.2 16.8L34 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "BREATHABLE",
    tagline: "Thermoregulating for all-day comfort",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path
          d="M24 6c-4 6-14 12-14 22a14 14 0 0 0 28 0C38 18 28 12 24 6z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M24 36c-2 0-6-2-6-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "ECO-FRIENDLY",
    tagline: "Sustainable fabric, lighter footprint",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect
          x="8"
          y="14"
          width="32"
          height="24"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M8 22h32" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M16 10v4M32 10v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 30l4 4 6-8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "LASTING QUALITY",
    tagline: "Built to endure wash after wash",
  },
];

export function FeaturesShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal line draw on scroll
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        },
      );

      // Heading fade in
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards stagger reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
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
      className="relative w-full bg-white py-20 md:py-28 px-4 md:px-8 border-t border-neutral-200 overflow-hidden"
    >
      {/* Animated horizontal line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-black/10 to-transparent origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      <div className="max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="text-center text-xs md:text-sm uppercase tracking-[0.4em] text-neutral-500 font-medium mb-16 md:mb-20"
          style={{ opacity: 0 }}
        >
          Why Bamboo Cotton?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group flex flex-col items-center text-center space-y-5"
              style={{ opacity: 0 }}
            >
              {/* Icon circle */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-neutral-200 flex items-center justify-center text-black transition-all duration-500 group-hover:border-black group-hover:bg-black/5 group-hover:scale-110">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-black text-xs md:text-sm font-bold tracking-[0.25em]">
                {feature.title}
              </h3>

              {/* Tagline */}
              <p className="text-neutral-600 text-[11px] md:text-xs tracking-wide leading-relaxed max-w-[180px]">
                {feature.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
