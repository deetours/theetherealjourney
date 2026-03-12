'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const problems = [
  {
    title: 'Surface Tourism',
    description: 'Package deals that treat mountains like photo backdrops.',
  },
  {
    title: 'Instagram Operators',
    description: 'People who discovered Ladakh on social media, now selling "expert" trips.',
  },
  {
    title: 'Middlemen',
    description: 'City travel companies with no actual mountain experience running expeditions.',
  },
]

export function ProblemSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 bg-stark-dark text-stark-dark-foreground transition-colors duration-1000">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Intro Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-8">
            The Himalayas became a trend.
          </h2>
          <p className="text-lg md:text-xl text-stark-dark-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Suddenly, city middlemen who had never changed a tire at 15,000 feet were selling "expeditions". The mountains became photo backdrops, and travelers were put on crowded buses to tick boxes. <strong className="text-stark-dark-foreground font-normal">We reject this completely.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
