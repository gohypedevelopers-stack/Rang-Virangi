"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, Draggable);

const topSellers = [
  {
    id: 14,
    name: "Sugar Daddy",
    image: "/products/sugar-daddy-navy-tee-back.jpeg",
    tag: "BEST SELLER",
  },
  {
    id: 6,
    name: "Rage Tiger",
    image: "/products/tiger-tshirt.jpeg",
    tag: "TRENDING",
  },
  {
    id: 13,
    name: "Fangs Before Feelings",
    image: "/products/blue-lips-navy-tee-back.jpeg",
    tag: "NEW",
  },
  {
    id: 5,
    name: "Apsara Aura",
    image: "/products/apsara-aura-black-tee-back.jpeg",
    tag: "HOT",
  },
  {
    id: 12,
    name: "Robosexual",
    image: "/products/bombay-sapphire-sage-tee-back.jpeg",
    tag: "POPULAR",
  },
];

// Duplicate items for seamless infinite loop
const loopItems = [...topSellers, ...topSellers];

export function TopSelling() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Calculate the width of one set of items
    const cards = track.querySelectorAll<HTMLElement>(".top-sell-card");
    const singleSetWidth = Array.from(cards)
      .slice(0, topSellers.length)
      .reduce((acc, card) => acc + card.offsetWidth + 16, 0); // 16 = gap

    // GSAP infinite scroll animation
    animRef.current = gsap.to(track, {
      x: -singleSetWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          return parseFloat(x as unknown as string) % singleSetWidth;
        }),
      },
    });

    // Pause on hover
    const handleMouseEnter = () => animRef.current?.pause();
    const handleMouseLeave = () => animRef.current?.resume();

    track.addEventListener("mouseenter", handleMouseEnter);
    track.addEventListener("mouseleave", handleMouseLeave);

    // Make it draggable
    const draggable = Draggable.create(track, {
      type: "x",
      inertia: true,
      bounds: { minX: -singleSetWidth, maxX: 0 },
      onDragStart: () => {
        animRef.current?.pause();
      },
      onDragEnd: () => {
        animRef.current?.resume();
      },
      cursor: "grab",
      activeCursor: "grabbing",
    });

    return () => {
      animRef.current?.kill();
      draggable[0]?.kill();
      track.removeEventListener("mouseenter", handleMouseEnter);
      track.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-10 md:py-14 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 md:px-8 mb-6 md:mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-[2px] bg-black" />
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-medium">
              Most Loved
            </p>
          </div>
          <h2 className="text-xl md:text-3xl font-black text-black tracking-tight">
            TOP SELLERS
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-[10px] md:text-xs font-bold text-black uppercase tracking-widest border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-all"
        >
          See All
        </Link>
      </div>

      {/* Infinite scrolling track */}
      <div className="relative cursor-grab active:cursor-grabbing">
        <div
          ref={trackRef}
          className="flex gap-4 pl-4 md:pl-8 will-change-transform"
        >
          {loopItems.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="top-sell-card shrink-0 w-[240px] md:w-[280px] group"
            >
              <Link href={`/product/${item.id}`} draggable={false}>
                <div className="relative aspect-3/4 overflow-hidden bg-neutral-100 rounded-sm select-none">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Hover overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-sm font-black tracking-wide uppercase">
                      {item.name}
                    </p>
                    <p className="text-white/60 text-[10px] uppercase tracking-widest mt-1">
                      Shop Now →
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 px-0.5">
                  <h3 className="text-black text-[10px] md:text-[10px] font-bold uppercase tracking-[0.15em] truncate">
                    {item.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
