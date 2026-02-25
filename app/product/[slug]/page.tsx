"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight,
    Heart,
    Share2,
    Star,
    Minus,
    Plus,
    Truck,
    ShieldCheck,
    RotateCcw,
    Ruler
} from "lucide-react";
import { toast } from "sonner";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../../../components/ui/accordion";
import { Label } from "../../../components/ui/label";

// --- Mock Data ---
const product = {
    id: "rv-1001",
    name: "The Essential Bamboo Oversized Tee",
    brand: "RANG VIRANGI",
    tagline: "Premium Bamboo Cotton • Thermoregulating • Tailored Dropped Shoulder",
    price: 1899,
    compareAtPrice: 2499,
    rating: 4.8,
    reviewCount: 124,
    stockStatus: "Out of Stock",
    sku: "RV-BAM-TEE-01",
    images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=2000&auto=format&fit=crop",
    ],
    colors: [
        { name: "Onyx Black", value: "#1a1a1a" },
        { name: "Chalk White", value: "#f4f4f4" },
        { name: "Forest Green", value: "#2d4a22" },
        { name: "Dusty Rose", value: "#c08c8c" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    disabledSizes: ["XXL"],
    description: "Experience the ultimate upgrade to your everyday uniform. Crafted from our signature 220 GSM bamboo cotton blend, this oversized tee offers an unparalleled combination of cloud-like softness, natural breathability, and structural integrity. The considered drop-shoulder silhouette drapes perfectly without looking sloppy, while the reinforced neckline ensures it maintains its shape wash after wash. Discover sustainable luxury that doesn't compromise on street-ready aesthetics.",
    fabricCare: [
        "70% Organic Bamboo, 25% Premium Cotton, 5% Elastane",
        "Machine wash cold with like colors",
        "Tumble dry low or lay flat to dry",
        "Do not bleach",
        "Iron on low heat if needed"
    ]
};

const relatedProducts = [
    { id: 1, name: "Heavyweight Cargo Pants", price: 3499, image: "https://images.unsplash.com/photo-1624378439575-d1ead6eba2a2?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Knitted Vintage Polo", price: 2199, image: "https://images.unsplash.com/photo-1626497764746-6dc36addedce?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Textured Shacket", price: 4299, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "Premium French Terry Hoodie", price: 3899, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" },
];

// --- Form Validation Schema ---
const cartSchema = z.object({
    size: z.string().min(1, "Please select a size"),
    color: z.string().min(1, "Please select a color"),
    quantity: z.number().min(1).max(10),
});

export default function ProductDetailsPage() {
    const [activeImage, setActiveImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // React Hook Form for Variant Selection
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(cartSchema),
        defaultValues: {
            size: "",
            color: product.colors[0].name,
            quantity: 1,
        }
    });

    const selectedSize = watch("size");
    const selectedColor = watch("color");
    const currentQuantity = watch("quantity");

    const onSubmit = (data: z.infer<typeof cartSchema>) => {
        // In a real app, dispatch to cart context/store here
        toast.success("Added to Cart", {
            description: `${currentQuantity}x ${product.name} (${data.size}, ${data.color})`
        });
    };

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        handleSubmit((data) => {
            toast.success("Proceeding to checkout...");
            // Redirect to checkout
        })();
    };

    const updateQuantity = (newQty: number) => {
        if (newQty >= 1 && newQty <= 10) {
            setValue("quantity", newQty);
        }
    };

    const isOutOfStock = product.stockStatus === "Out of Stock";

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-20 selection:bg-black selection:text-white">

            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:px-8 mb-6">
                <nav className="flex items-center gap-3 text-xs md:text-sm text-neutral-500 font-medium whitespace-nowrap overflow-x-auto scrollbar-hide pb-1">
                    <Link href="/" className="hover:text-black transition-colors shrink-0">Home</Link>
                    <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />
                    <Link href="/shop" className="text-black font-bold transition-colors shrink-0">Shop</Link>
                    <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />
                    <Link href="/about" className="hover:text-black transition-colors shrink-0">About</Link>
                    <ChevronRight className="w-3 h-3 text-neutral-300 shrink-0" />
                    <Link href="/contact" className="hover:text-black transition-colors shrink-0">Contact</Link>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* LEFT: Image Gallery */}
                    <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-32">
                        {/* Thumbnails (Desktop: Vertical Left, Mobile: Horizontal Bottom) */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide shrink-0 md:w-20 lg:w-24">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative aspect-[3/4] w-20 md:w-full rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? "border-black shadow-md" : "border-transparent hover:border-neutral-200"
                                        }`}
                                >
                                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image Container */}
                        <motion.div
                            className="relative aspect-[3/4] w-full bg-neutral-100 rounded-2xl overflow-hidden group"
                            layoutId="main-product-image"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeImage}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={product.images[activeImage]}
                                        alt={product.name}
                                        fill
                                        className="object-cover cursor-crosshair transform group-hover:scale-105 transition-transform duration-700"
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Badges on Image */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                <span className="bg-white text-black text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full shadow-sm">
                                    Best Seller
                                </span>
                                {product.compareAtPrice > product.price && (
                                    <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-full shadow-sm">
                                        Sale -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: Product Info Panel */}
                    <div className="flex flex-col pt-2 lg:pt-0">
                        {/* Brand & Title */}
                        <div className="mb-6">
                            <p className="text-neutral-500 font-bold text-xs tracking-[0.2em] mb-2 uppercase">{product.brand}</p>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-black mb-3 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-neutral-600 font-medium text-sm md:text-base">{product.tagline}</p>
                        </div>

                        {/* Reviews & Price */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-neutral-200">
                            <div className="flex items-center gap-2">
                                <div className="flex text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                                    ))}
                                </div>
                                <span className="text-sm font-bold">{product.rating}</span>
                                <span className="text-sm text-neutral-500 underline decoration-neutral-300 font-medium cursor-pointer hover:text-black">
                                    ({product.reviewCount} Reviews)
                                </span>
                            </div>

                            <div className="flex items-end gap-3">
                                <span className="text-3xl font-black tracking-tight">₹{product.price}</span>
                                {product.compareAtPrice > product.price && (
                                    <span className="text-lg text-neutral-400 font-bold line-through mb-1">₹{product.compareAtPrice}</span>
                                )}
                            </div>
                        </div>

                        {/* Selection Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* Color Selection */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label className="text-sm font-bold uppercase tracking-wider text-black">
                                        Color: <span className="text-neutral-500 capitalize ml-1">{selectedColor}</span>
                                    </Label>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color.name}
                                            type="button"
                                            onClick={() => setValue("color", color.name)}
                                            className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name ? "border-black scale-110 shadow-md" : "border-transparent ring-1 ring-neutral-200 hover:scale-105"
                                                }`}
                                            style={{ backgroundColor: color.value }}
                                            aria-label={color.name}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <Label className="text-sm font-bold uppercase tracking-wider text-black">
                                        Size: {selectedSize && <span className="text-neutral-500 ml-1">{selectedSize}</span>}
                                    </Label>
                                    <button type="button" className="text-xs font-bold text-neutral-500 underline decoration-neutral-300 hover:text-black flex items-center gap-1">
                                        <Ruler className="w-3 h-3" /> Size Guide
                                    </button>
                                </div>

                                <div className="grid grid-cols-5 gap-2 md:gap-3">
                                    {product.sizes.map((size) => {
                                        const isDisabled = product.disabledSizes.includes(size);
                                        const isSelected = selectedSize === size;
                                        return (
                                            <button
                                                key={size}
                                                type="button"
                                                onClick={() => !isDisabled && setValue("size", size)}
                                                disabled={isDisabled}
                                                className={`
                          py-3 rounded-lg border text-sm font-bold transition-all flex items-center justify-center
                          ${isDisabled ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border-transparent decoration-neutral-300 line-through" : ""}
                          ${!isDisabled && !isSelected ? "bg-white text-black border-neutral-200 hover:border-black" : ""}
                          ${isSelected ? "bg-black text-white border-black shadow-md" : ""}
                        `}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.size && <p className="text-red-500 text-xs font-bold mt-1">{errors.size.message}</p>}
                            </div>

                            {/* Quantity & Actions */}
                            <div className="space-y-4 pt-4">
                                <div className="flex gap-4 h-14">
                                    {/* Stepper */}
                                    <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 shrink-0 w-32">
                                        <button type="button" onClick={() => updateQuantity(currentQuantity - 1)} className="w-10 h-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-l-xl transition-colors">
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <div className="flex-1 text-center font-bold text-lg">{currentQuantity}</div>
                                        <button type="button" onClick={() => updateQuantity(currentQuantity + 1)} className="w-10 h-full flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-r-xl transition-colors">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Add to Cart CTA */}
                                    <button
                                        type="submit"
                                        disabled={isOutOfStock}
                                        className={`flex-1 font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-black/10 ${isOutOfStock ? "bg-neutral-200 text-neutral-500 cursor-not-allowed shadow-none" : "bg-black text-white hover:bg-neutral-800 hover:scale-[1.02]"}`}
                                    >
                                        {isOutOfStock ? "Sold Out" : "Add to Cart"}
                                    </button>

                                    {/* Wishlist */}
                                    <button
                                        type="button"
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all shrink-0 ${isWishlisted ? "border-red-500 text-red-500 bg-red-50" : "border-neutral-200 text-black hover:border-black"
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                                    </button>
                                </div>

                                {/* Buy Now CTA */}
                                <button
                                    type="button"
                                    onClick={handleBuyNow}
                                    disabled={isOutOfStock}
                                    className={`w-full h-14 border-2 font-black uppercase tracking-widest rounded-xl transition-colors ${isOutOfStock ? "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed" : "border-black bg-white text-black hover:bg-neutral-50"}`}
                                >
                                    {isOutOfStock ? "Unavailable" : "Buy It Now"}
                                </button>
                            </div>
                        </form>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 mt-8 border-y border-neutral-200">
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-neutral-50 rounded-2xl">
                                <Truck className="w-6 h-6 mb-2 text-black" />
                                <span className="text-xs font-bold uppercase tracking-wide">Free Shipping</span>
                                <span className="text-xs text-neutral-500 mt-1">On orders over ₹999</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-neutral-50 rounded-2xl">
                                <RotateCcw className="w-6 h-6 mb-2 text-black" />
                                <span className="text-xs font-bold uppercase tracking-wide">Easy Returns</span>
                                <span className="text-xs text-neutral-500 mt-1">14-day hassle free</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center p-4 bg-neutral-50 rounded-2xl">
                                <ShieldCheck className="w-6 h-6 mb-2 text-black" />
                                <span className="text-xs font-bold uppercase tracking-wide">Secure Checkout</span>
                                <span className="text-xs text-neutral-500 mt-1">100% safe payments</span>
                            </div>
                        </div>

                        {/* Accordions */}
                        <div className="mt-8">
                            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                                <AccordionItem value="item-1" className="border-neutral-200 py-2">
                                    <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                                        Description
                                    </AccordionTrigger>
                                    <AccordionContent className="text-neutral-600 leading-relaxed pt-2 pb-6">
                                        {product.description}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="border-neutral-200 py-2">
                                    <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                                        Fabric & Care
                                    </AccordionTrigger>
                                    <AccordionContent className="text-neutral-600 leading-relaxed pt-2 pb-6">
                                        <ul className="list-disc pl-5 space-y-2">
                                            {product.fabricCare.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="border-neutral-200 py-2">
                                    <AccordionTrigger className="text-sm font-bold uppercase tracking-wider hover:no-underline">
                                        Shipping & Returns
                                    </AccordionTrigger>
                                    <AccordionContent className="text-neutral-600 leading-relaxed pt-2 pb-6">
                                        <p className="mb-3"><strong>Shipping:</strong> We offer free standard shipping on all orders over ₹999. Standard delivery takes 3-5 business days. Express options available at checkout.</p>
                                        <p><strong>Returns:</strong> Not perfectly satisfied? Return within 14 days of delivery in unworn condition with tags attached for a full refund or exchange.</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500 font-medium">
                            <span>SKU: {product.sku}</span>
                            <span>•</span>
                            <button className="flex items-center gap-1 hover:text-black transition-colors">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Complete the Look Section */}
            <div className="container mx-auto px-4 md:px-8 mt-32">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase">Complete The Look</h2>
                    <Link href="/shop" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-neutral-600 transition-colors">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {relatedProducts.map((rp) => (
                        <Link href={`/product/${rp.id}`} key={rp.id} className="group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 mb-4">
                                <Image src={rp.image} alt={rp.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black font-bold uppercase tracking-widest text-[10px] md:text-xs py-2 md:py-3 px-4 md:px-6 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl whitespace-nowrap hidden md:block hover:bg-black hover:text-white">
                                    Quick View
                                </button>
                            </div>
                            <h3 className="font-bold text-sm md:text-base tracking-tight mb-1 group-hover:underline decoration-2 underline-offset-4">{rp.name}</h3>
                            <p className="text-neutral-500 font-medium text-sm">₹{rp.price}</p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Sticky Add to Cart Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 p-4 z-40 lg:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-neutral-500 line-through">₹{product.compareAtPrice}</span>
                        <span className="text-xl font-black leading-none">₹{product.price}</span>
                    </div>
                    <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isOutOfStock}
                        className={`flex-1 h-12 rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl shadow-black/10 transition-transform ${isOutOfStock ? "bg-neutral-200 text-neutral-500 cursor-not-allowed shadow-none" : "bg-black text-white active:scale-95"}`}
                    >
                        {isOutOfStock ? "Sold Out" : "Add To Cart"}
                    </button>
                </div>
            </div>

        </div>
    );
}
