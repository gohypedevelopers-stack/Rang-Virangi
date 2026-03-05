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
    price: 1499,
    originalPrice: 1999,
    image: "/sugar-daddy-tee.jpg",
    isSale: true,
    inStock: true,
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
      className="w-full bg-white text-black py-12 md:py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 featured-sd-image border-b-[3px] border-black pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-black leading-none drop-shadow-[2px_2px_0px_#e5e5e5] md:drop-shadow-[4px_4px_0px_#e5e5e5] tracking-tighter">
              SUGAR{" "}
              <span className="font-caesar italic tracking-normal">DADDY</span>
            </h2>
            <p className="max-w-xl mt-4 text-neutral-600 font-bold uppercase tracking-widest text-sm md:text-base">
              Bold, unapologetic streetwear. High density digital print on
              premium 240GSM cotton.
            </p>
          </div>

          <Link
            href="/shop"
            className="group flex flex-none items-center gap-2 bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-black uppercase text-sm md:text-base tracking-widest hover:-translate-y-1 transition-transform cursor-pointer shadow-[3px_3px_0px_#e5e5e5] md:shadow-[6px_6px_0px_#e5e5e5] border-2 border-black"
          >
            <span>Shop Edition </span>
            <span className="text-xl leading-none group-hover:rotate-45 transition-transform">
              ↗
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2">
          <div className="featured-sd-image product-card group relative bg-white flex flex-col pb-4">
            <Link href="/shop" className="block relative grow mb-3">
              {/* Image Container */}
              <div className="relative aspect-3/4 overflow-hidden bg-neutral-100 mb-0 z-0">
                <Image
                  src="/sugar-daddy-tee.jpg"
                  alt="Sugar Daddy Tee"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                {/* Floating badge */}
                <div className="absolute top-2 left-2 bg-white text-black text-[9px] font-bold uppercase px-2 py-1 tracking-widest">
                  SALE
                </div>
              </div>
            </Link>

            {/* Product Info & Button */}
            <div className="flex flex-col grow px-1">
              <Link href="/shop" className="block mb-4">
                <h3 className="text-[11px] md:text-xs font-semibold uppercase text-black tracking-wider mb-1 truncate">
                  Sugar Daddy Tee
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] md:text-xs text-neutral-600">
                    ₹1,499
                  </span>
                  <span className="text-[10px] text-neutral-400 line-through">
                    ₹1,999
                  </span>
                </div>
              </Link>

              <div className="mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-transparent text-black border border-black text-[10px] md:text-xs uppercase py-2.5 tracking-widest hover:bg-black hover:text-white transition-colors duration-300 flex justify-center items-center gap-2"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add To Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
