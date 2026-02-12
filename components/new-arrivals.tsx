"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";

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
            <div key={product.id} className="group relative">
              <Link href={`/product/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-3/4 overflow-hidden bg-neutral-100 mb-5">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.isSale && (
                    <span className="absolute top-2 left-2 bg-black text-white border border-white shadow-lg text-[14px] font-bold px-2 py-1 uppercase">
                      Sale
                    </span>
                  )}

                  {/* Add to Cart Button Overlay */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="absolute bottom-2 right-2 bg-black text-white p-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-neutral-800 z-10"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="space-y-1">
                  <h3 className="text-black text-xs md:text-sm font-medium uppercase tracking-wide leading-tight">
                    {product.name}
                  </h3>
                  {product.variant && (
                    <p className="text-neutral-500 text-[10px] uppercase tracking-wide">
                      {product.variant}
                    </p>
                  )}
                  <div className="flex items-center gap-2 pt-1 mb-5">
                    {product.originalPrice && (
                      <span className="text-neutral-400 text-xs line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-black text-s font-medium ">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
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
