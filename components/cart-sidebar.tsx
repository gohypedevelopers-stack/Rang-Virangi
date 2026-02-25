"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import gsap from "gsap";
import { useCart } from "@/context/cart-context";

export function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart } =
    useCart();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isProceeding, setIsProceeding] = useState(false);

  const handleCheckout = () => {
    setIsProceeding(true);
    // Simulate Shopify Checkout API creation delay
    setTimeout(() => {
      setIsProceeding(false);
      // In the future: window.location.href = shopifyCheckoutUrl;
    }, 1500);
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!sidebar || !overlay || !content) return;

    if (isCartOpen) {
      // Open animation
      gsap.to(overlay, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(content, {
        x: "0%",
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      // Close animation
      gsap.to(overlay, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.5,
        ease: "power2.in",
      });
      gsap.to(content, {
        x: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isCartOpen]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div ref={sidebarRef} className="fixed inset-0 z-100 pointer-events-none">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 opacity-0 pointer-events-none transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar Content */}
      <div
        ref={contentRef}
        className="absolute top-0 right-0 h-full w-full max-w-md bg-white border-l border-neutral-200 shadow-2xl transform translate-x-full flex flex-col pointer-events-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-bold text-black tracking-wide">
            Your Cart ({cartItems.length})
          </h2>
          <button
            onClick={closeCart}
            className="text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
              <span className="text-6xl">🛒</span>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-20 h-24 bg-neutral-100 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-black font-medium text-sm">
                      {item.name}
                    </h3>
                    <p className="text-neutral-500 text-xs mt-1">
                      {item.variant}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-neutral-100 rounded-full px-2 py-1">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.id, -1)
                            : removeFromCart(item.id)
                        }
                        className="text-neutral-500 hover:text-black p-1"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-black text-xs font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-neutral-500 hover:text-black p-1"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-black font-medium text-sm">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-neutral-200 bg-neutral-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-neutral-600">Subtotal</span>
              <span className="text-black font-bold text-lg">
                ₹{totalAmount.toLocaleString()}
              </span>
            </div>
            <p className="text-neutral-500 text-xs mb-6">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              onClick={handleCheckout}
              disabled={isProceeding}
              className={`w-full bg-black text-white font-bold py-3 uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isProceeding ? "opacity-75 cursor-not-allowed" : "hover:bg-neutral-800"}`}
            >
              {isProceeding ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                "Checkout"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
