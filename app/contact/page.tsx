'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function ContactPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    trip: '',
    time: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setSubmitted(true)
    setFormData({
      name: '',
      email: '',
      trip: '',
      time: '',
    })
    setIsLoading(false)

    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
            Tell us about the journey you're dreaming of.
          </h1>
          <p className="text-xl md:text-2xl text-secondary">
            Spiti?
            <br />
            Ladakh?
            <br />
            Zanskar?
          </p>
          <p className="text-lg text-secondary mt-6">
            Or maybe something completely different.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section ref={ref} className="py-20 md:py-32 px-6 bg-muted/5">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative z-10 pb-16">
              <div className="text-3xl md:text-5xl font-display leading-[1.6] md:leading-[1.8] text-foreground mb-20 text-center">
                Hi, my name is{' '}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b-2 border-border focus:border-foreground text-center focus:outline-none w-48 md:w-64 transition-colors placeholder-muted-foreground/30 text-foreground"
                  placeholder="your name"
                />
                . I'm looking to explore{' '}
                <select
                  name="trip"
                  value={formData.trip}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b-2 border-border focus:border-foreground text-center focus:outline-none w-auto transition-colors appearance-none cursor-pointer text-foreground"
                >
                  <option value="" disabled>select a region...</option>
                  <option value="Spiti">Spiti Valley</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Zanskar">Zanskar</option>
                  <option value="Custom">Somewhere else</option>
                </select>
                {' '}in{' '}
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b-2 border-border focus:border-foreground text-center focus:outline-none w-auto transition-colors appearance-none cursor-pointer text-foreground"
                >
                  <option value="" disabled>select a season...</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                </select>
                . I'd love to chat more at{' '}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b-2 border-border focus:border-foreground text-center focus:outline-none w-64 transition-colors placeholder-muted-foreground/30 text-foreground"
                  placeholder="your@email.com"
                />
                .
              </div>

              <div className="flex flex-col items-center gap-8 mt-16">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  className="px-12 py-5 bg-stark-dark text-stark-dark-foreground font-sans uppercase tracking-[0.2em] text-sm hover:bg-stark-dark/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-stark-dark"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-stark-dark-foreground border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </span>
                  ) : (
                    'Send the Signal'
                  )}
                </motion.button>

                <p className="text-sm text-muted-foreground font-sans tracking-wide">
                  Reply expected within 24 hours (depending on mountain cell service).
                </p>
              </div>
            </form>
          ) : (
            <motion.div
              className="bg-card border border-border rounded p-12 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Your message reached us.
              </h2>
              <p className="text-secondary text-lg mb-8">
                We'll get back to you soon.
              </p>
              <p className="text-secondary italic">
                Probably after finishing a cup of tea somewhere in the mountains.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Contact Info */}
      <section className="py-20 md:py-32 px-6 bg-background">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
            Other ways to reach us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Email',
                content: 'contact@etherealjourney.com',
                icon: '✉',
              },
              {
                title: 'Phone',
                content: '+91 98765 43210',
                icon: '☎',
              },
              {
                title: 'Response Time',
                content: 'Within 24 hours',
                icon: '⏱',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-8 bg-muted/5 border border-border rounded text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-secondary">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
