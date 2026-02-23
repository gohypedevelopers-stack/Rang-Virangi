"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, Truck, CheckCircle2, ChevronRight, Clock } from "lucide-react";

// Mock Data
const ORDERS = [
    {
        id: "RV-98234",
        date: "Feb 18, 2026",
        total: 3499,
        status: "Delivered",
        items: [
            { id: 1, name: "Heavyweight Cargo Pants", color: "Olive", size: "M", price: 3499, qty: 1, image: "https://images.unsplash.com/photo-1624378439575-d1ead6eba2a2?q=80&w=200&auto=format&fit=crop" }
        ]
    },
    {
        id: "RV-99102",
        date: "Feb 22, 2026",
        total: 6198,
        status: "Shipped",
        items: [
            { id: 2, name: "The Essential Bamboo Oversized Tee", color: "Onyx Black", size: "L", price: 1899, qty: 1, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop" },
            { id: 3, name: "Textured Shacket", color: "Navy", size: "L", price: 4299, qty: 1, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=200&auto=format&fit=crop" }
        ]
    }
];

export default function OrdersPage() {

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Delivered": return <CheckCircle2 className="w-4 h-4 text-green-600" />;
            case "Shipped": return <Truck className="w-4 h-4 text-amber-600" />;
            default: return <Clock className="w-4 h-4 text-neutral-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered": return "bg-green-100 text-green-800 border-green-200";
            case "Shipped": return "bg-amber-100 text-amber-800 border-amber-200";
            default: return "bg-neutral-100 text-neutral-800 border-neutral-200";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Order History</h2>
                <p className="text-neutral-500 text-sm font-medium">View and track your recent purchases.</p>
            </div>

            <div className="space-y-6">
                {ORDERS.map((order) => (
                    <div key={order.id} className="border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:border-black transition-colors group">

                        {/* Order Header */}
                        <div className="bg-neutral-50 p-4 sm:p-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">Order Placed</p>
                                    <p className="text-sm font-bold">{order.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">Total</p>
                                    <p className="text-sm font-bold">₹{order.total}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">Order #</p>
                                    <p className="text-sm font-bold">{order.id}</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:items-end gap-2 shrink-0">
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)} {order.status}
                                </div>
                                <button className="text-xs font-bold underline decoration-neutral-300 hover:text-black">
                                    View Invoice
                                </button>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4 sm:p-6 divide-y divide-neutral-100">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-4 flex flex-col sm:flex-row gap-4 sm:items-center first:pt-0 last:pb-0">
                                    <div className="relative w-20 sm:w-24 aspect-square bg-neutral-100 rounded-lg overflow-hidden shrink-0">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm sm:text-base leading-tight mb-1 group-hover:underline decoration-2 underline-offset-4">{item.name}</h3>
                                        <p className="text-neutral-500 text-xs sm:text-sm font-medium">Color: {item.color} | Size: {item.size} | Qty: {item.qty}</p>
                                    </div>

                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto mt-4 sm:mt-0 gap-3">
                                        <p className="font-bold">₹{item.price}</p>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 text-xs font-bold bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors">
                                                Track Package
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Action Footer */}
                        {order.status === "Delivered" && (
                            <div className="bg-neutral-50 p-4 border-t border-neutral-200 text-center sm:text-right">
                                <Link href={`/product/rv-1001`} className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-neutral-500 transition-colors inline-flex items-center">
                                    Purchase Again <ChevronRight className="w-3 h-3 ml-1" />
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
