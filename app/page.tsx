import { BannerCarousel } from "../components/banner-carousel";
import { TopSelling } from "../components/top-selling";
import { EditorialSection } from "../components/editorial-section";
import { ScrollReveal } from "../components/ui/scroll-reveal";
import { ProductShowcase } from "../components/product-showcase";
import { FeaturedLook } from "../components/featured-look";
import { FeaturedLove } from "../components/featured-love";
import { FeaturedSugarDaddy } from "../components/featured-sugar-daddy";
import { FeaturedCulture } from "../components/featured-culture";
import { VideoBanner } from "../components/video-banner";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      {/* 1 — Cinematic Main Hero (Fixed) */}
      <VideoBanner />

      {/* 9 — Product Categories / Showcase */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <ProductShowcase />
      </ScrollReveal>



      {/* 3 — Consolidated Seasonal Banners Carousel */}
      <BannerCarousel />

      {/* 2 — Top Selling Products */}
      <TopSelling />

      {/* 4 — Featured Sugar Daddy */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <FeaturedSugarDaddy />
      </ScrollReveal>

      {/* 5 — Culture Symphony Products */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <FeaturedCulture />
      </ScrollReveal>

      {/* 6 — Dark editorial product cards */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <EditorialSection />
      </ScrollReveal>

      {/* 7 — Featured Look (Bombay) */}
      <ScrollReveal
        animation="fade-up"
        className="relative z-10"
      >
        <FeaturedLook />
      </ScrollReveal>

      {/* 8 — Featured Love Simulation */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <FeaturedLove />
      </ScrollReveal>


    </div>
  );
}
