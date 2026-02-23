"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Settings, Heart, LogOut } from "lucide-react";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: "My Orders", href: "/account/orders", icon: Package },
        { name: "Profile Settings", href: "/account/settings", icon: Settings },
        { name: "Wishlist", href: "/account/wishlist", icon: Heart },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 pt-32 pb-20 text-foreground selection:bg-black selection:text-white">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase">My Account</h1>
                    <p className="text-neutral-500 font-medium mt-2">Manage your orders, profile, and wishlist.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 sticky top-32">

                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-neutral-100">
                                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Welcome back</p>
                                    <p className="font-bold text-lg leading-tight">User</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive
                                                    ? "bg-black text-white shadow-md shadow-black/10"
                                                    : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {item.name}
                                        </Link>
                                    );
                                })}

                                <div className="pt-4 mt-4 border-t border-neutral-100">
                                    <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                                        Sign Out <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8 min-h-[500px]">
                            {children}
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
}
