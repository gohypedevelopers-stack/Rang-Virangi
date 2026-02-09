"use client";

import { useState } from "react";

export function AboutStory() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full bg-black py-16 px-4 md:px-8 border-t border-neutral-800">
      <div className="w-full">
        {/* Header */}
        <h2 className="text-white text-sm md:text-base font-bold uppercase tracking-widest mb-8">
          RANG VIRANGI | ELEVATED ESSENTIALS
        </h2>

        {/* Intro */}
        <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed mb-8">
          India&apos;s fashion scene has evolved fast -{" "}
          <span className="text-neutral-400 font-semibold">
            but something essential was missing.
          </span>
        </p>

        <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed mb-12">
          Between fast fashion and luxury hype, quality basics were forgotten.
          The market overflowed with cotton tees that looked premium on launch
          day but lost their soul after two washes.
        </p>

        {/* Expandable Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          {/* The Story */}
          <div className="mb-12">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              THE STORY
            </h3>
            <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed mb-4">
              Rang Virangi was born from that frustration - and a mission to
              rebuild the everyday wardrobe from the fabric up.
            </p>
            <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed">
              We discovered the answer in bamboo cotton - nature&apos;s most
              underrated luxury fiber. Softer than conventional cotton,
              naturally breathable, and thermoregulating. It moves with you, not
              against you. Every thread feels calm, cool, and clean - made to be
              worn every damn day.
            </p>
          </div>

          {/* Why Bamboo */}
          <div className="mb-12">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              WHY BAMBOO?
            </h3>
            <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed mb-4">
              Because quality shouldn&apos;t be seasonal.
            </p>
            <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed mb-4">
              Bamboo fabric lasts longer, feels smoother, and{" "}
              <span className="text-neutral-400 font-semibold">
                leaves a lighter footprint on the planet.
              </span>
            </p>
            <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed mb-4">
              It&apos;s sustainable luxury - not a gimmick, but a mindset.
            </p>
            <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed">
              Our tees aren&apos;t built to shout. They&apos;re built to stay.
              To become your everyday armor - minimal, elevated, essential.
            </p>
          </div>

          {/* The Vision */}
          <div className="mb-12">
            <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              THE VISION
            </h3>
            <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed mb-4">
              Rang Virangi stands for balance - between comfort and style,
              function and emotion, street and sophistication.
            </p>
            <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed mb-4">
              We&apos;re redefining what &quot;basics&quot; mean in India. Not
              cheap. Not common - but crafted, considered, and timeless.
            </p>
            <p className="text-white text-sm md:text-base uppercase tracking-wide leading-relaxed">
              <span className="text-neutral-400 font-semibold">
                Rang Virangi | Made for those who demand more - even from the
                simplest things.
              </span>
            </p>
          </div>
        </div>

        {/* Read More/Less Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white text-xs uppercase tracking-widest font-semibold hover:text-neutral-400 transition-colors duration-300 underline underline-offset-4"
        >
          {isExpanded ? "READ LESS" : "READ MORE"}
        </button>
      </div>
    </section>
  );
}
