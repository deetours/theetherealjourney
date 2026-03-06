'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { curtainReveal, premiumEasing } from '@/lib/animations';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface StoryBlockProps {
    id: string;
    title: string;
    excerpt: string;
    imageSrc: string;
    date: string;
    location: string;
    isPortrait?: boolean; // Toggles between massive 16:9 and tight 4:5
    alignment?: 'left' | 'center' | 'right'; // Asymmetric placement
}

export function StoryBlock({
    id,
    title,
    excerpt,
    imageSrc,
    date,
    location,
    isPortrait = false,
    alignment = 'center'
}: StoryBlockProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax the image very slightly within its container to give it weight
    const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    return (
        <motion.article
            ref={containerRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
            className={cn(
                "relative w-full py-24 flex flex-col group cursor-pointer",
                alignment === 'left' && "items-start",
                alignment === 'center' && "items-center",
                alignment === 'right' && "items-end"
            )}
        >
            <Link href={`/stories/${id}`} className="w-full flex flex-col items-inherit relative">

                <div className={cn(
                    "w-full lg:w-[85%] flex flex-col relative z-20",
                    alignment === 'left' && "lg:mr-auto",
                    alignment === 'right' && "lg:ml-auto"
                )}>
                    {/* Metadata */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: premiumEasing } }
                        }}
                        className="flex items-center gap-4 text-sm text-secondary uppercase tracking-[0.2em] mb-6 font-sans"
                    >
                        <span>{date}</span>
                        <span className="w-4 h-[1px] bg-secondary/50" />
                        <span>{location}</span>
                    </motion.div>

                    {/* Massive Graphic Title - intentionally overflows the image */}
                    <motion.h2
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: premiumEasing, delay: 0.1 } }
                        }}
                        className="text-[clamp(2.5rem,6vw,5.5rem)] font-display leading-[1.05] text-foreground mb-12 mix-blend-exclusion z-30"
                    >
                        {title}
                    </motion.h2>
                </div>

                {/* The Cinematic Image Container */}
                <div className={cn(
                    "relative overflow-hidden bg-muted w-full z-10",
                    isPortrait ? "aspect-[4/5] max-w-xl" : "aspect-[16/9]",
                    alignment === 'left' && "lg:w-[75%] mr-auto",
                    alignment === 'center' && "lg:w-[90%] mx-auto",
                    alignment === 'right' && "lg:w-[80%] ml-auto"
                )}>
                    <motion.div variants={curtainReveal} className="w-full h-full origin-bottom">
                        <motion.div style={{ y: imageY, scale: 1.05 }} className="w-full h-full relative">
                            <Image
                                src={imageSrc}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-[2s] ease-[0.22,1,0.36,1] group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 80vw"
                            />
                            {/* Dampening overlay */}
                            <div className="absolute inset-0 bg-black/5" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Excerpt */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: premiumEasing, delay: 0.3 } }
                    }}
                    className={cn(
                        "mt-10 lg:mt-16 max-w-xl text-lg text-secondary leading-relaxed z-20",
                        alignment === 'left' && "ml-0 md:ml-24",
                        alignment === 'right' && "mr-0 md:mr-24 self-end text-right",
                        alignment === 'center' && "mx-auto text-center"
                    )}
                >
                    <p>{excerpt}</p>
                    <span className="inline-block mt-6 text-sm uppercase tracking-widest text-foreground font-medium underline underline-offset-8 decoration-border hover:decoration-foreground transition-colors duration-500">
                        Read Story
                    </span>
                </motion.div>
            </Link>
        </motion.article>
    );
}
