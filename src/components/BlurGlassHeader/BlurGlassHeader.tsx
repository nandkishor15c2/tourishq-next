'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import headerData from './data.json';
import type { HeaderContent } from './types';

const DEFAULT_SPRING = {
  stiffness: 400,
  damping: 25,
  mass: 0.4,
};

const getIcon = (label: string) => {
  switch (label) {
    case 'Home':
      return (
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'Destinations':
      return (
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'Search':
      return (
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      );
    default:
      return (
        <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      );
  }
};

const DockItem = ({
  item,
  index,
  mouseX,
  onHover,
  iconSize = 44,
  magnification = 1.5,
  distance = 80,
}: {
  item: { label: string; href: string };
  index: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  onHover: (index: number | null) => void;
  iconSize?: number;
  magnification?: number;
  distance?: number;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distanceFromMouse = useTransform(mouseX, (val) => {
    const el = wrapperRef.current;
    if (!el) return distance * 100;
    const rect = el.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const gaussian = (d: number) =>
    (magnification - 1) * Math.exp(-(d * d) / (2 * distance * distance)) + 1;

  const widthRaw = useTransform(distanceFromMouse, (d) => iconSize * gaussian(d));
  const heightRaw = useTransform(distanceFromMouse, (d) => iconSize * gaussian(d));

  const width = useSpring(widthRaw, DEFAULT_SPRING);
  const height = useSpring(heightRaw, DEFAULT_SPRING);

  return (
    <motion.div
      ref={wrapperRef}
      className="relative flex items-end justify-center"
      style={{ width: iconSize, height: iconSize }}
    >
      <motion.div
        style={{ width, height, bottom: 0 }}
        className="absolute flex items-center justify-center"
      >
        <motion.div
          className="absolute bg-white/30 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: iconSize * 1.1,
            height: iconSize * 1.1,
          }}
        />
        <a
          href={item.href}
          onMouseEnter={() => { setIsHovered(true); onHover(index); }}
          onMouseLeave={() => { setIsHovered(false); onHover(null); }}
          className="relative flex items-center justify-center text-white"
        >
          {getIcon(item.label)}
        </a>
      </motion.div>
    </motion.div>
  );
};

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors z-10"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {isOpen && (
        <motion.input
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 180, opacity: 1 }}
          transition={{ duration: 0.2 }}
          ref={inputRef}
          type="text"
          placeholder="Search..."
          className="absolute right-full mr-3 bg-white/20 backdrop-blur-md border border-white/20 rounded-full outline-none text-sm text-white placeholder-white/50 px-4 py-2 z-50"
          style={{ right: '100%', marginRight: '12px' }}
          onBlur={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

const ProfileButton = () => {
  return (
    <button className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/10 hover:bg-white/30 transition-colors">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </button>
  );
};

export const BlurGlassHeader: React.FC = () => {
  const { nav }: HeaderContent = headerData.header;
  const mouseX = useMotionValue(Infinity);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipBottomOffset, setTooltipBottomOffset] = useState(0);

  const dockRef = useRef<HTMLDivElement>(null);

  const handleHover = useCallback((index: number | null) => {
    setHoveredIndex(index);
    if (index !== null && dockRef.current) {
      const dockEl = dockRef.current;
      const items = dockEl.querySelectorAll('[data-dock-item]');
      if (items[index]) {
        const itemRect = items[index].getBoundingClientRect();
        const dockRect = dockEl.getBoundingClientRect();
        setTooltipX(itemRect.left - dockRect.left + itemRect.width / 2);
        setTooltipBottomOffset(dockRect.bottom - itemRect.top + 8);
      }
    }
  }, []);

  const iconSize = 52;

  return (
    <motion.div
      ref={dockRef}
      className="fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:bottom-6 md:w-auto flex items-center justify-center px-2 md:px-3 py-3 md:py-1.5 backdrop-blur-md border-t border-white/10 md:border md:border-white/10 md:rounded-[32px] z-50 min-w-full md:min-w-0 md:max-w-fit"
      style={{ gap: 4 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => {
        mouseX.set(Infinity);
        setHoveredIndex(null);
      }}
    >
      <motion.div
        className="flex items-center pr-3 md:pr-3 border-r border-white/10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <img
          src="/Tourishq 8.png"
          alt="Tourishq"
          className="w-10 h-10 md:w-8 md:h-8 object-contain cursor-pointer"
        />
      </motion.div>

      {nav.map((item, i) => (
        <div key={i} data-dock-item>
          <DockItem
            item={item}
            index={i}
            mouseX={mouseX}
            onHover={handleHover}
            iconSize={iconSize}
            magnification={1.5}
            distance={80}
          />
        </div>
      ))}

      <div className="flex items-center pl-3 border-l border-white/10">
        <ProfileButton />
      </div>

      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="pointer-events-none absolute flex flex-col items-center z-50"
            style={{
              left: tooltipX,
              bottom: tooltipBottomOffset,
              x: '-50%',
            }}
          >
            <span className="rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800 backdrop-blur-md shadow-lg whitespace-nowrap">
              {nav[hoveredIndex].label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};