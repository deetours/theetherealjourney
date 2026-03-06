'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@/lib/utils'; // standard shadcn utility

interface CinematicImageProps {
    src: string;
    alt: string;
    className?: string;
    parallaxOffset?: [number, number]; // [start, end] scale factors
    priority?: boolean;
}

export const CinematicImage = ({
    src,
    alt,
    className,
    parallaxOffset = [1.1, 1], // default "pull-back" parallax
    priority = false
}: CinematicImageProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // Tie the scroll progress to the specific element crossing the viewport bounds
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Transform scale from [0,1] state of scrolling through element bounds to the parallaxOffset array
    const scale = useTransform(scrollYProgress, [0, 1], parallaxOffset);

    return (
        <div
            ref={ref}
            className={cn(
                "overflow-hidden bg-muted relative w-full h-[60vh] md:h-[80vh]",
                className
            )}
        >
            <motion.div
                style={{ scale }}
                className="w-full h-full origin-bottom"
                initial={{ filter: "brightness(0.8)" }}
                whileInView={{ filter: "brightness(1)", transition: { duration: 1.5 } }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority={priority}
                // Note: to implement LQIP (Low Quality Image Placeholders) you'd also drop blurDataURL here
                />
            </motion.div>
        </div>
    );
};
