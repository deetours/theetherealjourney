'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function PinnedHero() {
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    });

    // Parallax the image down slower than the scroll
    const imageY = useTransform(scrollYProgress, [0, 1], ['0vh', '40vh']);
    // Fade out text as we scroll past halfway
    const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section ref={container} className="relative h-[200vh]">
            {/* The sticky wrapper keeps the content fixed to viewport for 200vh */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">

                <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-full">
                    <Image
                        src="/home-hero.jpg"
                        alt="Deep Himalayan Mountain Range"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Subtle vignette / dampener over the image to ensure text pops */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </motion.div>

                <motion.div
                    style={{ opacity: textOpacity }}
                    className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 lg:p-16 z-10"
                >
                    {/* Using mix-blend mode for high-end cinematic text overlap */}
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="text-foreground lg:text-white font-display uppercase font-light text-[12vw] leading-none mb-4 mix-blend-overlay"
                    >
                        The Ethereal <br /> Journey
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                        className="text-foreground lg:text-white/80 font-sans uppercase tracking-[0.3em] lg:mix-blend-overlay"
                    >
                        Mountain Wisdom. Authentic Connection.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
