'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20 md:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main headline - Large, elegant */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-display leading-tight text-foreground mb-12 md:mb-16"
        >
          The Himalayas were never meant to be rushed.
        </motion.h1>

        {/* Subheadline - Flowing narrative */}
        <motion.div
          variants={itemVariants}
          className="space-y-6 max-w-3xl mx-auto mb-16"
        >
          <p className="text-xl md:text-2xl text-foreground leading-relaxed">
            Most people visit the mountains.
          </p>

          <div className="space-y-4">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              They tick a list.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Take a photo.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Upload a reel.
            </p>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed pt-4">
            Then say they've <em className="text-foreground font-medium">"done Spiti"</em>.
          </p>

          <div className="py-8 border-t border-b border-border/50">
            <p className="text-xl text-foreground leading-relaxed">
              But the Himalayas don't work like that.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-lg text-muted-foreground">
              They reward time.
            </p>
            <p className="text-lg text-muted-foreground">
              Patience.
            </p>
            <p className="text-lg text-muted-foreground">
              And people who respect them.
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants} className="mt-16">
          <Link href="/trips" className="inline-block group">
            <motion.div
              className="px-8 py-4 bg-accent text-accent-foreground font-medium text-lg border-2 border-accent"
              whileHover={{ 
                scale: 1.02,
                backgroundColor: 'transparent',
                color: 'var(--accent)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              Begin Your Journey
            </motion.div>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20 md:mt-28"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <p className="text-sm text-muted-foreground mb-4">Scroll to explore</p>
          <svg className="w-6 h-6 text-muted-foreground mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
