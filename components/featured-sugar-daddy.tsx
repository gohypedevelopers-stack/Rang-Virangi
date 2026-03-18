"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

export function FeaturedSugarDaddy() {
  const sectionRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();

  const sugarDaddyProduct = {
    id: 997,
    name: "Sugar Daddy Tee",
    variant: "NAVY BLUE",
    price: 1505,
    originalPrice: 1999,
    image: "/sugar-daddy-tee.jpg",
    isSale: true,
    inStock: true,
    collection: "shop" as const,
    category: "Tees" as const,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const img = e.currentTarget
      .closest(".featured-sd-image")
      ?.querySelector("img") as HTMLImageElement;
    if (img) addToCart(sugarDaddyProduct, img);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-sd-image",
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
      className="w-full bg-black text-white py-20 px-4 md:px-8 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex flex-col mb-16 relative z-10">
          <p className="text-[10px] text-white/50 uppercase tracking-[0.4em] mb-4 font-bold">
            Edition 01
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase text-white leading-[0.8] tracking-tighter drop-shadow-2xl">
            SUGAR <br />
            <span className="italic text-neutral-500">DADDY</span>
          </h2>
          <p className="max-w-xl mt-8 text-white/70 font-bold uppercase tracking-widest text-xs md:text-sm border-l-2 border-white/20 pl-6">
            Bold, unapologetic streetwear. High density digital print on
            premium 240GSM cotton. Pure confidence in every fiber.
          </p>
        </div>

        {/* 4-Image Aesthetic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 relative">
          {[
            "/public/products/sugar-daddy-blue-poster.jpeg",
            "/public/products/sugar-daddy-blue-poster-alt.jpeg",
            "/public/products/sugar-daddy-brown-poster.jpeg",
            "/public/products/sugar-daddy-navy-tee-back.jpeg",
          ].map((src, idx) => (
            <div key={idx} className="group relative aspect-[3/4] overflow-hidden bg-neutral-900 featured-sd-image">
              <Image
                src={src.replace("/public", "")}
                alt={`Sugar Daddy - Visual ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          ))}
          
          <div className="absolute -bottom-10 -right-10 text-[15vw] font-black text-white/5 pointer-events-none select-none z-0 leading-none">
            SD
          </div>
        </div>

        <div className="mt-16 flex justify-end">
          <Link
            href="/product/4"
            className="group flex items-center gap-4 bg-white text-black px-10 py-5 font-black uppercase text-sm tracking-widest hover:bg-neutral-200 transition-all cursor-pointer"
          >
            <span>Explore Collection</span>
            <span className="text-xl leading-none group-hover:translate-x-2 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>

  );
}
