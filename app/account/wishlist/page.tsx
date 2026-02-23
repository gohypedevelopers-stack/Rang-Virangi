"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

// Mock Data
const INITIAL_WISHLIST = [
    { id: "rv-1004", name: "Textured Shacket", price: 4299, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" },
    { id: "rv-1006", name: "Everyday Relaxed Chino", price: 2899, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop" },
];

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

    const handleRemove = (id: string, name: string) => {
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
                        <div key={product.id} className="group relative block">
                            {/* Image Container */}
                            <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] bg-neutral-100 rounded-2xl overflow-hidden mb-4 border border-transparent group-hover:border-neutral-200 transition-all">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </Link>

                            {/* Remove Button */}
                            <button
                                onClick={() => handleRemove(product.id, product.name)}
                                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-neutral-500 hover:text-red-500 hover:scale-110 transition-all z-10"
                                aria-label="Remove from wishlist"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Info */}
                            <div className="text-center">
                                <h3 className="font-bold text-sm md:text-base tracking-tight mb-1 group-hover:underline decoration-2 underline-offset-4 line-clamp-1">{product.name}</h3>
                                <p className="font-medium text-sm md:text-base mb-4">₹{product.price}</p>

                                <button
                                    onClick={() => handleAddToCart(product.name)}
                                    className="w-full bg-white border-2 border-black text-black font-bold uppercase tracking-widest text-[10px] md:text-xs py-2.5 rounded-xl hover:bg-black hover:text-white transition-colors"
                                >
                                    Quick Add
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
