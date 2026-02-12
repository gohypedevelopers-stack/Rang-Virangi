"use client";

import Link from "next/link";
import { Search, User, ShoppingBag } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "../context/cart-context";

export function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const { openCart, setCartBtnRef, cartItems } = useCart();

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
      className="fixed top-0 left-0 w-full z-50 text-black p-6 transition-all bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0" ref={logoRef}>
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            {/* Placeholder for the logo from the image */}
            <span className="font-mono italic border-b-2 border-black pb-1">
              RangVirangi
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-gray-600 transition-colors underline decoration-black underline-offset-4"
          >
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-600 transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-gray-600 transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-600 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="hover:text-gray-600 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hover:text-gray-600 transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>
          <button
            aria-label="Cart"
            className="hover:text-gray-600 transition-colors relative"
            onClick={openCart}
            ref={setCartBtnRef}
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
