'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Menu } from 'lucide-react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Trips', href: '/trips' },
    { label: 'Rentals', href: '/rentals' },
    { label: 'Stories', href: '/stories' },
    { label: 'Contact', href: '/contact', mobileOnly: true },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ease-[0.22,1,0.36,1] ${isScrolled || isOpen
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
            onClick={() => setIsOpen(false)}
            className={`text-xl md:text-2xl font-display uppercase tracking-widest transition-colors duration-500 ${isScrolled || isOpen ? 'text-foreground' : 'text-foreground lg:text-white mix-blend-overlay'
              }`}
          >
            The Ethereal Journey
          </Link>

          {/* Desktop Center Links */}
          <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {navItems.filter(item => !item.mobileOnly).map((item) => (
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

          {/* Desktop Right CTA */}
          <Link
            href="/contact"
            className={`hidden md:block text-xs uppercase tracking-[0.2em] transition-colors duration-500 group relative ${isScrolled ? 'text-foreground' : 'text-foreground lg:text-white mix-blend-overlay'
              }`}
          >
            Enquire
            <span className={`absolute -bottom-2 left-0 w-full h-[1px] transition-all duration-500 group-hover:w-0 ${isScrolled ? 'bg-foreground' : 'bg-foreground lg:bg-white'
              }`} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-500 ${isScrolled || isOpen ? 'text-foreground' : 'text-foreground mix-blend-overlay'
              }`}
          >
            <span>{isOpen ? 'Close' : 'Menu'}</span>
            {isOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1.5} />}
          </button>

        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-background md:hidden flex flex-col justify-center px-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-secondary mb-4 block">Navigation</span>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (index * 0.1), duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-display uppercase tracking-tight text-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute bottom-12 left-8 right-8 flex justify-between items-end border-t border-border/50 pt-8"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-secondary block">Spiti & Zanskar</span>
                <span className="text-xs text-secondary underline decoration-border/50 underline-offset-4 tracking-[0.05em]">Since 2024</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-secondary">
                The Ethereal Journey &copy;
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

