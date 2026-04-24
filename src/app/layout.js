import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Social AI — AI Business Growth & Social Intelligence',
    template: '%s | Social AI',
  },
  description: 'Connect your social accounts. Get an AI-powered audit of your brand, content, and growth — in 60 seconds.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans bg-bg-primary text-content-primary antialiased">
        {children}
      </body>
    </html>
  )
}
