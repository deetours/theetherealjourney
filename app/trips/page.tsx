'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Trip = {
  id: number
  title: string
  description: string
  difficulty: string
  duration: string
  altitude: string
  shortDesc: string
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrips() {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('id')

      if (data) {
        setTrips(data)
      } else if (error) {
        console.error('Error fetching trips:', error)
      }
      setLoading(false)
    }
    fetchTrips()
  }, [])

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
            Every road tells a different story.
          </h1>
          <p className="text-xl md:text-2xl text-secondary leading-relaxed">
            Some roads are smooth.
            <br />
            Some will test you.
            <br />
            The ones that change you the most usually do both.
          </p>
        </motion.div>
      </section>

      {/* Trips Grid */}
      <section ref={ref} className="py-20 md:py-32 px-6">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <motion.div
                key={trip.id}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <Link href={`/trips/${trip.id}`}>
                  <div className="h-full border border-border rounded overflow-hidden hover:border-accent/50 transition-colors bg-muted/5 flex flex-col">
                    {/* Image placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-accent/15 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
                      <span className="text-6xl text-accent/20 relative z-10">↗</span>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                        {trip.title}
                      </h3>
                      <p className="text-sm text-accent font-medium mb-4">
                        {trip.shortDesc}
                      </p>
                      <p className="text-secondary text-sm leading-relaxed mb-6 flex-grow">
                        {trip.description}
                      </p>

                      {/* Trip Details */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded">
                          {trip.duration}
                        </span>
                        <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded">
                          {trip.altitude}
                        </span>
                        <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded">
                          {trip.difficulty}
                        </span>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all gap-1">
                          Explore <ArrowRight size={16} />
                        </div>
                        <a
                          href={`/inquire?trip=${trip.id}`}
                          onClick={e => e.stopPropagation()}
                          className="text-xs text-secondary border border-border/50 px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
                        >
                          Ask Tej →
                        </a>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-32 md:py-48 px-6 bg-background">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-display leading-tight text-foreground mb-16">
            A Small Disclaimer
          </h2>

          <div className="space-y-12">
            <p className="text-2xl md:text-3xl font-display text-foreground leading-tight">
              If you're looking for
              <br />
              "10 Instagram photo stops in 24 hours",
              <br />
              we might disappoint you.
            </p>

            <div className="border-l-4 border-accent pl-8 py-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                These trips are slower.
              </p>
              <div className="space-y-3 text-lg text-muted-foreground">
                <p>We sit with locals.</p>
                <p>We drink tea in villages.</p>
                <p>We wait when the mountains say wait.</p>
              </div>
            </div>

            <p className="text-xl text-foreground leading-relaxed pt-8 border-t border-border/50">
              The photos happen anyway.
              <br />
              <span className="text-muted-foreground">Just not on a schedule.</span>
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
