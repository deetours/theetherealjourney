'use client'

import { motion } from 'framer-motion'
import { HeroSection } from '@/components/home/hero-section'
import { PauseSection } from '@/components/home/pause-section'
import { ProblemSection } from '@/components/home/problem-section'
import { RevelationSection } from '@/components/home/revelation-section'
import { ProofSection } from '@/components/home/proof-section'
import { TripsPreviewSection } from '@/components/home/trips-preview-section'
import { FinalCTASection } from '@/components/home/final-cta-section'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    /* Top level container - Background color inherited from the $100k globals.css */
    <div className="relative min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">

      {/* 
        The Navigation component logic has not been touched, but it will 
        automatically inherit the global Earth/Stone colors.
      */}
      <Navigation />

      {/* Pinned Cinematic Scroll Hero Sequence */}
      <HeroSection />

      {/* 
        Macro-Whitespace implementation: 
        Notice the py-48 (12rem) spacing. This forces users to slow down. 
      */}
      <section className="w-full py-48 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-display leading-[1.2] text-secondary"
          >
            Before Spiti became a location tag,<br />
            <span className="text-foreground">it was just home to someone.</span>
          </motion.p>
        </div>
      </section>

      {/* Injecting the cinematic wrapper to all remaining legacy components */}
      <div className="relative bg-background">
        <PauseSection />
        <ProblemSection />
        <RevelationSection />
        <ProofSection />
        <TripsPreviewSection />
        <FinalCTASection />
      </div>

      <Footer />
    </div>
  )
}
