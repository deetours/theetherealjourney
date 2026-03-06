'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { StoryBlock } from '@/components/features/story-block';
import { fadeInRise, premiumEasing } from '@/lib/animations';

const STORIES = [
    {
        id: "the-monks-of-key",
        title: "Silence At 14,000 Feet",
        excerpt: "We spent three days inside Key Monastery. No phones. No itineraries. Just the sound of wind against stone and the rhythmic chanting of eighty monks who have realized rushing is a sickness.",
        imageSrc: "/placeholder.jpg",
        date: "OCT 2024",
        location: "SPITI VALLEY",
        isPortrait: false, // Massive cinematic landscape
        alignment: "left" as const,
    },
    {
        id: "zanskar-frozen-river",
        title: "Walking The Chadar",
        excerpt: "When the Zanskar river freezes, it becomes the only highway connecting isolated villages to the rest of Ladakh. It is a walk on glass over black water. It terrifies and purifies simultaneously.",
        imageSrc: "/placeholder.jpg",
        date: "JAN 2025",
        location: "ZANSKAR",
        isPortrait: true, // Tight, claustrophobic portrait
        alignment: "right" as const,
    },
    {
        id: "nomads-of-changthang",
        title: "People Of The Wind",
        excerpt: "The Changpa nomads do not fight the extreme altitude; they move with it. Their pashmina goats dictate their lives. A documentation of surviving at the edge of the habitable world.",
        imageSrc: "/placeholder.jpg",
        date: "AUG 2024",
        location: "CHANGTHANG",
        isPortrait: false,
        alignment: "center" as const,
    }
];

export default function StoriesPage() {
    return (
        <div className="relative min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent selection:text-foreground">
            <Navigation />

            {/* Hero Header for Stories */}
            <header className="relative w-full pt-48 pb-32 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 40 },
                        visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: premiumEasing } }
                    }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="text-secondary tracking-[0.3em] text-sm uppercase mb-8 block">
                        The Journal
                    </span>
                    <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-display leading-[0.9] text-foreground tracking-tight mix-blend-difference">
                        Dispatches <br /> From The Edge
                    </h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="mt-12 text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed"
                    >
                        We don't write marketing copy. We document what happens when you strip away the noise and arrive in the thin air.
                    </motion.p>
                </motion.div>
            </header>

            {/* The Asymmetric Film Strip */}
            <main className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 pb-48 space-y-32 md:space-y-48">
                {STORIES.map((story, index) => (
                    <motion.div
                        key={story.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        // We stagger the entry of each block based on it's position for organic feeling
                        transition={{ delay: index * 0.1 }}
                    >
                        <StoryBlock {...story} />
                    </motion.div>
                ))}
            </main>

            {/* Cinematic Transition to Trip Hook */}
            <section className="w-full bg-foreground text-background py-48 px-6 text-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInRise}
                    className="max-w-3xl mx-auto flex flex-col items-center"
                >
                    <h2 className="font-display text-4xl md:text-5xl leading-tight mb-12">
                        Some stories require you to be there.
                    </h2>
                    <motion.a
                        href="/trips"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.5, ease: premiumEasing }}
                        className="px-10 py-5 border border-background/20 hover:border-background text-sm tracking-[0.2em] uppercase transition-colors"
                    >
                        View Our Expeditions
                    </motion.a>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
