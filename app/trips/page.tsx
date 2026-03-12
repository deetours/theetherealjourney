'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Clock, Mountain, Activity } from 'lucide-react'
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
  const router = useRouter()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrips() {
      try {
        const { data, error } = await supabase
          .from('trips')
          .select('*')
          .order('id')

        if (data && data.length > 0) {
          setTrips(data)
        } else {
          setTrips(fallbackTrips) // Silent fallback
        }
      } catch (e) {
        setTrips(fallbackTrips) // Silent fallback
      } finally {
        setLoading(false)
      }
    }
    fetchTrips()
  }, [])

  const fallbackTrips: Trip[] = [
    {
      id: 1,
      title: 'Spiti Valley Circuit',
      description: 'The definitive high-altitude desert crossing. Monasteries, water crossings, and the absolute reality of the Himalayas.',
      shortDesc: 'The Ultimate High-Altitude Test',
      difficulty: 'Challenging',
      duration: '10 Days',
      altitude: '4,270m'
    },
    {
      id: 2,
      title: 'Zanskar Expedition',
      description: 'Venture into the heart of Zanskar where few riders go. Raw dirt tracks and deep Himalayan isolation.',
      shortDesc: 'Deep Himalayan Isolation',
      difficulty: 'Expert',
      duration: '14 Days',
      altitude: '4,500m'
    }
  ]

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
                className="group cursor-pointer block"
                onClick={() => router.push(`/trips/${trip.id}`)}
              >
                <div className="border-b-2 border-border pb-8 hover:border-accent transition-colors duration-500 flex flex-col h-full">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4 block">
                    {trip.shortDesc}
                  </span>

                  <h3 className="text-3xl md:text-4xl font-display text-foreground mb-6 leading-tight group-hover:text-accent transition-colors duration-500">
                    {trip.title}
                  </h3>

                  <p className="text-secondary text-base md:text-lg leading-relaxed mb-12 flex-grow">
                    {trip.description}
                  </p>

                  <div className="space-y-3 mb-10 w-full max-w-xs">
                    <div className="flex justify-between items-center border-b border-border/30 pb-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-secondary">Duration</span>
                      <span className="text-sm font-medium text-foreground">{trip.duration}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border/30 pb-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-secondary">Altitude</span>
                      <span className="text-sm font-medium text-foreground">{trip.altitude}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border/30 pb-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-secondary">Difficulty</span>
                      <span className="text-sm font-medium text-foreground">{trip.difficulty}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center text-[11px] uppercase tracking-[0.2em] text-foreground group-hover:text-accent transition-colors">
                      Explore Journey
                    </div>
                    <span className="text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      →
                    </span>
                  </div>
                </div>
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
