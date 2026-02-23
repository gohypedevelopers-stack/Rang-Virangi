"use client";

export function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Desktop Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero-destop.png"
        className="hidden md:block absolute top-0 left-0 w-full h-full object-cover"
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
        poster="/hero-mobile.png"
        className="block md:hidden absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/hero-phone.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
