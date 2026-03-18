"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Plus, ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import { useCart } from "../context/cart-context";
import { Product } from "../lib/products";

const topSellers = [
  {
    id: 4,
    name: "Black Wildloom Hoodie",
    images: [
      "/products/sugar-daddy-navy-tee-back.jpeg",
      "/products/sugar-daddy-blue-poster.jpeg",
      "/products/sugar-daddy-brown-poster.jpeg",
    ],
    price: "RS. 23,000",
  },
  {
    id: 7,
    name: "Brown Wildloom Hoodie",
    images: [
      "/products/tiger-tshirt.jpeg",
      "/products/rage-tiger-black-tee-back.jpeg",
      "/products/tiger-tshirt.jpeg",
    ],
    price: "RS. 23,000",
  },
  {
    id: 9,
    name: "White Star Studded Hoodie",
    images: [
      "/products/blue-lips-navy-tee-back.jpeg",
      "/products/blue-lips-navy-tee-back.jpeg",
      "/products/blue-lips-navy-tee-back.jpeg",
    ],
    price: "RS. 17,000",
  },
  {
    id: 10,
    name: "Boxy Mustard 1031 Jacket",
    images: [
      "/products/apsara-aura-black-tee-back.jpeg",
      "/products/apsara-aura-poster.jpeg",
      "/products/apsara-aura-black-tee-back.jpeg",
    ],
    price: "RS. 13,000",
  },
];

function ProductCard({ item }: { item: typeof topSellers[0] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();
  const imgRef = useRef<HTMLImageElement>(null);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === item.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? item.images.length - 1 : prev - 1));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!imgRef.current) return;
    const productToCart: Product = {
      id: item.id,
      name: item.name,
      variant: "STANDARD",
      price: parseInt(item.price.replace(/[^0-9]/g, "")),
      originalPrice: null,
      image: item.images[currentIndex],
      isSale: false,
      collection: "shop",
      category: "Tees",
    };
    addToCart(productToCart, imgRef.current);
  };

  return (
    <div className="flex flex-col group w-full p-2 bg-[#f0f0f0] rounded-xl">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-neutral-200 shadow-sm mb-4">
        <Link href={`/product/${item.id}`} className="block w-full h-full cursor-pointer">
          <Image
            ref={imgRef}
            src={item.images[currentIndex]}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-1000"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </Link>
        
        {/* Navigation UI - ONLY IF MULTIPLE IMAGES */}
        {item.images.length > 1 && (
          <>
            {/* Hover Navigation Arrows (Circles) */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all hover:bg-white/50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-all hover:bg-white/50"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5">
              {item.images.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full bg-white transition-all duration-300 ${currentIndex === i ? "opacity-100 scale-125" : "opacity-30"}`} 
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Below Image */}
      <div className="flex flex-row items-end justify-between w-full px-1 mb-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-tight text-neutral-800 leading-tight truncate max-w-[150px]">
            {item.name}
          </h3>
          <p className="text-[10px] md:text-[11px] font-bold text-neutral-600">
            {item.price}
          </p>
        </div>
        <button 
          onClick={handleAddToCart}
          className="group hover:bg-black rounded-full transition-all p-0.5"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5 text-neutral-600 group-hover:text-white" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export function TopSelling() {
  return (
    <section className="w-full bg-[#f8f8f8] py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-4 w-full">
        {topSellers.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}




