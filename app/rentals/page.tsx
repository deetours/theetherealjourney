'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { fadeInRise, premiumEasing } from '@/lib/animations'
import { supabase } from '@/lib/supabase'
import { ArrowRight } from 'lucide-react'

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
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 1, ease: premiumEasing, delay: index * 0.12 } }
            }}
            className="group"
        >
            <Link href={`/book?type=rental&id=${rental.id}&name=${encodeURIComponent(rental.name)}&price=${rental.price_per_day}`}>
                <div className="relative overflow-hidden border border-border/50 bg-card hover:border-foreground/30 transition-all duration-700 cursor-pointer">
                    {/* Image */}
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-foreground/5 to-secondary/10 overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <span className="text-6xl">{rental.type === 'bike' ? '🏍️' : '🚙'}</span>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-secondary">{rental.type === 'bike' ? 'Motorcycle' : 'Self-Drive Car'}</span>
                        </div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all duration-700" />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="font-display text-xl md:text-2xl text-foreground leading-tight">{rental.name}</h3>
                                {rental.cc && (
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-secondary mt-1 block">{rental.cc}</span>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="font-display text-2xl text-foreground">₹{rental.price_per_day.toLocaleString()}</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-secondary">per day</p>
                            </div>
                        </div>

                        <p className="text-sm text-secondary leading-relaxed mb-6">{rental.description}</p>

                        <div className="flex items-center justify-between border-t border-border/50 pt-4">
                            <span className={`text-[10px] uppercase tracking-[0.3em] ${rental.available ? 'text-accent' : 'text-secondary'}`}>
                                {rental.available ? '● Available' : '○ On Request'}
                            </span>
                            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground group-hover:gap-4 transition-all duration-500">
                                Book Now <ArrowRight size={12} />
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function RentalsPage() {
    const [rentals, setRentals] = useState<Rental[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRentals() {
            const { data, error } = await supabase
                .from('rentals')
                .select('*')
                .order('type')
                .order('price_per_day')

            if (data) setRentals(data)
            if (error) console.error('Error fetching rentals:', error)
            setLoading(false)
        }
        fetchRentals()
    }, [])

    const bikes = rentals.filter(r => r.type === 'bike')
    const cars = rentals.filter(r => r.type === 'car')

    return (
        <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
            <Navigation />

            {/* Hero */}
            <section className="pt-40 pb-24 px-6 md:px-12 relative">
                <div className="max-w-screen-2xl mx-auto">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInRise}
                    >
                        <span className="text-[10px] uppercase tracking-[0.5em] text-secondary block mb-8">Fleet</span>
                        <h1 className="font-display text-foreground leading-none mb-8">
                            Your Machine<br />Awaits.
                        </h1>
                        <p className="text-xl text-secondary max-w-xl leading-relaxed">
                            The Himalayas respect machines that were built for them. We only offer what passes the test.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Bikes Section */}
            <section className="py-16 md:py-24 px-6 md:px-12 border-t border-border/50">
                <div className="max-w-screen-2xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInRise}
                        className="mb-16"
                    >
                        <span className="text-[10px] uppercase tracking-[0.5em] text-secondary block mb-4">Motorcycles</span>
                        <h2 className="font-display text-foreground">Royal Enfield Fleet</h2>
                        <p className="text-secondary mt-4 max-w-lg">
                            Every bike is serviced before each journey. Fuel, maintenance, and support included when booked with a trip.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="border border-border/30 aspect-[3/4] animate-pulse bg-muted/20" />
                            ))}
                        </div>
                    ) : bikes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {bikes.map((rental, i) => <RentalCard key={rental.id} rental={rental} index={i} />)}
                        </div>
                    ) : (
                        <div className="py-24 text-center border border-border/30">
                            <p className="text-secondary text-sm tracking-widest uppercase">Fleet details loading via Supabase</p>
                            <p className="text-xs text-secondary/60 mt-2">Add rentals to the <code className="bg-muted px-1">rentals</code> table in your Supabase dashboard</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Cars Section */}
            <section className="py-16 md:py-24 px-6 md:px-12 border-t border-border/50">
                <div className="max-w-screen-2xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInRise}
                        className="mb-16"
                    >
                        <span className="text-[10px] uppercase tracking-[0.5em] text-secondary block mb-4">Self-Drive</span>
                        <h2 className="font-display text-foreground">4×4 Fleet</h2>
                        <p className="text-secondary mt-4 max-w-lg">
                            For those who prefer four wheels. Each vehicle is a proven mountain performer — no compromises.
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2].map(i => (
                                <div key={i} className="border border-border/30 aspect-[3/4] animate-pulse bg-muted/20" />
                            ))}
                        </div>
                    ) : cars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cars.map((rental, i) => <RentalCard key={rental.id} rental={rental} index={i} />)}
                        </div>
                    ) : (
                        <div className="py-24 text-center border border-border/30">
                            <p className="text-secondary text-sm tracking-widest uppercase">Fleet details loading via Supabase</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-24 md:py-40 px-6 md:px-12 border-t border-border/50">
                <div className="max-w-screen-2xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInRise}
                        className="max-w-3xl"
                    >
                        <h2 className="font-display text-foreground mb-12">A Few Things You Should Know</h2>
                        <div className="space-y-8 text-secondary">
                            {[
                                ['Valid Driving License', 'Required for all rentals. Motorcycles need a two-wheeler license. Cars need a valid LMV license.'],
                                ['Security Deposit', 'A refundable deposit of ₹5,000 (bikes) or ₹10,000 (cars) is collected at pickup.'],
                                ['Fuel Policy', 'Rentals are pick-up and drop-off with full tank. You return with full tank.'],
                                ['Backup Support', 'Our mechanic and backup vehicle follow all groups on guided trips. Solo renters get emergency contacts.'],
                            ].map(([title, desc]) => (
                                <div key={title} className="flex flex-col md:flex-row gap-4 md:gap-16 border-b border-border/30 pb-8">
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-foreground min-w-[180px]">{title}</p>
                                    <p className="text-sm leading-relaxed">{desc}</p>
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
