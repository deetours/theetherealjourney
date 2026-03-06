'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

export function FinalCTASection() {
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
        <motion.h2
          className="text-6xl md:text-7xl font-display leading-tight text-foreground mb-8"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          The mountains are waiting.
        </motion.h2>

        <motion.div
          className="space-y-6 mb-12"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-2xl text-muted-foreground leading-relaxed">
            But they're not going anywhere.
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Take your time.
            <br />
            Then start your journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Link href="/trips" className="inline-block">
            <motion.div
              className="px-10 py-5 bg-accent text-accent-foreground font-medium text-lg border-2 border-accent"
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

        <motion.p
          className="text-sm text-muted-foreground mt-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Questions? Get in touch at <Link href="/contact" className="text-accent hover:underline">contact@etherealjourney.com</Link>
          <br />
          Or call us. We'd love to hear from you.
        </motion.p>
      </motion.div>
    </section>
  )
}
