'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { fadeInRise, premiumEasing } from '@/lib/animations'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

type BookingForm = {
    name: string
    email: string
    phone: string
    travel_date: string
    group_size: number
    duration_days: number
    special_requests: string
}

function BookingPageContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const type = searchParams.get('type') || 'trip'
    const itemId = searchParams.get('id') || '1'
    const itemName = searchParams.get('name') || 'Himalayan Experience'
    const priceParam = searchParams.get('price') || '0'

    const [submitting, setSubmitting] = useState(false)
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

    const handleSubmitApplication = async (e: React.FormEvent) => {
        e.preventDefault()
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

        setSubmitting(false)

        if (data) {
            router.push(`/book/success?id=${data.id}&name=${encodeURIComponent(form.name)}&item=${encodeURIComponent(itemName)}`)
        } else {
            console.error('Booking error:', error)
            alert('Something went wrong. Please try again or contact us via WhatsApp.')
        }
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

                        {/* Pricing summary */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-border/50 p-6 space-y-4">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-secondary">Estimated Summary</p>
                            <div className="space-y-3 text-sm">
                                {[
                                    ['Traveller', form.name || '—'],
                                    ['Phone', form.phone || '—'],
                                    ['Email', form.email || '—'],
                                    ['Travel Date', form.travel_date || '—'],
                                    type === 'rental' ? ['Duration', `${form.duration_days} days`] : ['Group Size', `${form.group_size} people`],
                                ].map(([label, val]) => (
                                    <div key={label} className="flex justify-between border-b border-border/30 pb-2">
                                        <span className="text-secondary">{label}</span>
                                        <span className="text-foreground">{val}</span>
                                    </div>
                                ))}
                                <div className="flex justify-between pt-2">
                                    <span className="font-medium text-foreground">Total Estimate</span>
                                    <span className="font-display text-xl text-foreground">₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right — Single Application Form */}
                    <div className="min-h-[500px]">
                        <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: premiumEasing }}>
                            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">Application Details</h2>
                            <form onSubmit={handleSubmitApplication} className="space-y-6">
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

                                <button type="submit" disabled={submitting} className="w-full flex items-center justify-between px-6 py-4 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all duration-500 text-[11px] uppercase tracking-[0.3em] mt-8 disabled:opacity-50">
                                    {submitting ? 'Submitting Application...' : 'Submit Application'} <ArrowRight size={14} />
                                </button>
                                <p className="text-secondary text-xs text-center mt-4 tracking-wide">
                                    No payment is required to submit. We review all applications manually.
                                </p>
                            </form>
                        </motion.div>
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
