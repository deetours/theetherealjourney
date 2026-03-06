'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex items-center justify-center px-6 py-32">
        <motion.div
          className="max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-8xl font-bold text-accent mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            404
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The path seems lost.
          </h1>
          
          <p className="text-lg md:text-xl text-secondary mb-8 leading-relaxed">
            Like many mountain roads, sometimes the route disappears.
            <br />
            But unlike the mountains, we can point you in the right direction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <motion.button
                className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded text-lg hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Return Home
              </motion.button>
            </Link>
            <Link href="/trips">
              <motion.button
                className="px-8 py-3 bg-muted text-foreground font-semibold rounded text-lg hover:bg-muted/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Trips
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
