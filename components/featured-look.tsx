"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

export function FeaturedLook() {
  const sectionRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();

  const bombayProduct = {
    id: 6,
    name: "Bombay Sapphire Edition Tee",
    variant: "WHITE",
    price: 1599,
    originalPrice: 1999,
    image: "/artwork.jpg",
    isSale: true,
    inStock: true,
    collection: "shop" as const,
    category: "Tees" as const,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const img = e.currentTarget
      .closest(".featured-image")
      ?.querySelector("img") as HTMLImageElement;
    if (img) addToCart(bombayProduct, img);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-image",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
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
      className="w-full bg-[#5eb4ae] text-white py-20 px-4 md:px-8 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex flex-col mb-16 relative z-10">
          <p className="text-[10px] text-white/60 uppercase tracking-[0.5em] mb-4 font-bold">
            Botanical Symphony
          </p>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif italic text-white leading-tight tracking-wide drop-shadow-xl">
            BOMBAY SAPPHIRE <br />
            <span className="font-sans font-black uppercase text-cyan-900 tracking-tighter opacity-80">EDITION</span>
          </h2>
          <p className="max-w-xl mt-8 text-white/80 font-medium uppercase tracking-widest text-xs md:text-sm border-l-2 border-white/20 pl-6 backdrop-blur-sm bg-black/5 py-4">
            Vapour infused botanical artwork beautifully printed on our
            signature 240GSM heavyweight oversized tees. A fusion of spirits 
            and streetwear.
          </p>
        </div>

        {/* 4-Image Aesthetic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 scroll-reveal">
          {[
            "/products/bombay-sapphire-sage-tee-front.jpeg",
            "/products/bombay-sapphire-sage-tee-back.jpeg",
            "/bombay-banner.jpg",
            "/artwork.jpg",
          ].map((src, idx) => (
            <div key={idx} className="group relative aspect-[3/4] overflow-hidden bg-white featured-image shadow-2xl">
              <Image
                src={src}
                alt={`Bombay Sapphire - Visual ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-cyan-950/10 group-hover:bg-cyan-950/0 transition-colors duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-end">
          <Link
            href="/product/6"
            className="group inline-flex items-center gap-6 bg-cyan-900/40 backdrop-blur-md border border-white/20 px-10 py-5 font-black uppercase text-xs md:text-sm tracking-widest text-white hover:bg-white hover:text-cyan-950 transition-all cursor-pointer shadow-lg"
          >
            <span>Run Botanicals</span>
            <span className="text-xl leading-none group-hover:translate-x-2 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>

  );
}
