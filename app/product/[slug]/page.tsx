"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
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
  Ruler,
  Crown,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { ScrollReveal } from "../../../components/ui/scroll-reveal";

import { useParams, notFound } from "next/navigation";
import { products } from "@/lib/products";

// --- Form Validation Schema ---
const cartSchema = z.object({
  size: z.string().min(1, "Please select a size"),
  color: z.string().min(1, "Please select a color"),
  quantity: z.number().min(1).max(10),
});

// --- Magnetic Button Component ---
function MagneticButton({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function ProductDetailsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const slug = params.slug as string;

  // Find product by ID string (the slug)
  const productData = products.find((p) => p.id.toString() === slug);

  if (!productData) {
    return notFound();
  }

  // Map product library data to the local page requirements
  const product = {
    ...productData,
    id: productData.id.toString(),
    brand: productData.brand || "RANG VIRANGI",
    tagline:
      productData.tagline ||
      "Premium Streetwear • Limited Edition • Hand Crafted",
    compareAtPrice:
      productData.originalPrice || Math.round(productData.price * 1.3),
    rating: 4.8,
    reviewCount: 124,
    stockStatus: productData.inStock ? "In Stock" : "Out of Stock",
    sku: `RV-${productData.id}-${productData.variant.substring(0, 3)}`.toUpperCase(),
    images:
      (productData as any).gallery && (productData as any).gallery.length > 0
        ? (productData as any).gallery
        : productData.backImage
          ? [productData.image, productData.backImage]
          : [productData.image],
    colors: [{ name: productData.variant, value: "#1a1a1a" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    fabric: productData.fabric || "Premium Cotton",
    gsm: productData.gsm || "260 GSM",
    print: productData.print || "High-Density Screen Print",
    fit: productData.fit || "Oversized Streetwear Fit",
    highlights: productData.highlights || [],
    description:
      productData.description ||
      "The vanguard of modern streetwear. Crafted for excellence.",
  };

  const relatedProducts = useMemo(
    () => products.filter((p) => p.id !== productData.id).slice(0, 4),
    [productData.id],
  );

  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Zoom lens state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const ZOOM_LEVEL = 2.5;

  const handleZoomMove = (e: React.MouseEvent) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleZoomEnter = () => setIsZooming(true);
  const handleZoomLeave = () => setIsZooming(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cartSchema),
    defaultValues: {
      size: "",
      color: product.colors[0].name,
      quantity: 1,
    },
  });

  const selectedSize = watch("size");
  const currentQuantity = watch("quantity");

  const onSubmit = (data: z.infer<typeof cartSchema>) => {
    toast.success("Added to Vault", {
      description: `${product.name} — Size ${data.size}`,
      icon: <Zap className="w-4 h-4 fill-black" />,
    });
  };

  const isOutOfStock = product.stockStatus === "Out of Stock";

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24 pb-20 overflow-x-hidden"
    >
      {/* GEN-Z OVERLAYS: Grain & Perspective */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="w-full px-6 md:px-[40px] lg:px-[56px] relative z-10">
        {/* BREADCRUMBS - Industrial Small */}
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-12 px-2">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: GALLERY - Flat & Frameless */}
          <div className="rounded-none relative">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Vertical Thumbnails - Square */}
              {product.images.length > 1 && (
                <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onMouseEnter={() => setActiveImage(idx)}
                      onClick={() => setActiveImage(idx)}
                      className={`relative aspect-square w-full transition-all duration-300 border ${
                        activeImage === idx
                          ? "border-black shadow-lg"
                          : "border-transparent opacity-40 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image View - Hover to Zoom Right */}
              <div
                ref={imageContainerRef}
                className="relative flex-1 aspect-square bg-[#fafafa] overflow-hidden group border border-neutral-100"
                onMouseMove={handleZoomMove}
                onMouseEnter={handleZoomEnter}
                onMouseLeave={handleZoomLeave}
                style={{ cursor: isZooming ? "crosshair" : "default" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.images[activeImage]}
                      alt={product.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Left / Right Click Zones for Prev / Next */}
                {product.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-0 top-0 w-1/2 h-full z-30 cursor-w-resize group/left"
                      aria-label="Previous image"
                    >
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/left:opacity-100 transition-opacity duration-300 shadow-md">
                        <ChevronRight className="w-4 h-4 rotate-180 text-black" />
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImage((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-0 top-0 w-1/2 h-full z-30 cursor-e-resize group/right"
                      aria-label="Next image"
                    >
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/right:opacity-100 transition-opacity duration-300 shadow-md">
                        <ChevronRight className="w-4 h-4 text-black" />
                      </div>
                    </button>
                  </>
                )}

                {/* Hover Indicator Box on Main Image */}
                {isZooming && (
                  <div
                    className="absolute pointer-events-none z-20 border-2 border-black/30 bg-black/5 hidden lg:block"
                    style={{
                      width: `${100 / ZOOM_LEVEL}%`,
                      height: `${100 / ZOOM_LEVEL}%`,
                      left: `${Math.min(Math.max(zoomPosition.x - 100 / ZOOM_LEVEL / 2, 0), 100 - 100 / ZOOM_LEVEL)}%`,
                      top: `${Math.min(Math.max(zoomPosition.y - 100 / ZOOM_LEVEL / 2, 0), 100 - 100 / ZOOM_LEVEL)}%`,
                    }}
                  />
                )}

                {/* Counter Badge - Modern Mono */}
                <div className="absolute top-6 left-6 bg-black text-white px-3 py-1.5 font-mono text-[9px] tracking-widest z-10">
                  {activeImage + 1} // {product.images.length}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE ZOOM PANEL (appears on hover, desktop only) */}
            {isZooming && (
              <div
                className="hidden lg:block absolute top-0 left-[calc(100%+16px)] w-full aspect-square bg-white border border-neutral-100 z-30 shadow-xl overflow-hidden"
                style={{
                  backgroundImage: `url(${product.images[activeImage]})`,
                  backgroundSize: `${ZOOM_LEVEL * 100}% ${ZOOM_LEVEL * 100}%`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundRepeat: "no-repeat",
                }}
              />
            )}
          </div>

          {/* RIGHT: BUYING PANEL - Flat & Frameless */}
          <div className="rounded-none lg:sticky lg:top-32 h-fit">
            <div className="space-y-12">
              {/* Header - Scaled Down & Tight */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black tracking-[0.4em] uppercase text-neutral-300">
                    Edition 01
                  </span>
                  <span className="h-[1px] flex-1 bg-neutral-100"></span>
                </div>
                <h1 className="text-4xl md:text-4xl font-black lowercase tracking-tighter leading-none text-black">
                  {product.name}
                </h1>

                {/* Description moved to dropdown */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    {product.variant}
                  </p>
                  <div className="flex items-center gap-4">
                    {product.compareAtPrice > product.price && (
                      <span className="text-neutral-300 line-through text-[10px] font-black">
                        ₹{product.compareAtPrice}
                      </span>
                    )}
                    <span className="text-black text-sm font-black tracking-widest">
                      ₹{product.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Size Selection - Square Blocks */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em]">
                      Select Unit Size
                    </Label>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="text-[9px] font-black underline opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
                        >
                          Sizing Info
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md rounded-none border-neutral-200">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-black uppercase tracking-widest text-center mt-2">
                            Unit Specifications
                          </DialogTitle>
                        </DialogHeader>
                        <div className="pt-4 pb-2">
                          <table className="w-full text-xs text-left uppercase tracking-widest font-bold">
                            <thead>
                              <tr className="border-b border-neutral-200">
                                <th className="pb-3 font-black text-neutral-400">
                                  Size
                                </th>
                                <th className="pb-3 font-black text-neutral-400">
                                  Chest
                                </th>
                                <th className="pb-3 font-black text-neutral-400">
                                  Length
                                </th>
                                <th className="pb-3 font-black text-neutral-400">
                                  Shoulder
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-neutral-100/50">
                                <td className="py-4">S</td>
                                <td className="py-4">42"</td>
                                <td className="py-4">28"</td>
                                <td className="py-4">20"</td>
                              </tr>
                              <tr className="border-b border-neutral-100/50">
                                <td className="py-4">M</td>
                                <td className="py-4">44"</td>
                                <td className="py-4">29"</td>
                                <td className="py-4">21"</td>
                              </tr>
                              <tr className="border-b border-neutral-100/50">
                                <td className="py-4">L</td>
                                <td className="py-4">46"</td>
                                <td className="py-4">30"</td>
                                <td className="py-4">22"</td>
                              </tr>
                              <tr className="border-b border-neutral-100/50">
                                <td className="py-4">XL</td>
                                <td className="py-4">48"</td>
                                <td className="py-4">31"</td>
                                <td className="py-4">23"</td>
                              </tr>
                              <tr>
                                <td className="py-4">XXL</td>
                                <td className="py-4">50"</td>
                                <td className="py-4">32"</td>
                                <td className="py-4">24"</td>
                              </tr>
                            </tbody>
                          </table>
                          <p className="text-[9px] text-neutral-400 mt-8 text-center uppercase tracking-widest font-bold">
                            * All measurements in inches. Tolerance +/- 0.5".
                            Fits oversized.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setValue("size", size)}
                        className={`w-12 h-12 text-[10px] font-black transition-all duration-300 border ${
                          selectedSize === size
                            ? "bg-black border-black text-white"
                            : "bg-white border-neutral-100 text-neutral-400 hover:border-black hover:text-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {errors.size && (
                    <p className="text-red-500 text-[9px] font-black uppercase px-1">
                      {errors.size.message}
                    </p>
                  )}
                </div>

                {/* Main Action - Magnetic CTAs - Square */}
                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isOutOfStock}
                    className="w-full bg-black text-white py-6 rounded-none text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-neutral-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10">
                      {isOutOfStock ? "Sold Out" : "Add to Cart"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="w-full bg-white text-black py-5 rounded-none text-[9px] font-black uppercase tracking-[0.2em] border border-neutral-200 hover:border-black transition-all flex items-center justify-center gap-2"
                  >
                    <Heart
                      className={`w-3 h-3 ${isWishlisted ? "fill-black" : ""}`}
                    />
                    {isWishlisted ? "In Archive" : "Archive Item"}
                  </button>
                </div>
              </form>

              {/* Details Dropdown */}
              <div className="pt-8 border-t border-neutral-100">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value="details"
                    className="border-b border-neutral-100"
                  >
                    <AccordionTrigger className="text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:no-underline text-left">
                      Product Details & Highlights
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-500 text-[10px] leading-loose pb-6">
                      <p className="text-xs normal-case leading-relaxed">
                        {product.description}
                      </p>
                      {product.highlights.length > 0 && (
                        <div className="pt-6 space-y-3">
                          {product.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-4">
                              <span className="text-[8px] font-mono text-neutral-300 pt-1">
                                0{i + 1}
                              </span>
                              <span className="uppercase font-medium tracking-widest">
                                {h}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping" className="border-none">
                    <AccordionTrigger className="text-[10px] font-black uppercase tracking-[0.2em] py-4 hover:no-underline text-left">
                      Shipping & Returns
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-500 text-[10px] leading-loose space-y-3 pb-6 uppercase font-medium tracking-widest">
                      <div className="flex items-start gap-4">
                        <span className="text-[8px] font-mono text-neutral-300 pt-1">
                          01
                        </span>
                        <span>
                          Orders are processed within 1-2 business days.
                        </span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-[8px] font-mono text-neutral-300 pt-1">
                          02
                        </span>
                        <span>
                          Free standard shipping on all orders over ₹2000.
                        </span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-[8px] font-mono text-neutral-300 pt-1">
                          03
                        </span>
                        <span>
                          14-day return policy for unworn items with tags
                          attached.
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Detail & Spec Grid - Flat */}
              <div className="grid grid-cols-2 gap-8 pt-10 border-t border-neutral-100">
                <div className="space-y-2">
                  <ShieldCheck className="w-5 h-5 text-neutral-200" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black">
                      Fabric Weight
                    </p>
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                      {product.gsm} GSM
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Crown className="w-5 h-5 text-neutral-200" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black">
                      Elite Spec
                    </p>
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                      {product.print}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Zap className="w-5 h-5 text-neutral-200" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black">
                      Garment Fit
                    </p>
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                      {product.fit}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Star className="w-5 h-5 text-neutral-200" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black">
                      Artisan Material
                    </p>
                    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">
                      {product.fabric}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED DROPS - Clean Square */}
        <div className="mt-20 space-y-12">
          <div className="flex flex-col items-start gap-2 max-w-sm">
            <h2 className="text-2xl font-black uppercase tracking-widest text-neutral-300">
              Related Drop
            </h2>
            <div className="h-[2px] w-12 bg-black" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ScrollReveal key={p.id} animation="fade-up">
                <Link href={`/product/${p.id}`} className="group block">
                  <div className="relative aspect-square bg-neutral-50 overflow-hidden mb-4 transition-all duration-300">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-sm font-black text-black/60 group-hover:text-black transition-colors">
                      ₹{p.price}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE STICKY CTR - Square Industrial */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-black text-white p-6 shadow-2xl flex items-center justify-between border-t border-white/10"
        >
          <div className="pl-4">
            <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest">
              Unit Price
            </p>
            <p className="text-base font-black tracking-widest">
              ₹{product.price}
            </p>
          </div>
          <button
            onClick={() => toast.success("Deployment Queued")}
            className="bg-white text-black h-12 px-10 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform"
          >
            Deploy
          </button>
        </motion.div>
      </div>
    </div>
  );
}
