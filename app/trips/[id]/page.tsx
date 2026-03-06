'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function TripDetailsPage() {
  const params = useParams()
  const tripId = parseInt(params.id as string)

  const [trip, setTrip] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrip() {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single()

      if (data) {
        setTrip(data)
      } else if (error) {
        console.error('Error fetching trip details:', error)
      }
      setLoading(false)
    }

    if (tripId) {
      fetchTrip()
    }
  }, [tripId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Navigation />
        <div className="animate-pulse text-secondary text-sm tracking-widest uppercase">Loading Journey...</div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-40 pb-20 px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Trip not found</h1>
          <Link href="/trips" className="text-accent hover:underline">
            Back to all trips
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6 bg-gradient-to-b from-muted/20 to-background">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href="/trips"
            className="inline-flex items-center text-accent hover:text-accent/80 transition-colors mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to all trips
          </Link>

          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            {trip.title}
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-8">
            {trip.shortDesc}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Duration', value: trip.duration },
              { label: 'Altitude', value: trip.altitude },
              { label: 'Difficulty', value: trip.difficulty },
              { label: 'Group Size', value: trip.groupSize },
            ].map((item, idx) => (
              <div key={idx} className="border-l-2 border-accent pl-4">
                <p className="text-xs text-secondary mb-1">{item.label}</p>
                <p className="font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-32 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            The Journey
          </h2>
          <p className="text-lg text-secondary leading-relaxed mb-12">
            {trip.overview}
          </p>

          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Highlights</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trip.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-accent mr-4 font-bold text-lg">•</span>
                  <span className="text-secondary">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Itinerary */}
      <section className="py-20 md:py-32 px-6 bg-muted/5">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Day by Day
          </h2>
          <div className="space-y-6">
            {trip.itinerary.map((item, idx) => (
              <motion.div
                key={idx}
                className="border-l-4 border-accent pl-6 py-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-accent font-semibold mb-2">{item.day}</p>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* What's Included */}
      <section className="py-20 md:py-32 px-6 bg-background">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">What's Included</h3>
              <ul className="space-y-3">
                {trip.whatIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-accent mr-3 font-bold">✓</span>
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">What to Bring</h3>
              <ul className="space-y-3">
                {trip.whatToBring.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-accent mr-3 font-bold">•</span>
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA + Pricing */}
      <section className="py-20 md:py-32 px-6 bg-foreground text-background">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-background/70 mb-4">Starting from</p>
          <p className="text-5xl md:text-6xl font-bold mb-8">{trip.price}</p>
          <p className="text-lg text-background/80 mb-8">
            Limited to {trip.groupSize}. Once full, we close bookings.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded text-lg hover:bg-accent/90 transition-colors">
              Check Availability
            </button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
