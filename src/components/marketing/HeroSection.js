'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const SCORES = [
  { label: 'Business', value: 87, delta: '+12%', color: 'text-brand-violet' },
  { label: 'Brand',    value: 92, delta: '+8%',  color: 'text-brand-cyan'   },
  { label: 'Content',  value: 74, delta: '+21%', color: 'text-ok'           },
  { label: 'Audience', value: 89, delta: '+5%',  color: 'text-brand-gold'   },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-surface-0">

      {/* Dot grid — pointer-events-none so it never blocks clicks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Glow blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-violet/10 blur-3xl" />
        <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/6 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-24 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-edge bg-surface-2 text-xs text-ink mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse-slow" />
          AI analysis in under 60 seconds
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-hero font-extrabold text-ink-bright tracking-tight mb-6"
          style={{ lineHeight: 0.95 }}
        >
          Know your growth.
          <br />
          <span className="bg-gradient-to-r from-brand-violet via-brand-violet2 to-brand-cyan bg-clip-text text-transparent">
            Act on it faster.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lead text-ink max-w-[540px] mx-auto mb-10"
        >
          Connect Instagram, YouTube, or Facebook. Our AI audits your entire social
          presence and hands you a 90-day growth roadmap.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-pill bg-brand-gold text-surface-0 font-semibold text-sm hover:bg-brand-gold2 transition-all shadow-glow-gold hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            Start free audit
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-pill border border-edge text-sm text-ink hover:border-edge-bright transition-all w-full sm:w-auto justify-center"
          >
            See how it works
          </a>
        </motion.div>

        {/* Score cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[580px] mx-auto"
        >
          {SCORES.map(({ label, value, delta, color }) => (
            <div
              key={label}
              className="flex flex-col gap-1 bg-surface-2 border border-edge rounded-xl px-4 py-3.5 shadow-card"
            >
              <span className="text-xs text-ink-muted">{label}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl font-bold text-ink-bright">{value}</span>
                <span className={`text-xs font-semibold ${color}`}>{delta}</span>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-xs text-ink-muted"
        >
          No credit card required &nbsp;·&nbsp; Free during beta
        </motion.p>
      </div>
    </section>
  )
}
