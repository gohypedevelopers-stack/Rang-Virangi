"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

export function FeaturedCulture() {
  const sectionRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();

  const cultureProduct = {
    id: 1,
    name: "Culture Symphony Tour Tee",
    variant: "WHITE",
    price: 1202,
    originalPrice: 1999,
    image: "/culture-white-front.jpg",
    isSale: true,
    inStock: true,
    collection: "shop" as const,
    category: "Tees" as const,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const img = e.currentTarget
      .closest(".featured-culture-image")
      ?.querySelector("img") as HTMLImageElement;
    if (img) addToCart(cultureProduct, img);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-culture-image",
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

  const products = [
    {
      src: "/culture-white-front.jpg",
      alt: "Culture Symphony White Front",
      label: "Culture Symphony Tee",
      variant: "White",
    },
    {
      src: "/culture-navy-back.jpg",
      alt: "Culture Symphony Navy Back",
      label: "Culture Symphony Tee — Navy",
      variant: "Navy Blue",
    },
    {
      src: "/culture-black-back.jpg",
      alt: "Culture Symphony Black Back",
      label: "Culture Symphony Tee — Black",
      variant: "Black",
    },
    {
      src: "/culture-white-back.jpg",
      alt: "Culture Symphony White Back",
      label: "Culture Symphony Tee — Back",
      variant: "White",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-neutral-100 text-black py-20 px-4 md:px-8 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex flex-col mb-16 relative z-10">
          <p className="text-[10px] text-black/40 uppercase tracking-[0.5em] mb-4 font-bold">
            The Artistic Tour
          </p>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-light uppercase text-black leading-tight tracking-[0.3em] drop-shadow-sm">
            CULTURE <br />
            <span className="font-extrabold text-neutral-400">SYMPHONY</span>
          </h2>
          <p className="max-w-xl mt-8 text-black/60 font-medium uppercase tracking-widest text-xs md:text-sm border-l-2 border-black/10 pl-6 italic">
            A symphony of subcultures and urban rhythms. Merging high-definition 
            graphics with heavyweight luxury cotton.
          </p>
        </div>

        {/* 4-Image Aesthetic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 scroll-reveal">
          {[
            "/culture-white-front.jpg",
            "/culture-white-back.jpg",
            "/culture-navy-back.jpg",
            "/culture-black-back.jpg",
          ].map((src, idx) => (
            <div key={idx} className="group relative aspect-[3/4] overflow-hidden bg-white featured-culture-image shadow-sm border border-black/5">
              <Image
                src={src}
                alt={`Culture Symphony - View ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/product/1"
            className="group inline-flex items-center gap-6 border-b-2 border-black pb-2 font-bold uppercase text-xs md:text-sm tracking-[0.4em] hover:text-neutral-500 transition-colors cursor-pointer"
          >
            <span>Browse Full Edition</span>
            <span className="text-xl leading-none group-hover:translate-x-2 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>

  );
}
