'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

const tripsData = {
  1: {
    title: 'Spiti Valley Expedition',
    shortDesc: 'The journey that started it all.',
    duration: '7 days',
    altitude: '4,500m',
    difficulty: 'Moderate',
    groupSize: '4-8 people',
    seasonStart: 'May',
    seasonEnd: 'October',
    price: '₹89,000',
    overview:
      'Spiti Valley is a high-altitude desert in Himachal Pradesh. Ancient monasteries cling to cliff faces, prayer flags flutter over mountain passes, and the roads feel like they belong to another planet. This expedition combines adventure with spiritual immersion, taking you through villages that time forgot and landscapes that redefine beauty.',
    highlights: [
      'Kaza - The largest settlement in Spiti',
      'Tabo Monastery - 1000+ year old Buddhist monastery',
      'Dhankar Monastery - Perched on a cliff edge',
      'Langza - The highest inhabited village',
      'Komik Village - One of the highest inhabited villages in India',
      'Chandratal Lake - The crescent moon lake',
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival in Kaza',
        description: 'Arrive at Kaza. Rest and acclimatization.',
      },
      {
        day: 'Day 2',
        title: 'Kaza to Tabo',
        description: 'Explore the ancient Tabo Monastery. Ride through scenic passes.',
      },
      {
        day: 'Day 3',
        title: 'Tabo Loop',
        description: 'Dhankar Monastery and Langza village trek.',
      },
      {
        day: 'Day 4',
        title: 'Komik Village',
        description: 'Ride to the highest inhabited village. Visit the ancient monastery.',
      },
      {
        day: 'Day 5',
        title: 'Chandratal Lake',
        description: 'Trek to the crescent moon lake. Overnight camping.',
      },
      {
        day: 'Day 6',
        title: 'Chandratal to Kaza',
        description: 'Return ride with panoramic views.',
      },
      {
        day: 'Day 7',
        title: 'Departure',
        description: 'Final morning. Depart for home.',
      },
    ],
    whatIncluded: [
      'Professional mountain guide with 10+ years experience',
      'All accommodation in guesthouses and camps',
      'Meals (breakfast, lunch, dinner)',
      'Motorcycle rental (if needed)',
      'First aid kit and emergency support',
      'All entrance fees',
    ],
    whatToBring: [
      'Riding gear (helmet, jacket, gloves)',
      'Warm clothing (fleece, thermal)',
      'Rain gear',
      'Comfortable walking shoes',
      'Personal medications',
      'Camera',
    ],
  },
  2: {
    title: 'Ladakh Motorcycle Journey',
    shortDesc: 'The ride every motorcyclist dreams about.',
    duration: '10 days',
    altitude: '5,602m',
    difficulty: 'Challenging',
    groupSize: '3-6 people',
    seasonStart: 'June',
    seasonEnd: 'September',
    price: '₹1,29,000',
    overview:
      'This is the ultimate Himalayan motorcycle journey. Ride through some of the world\'s highest passes, navigate hairpin turns with 10,000-meter peaks in the background, and experience roads that are pure adrenaline. Ladakh is not just a destination—it\'s a rider\'s pilgrimage.',
    highlights: [
      'Chang La - 5,360m pass with stunning views',
      'Tanglang La - 5,328m, one of the highest passes',
      'Khardung La - 5,359m, legendary among riders',
      'Nubra Valley - Desert with sand dunes and camels',
      'Tso Moriri - Turquoise salt lake',
      'Pangong Tso - 134km long high-altitude lake',
    ],
    itinerary: [
      {
        day: 'Day 1-2',
        title: 'Arrival and Acclimatization',
        description: 'Land in Leh. Rest and prepare bikes.',
      },
      {
        day: 'Day 3-4',
        title: 'Chang La and Tsomoriri Loop',
        description: 'Ride Chang La pass. Overnight at the lake.',
      },
      {
        day: 'Day 5',
        title: 'Nubra Valley',
        description: 'Ride to cold desert. Double-humped camels.',
      },
      {
        day: 'Day 6',
        title: 'Khardung La',
        description: 'The legendary pass. The ultimate rider\'s experience.',
      },
      {
        day: 'Day 7-8',
        title: 'Pangong Tso',
        description: 'Longest high-altitude lake. Stunning sunsets.',
      },
      {
        day: 'Day 9',
        title: 'Tanglang La',
        description: 'Second highest pass. Drive back to Leh.',
      },
      {
        day: 'Day 10',
        title: 'Departure',
        description: 'Fly back home.',
      },
    ],
    whatIncluded: [
      'Experienced motorcycle guide',
      'Royal Enfield motorcycle (Ladakh Adventure spec)',
      'All accommodation',
      'All meals',
      'Fuel and maintenance',
      'Adventure insurance',
      'Emergency evacuation support',
    ],
    whatToBring: [
      'Motorcycle riding gear',
      'Heavy winter clothing',
      'Sun protection',
      'Physical fitness (important)',
      'Riding experience (minimum 2 years)',
    ],
  },
  3: {
    title: 'Zanskar Discovery',
    shortDesc: 'For people who think they\'ve "done Ladakh".',
    duration: '8 days',
    altitude: '4,800m',
    difficulty: 'Challenging',
    groupSize: '4-7 people',
    seasonStart: 'July',
    seasonEnd: 'September',
    price: '₹99,000',
    overview:
      'Zanskar is the road less traveled. While tourists flock to Ladakh\'s famous landmarks, Zanskar remains raw, untouched, and unforgiving. It\'s for adventurers who want to experience the Himalayas on their own terms. This is expedition-level trekking and riding.',
    highlights: [
      'Zanskar River Trekking',
      'Phugtal Monastery - Cliff-side monastery',
      'Tso Moriri Lake - Pristine beauty',
      'Hanle Observatory - Highest in the world',
      'Darcha to Leh Loop',
      'Sleeping under stars in Zanskar desert',
    ],
    itinerary: [
      {
        day: 'Day 1-2',
        title: 'Leh to Kargil',
        description: 'Scenic drive. Acclimatization.',
      },
      {
        day: 'Day 3',
        title: 'Kargil to Zanskar',
        description: 'Enter the hidden valley.',
      },
      {
        day: 'Day 4-5',
        title: 'Zanskar River Trek',
        description: 'Multi-day trek through the river canyon.',
      },
      {
        day: 'Day 6',
        title: 'Phugtal Monastery',
        description: 'Ancient monastery hanging from cliffs.',
      },
      {
        day: 'Day 7',
        title: 'Hanle Observatory',
        description: 'Highest observatory in the world.',
      },
      {
        day: 'Day 8',
        title: 'Return to Leh',
        description: 'Final drive back.',
      },
    ],
    whatIncluded: [
      'Expert expedition guide (Zanskar specialist)',
      'All accommodation (camps and guesthouses)',
      'All meals and water',
      'Trekking support and porters',
      'Mountain rescue insurance',
      'First aid and medical support',
    ],
    whatToBring: [
      'Trekking boots (broken in)',
      'Technical trekking gear',
      'Warm layers',
      'Water bottle and electrolytes',
      'High physical fitness level',
      'Mental resilience',
    ],
  },
}

export default function TripDetailsPage() {
  const params = useParams()
  const tripId = parseInt(params.id as string)
  const trip = (tripsData as any)[tripId]

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
