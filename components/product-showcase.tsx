"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, ArrowLeft, ArrowRight, Bookmark } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();

  // We now show 8 products for the home page showcase
  const displayedProducts = products.slice(0, 8);

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof products)[0],
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const card = (e.currentTarget as HTMLElement).closest(".product-card");
    const img = card?.querySelector("img");
    if (img) addToCart(product, img as HTMLImageElement);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        ".product-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#f8f8f8] pt-10 pb-20 relative overflow-hidden"
    >
      <div className="w-full px-4 md:px-6">
        {/* Editorial Header */}
        <div className="flex flex-row justify-between items-center mb-12 relative z-10 gap-4">
          <div className="bg-black text-white px-6 py-2">
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight leading-none">
              THE COLLECTION
            </h2>
          </div>
          
          <Link
            href="/shop"
            className="group flex items-center gap-3 bg-black text-white px-8 py-3.5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-neutral-800 transition-all cursor-pointer"
          >
            <span>Shop All </span>
            <span className="text-xl leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              ↗
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card group relative bg-[#f0f0f0] flex flex-col p-2.5 rounded-xl transition-all"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 rounded-lg mb-4 z-0">
                <Link href={`/product/${product.id}`} className="block w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  {product.backImage && (
                    <Image
                      src={product.backImage}
                      alt={product.name}
                      fill
                      className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 absolute inset-0"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  )}
                </Link>

                {/* Pagination Dots - ONLY IF BACK IMAGE EXISTS */}
                {product.backImage && (
                  <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5 pointer-events-none">
                    {[0, 1].map((i) => (
                      <div 
                        key={i} 
                        className={`w-1.2 h-1.2 rounded-full bg-white transition-all duration-300 ${i === 0 ? "opacity-100 scale-125" : "opacity-30"}`} 
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info & Button */}
              <div className="flex flex-row items-end justify-between w-full px-1 mb-1">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-[10px] md:text-[11px] font-bold uppercase text-neutral-800 tracking-tight leading-tight truncate max-w-[130px]">
                    {product.name}
                  </h3>
                  <p className="text-[10px] font-bold text-neutral-500">
                    RS. {product.price.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  className="group hover:bg-black rounded-full transition-all p-0.5"
                >
                  <Plus className="w-4 h-4 text-neutral-600 group-hover:text-white" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
