"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Filter,
    ChevronDown,
    X,
    SlidersHorizontal,
    ShoppingCart
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";

// --- Mock Data ---

const CATEGORIES = ["All", "Tees", "Bottoms", "Hoodies", "Outerwear"];
const SIZES = ["S", "M", "L", "XL", "XXL"];
const COLORS = [
    { name: "Onyx Black", value: "#1a1a1a" },
    { name: "Chalk White", value: "#f4f4f4" },
    { name: "Olive", value: "#4e5944" },
    { name: "Navy", value: "#1a2a40" },
    { name: "Ash Gray", value: "#8a8d91" },
    { name: "Beige", value: "#d4c8b8" },
];

const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low"];

function SearchPageContent() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeSizes, setActiveSizes] = useState<string[]>([]);
    const [activeColors, setActiveColors] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("Featured");

    useEffect(() => {
        const q = searchParams.get("q");
        if (q) {
            setSearchQuery(q);
        } else {
            setSearchQuery("");
        }
    }, [searchParams]);

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

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate Network Request
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, [activeCategory, activeSizes, activeColors, sortBy, searchQuery]);

    // Toggle helpers
    const toggleSize = (size: string) => {
        setActiveSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const toggleColor = (color: string) => {
        setActiveColors(prev =>
            prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
        );
    };

    const clearFilters = () => {
        setActiveSizes([]);
        setActiveColors([]);
        setActiveCategory("All");
    };

    const getFilteredProducts = () => {
        let filtered = [...products];

        // 1. Search Query Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.brand?.toLowerCase().includes(query) ||
                p.tagline?.toLowerCase().includes(query)
            );
        }

        // Sort
        if (sortBy === "Price: Low to High") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price: High to Low") {
            filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    };

    const filteredProducts = getFilteredProducts();
    const activeFilterCount = activeSizes.length + activeColors.length + (activeCategory !== "All" ? 1 : 0);

    // Sidebar Filter Component
    const FilterSidebar = () => (
        <div className="space-y-10">
            {/* Category Filter */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-black pb-2">Category</h3>
                <ul className="space-y-3">
                    {CATEGORIES.map(category => (
                        <li key={category}>
                            <button
                                onClick={() => setActiveCategory(category)}
                                className={`text-sm font-medium transition-colors hover:text-black ${activeCategory === category ? "text-black font-bold underline decoration-2 underline-offset-4" : "text-neutral-500"}`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Size Filter */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-black pb-2">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                    {SIZES.map(size => (
                        <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`py-2 text-xs font-bold border rounded-md transition-all ${activeSizes.includes(size) ? "bg-black text-white border-black" : "bg-white text-black border-neutral-200 hover:border-black"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Color Filter */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b border-black pb-2">Color</h3>
                <div className="flex flex-wrap gap-3">
                    {COLORS.map(color => (
                        <button
                            key={color.name}
                            onClick={() => toggleColor(color.name)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${activeColors.includes(color.name) ? "border-black scale-110 shadow-sm" : "border-transparent ring-1 ring-neutral-200 hover:scale-105"
                                }`}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-20 selection:bg-black selection:text-white">

            {/* Page Header */}
            <div className="container mx-auto px-4 md:px-8 mb-10">
                <nav className="flex items-center gap-3 text-xs md:text-sm text-neutral-500 font-medium mb-6 whitespace-nowrap overflow-x-auto scrollbar-hide pb-1">
                    <Link href="/" className="hover:text-black transition-colors shrink-0">Home</Link>
                    <ChevronRight className="w-3 h-3 text-neutral-700 shrink-0" />
                    <span className="text-black font-bold transition-colors shrink-0">Search</span>

                </nav>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Search Results</h1>
                        <p className="text-neutral-500 font-medium mt-2 max-w-lg">
                            {searchQuery ? `Showing results for "${searchQuery}"` : "Search our entire catalog."}
                        </p>
                    </div>

                    {/* Desktop Sort */}
                    <div className="hidden md:flex items-center gap-3">
                        <span className="text-sm font-bold uppercase tracking-wider text-neutral-500">Sort By:</span>
                        <div className="relative">
                            <button
                                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                                className="flex items-center gap-2 text-sm font-bold border border-neutral-200 rounded-full px-5 py-2 hover:border-black transition-all"
                            >
                                {sortBy} <ChevronDown className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                                {isSortDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-200 shadow-xl rounded-xl overflow-hidden z-20"
                                    >
                                        {SORT_OPTIONS.map(option => (
                                            <button
                                                key={option}
                                                onClick={() => { setSortBy(option); setIsSortDropdownOpen(false); }}
                                                className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-neutral-50 ${sortBy === option ? "font-bold bg-neutral-50" : "font-medium text-neutral-600"}`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Active Filters Display */}
                {activeFilterCount > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mt-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-2">Filters:</span>
                        {activeCategory !== "All" && (
                            <span className="bg-neutral-100 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                {activeCategory} <button onClick={() => setActiveCategory("All")} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                        )}
                        {activeSizes.map(size => (
                            <span key={size} className="bg-neutral-100 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                Size: {size} <button onClick={() => toggleSize(size)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                        ))}
                        {activeColors.map(color => (
                            <span key={color} className="bg-neutral-100 text-black text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                {color} <button onClick={() => toggleColor(color)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                            </span>
                        ))}
                        <button onClick={clearFilters} className="text-xs font-bold underline hover:text-neutral-500 transition-colors ml-2">
                            Clear All
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-32">
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="flex-1">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                            {isLoading ? (
                                <>
                                    {[...Array(3)].map((_, i) => (
                                        <ProductCardSkeleton key={i} />
                                    ))}
                                </>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((product) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                            key={product.id}
                                        >
                                            <ProductCard
                                                product={product}
                                                imageOverlay={
                                                    <button
                                                        onClick={(e) => handleAddToCart(e, product)}
                                                        className="bg-black text-white p-3 rounded-full hover:bg-neutral-800 transition-all shadow-lg hidden md:block"
                                                        aria-label="Add to cart"
                                                    >
                                                        <ShoppingCart className="w-5 h-5" />
                                                    </button>
                                                }
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}

                            {!isLoading && filteredProducts.length === 0 && (
                                <div className="col-span-full py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 rounded-3xl">
                                    <p className="text-xl font-bold mb-2">No results found for "{searchQuery}"</p>
                                    <p className="text-neutral-500 mb-6 font-medium">Try checking your spelling or using more general terms.</p>
                                    <button onClick={clearFilters} className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors shadow-lg shadow-black/10 inline-block">
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Filter/Sort Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 p-3 flex items-center lg:hidden z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <button
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                    className="flex-1 flex items-center justify-center gap-2 font-bold uppercase text-xs tracking-wider py-2 border-r border-neutral-200"
                >
                    <SlidersHorizontal className="w-4 h-4" /> Sort By
                </button>
                <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 font-bold uppercase text-xs tracking-wider py-2 relative"
                >
                    <Filter className="w-4 h-4" /> Filters
                    {activeFilterCount > 0 && (
                        <span className="absolute top-1 right-[20%] w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                </button>
            </div>

            {/* Mobile Filter Drawer (Overlay) */}
            <AnimatePresence>
                {isMobileFiltersOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
                            onClick={() => setIsMobileFiltersOpen(false)}
                        />
                        <motion.div
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 w-full h-[85vh] bg-white rounded-t-3xl shadow-2xl z-50 flex flex-col lg:hidden"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                                <h2 className="text-lg font-black uppercase tracking-tight">Filter Products</h2>
                                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                <FilterSidebar />
                            </div>

                            <div className="p-6 border-t border-neutral-200 bg-neutral-50 flex gap-4">
                                <button
                                    onClick={clearFilters}
                                    className="w-1/3 py-4 font-bold uppercase tracking-wider text-xs border border-neutral-200 rounded-xl bg-white hover:bg-neutral-50 transition-colors"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-2/3 py-4 font-bold uppercase tracking-widest text-xs bg-black text-white rounded-xl hover:bg-neutral-800 transition-colors shadow-lg"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Mobile Sort Bottom Drawer */}
            <AnimatePresence>
                {isSortDropdownOpen && (
                    <div className="lg:hidden">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                            onClick={() => setIsSortDropdownOpen(false)}
                        />
                        <motion.div
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-2xl z-50 pb-safe"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                                <h2 className="text-lg font-black uppercase tracking-tight">Sort By</h2>
                                <button onClick={() => setIsSortDropdownOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-2 pb-8">
                                {SORT_OPTIONS.map(option => (
                                    <button
                                        key={option}
                                        onClick={() => { setSortBy(option); setIsSortDropdownOpen(false); }}
                                        className={`w-full text-left px-6 py-4 transition-colors flex items-center justify-between border-b border-neutral-100 last:border-0 ${sortBy === option ? "font-bold" : "font-medium text-neutral-600"}`}
                                    >
                                        {option}
                                        {sortBy === option && <span className="w-2 h-2 rounded-full bg-black"></span>}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <SearchPageContent />
        </Suspense>
    );
}
