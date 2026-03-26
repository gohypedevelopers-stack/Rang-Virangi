"use client";

import Link from "next/link";
import { ChevronRight, RefreshCw, AlertCircle, ShoppingBag } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 selection:bg-black selection:text-white">
      <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-3 text-xs md:text-sm text-neutral-500 font-medium mb-12">
          <Link href="/" className="hover:text-black transition-colors shrink-0">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
          <span className="text-black font-bold shrink-0">Returns & Exchanges</span>
        </nav>

        <div className="max-w-4xl w-full">
          <h1 className="text-4xl md:text-7xl font-black uppercase text-black leading-none tracking-tighter mb-8 drop-shadow-[2px_2px_0px_#e5e5e5]">
            RETURNS POLICY
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 border-t border-neutral-100 pt-16 mt-16">
            <div className="flex flex-col items-center gap-6 p-10 bg-neutral-900 text-white rounded-3xl">
              <RefreshCw className="w-10 h-10 text-white/40" />
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">7-Day Free Returns</h2>
              <p className="text-white/40 font-medium uppercase text-xs md:text-sm tracking-widest leading-relaxed">
                If the item doesn't fit or you changed your mind, we offer free returns on all orders within 7 days of delivery.
              </p>
            </div>
            <div className="flex flex-col items-center gap-6 p-10 border-2 border-black rounded-3xl">
              <AlertCircle className="w-10 h-10 text-black/20" />
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">Exchanges</h2>
              <p className="text-neutral-500 font-medium uppercase text-xs md:text-sm tracking-widest leading-relaxed">
                Need a different size? We offer a simple 1-to-1 exchange process. The new item will be shipped once the original is received.
              </p>
            </div>
          </div>

          <div className="space-y-24 w-full">
            <section className="flex flex-col items-center w-full">
              <div className="flex flex-col items-center mb-8">
                <span className="w-10 h-10 rounded-full bg-black text-white text-xs flex items-center justify-center mb-4">01</span>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-center">
                  Conditions for Return
                </h2>
              </div>
              <ul className="space-y-2 w-full max-w-2xl px-4">
                {[
                  "Items must be in original condition with all tags attached.",
                  "Clothing must not have been worn, washed, or altered.",
                  "Original packaging must be intact for a full refund.",
                  "Proof of purchase is required for all returns."
                ].map((txt, i) => (
                  <li key={i} className="text-neutral-500 font-bold uppercase text-[10px] md:text-xs tracking-[0.1em] py-4 border-b border-neutral-50 last:border-0 text-center">
                    {txt}
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col items-center w-full">
              <div className="flex flex-col items-center mb-8">
                <span className="w-10 h-10 rounded-full bg-black text-white text-xs flex items-center justify-center mb-4">02</span>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-center">
                  The Process
                </h2>
              </div>
              <div className="space-y-12 w-full max-w-2xl px-4">
                {[
                  { title: "Initiate Request", body: "Send an email to support@rangvirangi.com with your order number and items to return." },
                  { title: "Quality Check", body: "Our warehouse team will inspect the item within 48 hours of receipt." },
                  { title: "Refund/Exchange", body: "Once approved, the refund will be credited back to your original payment method in 5-7 business days." }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <h3 className="text-base md:text-lg font-black uppercase tracking-tight mb-3">{step.title}</h3>
                    <p className="text-neutral-500 font-bold uppercase text-[10px] md:text-xs tracking-widest max-w-lg leading-relaxed">{step.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-neutral-100 p-10 md:p-16 rounded-[2rem] text-center">
                <ShoppingBag className="w-16 h-16 mx-auto mb-8 text-black/20" />
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-6">Ready to initiate a return?</h2>
                <p className="text-neutral-500 font-bold uppercase text-[10px] md:text-xs tracking-widest max-w-xl mx-auto mb-10 leading-loose">
                  Ensure you have your order receipt and that the item meets our conditions. Our team is dedicated to making this process as smooth as possible.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link href="/contact" className="w-full md:w-auto bg-black text-white px-10 py-5 font-black uppercase text-xs tracking-[0.3em] hover:bg-neutral-800 transition-colors">
                      Start My Return
                    </Link>
                    <Link href="/shop" className="w-full md:w-auto bg-white border border-neutral-200 text-black px-10 py-5 font-black uppercase text-xs tracking-[0.3em] hover:bg-neutral-50 transition-colors">
                      Back To Store
                    </Link>
                </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
