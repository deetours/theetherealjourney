'use client'

import { motion } from 'framer-motion'
import { HeroSection } from '@/components/home/hero-section'
import { SensationalNarrative } from '@/components/home/sensational-narrative'
import { TheCrewSection } from '@/components/home/the-crew'
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
        Sensational Narrative Flow (Concept C)
        Replaces legacy Problem, Revelation, and Pause sections with a single immersive reveal.
      */}
      <SensationalNarrative />

      {/* Injecting the cinematic wrapper to all remaining legacy components */}
      <div className="relative bg-background">
        <TheCrewSection />
        <TripsPreviewSection />
        <ProofSection />
        <FinalCTASection />
      </div>

      <Footer />
    </div>
  )
}
