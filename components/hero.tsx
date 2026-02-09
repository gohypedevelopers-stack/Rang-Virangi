"use client";

import Image from "next/image";

export function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-neutral-900">
      {/* Image Container */}
      <div className="absolute inset-0">
        <Image
          src="/hero_streetwear.png"
          alt="Streetwear Fashion collection"
          fill
          className="object-cover object-center opacity-90"
          priority
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-20 px-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-4 drop-shadow-lg">
          Urban <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
            Collection
          </span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-lg mb-8 font-light">
          Redefining streetwear with bold designs and premium quality.
          Experience the new wave of fashion.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
            Shop Now
          </button>
          <button className="border border-white text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
            View Lookbook
          </button>
        </div>
      </div>
    </div>
  );
}
