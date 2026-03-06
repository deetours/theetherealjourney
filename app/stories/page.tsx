'use client';

import { motion } from 'framer-motion';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { StoryBlock } from '@/components/features/story-block';
import { fadeInRise, premiumEasing } from '@/lib/animations';
import { STORY_DATA } from '@/lib/data/stories';

export default function StoriesPage() {
    // Inject the presentation layer metadata into our story data
    // so we get the asymmetrical film-strip rendering
    const FILM_STRIP_RENDER_DATA = STORY_DATA.map((story, index) => {
        // Pattern: Landscape (Left), Portrait (Right), Landscape (Center)
        return {
            ...story,
            isPortrait: index % 3 === 1,
            alignment: index % 3 === 0 ? "left" : (index % 3 === 1 ? "right" : "center") as "left" | "right" | "center"
        };
    });

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
                {FILM_STRIP_RENDER_DATA.map((story, index) => (
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
