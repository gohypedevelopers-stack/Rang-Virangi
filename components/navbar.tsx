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

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        // Simple direction check: self.direction === -1 ? showAnim.play() : showAnim.reverse();
        // But for this request ("look good"), let's just do transparency to solid change
        if (self.scroll() > 50) {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
            paddingTop: "1rem",
            paddingBottom: "1rem",
            duration: 0.3,
            ease: "power2.out",
          });
        } else {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(0, 0, 0, 0)",
            backdropFilter: "blur(0px)",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      },
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 text-white p-6 transition-all"
      style={{ backgroundColor: "rgba(38, 38, 38, 1)" }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0" ref={logoRef}>
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            {/* Placeholder for the logo from the image */}
            <span className="font-mono italic border-b-2 border-white pb-1">
              Rang Virangi
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-gray-300 transition-colors underline decoration-white underline-offset-4"
          >
            Home
          </Link>
          <Link href="/shop" className="hover:text-gray-300 transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-300 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Icons Section */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="hover:text-gray-300 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/account"
            aria-label="Account"
            className="hover:text-gray-300 transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>
          <button
            aria-label="Cart"
            className="hover:text-gray-300 transition-colors relative"
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
