'use client';

import React from 'react';
import type { Destination } from './DestinationCarousel';

const blurLayers = [6, 12, 18, 26, 34, 42];

interface DestinationCardProps {
  data: Destination;
}

const BlurGradient: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-[35%] group-hover:bottom-0 group-hover:h-[60%] transition-all duration-500 ease-out">
        {blurLayers.map((blur, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const DestinationCard: React.FC<DestinationCardProps> = ({ data }) => {
  const { name, tagline, tag, image } = data;

  return (
    <div className="relative w-full h-[320px] rounded-[20px] overflow-hidden group cursor-pointer flex-shrink-0">
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110 origin-center">
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>

      <BlurGradient />

      <div className="absolute inset-0 p-6 z-10 flex flex-col justify-end items-center text-center">
        <h3 className="text-xl font-bold text-white absolute bottom-6 left-1/2 -translate-x-1/2 group-hover:bottom-auto group-hover:top-6 transition-all duration-500 ease-out drop-shadow-lg">
          {name}
        </h3>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full mb-3 drop-shadow-md">
            {tag}
          </span>

          <p className="text-sm text-white/90 mb-3 drop-shadow-md">
            {tagline}
          </p>

          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-white hover:text-blue-300 drop-shadow-md"
          >
            Explore
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};