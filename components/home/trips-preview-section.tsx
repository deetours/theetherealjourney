'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
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
}

export function TripsPreviewSection() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrips() {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('id')
        .limit(3)

      if (data) {
        setTrips(data)
      } else if (error) {
        console.error('Error fetching preview trips:', error)
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
    <section ref={ref} className="relative w-full py-32 md:py-48 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-display leading-tight text-foreground mb-6">
            These aren't tours.
          </h2>
          <p className="text-3xl font-display text-muted-foreground mb-6">
            They're journeys.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Each route we run has been tested by weather, time, and experience. No shortcuts. No compromises.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              variants={itemVariants}
              className="group cursor-pointer h-full"
            >
              <Link href={`/trips/${trip.id}`}>
                <div className="h-full flex flex-col pt-8 pb-6 hover:opacity-70 transition-opacity duration-500 border-t border-border/40">
                  <div className="aspect-video bg-gradient-to-br from-foreground/5 to-secondary/5 rounded-sm mb-6 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl text-accent/20 font-light">+</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-display text-foreground mb-4">
                    {trip.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {trip.description}
                  </p>

                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="text-accent font-medium">{trip.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Max Altitude</span>
                      <span className="text-accent font-medium">{trip.altitude}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Difficulty</span>
                      <span className="text-accent font-medium">{trip.difficulty}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-accent font-medium group-hover:gap-3 transition-all gap-2">
                    Explore <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Hardcoded Rentals Card */}
          <motion.div variants={itemVariants} className="group cursor-pointer h-full">
            <Link href="/rentals">
              <div className="h-full flex flex-col pt-8 pb-6 hover:opacity-80 transition-opacity duration-500 border-t border-stark-dark/40">
                <div className="aspect-video bg-gradient-to-br from-stark-dark to-stark-dark/90 rounded-sm mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 bg-secondary/10 opacity-20 mix-blend-overlay"></div>
                  <div className="w-full h-full flex items-center justify-center relative z-10">
                    <span className="text-sm text-stark-dark-foreground font-sans tracking-[0.2em] uppercase">Machines</span>
                  </div>
                </div>

                <h3 className="text-2xl font-display text-foreground mb-4">
                  Ride Your Own Path
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  For those who don't need a guide, just the right machine. Fleet of meticulously maintained Himalayan 450s and 411s.
                </p>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="text-foreground font-medium">Motorcycles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="text-foreground font-medium">Manali / Leh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Support</span>
                    <span className="text-foreground font-medium">24/7 Backup</span>
                  </div>
                </div>

                <div className="flex items-center text-foreground font-medium group-hover:gap-3 transition-all gap-2">
                  View Fleet <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-center text-muted-foreground text-lg mt-20 pt-12 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Just to be clear: none of these trips include "10 Instagram photo stops in 24 hours".
          <br />
          <span className="text-foreground font-medium">We like our mountains slow.</span>
        </motion.p>
      </div>
    </section>
  )
}
