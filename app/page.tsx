import { Hero } from "../components/hero";
import { Categories } from "../components/categories";
import { NewArrivals } from "../components/new-arrivals";
import { VideoBanner } from "../components/video-banner";
import { AboutStory } from "../components/about-story";
import { Carousel } from "../components/carousel";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <NewArrivals />
      <VideoBanner />
      <AboutStory />
      <Carousel />
    </div>
  );
}
