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
    phone: '',
    location: '',
    trip: '',
    message: '',
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
      phone: '',
      location: '',
      trip: '',
      message: '',
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded text-foreground placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="Enter your name"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded text-foreground placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="your@email.com"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-border rounded text-foreground placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="+91 98765 43210"
                />
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  Where are you traveling from?
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-border rounded text-foreground placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="City, Country"
                />
              </motion.div>

              {/* Trip Interest */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  Which journey interests you?
                </label>
                <select
                  name="trip"
                  value={formData.trip}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-card border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                >
                  <option value="">Select a trip...</option>
                  <option value="Spiti Valley Expedition">Spiti Valley Expedition</option>
                  <option value="Ladakh Motorcycle Journey">Ladakh Motorcycle Journey</option>
                  <option value="Zanskar Discovery">Zanskar Discovery</option>
                  <option value="Custom Journey">Something Custom</option>
                </select>
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                <label className="block text-sm font-medium text-foreground mb-3">
                  Tell us about your journey
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-card border border-border rounded text-foreground placeholder-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                  placeholder="What kind of experience are you looking for? Any specific dates or concerns?"
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className="w-full px-8 py-4 bg-accent text-accent-foreground font-semibold rounded text-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin"></span>
                    Sending...
                  </span>
                ) : (
                  'Send the Signal'
                )}
              </motion.button>
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
