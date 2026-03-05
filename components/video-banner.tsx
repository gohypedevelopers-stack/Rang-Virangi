"use client";

import Link from "next/link";

export function VideoBanner() {
  return (
    <section className="w-full h-[100dvh] bg-black relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Overlay to make any potential text readable (if added later) */}
      <div className="absolute inset-0 bg-black/10" />
    </section>
  );
}
