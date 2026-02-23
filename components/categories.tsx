import Link from "next/link";

const categories = [
  {
    name: "WINTER WEAR",
    href: "/shop/winter-wear",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-16 h-16"
      >
        <path d="M12 2C9 2 7 3.5 7 6v2h10V6c0-2.5-2-4-5-4z" /> {/* Hood */}
        <path d="M7 8L4 12v10h16V12l-3-4" /> {/* Body/Sleeves container */}
        <path d="M7 8v14M17 8v14" /> {/* Side lines */}
        <path d="M9 14h6v6H9z" /> {/* Pocket */}
      </svg>
    ),
  },
  {
    name: "BOTTOM WEAR",
    href: "/shop/bottom-wear",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-16 h-16"
      >
        <path d="M6 2h12l-2 20h-3l-1-14-1 14H8L6 2z" /> {/* Pants outline */}
        <path d="M12 4v6" /> {/* Fly */}
        <path d="M6 5h12" /> {/* Waistband */}
      </svg>
    ),
  },
  {
    name: "OVERSIZED TEES",
    href: "/shop/oversized-tees",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-16 h-16"
      >
        <path d="M3 8L7 2h10l4 6-3 2-2-3v15H8V7L6 10 3 8z" />{" "}
        {/* Oversized shape */}
      </svg>
    ),
  },
  {
    name: "TANKS",
    href: "/shop/tanks",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-16 h-16"
      >
        <path d="M6 4l2-2h8l2 2v18H6V4z" /> {/* Tank shape */}
        <path d="M6 9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4" stroke="none" />{" "}
        {/* Armhole cutout implied by shape usually, simplified here */}
        <path d="M8 2v5M16 2v5" /> {/* Straps detail */}
      </svg>
    ),
  },
  {
    name: "REGULAR FIT TEES",
    href: "/shop/regular-fit-tees",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-16 h-16"
      >
        <path d="M12 3a4 4 0 0 0-4 1.5L4 6l2 3 2-1v13h8V8l2 1 2-3-4-1.5A4 4 0 0 0 12 3z" />
      </svg>
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
        <div className="flex flex-nowrap justify-start md:justify-center gap-6 md:gap-12 lg:gap-16 overflow-x-auto pb-8 pt-2 px-4 md:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
