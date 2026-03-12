'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { premiumEasing } from '@/lib/animations'

function CinematicStatement({ children, isDark = false }: { children: React.ReactNode, isDark?: boolean }) {
  return (
    <div className={`w-full min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 ${isDark ? 'bg-stark-dark text-stark-dark-foreground' : 'bg-background text-foreground'}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-25% 0px -25% 0px", once: false }}
        transition={{ duration: 1.2, ease: premiumEasing }}
        className="max-w-4xl mx-auto text-center"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground antialiased">
      <Navigation />
      
      <main className="pt-20">
        
        {/* Act 1: The Origin */}
        <CinematicStatement>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] tracking-tight mb-8">
            The Himalayas<br />are not a product.
          </h1>
          <p className="text-2xl md:text-3xl text-secondary font-light">
            They are a relationship.
          </p>
        </CinematicStatement>

        <CinematicStatement>
          <p className="text-2xl md:text-4xl font-display leading-tight max-w-3xl mx-auto text-secondary">
            There was no grand business plan.<br />No startup pitch deck.
          </p>
        </CinematicStatement>

        <CinematicStatement>
          <p className="text-3xl md:text-5xl font-display leading-tight max-w-3xl mx-auto">
            Just a bike, a road, and the mountains.<br />One trip became ten. Ten became years.
          </p>
        </CinematicStatement>

        {/* Act 2: The Shift */}
        <CinematicStatement isDark>
          <p className="text-3xl md:text-5xl font-display leading-tight max-w-4xl mx-auto text-stark-dark-foreground/60">
            Slowly, something became clear.
          </p>
          <h2 className="text-5xl md:text-7xl font-display leading-[1.1] mt-12 text-stark-dark-foreground">
            The mountains were being turned into content.
          </h2>
        </CinematicStatement>

        <CinematicStatement isDark>
          <p className="text-2xl md:text-4xl font-display leading-tight max-w-3xl mx-auto text-stark-dark-foreground/80 mb-12">
            People who had never spent a winter here started selling "expert expeditions." Villages were treated like photo backdrops.
          </p>
          <p className="text-lg uppercase tracking-[0.3em] text-accent">
            We reject this completely.
          </p>
        </CinematicStatement>

        {/* Act 3: The Reality */}
        <CinematicStatement>
          <h2 className="text-4xl md:text-6xl font-display leading-tight mb-16">
            We work with locals.<br />Not around them.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto">
             <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Experience</p>
                <p className="text-lg text-secondary leading-relaxed">Ten years on these roads teaches things Google never will. We ride these routes as people who belong here.</p>
             </div>
             <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4">Patience</p>
                <p className="text-lg text-secondary leading-relaxed">The mountains move at their own pace. So do we. We don't do "10 spots in 2 days" itineraries.</p>
             </div>
          </div>
        </CinematicStatement>

        {/* Act 4: The Call */}
        <CinematicStatement>
          <p className="text-2xl text-secondary mb-8">If you want a packaged experience, there are hundreds of agencies.</p>
          <h2 className="text-5xl md:text-7xl font-display leading-[1.1] mb-12">
            But if you want to<br />feel the road...
          </h2>
          <p className="text-xl uppercase tracking-[0.3em] text-foreground font-semibold">
            You're exactly why we built this.
          </p>
        </CinematicStatement>

      </main>

      <Footer />
    </div>
  )
}
