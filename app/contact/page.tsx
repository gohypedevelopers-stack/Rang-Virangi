import { FloatingShapes } from "../../components/ui/floating-shapes";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";

export const metadata = {
    title: "Contact Us | Rang Virangi",
    description: "Get in touch with Rang Virangi. We're here to help you with your streetwear and premium basics.",
};

export default function ContactPage() {
    return (
        <div className="relative overflow-hidden min-h-screen bg-background text-foreground pt-24 pb-20 selection:bg-black selection:text-white">

            {/* Hero Section */}
            <div className="container mx-auto px-6 text-center relative z-10 my-16 md:my-24">
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <p className="text-neutral-500 font-bold text-xs md:text-sm tracking-[0.4em] mb-6 uppercase">
                        We're Here for You
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 uppercase leading-tight">
                        Get In <br />
                        <span className="italic font-mono border-b-[6px] border-black pb-1 inline-block mt-2">
                            Touch
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-medium mt-8">
                        Have a question about our premium bamboo cotton fits, sizing, or a recent drop? We’d love to hear from you.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10 mb-20 md:mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Contact Information */}
                    <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200 fill-mode-both">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black uppercase">
                                Let's Talk Style
                            </h2>
                            <p className="text-neutral-600 text-lg leading-relaxed">
                                Whether you’re curious about our sustainable materials or need help with a return, our dedicated team is ready to assist you. At Rang Virangi, we believe that customer support should be just as premium as our streetwear.
                            </p>
                        </div>

                        <div className="bg-neutral-50 rounded-[2rem] p-8 md:p-12 border border-neutral-200 shadow-sm space-y-8">
                            <div className="flex items-start gap-6 group cursor-pointer">
                                <div className="p-4 bg-black text-white rounded-full shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight mb-1">Email Us</h3>
                                    <p className="text-neutral-600 mb-2">Our friendly team is here to help.</p>
                                    <a href="mailto:support@rangvirangi.com" className="font-bold border-b border-black text-black pb-0.5 hover:text-neutral-600 transition-colors">
                                        support@rangvirangi.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group cursor-pointer">
                                <div className="p-4 bg-black text-white rounded-full shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight mb-1">Visit Us</h3>
                                    <p className="text-neutral-600 mb-2">Come say hello at our headquarters.</p>
                                    <p className="font-bold text-black">
                                        123 Fashion Ave, Suite 400<br />
                                        New Delhi, India 110001
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group cursor-pointer">
                                <div className="p-4 bg-black text-white rounded-full shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight mb-1">Call Us</h3>
                                    <p className="text-neutral-600 mb-2">Mon-Fri from 9am to 6pm IST.</p>
                                    <a href="tel:+911234567890" className="font-bold border-b border-black text-black pb-0.5 hover:text-neutral-600 transition-colors">
                                        +91 123 456 7890
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-400 fill-mode-both">
                        <div className="bg-white rounded-[2rem] border-2 border-neutral-100 p-8 md:p-12 shadow-xl shadow-black/5 relative overflow-hidden">
                            {/* Form visual accents */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-900/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

                            <div className="flex items-center gap-3 mb-8">
                                <MessageSquare className="w-6 h-6 text-black" />
                                <h3 className="text-2xl font-black uppercase tracking-tight">Send a Message</h3>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="first-name" className="text-sm font-bold uppercase tracking-wider text-neutral-500">First Name</label>
                                        <input
                                            type="text"
                                            id="first-name"
                                            className="w-full bg-neutral-50 border-none rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/20 transition-all font-medium"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="last-name" className="text-sm font-bold uppercase tracking-wider text-neutral-500">Last Name</label>
                                        <input
                                            type="text"
                                            id="last-name"
                                            className="w-full bg-neutral-50 border-none rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/20 transition-all font-medium"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-neutral-500">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-neutral-50 border-none rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/20 transition-all font-medium"
                                        placeholder="jane@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold uppercase tracking-wider text-neutral-500">Subject</label>
                                    <select
                                        id="subject"
                                        className="w-full bg-neutral-50 border-none rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/20 transition-all font-medium cursor-pointer"
                                    >
                                        <option value="">Select an option</option>
                                        <option value="order">Order Question</option>
                                        <option value="returns">Returns & Exchanges</option>
                                        <option value="sizing">Sizing & Fit</option>
                                        <option value="wholesale">Wholesale Inquiry</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-neutral-500">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full bg-neutral-50 border-none rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-black/20 transition-all font-medium resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-black text-white font-bold uppercase tracking-widest py-5 px-8 rounded-full hover:bg-neutral-800 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-black/20 mt-4"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
