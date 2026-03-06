'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { useInView } from 'react-intersection-observer'

export default function AboutPage() {
  const { ref: originRef, inView: originInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const values = [
    {
      title: 'Respect',
      description: 'We work with locals. Not around them.',
    },
    {
      title: 'Experience',
      description: 'Ten years on these roads teaches things Google never will.',
    },
    {
      title: 'Patience',
      description: 'The mountains move at their own pace. So do we.',
    },
  ]

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">
            We believe the Himalayas are not a product.
          </h1>
          <p className="text-3xl text-secondary font-light">
            They are a relationship.
          </p>
        </motion.div>
      </section>

      {/* Origin Story */}
      <section ref={originRef} className="py-20 md:py-32 px-6 bg-muted/5">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={originInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12">
            The Origin
          </h2>

          <div className="space-y-6 text-lg text-secondary leading-relaxed">
            <p>
              There was no grand business plan.
            </p>
            <p>
              No startup pitch deck.
            </p>
            <p>
              Just a bike, a road, and the mountains.
            </p>
            <p>
              The first ride changed everything.
            </p>
            <p>
              One trip became ten.
              <br />
              Ten became years.
            </p>
            <p>
              And slowly something became clear.
            </p>
            <p className="font-semibold text-foreground">
              The Himalayas were being turned into content.
            </p>
            <p>
              Checklists.
              <br />
              Packages.
              <br />
              "Top 10 spots for Instagram".
            </p>
            <p>
              But the mountains deserved better.
            </p>
            <p className="font-semibold text-foreground">
              So we kept riding.
              <br />
              And we kept learning.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Enemy Section */}
      <section className="py-32 md:py-48 px-6 bg-background">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-display leading-tight text-foreground mb-16">
            The Enemy
          </h2>
          <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
            <p className="text-foreground">
              Somewhere along the way, something funny happened.
            </p>
            <p className="text-2xl md:text-3xl font-display text-foreground border-l-4 border-accent pl-8 py-6">
              People who had never spent a winter here started selling "expert Himalayan expeditions".
            </p>
            <p>
              Apparently discovering a route on Google Maps makes you a mountain guide now.
            </p>
            <p className="text-foreground font-semibold italic">
              Good to know.
            </p>
            <p>
              Meanwhile the locals watched quietly.
            </p>
            <div className="space-y-3 text-lg">
              <p>We saw operators arrive, sell trips, disappear.</p>
              <p>We saw villages treated like photo backdrops.</p>
              <p>We saw the mountains reduced to travel reels.</p>
            </div>
            <p className="pt-6 border-t border-border/50 text-foreground">
              And every time it happened we reminded ourselves why we do this.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-32 md:py-48 px-6 bg-background">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-display leading-tight text-foreground mb-24">
            What We Stand For
          </h2>

          <motion.div
            className="space-y-24"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border-l-4 border-accent pl-8"
              >
                <h3 className="text-3xl font-display font-semibold text-foreground mb-6">
                  {value.title} Comes First
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center text-muted-foreground text-sm italic mt-24 pt-16 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            We've seen companies discover Spiti last year and somehow become "experts" by summer.
          </motion.p>
        </motion.div>
      </section>

      {/* War Cry */}
      <section className="py-20 md:py-32 px-6 bg-foreground text-background">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8">
            We don't sell the Himalayas.
          </h2>
          <p className="text-2xl text-background/90">
            We guide people through them.
          </p>
        </motion.div>
      </section>

      {/* Who We Fight For */}
      <section className="py-20 md:py-32 px-6 bg-background">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Who We Fight For
          </h2>
          <div className="space-y-4 text-lg text-secondary leading-relaxed">
            <p>
              <span className="font-semibold text-foreground">You.</span>
            </p>
            <p>
              The traveler who doesn't want a packaged experience.
            </p>
            <p>
              The rider who wants to feel the road.
            </p>
            <p>
              The explorer who knows the best moments aren't planned.
            </p>
            <p className="pt-4 font-semibold text-foreground text-xl">
              If that sounds like you…
            </p>
            <p className="text-xl text-accent font-semibold">
              You're exactly why we built this.
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
