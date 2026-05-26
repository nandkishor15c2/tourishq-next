'use client';

import React from 'react';
import { DestinationCard } from '@/components/DestinationCard/DestinationCard';
import type { DestinationSideTitleData } from './types';
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
  <span className="inline-block px-3 py-1 text-xs font-bold bg-[#ff6b9d] text-white rounded-full shadow-lg transform rotate-2">
    {children}
  </span>
);

const SparkleIcon = () => (
  <svg className="w-5 h-5 text-[#ffbc00]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-6 h-6 text-[#00d4ff]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const PinIcon = () => (
  <svg className="w-5 h-5 text-[#ff6b9d]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const HighlightText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <span>
      {words.map((word, i) => (
        <span key={i} className={i % 3 === 0 ? 'text-[#00d4ff]' : i % 3 === 1 ? 'text-[#ff6b9d]' : 'text-white'}>
          {word}{' '}
        </span>
      ))}
    </span>
  );
};

export const DestinationSideTitle: React.FC = () => {
  const { title, subtitle, ctaText, ctaLink, destinations }: DestinationSideTitleData = React.useMemo(() => data.destinationSideTitle, []);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 px-4 md:px-12 min-h-[50vh] relative overflow-hidden">
      <HorizontalBlurGradient />
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative z-10">
        <div className="w-full md:w-[30%] flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <SparkleIcon />
            <FunBadge>Trending</FunBadge>
            <SparkleIcon />
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] leading-tight">
            <HighlightText text={title} />
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <GlobeIcon />
            <p className="text-sm md:text-base text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
              {subtitle}
            </p>
</div>
           
        </div>

        <div className="w-full md:w-[70%]">
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-[#ff6b9d]/20 hover:border-[#ff6b9d] transition-all group"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-white group-hover:text-[#ff6b9d] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-[#ff6b9d]/20 hover:border-[#ff6b9d] transition-all group"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-white group-hover:text-[#ff6b9d] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide pb-4 gap-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {destinations.map((dest) => (
              <div key={dest.id} className="w-52 md:w-56 flex-shrink-0">
                <DestinationCard data={dest} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};