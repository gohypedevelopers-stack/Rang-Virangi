"use client";

export function MarqueeOffer() {
  const offers = [
    "🔥 FLAT 20% OFF ON FIRST ORDER",
    "FREE SHIPPING ON ORDERS ABOVE ₹999",
    "💎 NEW ARRIVALS JUST DROPPED",
    "🎁 BUY 2 GET 1 FREE ON ESSENTIALS",
    "⚡ LIMITED TIME OFFER - ENDS SOON",
  ];

  // Duplicate offers for seamless loop
  const allOffers = [...offers, ...offers];

  return (
    <section className="w-full bg-white py-3 border-t border-b border-neutral-200 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {allOffers.map((offer, index) => (
          <span
            key={index}
            className="text-black text-xs md:text-sm font-bold uppercase tracking-widest mx-8 md:mx-16"
          >
            {offer}
          </span>
        ))}
      </div>
    </section>
  );
}
