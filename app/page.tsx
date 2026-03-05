import { TopSelling } from "../components/top-selling";
import { ImageBanner } from "../components/image-banner";
import { EditorialSection } from "../components/editorial-section";
import { VideoBanner } from "../components/video-banner";
import { ScrollReveal } from "../components/ui/scroll-reveal";
import { ProductShowcase } from "../components/product-showcase";
import { BombayBanner } from "../components/bombay-banner";
import { FeaturedLook } from "../components/featured-look";
import { FeaturedLove } from "../components/featured-love";
import { FeaturedSugarDaddy } from "../components/featured-sugar-daddy";
import { LoveBanner } from "../components/love-banner";
import { CultureBanner } from "../components/culture-banner";
import { FeaturedCulture } from "../components/featured-culture";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-background text-foreground selection:bg-black selection:text-white">
      {/* 1 — Cinematic video section (Replacing Hero) */}
      <VideoBanner />

      {/* 2 — Top Selling Products */}
      <TopSelling />

      {/* 3 — Artwork Banner */}
      <ImageBanner />

      {/* 3.5 — Sugar Daddy Featured */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <FeaturedSugarDaddy />
      </ScrollReveal>

      {/* 3.6 — Culture Symphony Banner */}
      <CultureBanner />

      {/* 3.7 — Culture Symphony Products */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <FeaturedCulture />
      </ScrollReveal>

      {/* 4 — Dark editorial product cards */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <EditorialSection />
      </ScrollReveal>

      {/* 5 — Product Categories / Showcase */}

      {/* 6 — Bombay Sapphire Banner */}
      <BombayBanner />

      {/* 7 — Featured Look (Bombay) */}
      <ScrollReveal
        animation="fade-up"
        className="relative z-10 -mt-10 md:-mt-20"
      >
        <FeaturedLook />
      </ScrollReveal>

      {/* 8 — Love Simulation Banner */}
      <LoveBanner />

      {/* 9 — Featured Love Simulation */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <FeaturedLove />
      </ScrollReveal>

      {/* 10 — Product Categories / Showcase */}
      <ScrollReveal animation="fade-up" className="relative z-10">
        <ProductShowcase />
      </ScrollReveal>
    </div>
  );
}
