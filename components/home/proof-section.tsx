'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin } from 'lucide-react'

const testimonials = [
  {
    quote: "Every travel company promised adventure. These guys actually delivered it.",
    author: "Arjun",
    location: "Rider from Bangalore",
    trip: "Spiti Valley Expedition"
  },
  {
    quote: "They knew every village, every road, every tea stop. It felt like traveling with friends.",
    author: "Aditi",
    location: "Trekker from Mumbai",
    trip: "Ladakh Motorcycle Journey"
  },
  {
    quote: "This wasn't a tour. It was a real experience. They genuinely care about the mountains.",
    author: "Rohan",
    location: "Explorer from Delhi",
    trip: "Zanskar Discovery"
  },
]

export function ProofSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section ref={ref} className="relative w-full py-32 md:py-48 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg text-accent font-medium tracking-wide mb-4">VOICES FROM THE ROAD</p>
          <h2 className="text-5xl md:text-6xl font-display leading-tight">
            Thousands of kilometers.
            <br />
            <span className="text-muted-foreground">Thousands of stories.</span>
          </h2>
        </motion.div>

        {/* Cinematic Quotes - Vertical scroll reveal */}
        <div className="space-y-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="py-16 border-t border-border/50 relative overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              {/* Topographic Graphic Removed for UI Clarity */}

              <blockquote className="mb-8 relative z-10">
                <p className="text-4xl md:text-5xl font-display leading-tight text-foreground mb-8">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              <div className="flex flex-col gap-2 relative z-10">
                <p className="text-lg font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-base text-muted-foreground">
                  {testimonial.location}
                </p>
                <p className="text-base text-accent font-medium mt-2 flex items-center gap-2">
                  <MapPin size={16} strokeWidth={1.5} />
                  {testimonial.trip}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Statement */}
        <motion.div
          className="mt-32 pt-32 border-t border-border/50 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xl text-muted-foreground mb-4 leading-relaxed">
            Because when someone truly knows a place…
          </p>
          <p className="text-3xl md:text-4xl font-display text-foreground">
            You feel it.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
