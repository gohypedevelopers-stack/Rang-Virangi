"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";
import { ProductCard } from "@/components/product-card";

export function NewArrivals() {
  const { addToCart } = useCart();

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof products)[0],
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const card = (e.currentTarget as HTMLElement).closest(".group");
    const img = card?.querySelector("img");

    if (img) {
      addToCart(product, img as HTMLImageElement);
    }
  };

  return (
    <section className="w-full bg-white py-17 px-4 md:px-8 border-t border-neutral-200">
      <div className="w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 tracking-wider uppercase">
          New Arrivals
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={product}
                imageOverlay={
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="bg-black text-white p-3 rounded-full hover:bg-neutral-800 transition-all shadow-lg"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/shop"
            className="px-10 py-3 border border-black text-black text-xs uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
