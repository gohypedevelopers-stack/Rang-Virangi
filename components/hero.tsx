"use client";

export function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Video Container */}
      <div className="absolute inset-0">
        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-destop.png"
          className="hidden md:block w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Mobile Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-phone.png"
          className="block md:hidden w-full h-full object-cover"
        >
          <source src="/hero-phone.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
