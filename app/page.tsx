import { Hero } from "../components/hero";
import { TopSelling } from "../components/top-selling";
import { ImageBanner } from "../components/image-banner";
import { ProductShowcase } from "../components/product-showcase";
import { EditorialSection } from "../components/editorial-section";
import { VideoBanner } from "../components/video-banner";
import { ScrollReveal } from "../components/ui/scroll-reveal";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      {/* 1 — Full-screen video hero */}
      <Hero />

      {/* 2 — Top Selling Products */}
      <TopSelling />

      {/* 3 — Artwork Banner */}
      <ImageBanner />
      <ScrollReveal animation="fade-up" className="relative z-10">
        <ProductShowcase />
      </ScrollReveal>

      {/* 3 — Dark editorial product cards */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <EditorialSection />
      </ScrollReveal>

      {/* 4 — Cinematic video section */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <VideoBanner />
      </ScrollReveal>
    </div>
  );
}
