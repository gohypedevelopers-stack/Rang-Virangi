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
    price: 1599,
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
      className="w-full bg-neutral-50 text-black py-12 md:py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6 featured-love-image border-b-[3px] border-black pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-black leading-none drop-shadow-[2px_2px_0px_#e5e5e5] md:drop-shadow-[4px_4px_0px_#e5e5e5] tracking-tighter">
              LOVE{" "}
              <span className="font-caesar italic tracking-normal">
                SIMULATION
              </span>
            </h2>
            <p className="max-w-xl mt-4 text-neutral-600 font-bold uppercase tracking-widest text-sm md:text-base">
              A futuristic take on romance. High density digital print on
              premium 240GSM cotton.
            </p>
          </div>

          <Link
            href={`/product/${loveProduct.id}`}
            className="group flex flex-none items-center gap-2 bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-black uppercase text-sm md:text-base tracking-widest hover:-translate-y-1 transition-transform cursor-pointer shadow-[3px_3px_0px_#e5e5e5] md:shadow-[6px_6px_0px_#e5e5e5] border-2 border-black"
          >
            <span>Shop Collection </span>
            <span className="text-xl leading-none group-hover:rotate-45 transition-transform">
              ↗
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 md:gap-2">
          {/* The Tee Card */}
          <div className="featured-love-image product-card group relative bg-white flex flex-col pb-4">
            <Link
              href={`/product/${loveProduct.id}`}
              className="block relative grow mb-3"
            >
              <div className="relative aspect-3/4 overflow-hidden bg-neutral-100 mb-0 z-0">
                <Image
                  src="/love-tee-mock.jpg"
                  alt="Love Simulation Tee"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute top-2 left-2 bg-white text-black text-[9px] font-bold uppercase px-2 py-1 tracking-widest">
                  SALE
                </div>
              </div>
            </Link>
            <div className="flex flex-col grow px-1">
              <Link href={`/product/${loveProduct.id}`} className="block mb-4">
                <h3 className="text-[11px] md:text-xs font-semibold uppercase text-black tracking-wider mb-1 truncate">
                  Love Simulation Tee
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] md:text-xs text-neutral-600">
                    ₹1,599
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
