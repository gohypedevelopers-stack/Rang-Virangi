import { FloatingShapes } from "../../components/ui/floating-shapes";
import { TextMarquee } from "../../components/ui/text-marquee";
import { CheckCircle2, Truck, RefreshCcw, ShieldCheck, Star, Zap, Ruler } from "lucide-react";

export const metadata = {
    title: "About Us | Rang Virangi",
    description: "The story behind Rang Virangi and our mission to redefine basics.",
};

export default function AboutPage() {
    const benefits = [
        { icon: <Star className="w-6 h-6" />, title: "Premium Materials", desc: "Luxuriously soft bamboo cotton." },
        { icon: <Truck className="w-6 h-6" />, title: "Fast Shipping", desc: "Reliable and quick delivery." },
        { icon: <RefreshCcw className="w-6 h-6" />, title: "Easy Returns", desc: "Hassle-free 30-day exchanges." },
        { icon: <ShieldCheck className="w-6 h-6" />, title: "Secure Payments", desc: "Safe, encrypted checkout." },
        { icon: <Zap className="w-6 h-6" />, title: "New Drops", desc: "Fresh, limited-edition collections." },
        { icon: <CheckCircle2 className="w-6 h-6" />, title: "Customer Support", desc: "Always here to help you." },
        { icon: <Ruler className="w-6 h-6" />, title: "Size Guidance", desc: "Find your perfect, tailored fit." },
    ];

    return (
        <div className="relative overflow-hidden min-h-screen bg-background text-foreground pt-24 pb-20 selection:bg-black selection:text-white">
            <FloatingShapes />

            {/* Hero Section */}
            <div className="container mx-auto px-6 text-center relative z-10 my-20 md:my-32">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <p className="text-neutral-500 font-bold text-xs md:text-sm tracking-[0.4em] mb-6 uppercase">
                        Est. 2024
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 uppercase leading-tight">
                        We Are <br />
                        <span className="font-caesar font-normal tracking-normal border-b-[6px] border-black pb-1 inline-block mt-2 bg-gradient-to-r from-slate-600 via-neutral-300 to-zinc-700 bg-clip-text text-transparent">
                            Rang Virangi
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium mt-8">
                        Crafting the perfect balance between comfort, style, and sustainability. Not just a brand, but a mindset.
                    </p>
                </div>
            </div>

            {/* Marquee */}
            <div className="py-6 bg-black -rotate-2 border-y-4 border-neutral-200 z-10 relative mb-20 md:mb-32 scale-105 shadow-2xl">
                <TextMarquee
                    text="OUR STORY • OUR VISION • PREMIUM FABRICS • SUSTAINABLE LUXURY • CRAFTED WITH LOVE • "
                    className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider"
                    speed={20}
                />
            </div>

            {/* Main Story Content */}
            <div className="container mx-auto px-6 relative z-10 max-w-4xl mb-32">
                <div className="space-y-16 text-lg md:text-xl text-neutral-800 leading-relaxed font-medium">

                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase">The Origin Story</h2>
                        <p className="text-neutral-600">
                            Welcome to Rang Virangi. We’re not just a clothing brand; we’re a movement to rebuild your everyday wardrobe from the fabric up. Born out of frustration with a fashion industry caught between cheap, disposable fast fashion and inaccessible luxury hype, we set out to create something better.
                        </p>
                        <p className="text-neutral-600">
                            Our journey started when we realized that quality basics were being entirely forgotten. We were tired of standard cotton tees that looked incredible on launch day but lost their shape, softness, and soul after just a few washes.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase">Our Mission & Quality Promise</h2>
                        <p className="text-neutral-600">
                            We wanted clothing that masterfully balances function and emotion, street flair and sophistication. That’s when we discovered bamboo cotton—nature’s most underrated luxury fiber. Softer than standard cotton, naturally breathable, and thermoregulating, it moves with you rather than against you.
                        </p>
                        <p className="text-neutral-600">
                            Our mission is to bring you premium streetwear and elevated basics that absolutely never compromise on quality or sustainability. Our quality promise is woven into every single thread: meticulously crafted for an effortless, tailored fit, unparalleled all-day comfort, and long-lasting durability.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase">What Makes Us Different?</h2>
                        <p className="text-neutral-600">
                            What sets Rang Virangi apart? We focus fiercely on sustainable luxury but leave the elitist price tag at the door. Quality isn&apos;t a seasonal gimmick for us; it&apos;s a daily mindset. We create timeless, modern streetwear pieces that are thoughtfully considered, sustainably crafted, and designed to be worn every damn day.
                        </p>
                    </div>

                </div>
            </div>

            {/* Benefits Grid */}
            <div className="bg-neutral-50 border-y border-neutral-200 py-24 relative z-10 mb-32">
                <div className="container mx-auto px-6">
                    <h2 className="text-center text-3xl md:text-5xl font-black tracking-tighter mb-16 uppercase text-black">
                        Why Shop Rang Virangi?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 space-y-4 hover:scale-105 transition-transform duration-300">
                                <div className="p-4 bg-black text-white rounded-full mb-2 shadow-lg">
                                    {benefit.icon}
                                </div>
                                <h3 className="text-xl font-bold tracking-tight">{benefit.title}</h3>
                                <p className="text-neutral-600">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-5xl mx-auto text-center px-6 relative z-10 mt-16 md:mt-32">
                <div className="bg-neutral-50 p-12 md:p-24 rounded-[3rem] border border-neutral-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                    <div className="absolute inset-0 border-[8px] md:border-[12px] border-white z-0 rounded-[3rem]"></div>
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl group-hover:bg-amber-900/20 transition-colors duration-700"></div>
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-slate-900/10 rounded-full blur-3xl group-hover:bg-slate-900/20 transition-colors duration-700"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase text-black">
                            Join The Movement
                        </h2>
                        <p className="text-neutral-600 max-w-xl mx-auto mb-10 text-lg md:text-xl leading-relaxed">
                            Experience the unmatched comfort of bamboo cotton. Elevate your everyday wardrobe today and explore our latest premium streetwear drops.
                        </p>
                        <a href="/shop" className="inline-flex items-center justify-center bg-black text-white font-bold uppercase tracking-widest py-5 px-14 text-sm md:text-base rounded-full hover:bg-neutral-800 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/20">
                            Shop The Latest Collection
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
