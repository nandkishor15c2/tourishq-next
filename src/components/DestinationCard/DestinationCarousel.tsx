'use client';

import React, { useState, useRef, useEffect } from 'react';
import { DestinationCard } from './DestinationCard';

export interface Destination {
  id: number;
  name: string;
  tagline: string;
  tag: string;
  image: { url: string; alt: string };
}

interface DestinationCarouselProps {
  destinations: Destination[];
}

export const DestinationCarousel: React.FC<DestinationCarouselProps> = ({
  destinations,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);

  const scrollPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : destinations.length - 1));
  };

  const scrollNext = () => {
    setCurrentIndex((prev) => (prev < destinations.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.touches[0].clientX;
    if (diff > 50) {
      scrollNext();
      setTouchStart(null);
    } else if (diff < -50) {
      scrollPrev();
      setTouchStart(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStart === null) return;
    const diff = dragStart - e.clientX;
    if (diff > 50) {
      scrollNext();
      setIsDragging(false);
      setDragStart(null);
    } else if (diff < -50) {
      scrollPrev();
      setIsDragging(false);
      setDragStart(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaX > 50) {
      scrollNext();
    } else if (e.deltaX < -50) {
      scrollPrev();
    }
  };

  return (
    <div className="relative pt-20 pb-10">
      <div 
        className="overflow-hidden"
        ref={scrollRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (224 + 24)}px)`,
          }}
        >
          {destinations.map((dest) => (
            <div key={dest.id} className="w-56 flex-shrink-0 mr-6">
              <DestinationCard data={dest} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="Previous"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="Next"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};