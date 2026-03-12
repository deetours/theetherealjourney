'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from '@/components/navigation'
import { premiumEasing } from '@/lib/animations'

const QUESTIONS = [
  { id: 'name', label: "Identify yourself.", placeholder: "Enter your name..." },
  { id: 'destination', label: "Where are we riding?", placeholder: "Spiti, Ladakh, Zanskar, etc..." },
  { id: 'timeline', label: "When do we launch?", placeholder: "Month or exact dates..." },
  { id: 'email', label: "Provide coordinates.", placeholder: "Enter your email address..." }
]

export default function ContactPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [currentInput, setCurrentInput] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto focus input on step change
  useEffect(() => {
    if (inputRef.current) {
        inputRef.current.focus()
    }
  }, [step])

  const handleNext = () => {
    if (!currentInput.trim()) return

    const newAnswers = { ...answers, [QUESTIONS[step].id]: currentInput }
    setAnswers(newAnswers)
    setCurrentInput('')

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      submitForm(newAnswers)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNext()
    }
  }

  const submitForm = async (finalAnswers: Record<string, string>) => {
    setIsSubmitted(true)
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1500))
    console.log("Transmission sent: ", finalAnswers)
  }

  return (
    <div className="min-h-screen bg-stark-dark text-stark-dark-foreground antialiased flex flex-col justify-center relative overflow-hidden">
      <Navigation />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-6">
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: premiumEasing }}
            >
              <div className="mb-16">
                <span className="text-[10px] uppercase tracking-[0.4em] text-stark-dark-foreground/40 block mb-6">
                  Terminal Protocol {step + 1} / {QUESTIONS.length}
                </span>
                
                <AnimatePresence mode="wait">
                    <motion.h1 
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-display leading-tight"
                    >
                        {QUESTIONS[step].label}
                    </motion.h1>
                </AnimatePresence>
              </div>

              <div className="relative flex items-center">
                <span className="text-accent text-2xl mr-6 block font-mono">{'>'}</span>
                <input
                  ref={inputRef}
                  type={QUESTIONS[step].id === 'email' ? 'email' : 'text'}
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={QUESTIONS[step].placeholder}
                  className="w-full bg-transparent border-none outline-none text-2xl md:text-4xl font-light text-stark-dark-foreground placeholder:text-stark-dark-foreground/20"
                  autoComplete="off"
                  autoFocus
                />
              </div>

              <div className="mt-16 flex items-center gap-8 border-t border-stark-dark-foreground/10 pt-8">
                 <button 
                   onClick={handleNext}
                   disabled={!currentInput.trim()}
                   className="text-xs uppercase tracking-[0.2em] bg-white text-black px-8 py-4 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent hover:text-white transition-colors duration-300"
                 >
                    {step === QUESTIONS.length - 1 ? 'Transmit' : 'Enter'}
                 </button>
                 <span className="text-stark-dark-foreground/40 text-sm">Press Enter to continue</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: premiumEasing }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-accent text-accent mb-8">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h1 className="text-4xl md:text-6xl font-display leading-tight mb-6">
                Coordinates Logged.
              </h1>
              <p className="text-xl text-stark-dark-foreground/60 max-w-2xl mx-auto">
                Your transmission has hit the mountain. We'll find you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Atmospheric Background Noise */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
    </div>
  )
}
