"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image on scroll
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade overlay slightly on scroll for a reveal effect
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.85 },
        {
          opacity: 0.65,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center center",
            scrub: true,
          },
        },
      );

      // Heading: slide up + fade in
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Paragraph: slide up + fade in (slightly delayed)
      gsap.fromTo(
        paraRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Button: scale up + fade in
      gsap.fromTo(
        buttonRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
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
      className="relative w-full min-h-[70vh] flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Image with parallax */}
      <div ref={imageRef} className="absolute inset-0 -top-[15%] -bottom-[15%]">
        <Image
          src="/ctaImg.jpg"
          alt="Streetwear fashion backdrop"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60"
      />

      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl space-y-8 px-4 md:px-8 py-24">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight"
          style={{ opacity: 0 }}
        >
          ELEVATE YOUR EVERYDAY.
        </h2>
        <p
          ref={paraRef}
          className="text-neutral-300 text-lg md:text-xl tracking-wide max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          Experience the unmatched comfort of bamboo cotton. Sustainable,
          breathable, and built to last.
        </p>

        <div ref={buttonRef} className="pt-4" style={{ opacity: 0 }}>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm md:text-base font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 hover:gap-5"
          >
            Shop Collection
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
