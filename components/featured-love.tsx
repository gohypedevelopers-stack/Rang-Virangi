"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

export function FeaturedLove() {
  const sectionRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();

  const loveProduct = {
    id: 998,
    name: "Love Simulation Edition Tee",
    variant: "WHITE",
    price: 1095,
    originalPrice: 1999,
    image: "/love-tee-mock.jpg",
    isSale: true,
    inStock: true,
    collection: "shop" as const,
    category: "Tees" as const,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const img = e.currentTarget
      .closest(".featured-love-image")
      ?.querySelector("img") as HTMLImageElement;
    if (img) addToCart(loveProduct, img);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-love-image",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-white py-20 px-4 md:px-8 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex flex-col mb-16 relative z-10">
          <p className="text-[10px] text-white/40 uppercase tracking-[0.6em] mb-4 font-bold">
            Data Protocol [LOVE_01]
          </p>
          <h2 className="text-4xl md:text-7xl lg:text-9xl font-black uppercase text-white leading-[0.85] tracking-tight">
            LOVE <br />
            <span className="text-neutral-600 font-mono scale-x-110 block mt-2">SIMULATION</span>
          </h2>
          <p className="max-w-xl mt-8 text-white/50 font-mono uppercase tracking-[0.2em] text-[10px] md:text-xs leading-relaxed border-l border-white/20 pl-6">
            A futuristic take on romance. Merging glitch aesthetics with 
            high-fidelity textile engineering. Error: Love not found.
          </p>
        </div>

        {/* 4-Image Aesthetic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
          {[
            "/products/love-simulation-red-poster.jpeg",
            "/products/love-simulation-red-poster-alt.jpeg",
            "/products/love-simulation-yellow-poster.jpeg",
            "/products/love-simulation-yellow-poster-alt.jpeg",
          ].map((src, idx) => (
            <div key={idx} className="group relative aspect-[3/4] overflow-hidden bg-neutral-900 featured-love-image brightness-90 hover:brightness-100 transition-all duration-700">
              <Image
                src={src}
                alt={`Love Simulation - Visual ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 border border-white/5 group-hover:border-white/20 transition-colors pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-between items-end">
          <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest hidden md:block">
            System Status: Active // Collection: Featured
          </div>
          <Link
            href="/product/5"
            className="group flex items-center gap-6 bg-white text-black px-10 py-5 font-black uppercase text-sm tracking-widest hover:bg-neutral-200 transition-all cursor-pointer"
          >
            <span>Run Simulation</span>
            <span className="text-xl leading-none group-hover:translate-x-2 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>

  );
}
