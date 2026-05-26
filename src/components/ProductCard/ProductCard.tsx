'use client';

import React from 'react';
import type { Product } from './types';

const blurLayers = [3, 6, 9, 12, 14, 17];

interface ProductCardProps {
  data: Product;
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const { name, destination, days, nights, tags, price, image } = data;

  return (
    <div className="relative w-full h-[350px] rounded-[20px] overflow-hidden group cursor-pointer flex-shrink-0">
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

      <div className="absolute inset-0 p-5 z-10 flex flex-col justify-between">
        <div className="absolute top-4 left-4">
          <span className="inline-block px-2 py-0.5 text-[10px] font-medium text-white bg-white/20 backdrop-blur-md rounded-full drop-shadow-xl">
            {tags[0]}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white drop-shadow-2xl">
            {name}
          </h3>
          
          <div className="flex items-center gap-1 mt-1 text-white drop-shadow-3xl font-semibold">
            <svg className="w-3 h-3" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs">{destination}</span>
          </div>
          
          <div className="flex items-center gap-1.5 mt-2 text-white drop-shadow-3xl font-semibold">
            <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span className="text-xs">{days} Days</span>
            <span className="text-[10px]">/</span>
            <svg className="w-3 h-3" fill="none" stroke="white" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            <span className="text-xs">{nights} Nights</span>
          </div>
          
          <div className="border-t border-white/30 mt-2 pt-2">
            <div className="flex items-end justify-between gap-3">
              <div>
                <span className="text-[10px] text-white/80 drop-shadow-2xl">Starting from</span>
                <p className="text-base font-bold text-white drop-shadow-2xl">${price}</p>
              </div>
              
              <a
                href="#"
                className="flex-1 py-2.5 text-xs font-semibold text-gray-900 bg-white hover:bg-gray-100 rounded-[12px] drop-shadow-2xl transition-colors text-center"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};