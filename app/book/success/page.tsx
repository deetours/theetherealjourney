'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { fadeInRise, premiumEasing } from '@/lib/animations'
import { ArrowRight, Check } from 'lucide-react'

function SuccessContent() {
    const searchParams = useSearchParams()
    const name = searchParams.get('name') || 'Traveller'
    const item = searchParams.get('item') || 'Your Journey'

    return (
        <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
            <Navigation />

            <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
                {/* Atmospheric background */}
                <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none" />

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                    className="relative z-10 max-w-2xl mx-auto"
                >
                    {/* Check mark */}
                    <motion.div
                        variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } } }}
                        className="w-16 h-16 border border-foreground/30 flex items-center justify-center mx-auto mb-12"
                    >
                        <Check size={24} className="text-foreground" />
                    </motion.div>

                    <motion.span variants={fadeInRise} className="text-[10px] uppercase tracking-[0.5em] text-secondary block mb-6">
                        Application Received
                    </motion.span>

                    <motion.h1 variants={fadeInRise} className="font-display text-foreground leading-tight mb-8">
                        The mountains<br />are waiting,<br />{name}.
                    </motion.h1>

                    <motion.p variants={fadeInRise} className="text-secondary text-lg leading-relaxed mb-4">
                        Your booking for <strong className="text-foreground font-normal">{item}</strong> has been received.
                    </motion.p>

                    <motion.p variants={fadeInRise} className="text-secondary leading-relaxed mb-16">
                        Our lead guide will review your details and contact you via WhatsApp within 2 hours with a secure payment link to confirm your slot.
                    </motion.p>

                    <motion.div variants={fadeInRise} className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/trips" className="group flex items-center justify-center gap-4 border border-foreground px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-foreground hover:bg-foreground hover:text-background transition-all duration-500">
                            Explore More Trips <ArrowRight size={12} />
                        </Link>
                        <Link href="/stories" className="flex items-center justify-center gap-4 border border-border/50 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-secondary hover:border-foreground hover:text-foreground transition-all duration-500">
                            Read Our Stories
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <Footer />
        </div>
    )
}

export default function BookSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p className="text-secondary text-sm tracking-widest uppercase animate-pulse">Loading...</p></div>}>
            <SuccessContent />
        </Suspense>
    )
}
