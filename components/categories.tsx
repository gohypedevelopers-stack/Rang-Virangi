import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "WINTER WEAR",
    href: "/shop/winter-wear",
    icon: (
      <Image src="/jacket.png" alt="Winter Wear" width={64} height={64} className="w-16 h-16 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
    ),
  },
  {
    name: "BOTTOM WEAR",
    href: "/shop/bottom-wear",
    icon: (
      <Image src="/bottom-wear.png" alt="Bottom Wear" width={64} height={64} className="w-16 h-16 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
    ),
  },
  {
    name: "OVERSIZED TEES",
    href: "/shop/oversized-tees",
    icon: (
      <Image src="/tshirt.png" alt="Oversized Tees" width={64} height={64} className="w-16 h-16 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
    ),
  },
  {
    name: "TANKS",
    href: "/shop/tanks",
    icon: (
      <Image src="/tank.png" alt="Tanks" width={64} height={64} className="w-16 h-16 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
    ),
  },
  {
    name: "REGULAR FIT TEES",
    href: "/shop/regular-fit-tees",
    icon: (
      <Image src="/tshirt-outline.png" alt="Regular Fit Tees" width={64} height={64} className="w-16 h-16 object-contain transition-all duration-500 group-hover:brightness-0 group-hover:invert" />
    ),
  },
];

export function Categories() {
  return (
    <section className="w-full bg-white py-12 md:py-16 px-4 md:px-8 border-t border-neutral-200">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-black mb-10 tracking-wider text-left md:text-left">
          CATEGORIES
        </h2>

        {/* Scrollable container with hidden scrollbar and snap scrolling for mobile/tablet */}
        <div className="flex flex-nowrap justify-start md:justify-center gap-6 md:gap-6 lg:gap-16 overflow-x-auto pb-8 pt-2 px-4 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group flex flex-col items-center gap-5 min-w-[110px] md:min-w-[140px] flex-shrink-0 snap-center"
            >
              {/* Category Icon Circle */}
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-black group-hover:border-black group-hover:shadow-xl group-hover:-translate-y-2">
                <div className="text-neutral-500 transition-colors duration-500 group-hover:text-white">
                  {item.icon}
                </div>
              </div>

              {/* Category Title */}
              <span className="text-black text-[10px] md:text-sm font-bold tracking-widest text-center uppercase transition-all duration-300 group-hover:tracking-[0.2em]">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
