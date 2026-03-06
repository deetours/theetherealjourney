'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { fadeInRise, premiumEasing } from '@/lib/animations'
import { supabase } from '@/lib/supabase'
import { ArrowRight, Send, MessageCircle } from 'lucide-react'

type Message = {
    id: string
    role: 'user' | 'assistant'
    content: string
}

type TripOrRental = {
    id: number
    title?: string
    name?: string
    description: string
    difficulty?: string
    duration?: string
    altitude?: string
    price?: number
    price_per_day?: number
    type?: string
    cc?: string
}

function cleanContent(text: string) {
    // Remove the lead capture JSON from displayed text
    return text.replace(/\{"action":"capture_lead"[^}]*\}/g, '').trim()
}

function InquireContent() {
    const searchParams = useSearchParams()
    const tripId = searchParams.get('trip')
    const rentalId = searchParams.get('rental')
    const type = tripId ? 'trip' : 'rental'
    const itemId = tripId || rentalId

    const [item, setItem] = useState<TripOrRental | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Fetch item details from Supabase
    useEffect(() => {
        async function fetchItem() {
            if (!itemId) return
            const table = type === 'trip' ? 'trips' : 'rentals'
            const { data } = await supabase.from(table).select('*').eq('id', itemId).single()
            if (data) setItem(data)
        }
        fetchItem()
    }, [itemId, type])

    // Auto-open chat after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => setChatOpen(true), 3000)
        return () => clearTimeout(timer)
    }, [])

    // Set initial greeting
    useEffect(() => {
        const greeting: Message = {
            id: 'greeting',
            role: 'assistant',
            content: item
                ? `Namaste 🙏\n\nI'm Tej, your guide to The Ethereal Journey.\n\nI see you're interested in **${item.title || item.name}** — a great choice. Want me to walk you through the experience, answer questions about what to expect, or help you figure out if this is the right fit for you?`
                : `Namaste 🙏\n\nI'm Tej, your guide to The Ethereal Journey.\n\nWhether you're looking for a guided expedition, a self-ride adventure, or just want to know which route is right for you — I'm here.\n\nWhat brings you to the Himalayas?`
        }
        setMessages([greeting])
    }, [item])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async () => {
        if (!input.trim() || loading) return

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input }
        const newMessages = [...messages, userMessage]
        setMessages(newMessages)
        setInput('')
        setLoading(true)

        const assistantMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' }
        setMessages(prev => [...prev, assistantMessage])

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.map(m => ({ role: m.role, content: m.content })),
                    interest: item?.title || item?.name || null,
                }),
            })

            if (!response.body) return
            const reader = response.body.getReader()
            const decoder = new TextDecoder()
            let fullText = ''

            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const chunk = decoder.decode(value)
                // Parse Vercel AI SDK data stream
                const lines = chunk.split('\n')
                for (const line of lines) {
                    if (line.startsWith('0:')) {
                        try {
                            const text = JSON.parse(line.slice(2))
                            fullText += text
                            setMessages(prev => prev.map(m => m.id === assistantMessage.id ? { ...m, content: fullText } : m))
                        } catch { }
                    }
                }
            }
        } catch (err) {
            setMessages(prev => prev.map(m => m.id === assistantMessage.id
                ? { ...m, content: "I'm having trouble connecting right now. Please try again or reach us on WhatsApp." }
                : m))
        }
        setLoading(false)
    }

    const displayName = item?.title || item?.name || 'The Ethereal Journey'
    const bookLink = item
        ? `/book?type=${type}&id=${item.id}&name=${encodeURIComponent(displayName)}&price=${item.price || item.price_per_day || 0}`
        : '/trips'

    return (
        <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
            <Navigation />

            {/* Hero + Details Section */}
            <section className="pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left: Item Details */}
                        <motion.div initial="hidden" animate="visible" variants={fadeInRise}>
                            <span className="text-[10px] uppercase tracking-[0.5em] text-secondary block mb-6">
                                {type === 'trip' ? 'Expedition' : 'Rental'} · Inquiry
                            </span>

                            {item ? (
                                <>
                                    <h1 className="font-display text-foreground leading-none mb-8">{displayName}</h1>

                                    {/* Stats bar */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-px border border-border/30 mb-12">
                                        {type === 'trip' && item.duration && (
                                            <div className="p-4 border-r border-border/30">
                                                <p className="text-[9px] uppercase tracking-[0.3em] text-secondary mb-1">Duration</p>
                                                <p className="text-sm text-foreground">{item.duration}</p>
                                            </div>
                                        )}
                                        {type === 'trip' && item.altitude && (
                                            <div className="p-4 border-r border-border/30">
                                                <p className="text-[9px] uppercase tracking-[0.3em] text-secondary mb-1">Max Altitude</p>
                                                <p className="text-sm text-foreground">{item.altitude}</p>
                                            </div>
                                        )}
                                        {type === 'trip' && item.difficulty && (
                                            <div className="p-4">
                                                <p className="text-[9px] uppercase tracking-[0.3em] text-secondary mb-1">Difficulty</p>
                                                <p className="text-sm text-foreground">{item.difficulty}</p>
                                            </div>
                                        )}
                                        {type === 'rental' && item.cc && (
                                            <div className="p-4 border-r border-border/30">
                                                <p className="text-[9px] uppercase tracking-[0.3em] text-secondary mb-1">Engine</p>
                                                <p className="text-sm text-foreground">{item.cc}</p>
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <p className="text-[9px] uppercase tracking-[0.3em] text-secondary mb-1">Starting From</p>
                                            <p className="text-sm text-foreground">₹{(item.price || item.price_per_day)?.toLocaleString()}{type === 'rental' ? '/day' : ''}</p>
                                        </div>
                                    </div>

                                    <p className="text-secondary leading-relaxed text-lg mb-12">{item.description}</p>
                                </>
                            ) : (
                                <>
                                    <h1 className="font-display text-foreground leading-none mb-8">Plan Your<br />Himalayan<br />Adventure.</h1>
                                    <p className="text-secondary leading-relaxed text-lg mb-12">
                                        Talk to Tej — our AI guide who knows every pass, monastery, and glacier by heart. Get personalized recommendations and answers to every question before you book.
                                    </p>
                                </>
                            )}

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href={bookLink}
                                    className="group flex items-center gap-4 border border-foreground px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-foreground hover:bg-foreground hover:text-background transition-all duration-500">
                                    Book Now <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button onClick={() => setChatOpen(true)}
                                    className="flex items-center gap-4 border border-border/50 px-8 py-4 text-[10px] uppercase tracking-[0.3em] text-secondary hover:border-foreground hover:text-foreground transition-all duration-500">
                                    <MessageCircle size={12} /> Ask Tej
                                </button>
                            </div>
                        </motion.div>

                        {/* Right: Chat Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: chatOpen ? 1 : 0.4, y: 0 }}
                            transition={{ duration: 1, ease: premiumEasing, delay: 0.3 }}
                            className="lg:sticky lg:top-32"
                        >
                            <div className="border border-border/50 flex flex-col h-[600px]">
                                {/* Chat header */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-foreground flex items-center justify-center text-background text-xs font-display">T</div>
                                        <div>
                                            <p className="text-xs font-medium">Tej</p>
                                            <p className="text-[9px] text-secondary uppercase tracking-widest">AI Travel Advisor</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                                        <span className="text-[9px] text-secondary uppercase tracking-widest">Online</span>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                                    <AnimatePresence initial={false}>
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, ease: premiumEasing }}
                                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user'
                                                    ? 'bg-foreground text-background'
                                                    : 'bg-muted/30 text-foreground border border-border/30'
                                                    }`}>
                                                    {msg.role === 'assistant' ? cleanContent(msg.content) : msg.content}
                                                    {loading && msg.role === 'assistant' && msg.content === '' && (
                                                        <span className="inline-flex gap-1">
                                                            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                            <span className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                                        </span>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <div className="border-t border-border/50 px-4 py-4 flex gap-3">
                                    <input
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                        placeholder="Ask anything about this trip..."
                                        className="flex-1 bg-transparent border border-border/50 px-4 py-2.5 text-sm text-foreground placeholder:text-secondary/50 focus:outline-none focus:border-foreground transition-colors"
                                    />
                                    <button onClick={sendMessage} disabled={loading || !input.trim()}
                                        className="px-4 py-2.5 bg-foreground text-background hover:bg-secondary transition-colors disabled:opacity-40">
                                        <Send size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* WhatsApp fallback */}
                            <p className="text-[10px] text-secondary text-center mt-4 tracking-widest uppercase">
                                Prefer talking to a human?{' '}
                                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 hover:text-accent transition-colors">
                                    WhatsApp Us →
                                </a>
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Floating chat button (mobile) */}
            {!chatOpen && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 }}
                    onClick={() => setChatOpen(true)}
                    className="fixed bottom-8 right-6 z-50 flex items-center gap-2 bg-foreground text-background px-5 py-3 text-[10px] uppercase tracking-[0.2em] shadow-lg lg:hidden"
                >
                    <MessageCircle size={14} /> Ask Tej
                </motion.button>
            )}

            <Footer />
        </div>
    )
}

export default function InquirePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p className="text-secondary text-sm tracking-widest uppercase animate-pulse">Loading...</p></div>}>
            <InquireContent />
        </Suspense>
    )
}
