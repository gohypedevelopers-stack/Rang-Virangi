"use client";
import Link from "next/link";

function Footer() {
  return (
    <footer className="py-15 px-4 md:px-8 bg-white border-t border-neutral-200">
      <div className="w-full">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-10 md:mb-0 max-w-sm">
            <Link href="/" className="inline-block mb-6">
              <img
                src="https://i.postimg.cc/wMJmPVMW/logo-removebg-preview.png"
                alt="Rang Virangi Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-neutral-500 font-bold text-[10px] uppercase tracking-[0.1em] leading-loose">
              PREMIUM STREETWEAR COLLECTION. REDEFINING FASHION WITH BOLD
              DESIGNS AND QUALITY CRAFTSMANSHIP.
            </p>
            {/* Newsletter */}
            <div className="mt-8 max-w-xs">
              <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-black">GET UPDATES</p>
              <form className="flex" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS"
                  className="bg-transparent border-b-2 border-black py-2 text-[10px] font-bold uppercase tracking-widest w-full focus:outline-none text-black placeholder:text-neutral-400"
                />
                <button type="submit" className="border-b-2 border-black py-2 px-4 transition-transform hover:translate-x-1 text-black font-bold">
                  →
                </button>
              </form>
            </div>

            <p className="text-[9px] font-bold text-neutral-400 mt-12 uppercase tracking-widest">
              © {new Date().getFullYear()} RANG VIRANGI. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-5 text-black border-b border-black pb-2">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/shop"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?sort=new-arrivals"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=Hoodies"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    Hoodies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-5 text-black border-b border-black pb-2">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    href="/returns"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest mb-5 text-black border-b border-black pb-2">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="https://instagram.com"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://twitter.com"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://facebook.com"
                    className="text-[10px] uppercase font-bold tracking-[0.12em] text-neutral-400 hover:text-black transition-colors"
                  >
                    Facebook
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-16 items-center justify-center border-t border-neutral-100 pt-8 overflow-hidden">
          <h1 className="text-center text-5xl md:text-8xl lg:text-[10rem] font-black uppercase text-black select-none tracking-[-0.03em] leading-none whitespace-nowrap flex items-center">
            <span>RANG</span>
            <span style={{ WebkitTextStroke: "2px black", color: "transparent" }}>VIRANGI</span>
          </h1>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
