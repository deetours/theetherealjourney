'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInRise, lineReveal, premiumEasing } from '@/lib/animations';
import { Map, Tent, Bike } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax the hero image and scale it up to feel like driving into it
  const imageY = useTransform(scrollYProgress, [0, 1], ['0vh', '40vh']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-background selection:bg-accent selection:text-foreground">

      {/* 1. The Cinematic Pinned Hero */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 w-full h-full origin-bottom">
          <Image
            src="/home-hero.jpg"
            alt="The Himalayan Range"
            fill
            className="object-cover"
            priority
          />
          {/* Vignette map */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-background/95 pointer-events-none" />
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
              className="text-white font-display uppercase font-light text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight max-w-5xl mx-auto drop-shadow-lg"
            >
              Don't just visit the Himalayas. <br className="hidden md:block" /> Earn them.
            </motion.h1>
          </div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: premiumEasing, delay: 0.8 }}
            className="text-white/90 mt-8 font-sans uppercase tracking-[0.2em] text-xs md:text-sm max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            The Ethereal Journey helps discerning riders experience un-rushed Himalayan expeditions without mass-tourism compromises.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: premiumEasing, delay: 0.9 }}
            className="flex items-center gap-8 mt-12 text-white/90 drop-shadow-md"
          >
            <div className="flex flex-col items-center gap-2">
              <Bike size={24} strokeWidth={1} />
              <span className="text-[10px] uppercase tracking-widest">Motorcycle</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div className="flex flex-col items-center gap-2">
              <Map size={24} strokeWidth={1} />
              <span className="text-[10px] uppercase tracking-widest">Expedition</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div className="flex flex-col items-center gap-2">
              <Tent size={24} strokeWidth={1} />
              <span className="text-[10px] uppercase tracking-widest">Trekking</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="absolute bottom-12 flex flex-col items-center gap-4 text-white/50"
          >
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
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
            className="mb-24"
          >
            <h2 className="font-display leading-[1.2] text-3xl md:text-5xl text-foreground mb-8 max-w-3xl mx-auto">
              Most tourists arrive with a checklist. <br /> We operate differently.
            </h2>
            <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We provide the un-rushed expeditions and reliable machines that independent travelers need to experience the absolute reality of Spiti, Ladakh, and Zanskar. No crowded buses. No tourist traps. Just the road, the mountains, and respect.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRise}
            className="mt-48 flex justify-center"
          >
            <Link href="/trips">
              <span className="group relative inline-flex items-center gap-4 text-foreground text-[10px] tracking-[0.3em] uppercase font-sans">
                <span className="relative z-10 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-x-2">
                  Explore Expeditions
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
