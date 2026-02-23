"use client";

import Link from "next/link";

export function VideoBanner() {
  return (
    <section className="w-full bg-white border-t border-neutral-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-neutral-200">
        <p className="text-black text-xs md:text-sm uppercase tracking-[0.3em] font-light">
          Extension of Your Expression
        </p>
        <Link
          href="/shop"
          className="px-4 py-2 border border-black text-black text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
        >
          Discover More
        </Link>
      </div>

      {/* Video Container */}
      <div className="relative w-full bg-black overflow-hidden flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover md:aspect-[21/9]"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </section>
  );
}
