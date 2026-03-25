"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { ImageBanner } from "./image-banner";
import { CultureBanner } from "./culture-banner";
import { BombayBanner } from "./bombay-banner";
import { LoveBanner } from "./love-banner";

// Custom styles for pagination to match "long-bar" active state
const customSwiperStyles = `
  .banner-swiper .swiper-pagination-bullet {
    background: white !important;
    opacity: 0.4;
    width: 6px;
    height: 6px;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    margin: 0 4px !important;
  }
  .banner-swiper .swiper-pagination-bullet-active {
    opacity: 1 !important;
    width: 28px !important;
    border-radius: 6px !important;
  }
  .banner-swiper .swiper-pagination {
    bottom: 40px !important;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export function BannerCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay mounting slightly to avoid hydration jam, but keep it snappy
    const timer = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return (
    <section className="w-full relative h-[65vh] md:h-[75vh] lg:h-[85vh] bg-black animate-pulse" />
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customSwiperStyles }} />
      <section className="w-full relative banner-swiper group overflow-hidden bg-black">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={1500}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="w-full h-[65vh] md:h-[75vh] lg:h-[85vh] overflow-hidden"
        >
          <SwiperSlide className="h-full w-full">
            <div className="w-full h-full">
              <ImageBanner />
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full w-full">
            <div className="w-full h-full bg-neutral-200">
              <CultureBanner />
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full w-full">
            <div className="w-full h-full bg-[#5eb4ae]">
              <BombayBanner />
            </div>
          </SwiperSlide>
          <SwiperSlide className="h-full w-full">
            <div className="w-full h-full">
              <LoveBanner />
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
