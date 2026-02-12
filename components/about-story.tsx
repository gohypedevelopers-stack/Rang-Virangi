"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyCards = [
  {
    tag: "THE STORY",
    title: "Born From Frustration",
    body: "Rang Virangi was born from a mission to rebuild the everyday wardrobe from the fabric up. We discovered the answer in bamboo cotton — nature's most underrated luxury fiber.",
    accent: "border-amber-700/40",
    glow: "bg-amber-900/10",
    number: "01",
  },
  {
    tag: "WHY BAMBOO?",
    title: "Quality Isn't Seasonal",
    body: "Bamboo fabric lasts longer, feels smoother, and leaves a lighter footprint on the planet. It's sustainable luxury — not a gimmick, but a mindset.",
    accent: "border-emerald-700/40",
    glow: "bg-emerald-900/10",
    number: "02",
  },
  {
    tag: "THE CRAFT",
    title: "Softer Than Cotton",
    body: "Naturally breathable and thermoregulating. It moves with you, not against you. Every thread feels calm, cool, and clean — made to be worn every damn day.",
    accent: "border-sky-700/40",
    glow: "bg-sky-900/10",
    number: "03",
  },
  {
    tag: "THE VISION",
    title: "Redefining Basics",
    body: "We stand for balance — between comfort and style, function and emotion, street and sophistication. Not cheap. Not common — but crafted, considered, and timeless.",
    accent: "border-violet-700/40",
    glow: "bg-violet-900/10",
    number: "04",
  },
];

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide in
      gsap.fromTo(
        headingRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Intro card fade
      gsap.fromTo(
        introRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards stagger in
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Footer text
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-20 md:py-28 px-4 md:px-8 border-t border-neutral-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-10 md:mb-14" style={{ opacity: 0 }}>
          <p className="text-neutral-500 text-[10px] md:text-xs uppercase tracking-[0.4em] mb-3">
            Our Story
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-none">
            RANG VIRANGI
          </h2>
        </div>

        {/* Intro card — full width */}
        <div
          ref={introRef}
          className="relative mb-6 md:mb-8 p-6 md:p-10 border border-neutral-200 bg-neutral-50 overflow-hidden"
          style={{ opacity: 0 }}
        >
          {/* Subtle corner accent */}
          <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-b border-r border-neutral-300" />
          <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-t border-l border-neutral-300" />

          <p className="text-black text-base md:text-xl lg:text-2xl tracking-wide leading-relaxed max-w-4xl">
            India&apos;s fashion scene has evolved fast —{" "}
            <span className="text-neutral-500">
              but something essential was missing.
            </span>
          </p>
          <p className="text-neutral-600 text-sm md:text-base tracking-wide leading-relaxed mt-4 max-w-3xl">
            Between fast fashion and luxury hype, quality basics were forgotten.
            The market overflowed with cotton tees that looked premium on launch
            day but lost their soul after two washes.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {storyCards.map((card, i) => (
            <div
              key={card.number}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={`group relative p-6 md:p-8 border ${card.accent} bg-white overflow-hidden transition-all duration-500 hover:border-opacity-80 shadow-sm`}
              style={{ opacity: 0 }}
            >
              {/* Background glow */}
              <div
                className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${card.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              />

              {/* Number watermark */}
              <span className="absolute top-4 right-5 md:top-5 md:right-7 text-neutral-100 text-5xl md:text-7xl font-black select-none pointer-events-none group-hover:text-neutral-200/50 transition-colors duration-500">
                {card.number}
              </span>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-neutral-500 text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-semibold mb-3">
                  {card.tag}
                </p>
                <h3 className="text-black text-lg md:text-xl font-bold tracking-wide mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {card.title}
                </h3>
                <p className="text-neutral-600 text-sm md:text-base leading-relaxed tracking-wide">
                  {card.body}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-linear-to-r from-black/20 to-transparent group-hover:w-full transition-all duration-700 ease-out" />
            </div>
          ))}
        </div>

        {/* Footer tagline */}
        <p
          ref={footerRef}
          className="text-center text-neutral-500 text-xs md:text-sm tracking-[0.3em] uppercase mt-12 md:mt-16"
          style={{ opacity: 0 }}
        >
          Made for those who demand more — even from the simplest things.
        </p>
      </div>
    </section>
  );
}
