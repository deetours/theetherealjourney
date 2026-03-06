'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { fadeInRise, premiumEasing, lineReveal } from '@/lib/animations';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface StoryData {
    id: string;
    title: string;
    excerpt: string;
    imageSrc: string;
    date: string;
    location: string;
    content: string[];
}

// Helper to bold specific markdown strings since we aren't using a full MDX renderer here
const parseBoldText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={index} className="italic text-foreground">{part.slice(1, -1)}</em>;
        }
        return part;
    });
};

export function StoryArticleRenderer({ story }: { story: StoryData }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ['0vh', '40vh']);
    const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="relative min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-foreground overflow-x-hidden">
            <Navigation />

            {/* 1. The Pinned Reading Hero */}
            <section ref={heroRef} className="relative h-[150vh] w-full bg-background z-0">
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">

                    {/* Parallax Image */}
                    <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-full will-change-transform">
                        <Image
                            src={story.imageSrc}
                            alt={story.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Dark vignette to ensure high-contrast reading text later */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-background" />
                    </motion.div>

                    <motion.div
                        style={{ opacity: fadeOut }}
                        className="absolute inset-x-0 bottom-32 px-6 md:px-12 flex flex-col z-10 max-w-screen-2xl mx-auto"
                    >
                        {/* Metadata (Inter / Sans-Serif) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.8, ease: premiumEasing }}
                            className="flex items-center gap-4 text-xs md:text-sm text-white/70 uppercase tracking-[0.2em] mb-8 font-sans mix-blend-overlay"
                        >
                            <span>{story.date}</span>
                            <span className="w-8 h-[1px] bg-white/50" />
                            <span>{story.location}</span>
                        </motion.div>

                        {/* Massive Title (Playfair / Serif) */}
                        <div className="overflow-hidden">
                            <motion.h1
                                initial="hidden"
                                animate="visible"
                                variants={lineReveal}
                                className="text-white font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-tight mix-blend-overlay"
                            >
                                {story.title}
                            </motion.h1>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. The Photo-Essay Body (Z-index 10 pulls it over the pinned hero) */}
            <main className="relative z-10 w-full bg-background -mt-[50vh] pt-32 pb-48 px-6 md:px-12 shadow-[0_-20vh_20vh_rgba(245,244,240,1)]">
                <article className="max-w-3xl mx-auto flex flex-col gap-12 md:gap-16">

                    {/* Back button logic */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mb-8"
                    >
                        <Link href="/stories" className="group inline-flex items-center gap-4 text-xs tracking-[0.2em] uppercase text-secondary hover:text-foreground transition-colors">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                            Back to Journal
                        </Link>
                    </motion.div>

                    {/* Staccato Scroll Mapping */}
                    {story.content.map((paragraph, index) => {
                        // Handle visual thought-breaks defined in our data by "---"
                        if (paragraph === "---") {
                            return (
                                <motion.div
                                    key={index}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={{
                                        hidden: { opacity: 0, scaleX: 0 },
                                        visible: { opacity: 1, scaleX: 1, transition: { duration: 1.5, ease: premiumEasing } }
                                    }}
                                    className="w-12 h-[1px] bg-border mx-auto my-8 origin-center"
                                />
                            );
                        }

                        return (
                            <motion.section
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeInRise}
                                className="flex"
                            >
                                <p className="font-display text-2xl md:text-3xl leading-[1.6] text-secondary tracking-[-0.01em]">
                                    {parseBoldText(paragraph)}
                                </p>
                            </motion.section>
                        );
                    })}
                </article>

                {/* Footer Trip Hook */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInRise}
                    className="max-w-3xl mx-auto mt-48 pt-24 border-t border-border flex flex-col items-center text-center gap-8 text-secondary"
                >
                    <p className="font-sans uppercase tracking-[0.2em] text-sm">End of Journal</p>
                    <p className="font-display text-3xl">Ready to experience this yourself?</p>
                    <Link
                        href="/trips"
                        className="mt-4 px-8 py-4 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors tracking-widest uppercase text-sm"
                    >
                        Explore Routes
                    </Link>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
