'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      
      {/* Emotional Transition */}
      <section className="w-full py-24 md:py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-display leading-tight text-muted-foreground">
            Before Spiti became a location tag,
            <br />
            it was just home to someone.
          </p>
        </div>
      </section>
      
      <PauseSection />
      <ProblemSection />
      <RevelationSection />
      <ProofSection />
      <TripsPreviewSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}
