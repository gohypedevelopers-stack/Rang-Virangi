"use client";

export function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Video Container */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
