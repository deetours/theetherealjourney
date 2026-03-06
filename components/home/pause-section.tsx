'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export function PauseSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  return (
    <section
      ref={ref}
      className="relative w-full py-40 md:py-56 bg-background flex items-center justify-center"
    >
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="text-4xl md:text-6xl font-display leading-tight text-foreground mb-8"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          You didn't come to the mountains for a checklist.
        </motion.p>
        <motion.p
          className="text-3xl md:text-5xl font-display leading-tight text-muted-foreground"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          You came for something you couldn't explain.
        </motion.p>
      </motion.div>
    </section>
  )
}
