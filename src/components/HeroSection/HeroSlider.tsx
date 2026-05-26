'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { HeroImage, SliderConfig } from './types';

interface HeroSliderProps {
  images: HeroImage[];
  config: SliderConfig;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ images, config }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  }, [isTransitioning, currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, config.transitionDuration);
    return () => clearTimeout(timer);
  }, [currentIndex, config.transitionDuration]);

  useEffect(() => {
    const interval = setInterval(goToNext, config.autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, config.autoPlayInterval]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};