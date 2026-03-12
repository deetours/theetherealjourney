'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function RevelationSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 bg-background transition-colors duration-1000">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Main revelation */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          Some of us never left.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-16">
            For 10+ years, we've been fixing bikes in small villages, waiting out snowstorms, and guiding riders across Spiti, Ladakh, and Zanskar long before they became hashtags. <strong className="text-foreground font-normal">We ride these roads as people who belong here.</strong>
          </p>

          {/* Documentary Photography Grid Placeholder */}
          <div className="relative w-full h-[300px] md:h-[500px] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary/10 flex items-center justify-center overflow-hidden relative group">
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">[Documentary Photo / Fixing Bike]</p>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-secondary/10 flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">[Photo / Waiting Out Storm]</p>
              </div>
              <div className="bg-secondary/10 flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">[Photo / Mud & Rain]</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
