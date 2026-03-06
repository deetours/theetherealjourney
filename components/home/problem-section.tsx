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
    <section ref={ref} className="relative w-full py-32 md:py-48 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Intro Statement */}
        <motion.div
          className="mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-display leading-tight mb-6">
            The Himalayas became a trend.
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            And suddenly everyone was an "expert".
          </p>
        </motion.div>

        {/* Problems with left border - Editorial style */}
        <motion.div
          className="space-y-12 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="border-l-4 border-accent pl-8"
            >
              <h3 className="text-2xl font-display font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dramatic Break - No Box, Just Typography */}
        <motion.div
          className="py-20 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-4xl md:text-5xl font-display leading-tight mb-8">
            Apparently knowing how to
            <br />
            copy an itinerary
            <br />
            is the same as
            <br />
            knowing the mountains.
          </p>
          <p className="text-xl text-muted-foreground font-light">
            Interesting.
          </p>
        </motion.div>

        {/* Closing narrative */}
        <motion.div
          className="text-center pt-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            Meanwhile the locals watched.
            <br />
            And we remembered every road.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
