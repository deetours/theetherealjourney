'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeInRise } from '@/lib/animations'

export function TheCrewSection() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    })

    return (
        <section ref={ref} className="w-full pt-20 pb-32 md:pt-32 md:pb-48 px-6 bg-background border-t border-border/10">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={fadeInRise}
                    className="mb-20 text-center md:text-left"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-secondary block mb-4">The Crew</span>
                    <h2 className="text-4xl md:text-5xl font-display text-foreground">
                        Led by the ones who know<br className="hidden md:block" />every stone on the route.
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {/* Guide 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group"
                    >
                        <div className="aspect-[3/4] bg-muted/20 w-full mb-8 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                            {/* Placeholders for actual high-end photography */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-xs uppercase tracking-widest text-secondary/40">[Documentary Portrait]</p>
                            </div>
                            <div className="absolute bottom-6 left-6 z-10">
                                <p className="text-xs uppercase tracking-widest text-secondary">[Lead Mountaineer / 15yrs Exp]</p>
                            </div>
                        </div>
                        <h3 className="text-2xl font-display text-foreground mb-2">Wangchuk</h3>
                        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-6">Head of Expeditions</p>
                        <p className="text-secondary leading-relaxed max-w-sm">
                            Born in Kaza. Has mapped more uncharted routes in Spiti than anyone in the region.
                            Certified Wilderness First Responder and an absolute authority on high-altitude survival.
                            When things go wrong, he's the one you want.
                        </p>
                    </motion.div>

                    {/* Guide 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="group md:mt-24"
                    >
                        <div className="aspect-[3/4] bg-muted/20 w-full mb-8 relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-xs uppercase tracking-widest text-secondary/40">[Documentary Portrait]</p>
                            </div>
                            <div className="absolute bottom-6 left-6 z-10">
                                <p className="text-xs uppercase tracking-widest text-secondary">[Lead Mechanic / 12yrs Exp]</p>
                            </div>
                        </div>
                        <h3 className="text-2xl font-display text-foreground mb-2">Tenzin</h3>
                        <p className="text-xs uppercase tracking-[0.2em] text-accent mb-6">Master Mechanic & Sweep</p>
                        <p className="text-secondary leading-relaxed max-w-sm">
                            If it has an engine, Tenzin can fix it—even at -10°C in a blizzard.
                            He acts as the sweep rider on our motorcycle expeditions, ensuring nobody is left behind
                            and every machine reaches the destination.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
