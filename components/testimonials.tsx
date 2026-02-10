"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Arjun M.",
    location: "Mumbai",
    stars: 5,
    text: "Softest tee I've ever owned. Feels like a second skin — I ordered 4 more the same week.",
  },
  {
    name: "Sneha R.",
    location: "Bangalore",
    stars: 5,
    text: "Finally a brand that gets it. Premium quality without the logo-screaming nonsense.",
  },
  {
    name: "Karan D.",
    location: "Delhi",
    stars: 5,
    text: "Wore it through Delhi summer. Zero sweat patches. Bamboo cotton is no joke.",
  },
  {
    name: "Priya K.",
    location: "Pune",
    stars: 4,
    text: "The fit is insanely good. Oversized but structured — exactly what I was looking for.",
  },
  {
    name: "Rohan S.",
    location: "Hyderabad",
    stars: 5,
    text: "10 washes in and it still looks brand new. That never happens with my tees.",
  },
  {
    name: "Ananya T.",
    location: "Chennai",
    stars: 5,
    text: "My boyfriend stole mine. Had to order two more. That's how good these are.",
  },
  {
    name: "Vikram P.",
    location: "Kolkata",
    stars: 5,
    text: "Sustainable AND stylish? Rang Virangi just redefined basics for me.",
  },
  {
    name: "Meera J.",
    location: "Ahmedabad",
    stars: 4,
    text: "The drape, the texture, the color — everything about this tee feels expensive.",
  },
];

const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4, 8);

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          className={`w-3 h-3 ${i < count ? "text-white" : "text-neutral-700"}`}
          fill="currentColor"
        >
          <path d="M8 0l2.47 4.94L16 5.73l-4 3.87.94 5.46L8 12.47l-4.94 2.59L4 9.6 0 5.73l5.53-.79L8 0z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="shrink-0 w-[300px] md:w-[360px] bg-neutral-900/60 border border-neutral-800 p-6 md:p-7 backdrop-blur-sm">
      <StarRating count={testimonial.stars} />
      <p className="text-neutral-300 text-sm leading-relaxed mt-4 mb-5 tracking-wide">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white text-[10px] font-bold">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-white text-xs font-semibold tracking-wide">
            {testimonial.name}
          </p>
          <p className="text-neutral-600 text-[10px] tracking-wider uppercase">
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Row 1 — scroll left
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Row 2 — scroll right
      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current,
          { xPercent: -15 },
          {
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-20 md:py-28 border-t border-neutral-800 overflow-hidden"
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className="text-center mb-14 md:mb-20 px-4"
        style={{ opacity: 0 }}
      >
        <p className="text-neutral-500 text-[10px] md:text-xs uppercase tracking-[0.4em] mb-3">
          What People Are Saying
        </p>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          REAL REVIEWS
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4 md:mb-6">
        <div ref={row1Ref} className="flex gap-4 md:gap-6 pl-4">
          {/* Duplicate for seamless feel */}
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div>
        <div ref={row2Ref} className="flex gap-4 md:gap-6 pl-4">
          {[...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
