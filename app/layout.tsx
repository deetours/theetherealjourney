import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CustomCursor } from '@/components/custom-cursor'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-display',
  weight: ['400', '500', '600', '700']
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'The Ethereal Journey | Himalayan Expeditions',
  description: 'Experience true Himalayan journeys with expert guides. Spiti, Ladakh, Zanskar expeditions for riders, trekkers, and explorers.',
  keywords: 'Himalayan expeditions, Spiti Valley, Ladakh motorcycle journey, mountain travel, adventure',
  openGraph: {
    title: 'The Ethereal Journey',
    description: 'Experience true Himalayan journeys with expert guides',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0F1C2E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
