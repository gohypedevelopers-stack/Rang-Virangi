"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { products } from "@/lib/products";
import Image from "next/image";
import { Search, User, ShoppingBag, X, Package, Settings, Heart, LogOut, Menu, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "../context/cart-context";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const { openCart, setCartBtnRef, cartItems } = useCart();

  const searchSuggestions = products.filter(p =>
    searchQuery.trim() && p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  ).slice(0, 5);

  const executeSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchQuery("");
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch(e.currentTarget.value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen || isMobileSearchOpen || isMobileProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isMobileSearchOpen, isMobileProfileOpen]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const showAnim = gsap
      .from(navRef.current, {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      })
      .progress(1);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 text-black py-6 pl-6 pr-[2px] md:p-6 transition-all bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="mx-auto flex items-center justify-between relative w-full pr-0 md:px-4 lg:px-8">

        {/* Mobile Hamburger Menu Icon */}
        <div className="flex-1 flex lg:hidden justify-start">
          <button
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(true)}
            className="hover:text-gray-600 transition-colors p-2 -ml-2"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-[17px] font-bold flex-1">
          <Link
            href="/"
            className={`hover:text-gray-600 transition-colors ${pathname === "/" ? "underline decoration-black underline-offset-4" : ""}`}
          >
            Home
          </Link>
          <Link href="/shop" className={`hover:text-gray-600 transition-colors ${pathname.startsWith("/shop") ? "underline decoration-black underline-offset-4" : ""}`}>
            Shop
          </Link>
          <Link href="/about" className={`hover:text-gray-600 transition-colors ${pathname.startsWith("/about") ? "underline decoration-black underline-offset-4" : ""}`}>
            About
          </Link>
          <Link
            href="/contact"
            className={`hover:text-gray-600 transition-colors ${pathname.startsWith("/contact") ? "underline decoration-black underline-offset-4" : ""}`}
          >
            Contact
          </Link>
        </div>

        {/* Logo Section */}
        <div className="flex-shrink-0 flex-1 lg:flex-none flex justify-start lg:absolute lg:left-1/2 lg:-translate-x-1/2" ref={logoRef}>
          <Link href="/" className="font-black italic tracking-tighter">
            <div className="flex flex-row md:flex-col items-start gap-[6px] md:gap-[2px] leading-none whitespace-nowrap">
              <span className="border-b-[3px] border-black pb-0.5 text-xl md:text-[30px] font-caesar tracking-normal not-italic whitespace-nowrap">RANG VIRANGI</span>
              <span className="border-b-[3px] border-black pb-0.5 text-xl md:text-[22px]"></span>
            </div>
          </Link>
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-[2px] md:gap-2 flex-1 justify-end relative">
          {/* Animated Search Input */}
          <div
            className={`hidden md:flex items-center border-b border-black overflow-visible transition-all duration-300 ease-in-out relative ${isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"
              }`}
          >
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none w-full text-sm py-1 px-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              onBlur={() => {
                // Short delay to allow clicking the search icon itself or suggestions to toggle
                setTimeout(() => setIsSearchOpen(false), 200);
              }}
            />
            {/* Suggestions Dropdown (Desktop) */}
            <AnimatePresence>
              {isSearchOpen && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 shadow-xl rounded-lg overflow-hidden z-50 flex flex-col"
                >
                  {searchSuggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-b-0"
                    >
                      <div className="relative w-10 h-10 bg-neutral-100 rounded overflow-hidden shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-xs font-bold text-black truncate w-full">{product.name}</span>
                        <span className="text-[10px] text-neutral-500">₹{product.price.toLocaleString()}</span>
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={() => executeSearch(searchQuery)}
                    className="w-full text-center py-2 text-xs font-bold text-neutral-500 hover:text-black hover:bg-neutral-50 border-t border-neutral-100 transition-colors"
                  >
                    View all results
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            aria-label="Search"
            className="hover:text-gray-600 transition-colors p-2"
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsMobileSearchOpen(!isMobileSearchOpen);
              } else {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) {
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }
              }
            }}
          >
            {isSearchOpen || isMobileSearchOpen ? <X className="W-8 H-8" /> : <Search className="W-8 H-8" />}
          </button>
          <div className="relative" ref={profileRef}>
            <button
              aria-label="Account"
              className="hover:text-gray-600 transition-colors p-2"
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsMobileProfileOpen(!isMobileProfileOpen);
                } else {
                  setIsProfileOpen(!isProfileOpen);
                }
              }}
            >
              <User className="W-8 H-8" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:flex absolute right-0 top-full mt-2 w-64 bg-white border border-neutral-200 shadow-xl rounded-2xl overflow-hidden z-50 flex-col"
                >
                  <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
                    <p className="text-xl font-black tracking-tight">Hi, User</p>
                  </div>

                  <div className="p-2 flex flex-col gap-1">
                    <Link href="/account/orders" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-neutral-600 hover:text-black hover:bg-neutral-50 rounded-lg transition-all">
                      <Package className="w-4 h-4" /> My Orders
                    </Link>
                    <Link href="/account/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-neutral-600 hover:text-black hover:bg-neutral-50 rounded-lg transition-all">
                      <Settings className="w-4 h-4" /> Profile Settings
                    </Link>
                    <Link href="/account/wishlist" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-neutral-600 hover:text-black hover:bg-neutral-50 rounded-lg transition-all">
                      <Heart className="w-4 h-4" /> Wishlist
                    </Link>
                  </div>

                  <div className="p-2 border-t border-neutral-100">
                    <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      Sign Out <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            aria-label="Cart"
            className="hover:text-gray-600 transition-colors relative"
            onClick={openCart}
            ref={setCartBtnRef}
          >
            <ShoppingBag className="W-8 H-8" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-white h-screen w-screen flex flex-col overflow-hidden"
          >
            {/* Mobile Menu Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-neutral-100 min-h-[80px] bg-white">
              {/* Left Spacer to balance the Close Button */}
              <div className="w-10"></div>

              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="absolute left-1/2 -translate-x-1/2 font-black italic tracking-tighter">
                <div className="flex flex-row items-center gap-[6px] leading-none whitespace-nowrap">
                  <span className="border-b-[3px] border-black pb-0.5 text-xl font-caesar tracking-normal not-italic whitespace-nowrap">RANG VIRANGI</span>
                  <span className="border-b-[3px] border-black pb-0.5 text-xl"></span>
                </div>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors -mr-2 z-10"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col items-start justify-start bg-white">
              <div className="flex flex-col w-full text-left">
                {[
                  { name: "Home", href: "/" },
                  { name: "Shop", href: "/shop" },
                ].map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05), duration: 0.4 }}
                    className="w-full border-b border-neutral-100 last:border-none"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-6 flex items-center justify-between text-2xl md:text-3xl font-black uppercase tracking-tight hover:text-neutral-500 transition-colors group"
                    >
                      <span>{link.name}</span>
                      <span className="text-neutral-300 group-hover:text-black transition-colors group-hover:translate-x-1 duration-300">→</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Categories Dropdown */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="w-full border-b border-neutral-100 last:border-none"
                >
                  <button
                    onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                    className="w-full py-6 flex items-center justify-between text-2xl md:text-3xl font-black uppercase tracking-tight hover:text-neutral-500 transition-colors group"
                  >
                    <span>Categories</span>
                    <span className="text-neutral-300 group-hover:text-black transition-colors duration-300">
                      <ChevronDown className={`w-8 h-8 transition-transform duration-300 ${isMobileCategoriesOpen ? "rotate-180" : ""}`} />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isMobileCategoriesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-4 pb-6 px-4">
                          {["All", "Tees", "Bottoms", "Hoodies", "Outerwear"].map(cat => (
                            <Link
                              key={cat}
                              href={`/shop?category=${cat}`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileCategoriesOpen(false);
                              }}
                              className="text-lg font-bold text-neutral-600 hover:text-black uppercase tracking-wider py-2 transition-colors border-b border-neutral-50 last:border-none"
                            >
                              {cat}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Mobile Search Sidebar */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[120] w-screen h-screen bg-white md:hidden flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 min-h-[80px]">
              <span className="text-xl font-bold tracking-tight">Search</span>
              <button
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors -mr-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="flex items-center border-b-2 border-black pb-3 shrink-0">
                <Search className="w-6 h-6 mr-3 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full text-xl outline-none bg-transparent"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>

              {/* Mobile Suggestions */}
              {searchSuggestions.length > 0 && (
                <div className="mt-6 flex flex-col gap-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Suggestions</h4>
                  {searchSuggestions.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => {
                        setIsMobileSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-4 transition-colors group"
                    >
                      <div className="relative w-16 h-20 bg-neutral-100 rounded overflow-hidden shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col flex-1 pt-1 min-w-0">
                        <span className="text-base font-bold text-black uppercase tracking-tight group-hover:text-neutral-500 transition-colors truncate">{product.name}</span>
                        <span className="text-sm text-neutral-500 mt-1">₹{product.price.toLocaleString()}</span>
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={() => executeSearch(searchQuery)}
                    className="w-full mt-2 bg-neutral-100 text-black font-bold py-3 rounded-lg uppercase tracking-widest text-xs"
                  >
                    View All Results
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Profile Sidebar */}
      <AnimatePresence>
        {isMobileProfileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[120] w-screen h-screen bg-white md:hidden flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 min-h-[80px] bg-neutral-50/50">
              <p className="text-xl md:text-2xl font-black tracking-tight">Hi, User</p>
              <button onClick={() => setIsMobileProfileOpen(false)} className="p-2 hover:bg-neutral-200 rounded-full transition-colors -mr-2">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 bg-white">
              <Link href="/account/orders" onClick={() => setIsMobileProfileOpen(false)} className="flex items-center gap-4 px-4 py-5 text-xl font-bold text-neutral-700 hover:bg-neutral-100 rounded-xl transition-all">
                <Package className="w-6 h-6" /> My Orders
              </Link>
              <Link href="/account/settings" onClick={() => setIsMobileProfileOpen(false)} className="flex items-center gap-4 px-4 py-5 text-xl font-bold text-neutral-700 hover:bg-neutral-100 rounded-xl transition-all">
                <Settings className="w-6 h-6" /> Profile Settings
              </Link>
              <Link href="/account/wishlist" onClick={() => setIsMobileProfileOpen(false)} className="flex items-center gap-4 px-4 py-5 text-xl font-bold text-neutral-700 hover:bg-neutral-100 rounded-xl transition-all">
                <Heart className="w-6 h-6" /> Wishlist
              </Link>
            </div>
            <div className="p-6 border-t border-neutral-100 mt-auto bg-white">
              <button onClick={() => setIsMobileProfileOpen(false)} className="w-full flex items-center justify-between px-6 py-5 text-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all">
                Sign Out <LogOut className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
