'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { BlurGradient } from './BlurGradient';
import heroData from './data.json';
import type { HeroContent } from './types';

const subtitleVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -5, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: 0.6,
    },
  },
};

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const { title, subtitle }: HeroContent = heroData.hero;
  const videoUrl = 'https://videos.pexels.com/video-files/31453316/13412983_2560_1440_25fps.mp4';

  const titleWords = title.split(' ');

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
        <BlurGradient />
      </motion.div>

      <motion.div 
        ref={textRef}
        style={{ opacity: textOpacity }}
        className="absolute bottom-[8%] left-4 md:left-12 text-left flex flex-col items-start"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg overflow-hidden">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
            }}
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: -45 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    rotateX: 0,
                    transition: { duration: 0.5, type: 'spring' as const, stiffness: 100 }
                  },
                }}
                className="inline-block mr-3"
                style={{ display: 'inline-block', transformOrigin: 'center' }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </h1>
        <motion.p 
          variants={subtitleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-base md:text-xl text-white/90 drop-shadow-md"
        >
          {subtitle}
        </motion.p>
      </motion.div>
    </section>
  );
};