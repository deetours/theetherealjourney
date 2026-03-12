'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { MagneticButton } from '@/components/magnetic-button'

export function SensationalNarrative() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Triggers when at least 20% of the section is in view
  const isInView = useInView(containerRef, { 
    once: true,
    amount: 0.2
  })

  // Animation variants
  const maskVariants = {
    hidden: { clipPath: 'circle(0% at 50% 50%)' },
    visible: { 
      clipPath: 'circle(150% at 50% 50%)',
      transition: { 
        duration: 2.2, 
        ease: [0.65, 0, 0.35, 1], // Apple-style easing
        delay: 0.5 
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  }

  const bgTextVariants = {
    hidden: { opacity: 1 },
    visible: { 
      opacity: 0,
      transition: { 
        duration: 0.8, 
        delay: 1.2,
        ease: "easeOut" 
      }
    }
  }

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 1.2, 
        delay: 2.5,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  }

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[110vh] bg-black overflow-hidden flex items-center justify-center py-24"
    >
      {/* =========================================
          LAYER 1: The Initial Hook (Fixed depth)
          ========================================= */}
      <motion.div 
        variants={bgTextVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute inset-0 flex items-center justify-center px-6 md:px-12 z-0"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1.15] text-white tracking-tight">
            Before Spiti became a location tag,<br />
            <span className="text-white/40 italic">it was just home to someone.</span>
          </h2>
        </div>
      </motion.div>

      {/* =========================================
          LAYER 2: The Cinematic Reveal Mask
          ========================================= */}
      <motion.div
        variants={maskVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black"
      >
        {/* Background Image with subtle scale */}
        <motion.div 
          animate={isInView ? { scale: [1.1, 1] } : { scale: 1.1 }}
          transition={{ duration: 4, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-0"
        >
           <img
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2071&auto=format&fit=crop"
              alt="Himalayan drone shot"
              className="w-full h-full object-cover grayscale brightness-50 contrast-125"
              loading="lazy"
           />
           <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* =========================================
            LAYER 3: The Resolution & CTA
            ========================================= */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 w-full max-w-4xl">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 2.2 }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/70 mb-8 block">
              The Reality
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.05] text-white tracking-tight mb-8">
              We operate<br />differently.
            </h2>
            <div className="w-16 h-[2px] bg-white/50 mx-auto mb-8" />
            <p className="text-lg md:text-2xl text-white/90 font-light leading-relaxed mb-12 max-w-2xl px-4">
              Un-rushed expeditions. Reliable machines. Real mountain knowledge.<br />
              No crowded buses. No tourist traps. Just respect.
            </p>
          </motion.div>

          {/* CTA Box */}
          <motion.div
            variants={ctaVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Link href="/book">
              <MagneticButton>
                <div className="px-12 py-6 bg-white text-black text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-colors backdrop-blur-sm shadow-2xl font-semibold">
                  Explore Expeditions
                </div>
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom spacer to prevent abrupt end */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-30" />
    </section>
  )
}
