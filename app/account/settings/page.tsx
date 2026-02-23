"use client";

import { useState } from "react";
import { Edit2, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "../../../components/ui/label";

export default function SettingsPage() {
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: "Demo",
        lastName: "User",
        email: "user@example.com",
        phone: "+91 98765 43210"
    });

    const handleSaveInfo = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditingInfo(false);
        toast.success("Profile updated successfully!");
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div>
                <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Profile Settings</h2>
                <p className="text-neutral-500 text-sm font-medium">Manage your personal information and preferences.</p>
            </div>

            {/* Personal Information Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold uppercase tracking-widest text-neutral-400">Personal Information</h3>
                    {!isEditingInfo && (
                        <button
                            onClick={() => setIsEditingInfo(true)}
                            className="text-xs font-bold flex items-center gap-1 hover:text-neutral-500 transition-colors bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-full"
                        >
                            <Edit2 className="w-3 h-3" /> Edit
                        </button>
                    )}
                </div>

                {isEditingInfo ? (
                    <form onSubmit={handleSaveInfo} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-xs font-bold uppercase text-neutral-500">First Name</Label>
                            <input
                                id="firstName"
                                type="text"
                                value={personalInfo.firstName}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                                className="w-full bg-white border-b-2 border-neutral-200 px-0 py-2 focus:outline-none focus:border-black transition-colors rounded-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-xs font-bold uppercase text-neutral-500">Last Name</Label>
                            <input
                                id="lastName"
                                type="text"
                                value={personalInfo.lastName}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                                className="w-full bg-white border-b-2 border-neutral-200 px-0 py-2 focus:outline-none focus:border-black transition-colors rounded-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase text-neutral-500">Email Address</Label>
                            <input
                                id="email"
                                type="email"
                                value={personalInfo.email}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                className="w-full bg-white border-b-2 border-neutral-200 px-0 py-2 focus:outline-none focus:border-black transition-colors rounded-none"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs font-bold uppercase text-neutral-500">Phone Number</Label>
                            <input
                                id="phone"
                                type="tel"
                                value={personalInfo.phone}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                                className="w-full bg-white border-b-2 border-neutral-200 px-0 py-2 focus:outline-none focus:border-black transition-colors rounded-none"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsEditingInfo(false)}
                                className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors flex items-center gap-2"
                            >
                                <X className="w-4 h-4" /> Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest bg-black text-white rounded-xl hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-md"
                            >
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6 p-6 border border-neutral-100 rounded-2xl bg-white shadow-sm">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">Full Name</p>
                            <p className="font-bold text-lg">{personalInfo.firstName} {personalInfo.lastName}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">Email Address</p>
                            <p className="font-bold text-lg">{personalInfo.email}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">Phone Number</p>
                            <p className="font-bold text-lg">{personalInfo.phone || "Not provided"}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">Password</p>
                            <button className="font-bold text-sm underline decoration-neutral-300 hover:text-black hover:decoration-black transition-colors pt-1">
                                Change Password
                            </button>
                        </div>
                    </div>
                )}
            </section>

            {/* Address Book Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold uppercase tracking-widest text-neutral-400">Address Book</h3>
                    <button className="text-xs font-bold flex items-center gap-1 hover:text-neutral-500 transition-colors border-b border-black pb-0.5">
                        + Add New Address
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-black rounded-2xl p-6 relative bg-neutral-50/50">
                        <span className="absolute top-4 right-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">Default</span>
                        <p className="font-bold mb-2">Home</p>
                        <p className="text-sm text-neutral-600 leading-relaxed mb-4 max-w-[200px]">
                            {personalInfo.firstName} {personalInfo.lastName}<br />
                            123 Streetwear Ave, Floor 4<br />
                            Mumbai, Maharashtra 400001<br />
                            India
                        </p>
                        <div className="flex gap-4">
                            <button className="text-xs font-bold underline decoration-neutral-300 hover:text-black">Edit</button>
                            <button className="text-xs font-bold text-red-500 hover:text-red-700 underline decoration-red-200">Delete</button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
