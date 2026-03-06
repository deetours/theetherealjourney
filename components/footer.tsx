'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Trips', href: '/trips' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <footer className="bg-foreground text-background pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-lg font-bold mb-4">The Ethereal Journey</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Real journeys through the Himalayas. Guided by people who know the mountains.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Trips</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/trips/1" className="text-background/70 hover:text-background transition-colors text-sm">
                  Spiti Valley
                </Link>
              </li>
              <li>
                <Link href="/trips/2" className="text-background/70 hover:text-background transition-colors text-sm">
                  Ladakh Journey
                </Link>
              </li>
              <li>
                <Link href="/trips/3" className="text-background/70 hover:text-background transition-colors text-sm">
                  Zanskar Discovery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@etherealjourney.com" className="text-background/70 hover:text-background transition-colors text-sm">
                  contact@etherealjourney.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-background/70 hover:text-background transition-colors text-sm">
                  Send Message
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-background/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} The Ethereal Journey. All rights reserved.</p>
          <p className="mt-4 md:mt-0">See you on the road.</p>
        </motion.div>
      </div>
    </footer>
  )
}
