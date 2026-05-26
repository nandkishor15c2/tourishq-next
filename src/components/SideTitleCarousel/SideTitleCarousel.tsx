'use client';

import React from 'react';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import type { SideTitleCarouselData } from './types';
import data from './data.json';

const HorizontalBlurGradient = () => {
  const blurLayers = [6, 12, 18, 26, 34, 42];
  return (
    <div className="absolute top-0 bottom-0 left-0 w-[60%] md:w-[40%] pointer-events-none">
      {blurLayers.map((blur, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            backdropFilter: `blur(${blur}px)`,
            maskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 100%)',
          }}
        />
      ))}
    </div>
  );
};

const FunBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 text-xs font-bold bg-[#ffbc00] text-black rounded-full shadow-lg transform -rotate-2">
    {children}
  </span>
);

const SparkleIcon = () => (
  <svg className="w-5 h-5 text-[#ffbc00]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const PlaneIcon = () => (
  <svg className="w-6 h-6 text-[#ff6b9d]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-5 h-5 text-[#00d4ff]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 text-[#ffbc00]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const HighlightText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <span>
      {words.map((word, i) => (
        <span key={i} className={i % 2 === 0 ? 'text-[#ffbc00]' : 'text-white'}>
          {word}{' '}
        </span>
      ))}
    </span>
  );
};

export const SideTitleCarousel: React.FC = () => {
  const { title, subtitle, ctaText, ctaLink, products }: SideTitleCarouselData = React.useMemo(() => data.sideTitleCarousel, []);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 px-4 md:px-12 min-h-[50vh] relative overflow-hidden">
      <HorizontalBlurGradient />
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative z-10">
        <div className="w-full md:w-[30%] flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <SparkleIcon />
            <FunBadge>Featured</FunBadge>
            <SparkleIcon />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
            <HighlightText text={title} />
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <PlaneIcon />
            <p className="text-sm md:text-base text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              {subtitle}
</p>
          </div>
        </div>

        <div className="w-full md:w-[70%]">
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-[#ffbc00]/20 hover:border-[#ffbc00] transition-all group"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-white group-hover:text-[#ffbc00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-[#ffbc00]/20 hover:border-[#ffbc00] transition-all group"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-white group-hover:text-[#ffbc00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide pb-4 gap-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, i) => (
              <div key={product.id} className="w-56 md:w-64 flex-shrink-0">
                <ProductCard data={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};