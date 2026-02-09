"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "STREET READY",
    subtitle: "DROP 01",
    description: "Limited edition pieces that define your vibe",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200&auto=format&fit=crop",
    link: "/shop/collection/street-ready",
    accent: "from-purple-500/20 to-transparent",
  },
  {
    id: 2,
    title: "MINIMAL FLEX",
    subtitle: "ESSENTIALS",
    description: "Basics that hit different",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop",
    link: "/shop/collection/minimal-flex",
    accent: "from-cyan-500/20 to-transparent",
  },
  {
    id: 3,
    title: "NIGHT MODE",
    subtitle: "AFTER DARK",
    description: "When the sun sets, we shine",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    link: "/shop/collection/night-mode",
    accent: "from-pink-500/20 to-transparent",
  },
  {
    id: 4,
    title: "CORE DROP",
    subtitle: "NEW IN",
    description: "Fresh arrivals. No cap.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
    link: "/shop/new",
    accent: "from-amber-500/20 to-transparent",
  },
];

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="w-full bg-black py-8 md:py-16 border-t border-neutral-800">
      {/* Section Header */}
      <div className="px-4 md:px-8 mb-6 md:mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-lg md:text-2xl font-bold uppercase tracking-widest">
            Featured Drops
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-neutral-500 text-xs uppercase tracking-wider hidden sm:block">
              Swipe for more
            </span>
            <div className="flex gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-white w-6"
                      : "bg-neutral-600 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 px-4 md:px-8">
              <Link href={slide.link} className="block group">
                <div className="relative aspect-16/9 md:aspect-21/9 overflow-hidden">
                  {/* Background Image */}
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={slide.id === 1}
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                    {/* Subtitle Tag */}
                    <span className="inline-block w-fit text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/70 border border-white/30 px-3 py-1 mb-3 backdrop-blur-sm">
                      {slide.subtitle}
                    </span>

                    {/* Title */}
                    <h3 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none mb-2">
                      {slide.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm md:text-base uppercase tracking-wide mb-4 max-w-md">
                      {slide.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-white text-xs uppercase tracking-widest font-medium group-hover:gap-4 transition-all duration-300">
                      <span>Shop Now</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Glowing Border Effect on Hover */}
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 group z-10"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 group z-10"
        >
          <svg
            className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Slide Counter */}
      <div className="px-4 md:px-8 mt-6 flex items-center justify-between">
        <div className="text-neutral-500 text-xs uppercase tracking-wider">
          <span className="text-white font-bold">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="mx-2">/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-neutral-500 text-xs uppercase tracking-wider hover:text-white transition-colors flex items-center gap-2"
        >
          {isAutoPlaying ? (
            <>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Auto
            </>
          ) : (
            <>
              <span className="w-2 h-2 bg-neutral-500 rounded-full" />
              Paused
            </>
          )}
        </button>
      </div>
    </section>
  );
}
