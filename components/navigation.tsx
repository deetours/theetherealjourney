'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Trips', href: '/trips' },
    { label: 'Stories', href: '/stories' }, // Fixed route
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.22,1,0.36,1] ${isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 py-4'
          : 'bg-transparent py-8'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Brand Logo */}
        <Link
          href="/"
          className={`text-xl md:text-2xl font-display uppercase tracking-widest transition-colors duration-500 ${isScrolled ? 'text-foreground' : 'text-foreground lg:text-white mix-blend-overlay'
            }`}
        >
          The Ethereal Journey
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-xs uppercase tracking-[0.2em] transition-colors duration-500 hover:text-foreground relative group ${isScrolled ? 'text-secondary' : 'text-secondary lg:text-white/70'
                }`}
            >
              {item.label}
              <span className={`absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-500 group-hover:w-full ${isScrolled ? 'bg-foreground' : 'bg-foreground lg:bg-white'
                }`} />
            </Link>
          ))}
        </div>

        {/* Right CTA - Minimalist Underline Style instead of bulky button */}
        <Link
          href="/contact"
          className={`hidden md:block text-xs uppercase tracking-[0.2em] transition-colors duration-500 group relative ${isScrolled ? 'text-foreground' : 'text-foreground lg:text-white mix-blend-overlay'
            }`}
        >
          Enquire
          <span className={`absolute -bottom-2 left-0 w-full h-[1px] transition-all duration-500 group-hover:w-0 ${isScrolled ? 'bg-foreground' : 'bg-foreground lg:bg-white'
            }`} />
        </Link>

        {/* Mobile Menu Trigger (Placeholder) */}
        <button className={`md:hidden text-xs uppercase tracking-[0.2em] ${isScrolled ? 'text-foreground' : 'text-foreground mix-blend-overlay'
          }`}>
          Menu
        </button>

      </div>
    </motion.nav>
  )
}

