import { Hero } from "../components/hero";
import { Categories } from "../components/categories";
import { NewArrivals } from "../components/new-arrivals";
import { VideoBanner } from "../components/video-banner";
import { AboutStory } from "../components/about-story";
import { FeaturesShowcase } from "../components/features-showcase";
import { LookbookGrid } from "../components/lookbook-grid";
import { Testimonials } from "../components/testimonials";
import { CTASection } from "../components/cta-section";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <NewArrivals />
      <VideoBanner />
      <AboutStory />
      <FeaturesShowcase />
      <LookbookGrid />
      <Testimonials />
      <CTASection />
    </div>
  );
}
