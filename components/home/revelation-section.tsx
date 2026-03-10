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
      <div className="max-w-4xl mx-auto px-6">
        {/* Main revelation */}
        <motion.h2
          className="text-5xl md:text-6xl font-display leading-tight mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          Some of us never left.
        </motion.h2>

        {/* Story as flowing text, not boxes */}
        <motion.div
          className="space-y-8 mb-24"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-xl text-muted-foreground leading-relaxed">
            While travel companies were building brochures…
          </p>

          <p className="text-xl text-foreground leading-relaxed">
            We were riding these roads.
          </p>

          {/* Documentary Photography Grid Placeholder */}
          <div className="relative my-16 w-full h-[400px] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-secondary/10 flex items-center justify-center rounded-sm overflow-hidden relative group">
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">[Documentary Photo / Fixing Bike]</p>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-secondary/10 flex items-center justify-center rounded-sm overflow-hidden relative group">
                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">[Photo / Waiting Out Storm]</p>
              </div>
              <div className="bg-secondary/10 flex items-center justify-center rounded-sm overflow-hidden relative group">
                <div className="absolute inset-0 bg-accent/5 mix-blend-overlay group-hover:bg-transparent transition-colors duration-700"></div>
                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest">[Photo / Mud & Rain]</p>
              </div>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed space-y-2">
            <span className="block">Fixing bikes in small villages.</span>
            <span className="block">Getting stuck in landslides.</span>
            <span className="block">Waiting out snowstorms with locals.</span>
          </p>

          <p className="text-xl text-muted-foreground leading-relaxed pt-6">
            For more than a decade.
          </p>

          <div className="border-l-4 border-accent pl-8 py-6">
            <p className="text-2xl font-display text-foreground">
              Not as tourists.
            </p>
            <p className="text-2xl font-display text-foreground mt-4">
              As people who belong here.
            </p>
          </div>
        </motion.div>

        {/* Credential - subtle, not boxed */}
        <motion.div
          className="py-16 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-4xl font-display text-accent mb-2">
            10+ Years
          </p>
          <p className="text-lg text-muted-foreground">
            Riding. Learning. Guiding. In the mountains.
          </p>
        </motion.div>

        {/* Closing statement */}
        <motion.p
          className="text-lg text-muted-foreground leading-relaxed mt-16 pt-8 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          We've guided riders, trekkers and travelers across Spiti, Ladakh and Zanskar long before it became a hashtag.
          <br />
          And we're still doing it the same way.
        </motion.p>
      </div>
    </section>
  )
}
