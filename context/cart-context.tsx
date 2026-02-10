"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { Product } from "@/lib/products";
import gsap from "gsap";

export type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, imageRef: HTMLImageElement) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, delta: number) => void;
  setCartBtnRef: (ref: HTMLElement | null) => void;
  cartBtnRef: React.MutableRefObject<HTMLElement | null>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartBtnRef = useRef<HTMLElement | null>(null);

  // Animation state to prevent multiple animations at once
  const isAnimating = useRef(false);

  const openCart = () => {
    if (isAnimating.current) return;
    setIsCartOpen(true);
    document.body.style.overflow = "hidden"; // Lock body scroll
  };

  const closeCart = () => {
    if (isAnimating.current) return;
    setIsCartOpen(false);
    document.body.style.overflow = ""; // Unlock body scroll
  };

  const setCartBtnRefCallback = (ref: HTMLElement | null) => {
    cartBtnRef.current = ref;
  };

  const addToCart = (product: Product, imageRef: HTMLImageElement) => {
    if (isAnimating.current || !cartBtnRef.current) return;

    isAnimating.current = true;

    // Get coordinates
    const startRect = imageRef.getBoundingClientRect();
    const endRect = cartBtnRef.current.getBoundingClientRect();

    const numberOfClones = 6;
    const clones: HTMLImageElement[] = [];

    // Create multiple clones
    for (let i = 0; i < numberOfClones; i++) {
      const clone = imageRef.cloneNode(true) as HTMLImageElement;
      document.body.appendChild(clone);

      // Initial styles
      clone.style.position = "fixed";
      clone.style.top = `${startRect.top}px`;
      clone.style.left = `${startRect.left}px`;
      clone.style.width = `${startRect.width}px`;
      clone.style.height = `${startRect.height}px`;
      clone.style.zIndex = `${9999 - i}`; // Stack them so first one is on top? or reverse.
      clone.style.objectFit = "cover";
      clone.style.borderRadius = "0.5rem";
      clone.style.pointerEvents = "none";
      clone.style.transition = "none";

      clones.push(clone);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        clones.forEach((c) => c.remove());
        isAnimating.current = false;

        // Add to cart state logic
        setCartItems((prev) => {
          const existing = prev.find((item) => item.id === product.id);
          if (existing) {
            return prev.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }
          return [...prev, { ...product, quantity: 1 }];
        });

        // Bounce cart icon
        gsap.fromTo(
          cartBtnRef.current,
          { scale: 1 },
          { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 },
        );
      },
    });

    // Animation: Fly to cart with stagger
    tl.to(clones, {
      top: endRect.top + endRect.height / 2 - 20,
      left: endRect.left + endRect.width / 2 - 20,
      width: 40,
      height: 40,
      opacity: 0.5,
      scale: 0.1,
      borderRadius: "50%",
      duration: 0.8,
      stagger: 0.05, // The key change: stagger the animation
      ease: "power2.inOut",
    });

    tl.to(
      clones,
      {
        opacity: 0,
        duration: 0.2,
      },
      "-=0.2",
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        setCartBtnRef: setCartBtnRefCallback,
        cartBtnRef,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
