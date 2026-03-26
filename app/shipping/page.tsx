"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 selection:bg-black selection:text-white">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-3 text-xs md:text-sm text-neutral-500 font-medium mb-12">
          <Link href="/" className="hover:text-black transition-colors shrink-0">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
          <span className="text-black font-bold shrink-0">Shipping Policy</span>
        </nav>

        <div className="max-w-4xl w-full">
          <h1 className="text-4xl md:text-7xl font-black uppercase text-black leading-none tracking-tighter mb-8 drop-shadow-[2px_2px_0px_#e5e5e5]">
            SHIPPING INFO
          </h1>
          
          <div className="space-y-12 mt-16 border-t border-neutral-100 pt-16">
            <section className="flex flex-col items-center">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6">Dispatch Times</h2>
              <p className="text-neutral-500 font-medium leading-relaxed uppercase text-xs md:text-sm tracking-widest max-w-2xl mx-auto">
                Orders are processed and dispatched within 2-4 business days. During peak collection drops, processing may take up to 7 business days. 
                You will receive a confirmation email with a tracking number once your order is on its way.
              </p>
            </section>

            <section className="flex flex-col items-center">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6">Domestic Shipping (India)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 text-center">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-neutral-400">Standard Delivery</h3>
                  <p className="font-bold text-lg mb-2">5-7 Business Days</p>
                  <p className="text-[10px] uppercase font-bold text-neutral-500 tracking-widest">Free on all orders over ₹1,999</p>
                </div>
                <div className="bg-black text-white p-8 rounded-2xl text-center">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-white/40">Express Delivery</h3>
                  <p className="font-bold text-lg mb-2">2-3 Business Days</p>
                  <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">Available at checkout</p>
                </div>
              </div>
            </section>

            <section className="flex flex-col items-center">
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6">International Shipping</h2>
              <p className="text-neutral-500 font-medium leading-relaxed uppercase text-xs md:text-sm tracking-widest max-w-2xl mx-auto">
                We currently ship to over 50 countries. International shipping rates are calculated at checkout based on location and weight. 
                Estimated delivery for international orders is 10-14 business days.
              </p>
            </section>

            <section className="bg-black text-white p-10 md:p-16 rounded-[2rem] overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <h1 className="text-[10rem] font-black uppercase leading-none select-none">RV</h1>
              </div>
              <div className="relative z-10">
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-6">Need Assistance?</h2>
                <p className="text-white/60 font-medium uppercase text-xs md:text-sm tracking-widest max-w-xl mb-10 leading-relaxed">
                  If you have any specific requests regarding your delivery or if you encounter any issues with tracking, our team is ready to help.
                </p>
                <Link href="/contact" className="inline-block bg-white text-black px-8 py-4 font-black uppercase text-xs tracking-[0.3em] hover:bg-neutral-200 transition-colors">
                  Contact Support
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
