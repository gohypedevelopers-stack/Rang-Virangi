import { Hero } from "../components/hero";
import { Categories } from "../components/categories";
import { NewArrivals } from "../components/new-arrivals";
import { VideoBanner } from "../components/video-banner";
import { AboutStory } from "../components/about-story";
import { FeaturesShowcase } from "../components/features-showcase";
import { LookbookGrid } from "../components/lookbook-grid";
import { Testimonials } from "../components/testimonials";
import { CTASection } from "../components/cta-section";
import { TextMarquee } from "../components/ui/text-marquee";
import { FloatingShapes } from "../components/ui/floating-shapes";
import { ScrollReveal } from "../components/ui/scroll-reveal";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      <FloatingShapes />

      <Hero />

      <div className="py-4 bg-black -rotate-1 border-y-2 border-white z-10 relative my-8">
        <TextMarquee
          text="NEW COLLECTION DROP • LIMITED EDITION • RANG VIRANGI • SUMMER VIBES • GET STYLED • "
          className="text-4xl font-black text-white uppercase tracking-tighter"
          speed={15}
        />
      </div>

      <ScrollReveal animation="fade-up" delay={0.2} className="relative z-10">
        <Categories />
      </ScrollReveal>

      <div className="py-4 bg-white rotate-1 border-y-2 border-black z-10 relative my-8">
        <TextMarquee
          text="FRESH ARRIVALS • CHECK IT OUT • TRENDING NOW • CLOTHING FOR GEN Z • UNIQUE STYLES • "
          className="text-4xl font-black text-black uppercase tracking-tighter"
          direction="right"
          speed={15}
        />
      </div>

      <ScrollReveal animation="scale-in" className="relative z-10">
        <NewArrivals />
      </ScrollReveal>

      <ScrollReveal animation="fade-up" className="relative z-10">
        <VideoBanner />
      </ScrollReveal>

      <ScrollReveal animation="rotate-in" className="relative z-10">
        <AboutStory />
      </ScrollReveal>

      <ScrollReveal animation="fade-up" className="relative z-10">
        <FeaturesShowcase />
      </ScrollReveal>

      <ScrollReveal animation="scale-in" className="relative z-10">
        <LookbookGrid />
      </ScrollReveal>

      <ScrollReveal animation="fade-up" className="relative z-10">
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal animation="fade-up" className="relative z-10">
        <CTASection />
      </ScrollReveal>
    </div>
  );
}
