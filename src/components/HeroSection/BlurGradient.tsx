'use client';

import React from 'react';

interface BlurGradientProps {
  className?: string;
}

const blurLayers = [6, 12, 18, 26, 34, 42];

export const BlurGradient: React.FC<BlurGradientProps> = ({ className = '' }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 h-[60%] md:h-[40%] pointer-events-none ${className}`}
    >
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
  );
};