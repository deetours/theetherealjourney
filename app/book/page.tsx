'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { fadeInRise, premiumEasing } from '@/lib/animations'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, ArrowRight, Check, Copy } from 'lucide-react'

type BookingForm = {
    name: string
    email: string
    phone: string
    travel_date: string
    group_size: number
    duration_days: number
    special_requests: string
}

const UPI_ID = 'theetherealjourney@upi' // Replace with real UPI ID
const WHATSAPP_NUMBER = '919876543210' // Replace with real WhatsApp number

function BookingPageContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const type = searchParams.get('type') || 'trip'
    const itemId = searchParams.get('id') || '1'
    const itemName = searchParams.get('name') || 'Himalayan Experience'
    const priceParam = searchParams.get('price') || '0'

    const [step, setStep] = useState(1)
    const [submitting, setSubmitting] = useState(false)
    const [bookingId, setBookingId] = useState('')
    const [copied, setCopied] = useState(false)
    const [form, setForm] = useState<BookingForm>({
        name: '',
        email: '',
        phone: '',
        travel_date: '',
        group_size: 1,
        duration_days: type === 'rental' ? 3 : 1,
        special_requests: '',
    })

    const basePrice = parseInt(priceParam)
    const totalAmount = type === 'rental'
        ? basePrice * form.duration_days
        : basePrice

    const updateForm = (key: keyof BookingForm, value: string | number) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmitDetails = (e: React.FormEvent) => {
        e.preventDefault()
        setStep(2)
    }

    const handleConfirmBooking = async () => {
        setSubmitting(true)
        const { data, error } = await supabase.from('bookings').insert([{
            type,
            item_id: parseInt(itemId),
            item_name: itemName,
            customer_name: form.name,
            customer_email: form.email,
            customer_phone: form.phone,
            travel_date: form.travel_date,
            group_size: form.group_size,
            duration_days: form.duration_days,
            special_requests: form.special_requests,
            total_amount: totalAmount,
            payment_status: 'pending',
            source: 'website',
        }]).select().single()

        if (data) {
            setBookingId(data.id)
            setStep(3)
        } else {
            console.error('Booking error:', error)
            alert('Something went wrong. Please try again or contact us on WhatsApp.')
        }
        setSubmitting(false)
    }

    const handlePaymentDone = async () => {
        router.push(`/book/success?id=${bookingId}&name=${encodeURIComponent(form.name)}&item=${encodeURIComponent(itemName)}`)
    }

    const copyUPI = () => {
        navigator.clipboard.writeText(UPI_ID)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const stepVariants = {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: premiumEasing } },
        exit: { opacity: 0, x: -60, transition: { duration: 0.4 } },
    }

    return (
        <div className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
            <Navigation />

            <div className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
                {/* Back link */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-12">
                    <Link href={type === 'rental' ? '/rentals' : '/trips'} className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-secondary hover:text-foreground transition-colors">
                        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Back to {type === 'rental' ? 'Rentals' : 'Trips'}
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left — Item Summary */}
                    <motion.div initial="hidden" animate="visible" variants={fadeInRise} className="lg:sticky lg:top-32">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-secondary block mb-6">
                            {type === 'rental' ? 'Rental Booking' : 'Trip Booking'}
                        </span>
                        <h1 className="font-display text-foreground leading-tight mb-8">{itemName}</h1>

                        {/* Progress steps */}
                        <div className="flex items-center gap-0 mb-12">
                            {['Details', 'Review', 'Payment'].map((label, i) => (
                                <div key={label} className="flex items-center">
                                    <div className={`flex items-center gap-2 transition-all duration-500 ${step > i + 1 ? 'text-foreground' : step === i + 1 ? 'text-foreground' : 'text-border'}`}>
                                        <div className={`w-6 h-6 flex items-center justify-center border text-[10px] transition-all duration-500 ${step > i + 1 ? 'bg-foreground text-background border-foreground' : step === i + 1 ? 'border-foreground text-foreground' : 'border-border text-border'}`}>
                                            {step > i + 1 ? <Check size={10} /> : i + 1}
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] hidden md:block">{label}</span>
                                    </div>
                                    {i < 2 && <div className={`w-8 md:w-16 h-[1px] mx-2 md:mx-3 transition-all duration-700 ${step > i + 1 ? 'bg-foreground' : 'bg-border'}`} />}
                                </div>
                            ))}
                        </div>

                        {/* Pricing summary */}
                        {step >= 2 && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-border/50 p-6 space-y-4">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-secondary">Booking Summary</p>
                                <div className="space-y-3 text-sm">
                                    {[
                                        ['Traveller', form.name],
                                        ['Phone', form.phone],
                                        ['Email', form.email],
                                        ['Travel Date', form.travel_date],
                                        type === 'rental' ? ['Duration', `${form.duration_days} days`] : ['Group Size', `${form.group_size} people`],
                                    ].map(([label, val]) => (
                                        <div key={label} className="flex justify-between border-b border-border/30 pb-2">
                                            <span className="text-secondary">{label}</span>
                                            <span className="text-foreground">{val}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between pt-2">
                                        <span className="font-medium text-foreground">Total Amount</span>
                                        <span className="font-display text-xl text-foreground">₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right — Steps */}
                    <div className="min-h-[500px]">
                        <AnimatePresence mode="wait">

                            {/* Step 1: Details */}
                            {step === 1 && (
                                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">Your Details</h2>
                                    <form onSubmit={handleSubmitDetails} className="space-y-6">
                                        {[
                                            { key: 'name', label: 'Full Name', type: 'text', placeholder: 'As on ID proof' },
                                            { key: 'email', label: 'Email Address', type: 'email', placeholder: 'For confirmation' },
                                            { key: 'phone', label: 'WhatsApp Number', type: 'tel', placeholder: '+91 98765 43210' },
                                            { key: 'travel_date', label: 'Travel Date', type: 'date', placeholder: '' },
                                        ].map(field => (
                                            <div key={field.key}>
                                                <label className="text-[10px] uppercase tracking-[0.3em] text-secondary block mb-2">{field.label}</label>
                                                <input
                                                    type={field.type}
                                                    required
                                                    placeholder={field.placeholder}
                                                    value={(form as any)[field.key]}
                                                    onChange={e => updateForm(field.key as keyof BookingForm, e.target.value)}
                                                    className="w-full bg-transparent border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-secondary/50 focus:outline-none focus:border-foreground transition-colors"
                                                />
                                            </div>
                                        ))}

                                        {type === 'rental' ? (
                                            <div>
                                                <label className="text-[10px] uppercase tracking-[0.3em] text-secondary block mb-2">Duration (days)</label>
                                                <input type="number" min={1} max={30} required value={form.duration_days}
                                                    onChange={e => updateForm('duration_days', parseInt(e.target.value))}
                                                    className="w-full bg-transparent border border-border/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="text-[10px] uppercase tracking-[0.3em] text-secondary block mb-2">Group Size</label>
                                                <select value={form.group_size} onChange={e => updateForm('group_size', parseInt(e.target.value))}
                                                    className="w-full bg-background border border-border/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-foreground transition-colors">
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>)}
                                                </select>
                                            </div>
                                        )}

                                        <div>
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-secondary block mb-2">Special Requests (optional)</label>
                                            <textarea rows={3} placeholder="Dietary requirements, medical conditions, bike preference..."
                                                value={form.special_requests} onChange={e => updateForm('special_requests', e.target.value)}
                                                className="w-full bg-transparent border border-border/50 px-4 py-3 text-sm text-foreground placeholder:text-secondary/50 focus:outline-none focus:border-foreground transition-colors resize-none"
                                            />
                                        </div>

                                        <button type="submit" className="w-full flex items-center justify-between px-6 py-4 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all duration-500 text-[11px] uppercase tracking-[0.3em]">
                                            Review Booking <ArrowRight size={14} />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* Step 2: Review */}
                            {step === 2 && (
                                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">Confirm Details</h2>
                                    <p className="text-secondary text-sm leading-relaxed mb-10">
                                        Please review your booking carefully. Once confirmed, you'll proceed to payment and our team will reach out within 2 hours.
                                    </p>

                                    <div className="border border-border/50 p-6 mb-8">
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">What's Included</p>
                                        <ul className="space-y-2 text-sm text-secondary">
                                            {type === 'trip' ? [
                                                'Professional mountain guide',
                                                'All accommodation on route',
                                                'Breakfast & dinner daily',
                                                'Emergency support & first aid',
                                                'All entrance fees',
                                            ] : [
                                                'Fuelled and serviced vehicle',
                                                'Emergency roadside support',
                                                'Basic first aid kit',
                                                'Helmets (for bikes)',
                                                'Pickup from Manali hub',
                                            ].map(item => (
                                                <li key={item} className="flex items-center gap-3">
                                                    <Check size={12} className="text-foreground shrink-0" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="space-y-3">
                                        <button onClick={handleConfirmBooking} disabled={submitting}
                                            className="w-full flex items-center justify-between px-6 py-4 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all duration-500 text-[11px] uppercase tracking-[0.3em] disabled:opacity-50">
                                            {submitting ? 'Confirming...' : 'Confirm & Proceed to Payment'} <ArrowRight size={14} />
                                        </button>
                                        <button onClick={() => setStep(1)} className="w-full px-6 py-3 border border-border/50 text-secondary hover:border-foreground hover:text-foreground transition-all duration-500 text-[10px] uppercase tracking-[0.3em]">
                                            ← Edit Details
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: UPI Payment */}
                            {step === 3 && (
                                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                                    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">Complete Payment</h2>
                                    <p className="text-secondary text-sm mb-10 leading-relaxed">
                                        Transfer the amount via UPI and click "I've Paid" below. Our team will confirm your booking within 2 hours.
                                    </p>

                                    {/* Amount */}
                                    <div className="border border-border/50 p-8 mb-8 text-center">
                                        <p className="text-[10px] uppercase tracking-[0.4em] text-secondary mb-3">Amount to Pay</p>
                                        <p className="font-display text-5xl text-foreground mb-1">₹{totalAmount.toLocaleString()}</p>
                                        <p className="text-xs text-secondary">{itemName}</p>
                                    </div>

                                    {/* UPI Details */}
                                    <div className="border border-border/50 p-6 mb-6 space-y-6">
                                        {/* QR Placeholder */}
                                        <div className="flex justify-center">
                                            <div className="w-36 h-36 border border-border/50 flex items-center justify-center bg-muted/20">
                                                <div className="text-center">
                                                    <p className="text-4xl mb-1">📱</p>
                                                    <p className="text-[9px] text-secondary uppercase tracking-widest">UPI QR</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* UPI ID */}
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">UPI ID</p>
                                            <div className="flex items-center justify-between border border-border/50 px-4 py-3">
                                                <span className="text-sm font-mono text-foreground">{UPI_ID}</span>
                                                <button onClick={copyUPI} className="text-secondary hover:text-foreground transition-colors">
                                                    {copied ? <Check size={14} /> : <Copy size={14} />}
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-secondary mt-2">Accepted: PhonePe · GPay · Paytm · BHIM</p>
                                        </div>

                                        {/* Reference */}
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">Payment Reference (Add in notes)</p>
                                            <div className="border border-border/50 px-4 py-3">
                                                <span className="text-sm font-mono text-foreground">{bookingId.slice(0, 8).toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <button onClick={handlePaymentDone}
                                            className="w-full flex items-center justify-between px-6 py-4 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all duration-500 text-[11px] uppercase tracking-[0.3em]">
                                            I've Paid — Confirm Booking <Check size={14} />
                                        </button>
                                        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I've%20made%20a%20payment%20for%20Booking%20ID%3A%20${bookingId.slice(0, 8).toUpperCase()}%20for%20${encodeURIComponent(itemName)}`}
                                            target="_blank" rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-border/50 text-secondary hover:border-foreground hover:text-foreground transition-all duration-500 text-[10px] uppercase tracking-[0.3em]">
                                            💬 Confirm via WhatsApp
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default function BookPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><p className="text-secondary text-sm tracking-widest uppercase animate-pulse">Loading...</p></div>}>
            <BookingPageContent />
        </Suspense>
    )
}
