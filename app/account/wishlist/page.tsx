"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, X, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

// Mock Data
const INITIAL_WISHLIST = [products[3], products[5]];

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

    const handleRemove = (id: number, name: string) => {
        setWishlist(wishlist.filter(item => item.id !== id));
        toast.success(`${name} removed from wishlist`);
    };

    const handleAddToCart = (name: string) => {
        toast.success(`${name} added to cart!`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-2">My Wishlist</h2>
                    <p className="text-neutral-500 text-sm font-medium">Items you've saved for later.</p>
                </div>
                <div className="text-sm font-bold bg-neutral-100 px-4 py-2 rounded-full">
                    {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-neutral-200 rounded-2xl">
                    <Heart className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Your wishlist is empty</h3>
                    <p className="text-neutral-500 mb-6 font-medium">Discover your next favorite piece from our latest collection.</p>
                    <Link href="/shop" className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors shadow-lg shadow-black/10 inline-block">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                    {wishlist.map((product) => (
                        <div key={product.id}>
                            <ProductCard
                                product={product}
                                centeredText={true}
                                topRightAction={
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemove(product.id, product.name);
                                        }}
                                        className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-neutral-500 hover:text-red-500 hover:scale-110 transition-all"
                                        aria-label="Remove from wishlist"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                }
                                imageOverlay={
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToCart(product.name);
                                        }}
                                        className="bg-black text-white p-3 rounded-full hover:bg-neutral-800 transition-all shadow-lg hidden md:block"
                                        aria-label="Add to cart"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                }
                                footerAction={
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleAddToCart(product.name);
                                        }}
                                        className="w-full mt-4 bg-white border-2 border-black text-black font-bold uppercase tracking-widest text-[10px] md:text-xs py-2.5 rounded-xl hover:bg-black hover:text-white transition-colors"
                                    >
                                        Quick Add
                                    </button>
                                }
                            />
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
