'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { fadeInRise } from '@/lib/animations'
import { supabase } from '@/lib/supabase'

type Rental = {
    id: number
    type: 'bike' | 'car'
    name: string
    cc?: string
    price_per_day: number
    image: string
    description: string
    available: boolean
}

function RentalCard({ rental, index }: { rental: Rental; index: number }) {
    return (
        <div
            className="flex-shrink-0 w-[90vw] sm:w-[70vw] md:w-[55vw] lg:w-[42vw] h-full border-r border-border/30 last:border-r-0 pl-12 pr-12 py-16 flex flex-col justify-between group hover:bg-muted/5 transition-colors duration-700"
        >
            <div>
                <div className="flex items-center justify-between mb-12">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-secondary">
                        {rental.type === 'bike' ? 'Motorcycle' : 'Self-Drive 4×4'}
                        {rental.cc && <span className="ml-6 pl-6 border-l border-border/50 text-accent">{rental.cc}</span>}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-secondary">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                {/* Machine name - the hero element */}
                <h3 className="text-5xl md:text-6xl xl:text-7xl font-display leading-[1.05] tracking-tight mb-8 group-hover:text-accent transition-colors duration-700">
                    {rental.name}
                </h3>

                <p className="text-secondary text-lg leading-relaxed max-w-sm">
                    {rental.description}
                </p>
            </div>

            <div className="border-t border-border/30 pt-10 flex flex-row items-end justify-between gap-8">
                <div>
                    <p className="text-5xl font-display leading-none mb-2">
                        ₹{rental.price_per_day.toLocaleString()}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-secondary">per day</p>
                </div>

                {rental.available ? (
                    <Link
                        href={`/book?type=rental&id=${rental.id}&name=${encodeURIComponent(rental.name)}&price=${rental.price_per_day}`}
                        className="flex-shrink-0 flex items-center gap-4 text-xs uppercase tracking-widest bg-foreground text-background px-8 py-5 hover:bg-accent transition-colors duration-500"
                    >
                        <span>Request</span>
                        <span className="opacity-60">→</span>
                    </Link>
                ) : (
                    <div className="flex-shrink-0 flex items-center gap-4 text-xs uppercase tracking-widest text-secondary px-8 py-5 border border-border/50 cursor-not-allowed">
                        <span>Deployed</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function RentalsPage() {
    const [rentals, setRentals] = useState<Rental[]>([])
    const [loading, setLoading] = useState(true)

    const fallbackRentals: Rental[] = [
        { id: 101, type: 'bike', name: 'Royal Enfield Himalayan 450', cc: '450CC', price_per_day: 2500, image: '', description: 'The absolute standard for the mountains. Perfect balance of power and agility on any Himalayan road.', available: true },
        { id: 102, type: 'bike', name: 'KTM 390 Adventure', cc: '390CC', price_per_day: 2800, image: '', description: 'Aggressive dirt performer. For experienced riders who want sharp handling and raw power.', available: true },
        { id: 201, type: 'car', name: 'Mahindra Thar 4×4', price_per_day: 5500, image: '', description: 'Unstoppable off-road capability. Built for water crossings, loose gravel, and black ice.', available: true },
        { id: 103, type: 'bike', name: 'Royal Enfield Bullet 350', cc: '350CC', price_per_day: 1800, image: '', description: 'The classic thumper. Heavy, grounded, and deeply tied to Himalayan motorcycle mythology.', available: false }
    ]

    useEffect(() => {
        async function fetchRentals() {
            try {
                const { data } = await supabase
                    .from('rentals')
                    .select('*')
                    .order('type')
                    .order('price_per_day')

                if (data && data.length > 0) {
                    setRentals(data)
                } else {
                    setRentals(fallbackRentals)
                }
            } catch {
                setRentals(fallbackRentals)
            } finally {
                setLoading(false)
            }
        }
        fetchRentals()
    }, [])

    // Horizontal scroll setup
    // The scroll section needs to be tall enough to scroll the full width of content
    // We use a sticky container pinned to top:0 and move the inner div horizontally
    const horizontalRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: horizontalRef,
        offset: ['start start', 'end end'],
    })

    // Number of cards × approx card width percentage. 
    // We move left by enough to show the last card: (n-1) cards × card-width
    const cardCount = rentals.length
    // Each card is ~42vw + 24px gap, so total shift ≈ (n-1) × 42vw
    const shiftVw = Math.max(0, cardCount - 1) * 44
    const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${shiftVw}vw`])

    return (
        <div className="min-h-screen bg-background text-foreground antialiased">
            <Navigation />

            {/* Hero */}
            <section className="pt-48 pb-16 px-6 md:px-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInRise}
                    className="max-w-screen-xl mx-auto"
                >
                    <span className="text-[10px] uppercase tracking-[0.5em] text-secondary block mb-8">The Garage</span>
                    <h1 className="text-6xl md:text-8xl font-display text-foreground leading-[1.05] mb-8">
                        Machines built<br />for consequence.
                    </h1>
                    <p className="text-xl text-secondary max-w-lg leading-relaxed">
                        We don't rent plastic scooters. Every machine in our fleet has been proven on the same roads you're about to ride.
                    </p>
                </motion.div>
            </section>

            {/* Scroll hint */}
            <div className="px-6 md:px-12 pb-4 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-border" />
                <span className="text-[10px] uppercase tracking-widest text-secondary">Scroll to browse fleet →</span>
            </div>

            {/* Horizontal Scroll Area */}
            {loading ? (
                <div className="h-screen flex items-center justify-center">
                    <div className="animate-pulse text-xs tracking-widest uppercase text-secondary">Opening The Garage...</div>
                </div>
            ) : (
                <section
                    ref={horizontalRef}
                    // Height drives the scroll distance: more height = slower/longer horizontal travel
                    style={{ height: `${(cardCount + 1) * 100}vh` }}
                    className="relative bg-background"
                >
                    <div className="sticky top-0 h-screen overflow-hidden flex items-center border-t border-border/30">
                        <motion.div
                            style={{ x }}
                            className="flex w-max will-change-transform"
                        >
                            {/* Left inset */}
                            <div className="w-[6vw] md:w-[8vw] flex-shrink-0" />
                            {rentals.map((rental, i) => (
                                <RentalCard key={rental.id} rental={rental} index={i} />
                            ))}
                            {/* Right end cap */}
                            <div className="w-[12vw] flex-shrink-0 flex items-center justify-start pl-12">
                                <div className="text-center">
                                    <div className="w-[1px] h-32 bg-border/40 mx-auto mb-8" />
                                    <p className="text-[10px] uppercase tracking-widest text-secondary">End of Fleet</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Rules */}
            <section className="py-32 md:py-48 px-6 md:px-12 bg-stark-dark text-stark-dark-foreground">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInRise}
                    >
                        <h2 className="text-4xl md:text-6xl font-display mb-20">The Rules of the Road</h2>
                        <div className="space-y-0">
                            {[
                                ['License', 'Valid LMV or two-wheeler license required. No exceptions. The mountain respects documentation.'],
                                ['Security Deposit', 'Refundable ₹5,000 (bikes) or ₹10,000 (cars) collected at pickup. Returned clean on return.'],
                                ['Fuel Policy', 'Full tank handed to you. Full tank returned by you. No confusion.'],
                                ['Support', 'Our mechanic follows guided trips. Solo renters receive 24/7 emergency mountain contacts.'],
                            ].map(([title, desc], i) => (
                                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-16 py-10 border-b border-border/20">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-stark-dark-foreground/60 min-w-[160px] pt-1">{title}</p>
                                    <p className="text-base text-stark-dark-foreground/80 leading-relaxed max-w-lg">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
