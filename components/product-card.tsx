"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";

interface ProductCardProps {
    product: Product;
    topRightAction?: React.ReactNode;
    imageOverlay?: React.ReactNode;
    footerAction?: React.ReactNode;
    centeredText?: boolean;
}

export function ProductCard({
    product,
    topRightAction,
    imageOverlay,
    footerAction,
    centeredText = false,
}: ProductCardProps) {
    const isOutOfStock = product.inStock === false;

    return (
        <div className={`group relative ${isOutOfStock ? "opacity-75" : ""}`}>
            <Link href={`/product/${product.id}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-3/4 overflow-hidden bg-neutral-100 mb-5">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className={`object-cover transition-transform duration-500 ${!isOutOfStock ? "group-hover:scale-105" : "grayscale-[50%]"}`}
                    />

                    {/* Badge Overlay */}
                    {isOutOfStock ? (
                        <span className="absolute top-2 left-2 bg-neutral-200 text-neutral-600 text-[12px] font-bold px-3 py-1 uppercase z-10 tracking-wider">
                            Sold Out
                        </span>
                    ) : product.isSale && (
                        <span className="absolute top-2 left-2 bg-black text-white border border-white shadow-lg text-[14px] font-bold px-2 py-1 uppercase z-10">
                            Sale
                        </span>
                    )}

                    {topRightAction && (
                        <div className="absolute top-2 right-2 z-20">
                            {topRightAction}
                        </div>
                    )}

                    {imageOverlay && !isOutOfStock && (
                        <div className="absolute bottom-2 right-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                            {imageOverlay}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className={`space-y-1 ${centeredText ? "text-center" : ""}`}>
                    <h3 className="text-black text-xs md:text-sm font-medium uppercase tracking-wide leading-tight line-clamp-1">
                        {product.name}
                    </h3>
                    {product.variant && (
                        <p className="text-neutral-500 text-[10px] uppercase tracking-wide">
                            {product.variant}
                        </p>
                    )}
                    <div className={`flex items-center gap-2 pt-1 mb-5 ${centeredText ? "justify-center" : ""}`}>
                        {product.originalPrice && (
                            <span className="text-neutral-400 text-xs line-through">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                        <span className="text-black text-s font-medium ">
                            ₹{product.price.toLocaleString()}
                        </span>
                    </div>
                    {footerAction && <div className="mt-auto">{footerAction}</div>}
                </div>
            </Link>
        </div>
    );
}
