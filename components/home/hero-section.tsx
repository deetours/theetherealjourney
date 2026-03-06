'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInRise, lineReveal, premiumEasing } from '@/lib/animations';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax the hero image slower than the scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0vh', '40vh']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-background selection:bg-accent selection:text-foreground">

      {/* 1. The Cinematic Pinned Hero */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-full">
          <Image
            src="/home-hero.jpg"
            alt="The Himalayan Range"
            fill
            className="object-cover"
            priority
          />
          {/* Vignette map */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background/90" />
        </motion.div>

        <motion.div
          style={{ opacity: fadeOut }}
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={lineReveal}
              className="text-white font-display uppercase font-light text-[10vw] leading-[0.9] tracking-tight mix-blend-overlay"
            >
              The Ethereal <br /> Journey
            </motion.h1>
          </div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: premiumEasing, delay: 0.6 }}
            className="text-white/80 mt-8 font-sans uppercase tracking-[0.3em] text-xs md:text-sm mix-blend-overlay"
          >
            Mountain Wisdom. Authentic Connection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="absolute bottom-12 flex flex-col items-center gap-4 text-white/50 mix-blend-overlay"
          >
            <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            <div className="w-[1px] h-12 bg-white/30 animate-pulse-slow" />
          </motion.div>
        </motion.div>
      </div>

      {/* 2. The Narrative Copy (Absolutely preserved, but structurally redesigned) */}
      <div className="relative z-10 w-full min-h-screen bg-background flex flex-col items-center pt-32 pb-48 px-6">
        <div className="max-w-4xl mx-auto text-center w-full">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInRise}
            className="mb-32"
          >
            <h2 className="font-display leading-[1.1] text-foreground mb-16">
              The Himalayas were never meant to be rushed.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 text-left max-w-5xl mx-auto">
            {/* Left Column - Fast travel mindset */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRise}
              className="space-y-6"
            >
              <p className="text-2xl text-foreground font-display">
                Most people visit the mountains.
              </p>
              <div className="space-y-2 border-l-2 border-border pl-6">
                <p className="text-lg text-muted-foreground">They tick a list.</p>
                <p className="text-lg text-muted-foreground">Take a photo.</p>
                <p className="text-lg text-muted-foreground">Upload a reel.</p>
              </div>
              <p className="text-xl text-muted-foreground italic">
                Then say they've "done Spiti".
              </p>
            </motion.div>

            {/* Right Column - The Ethereal mindset */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRise}
              className="space-y-6 md:mt-24"
            >
              <p className="text-3xl text-foreground font-display leading-[1.2]">
                But the Himalayas don't work like that.
              </p>
              <div className="space-y-2 text-muted-foreground text-lg">
                <p>They reward time.</p>
                <p>Patience.</p>
                <p>And people who respect them.</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRise}
            className="mt-48 flex justify-center"
          >
            <Link href="/trips">
              <span className="group relative inline-flex items-center gap-4 text-foreground text-lg tracking-wide uppercase font-sans">
                <span className="relative z-10 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-x-2">
                  Begin Your Journey
                </span>
                <span className="w-12 h-[1px] bg-foreground transition-all duration-500 ease-[0.22,1,0.36,1] group-hover:w-20" />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
