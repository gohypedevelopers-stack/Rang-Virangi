"use client";
import Link from "next/link";

function Footer() {
  return (
    <footer className="py-15 px-4 md:px-8 bg-black border-t border-neutral-800">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-10 md:mb-8">
            <Link href="/" className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Rang Virangi</h2>
            </Link>

            <p className="text-neutral-400 mt-4 max-w-xs">
              Premium streetwear collection. Redefining fashion with bold
              designs and quality craftsmanship.
            </p>
            <p className="text-sm text-neutral-500 mt-5">
              © {new Date().getFullYear()} Rang Virangi. All rights reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-white">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/shop"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/new"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/sale"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Sale
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/hoodies"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Hoodies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://instagram.com"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://facebook.com"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-8 items-center justify-center">
          <h1 className="text-center text-4xl md:text-6xl lg:text-[11.5rem] scale-y-125 overflow-hidden uppercase font-medium bg-clip-text text-white select-none tracking-wider whitespace-nowrap">
            Rang Virangi
          </h1>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
