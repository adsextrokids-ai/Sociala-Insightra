'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const SCORES = [
  { label: 'Business',  value: 87, delta: '+12%', color: 'text-brand-violet' },
  { label: 'Brand',     value: 92, delta: '+8%',  color: 'text-brand-cyan'   },
  { label: 'Content',   value: 74, delta: '+21%', color: 'text-ok'           },
  { label: 'Audience',  value: 89, delta: '+5%',  color: 'text-brand-gold'   },
]

function ScoreCard({ label, value, delta, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-1 bg-surface-2 border border-edge-subtle rounded-xl px-5 py-4 shadow-card"
    >
      <span className="text-xs text-ink-muted">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className={`font-display text-2xl font-bold text-ink-bright`}>{value}</span>
        <span className={`text-xs font-semibold ${color}`}>{delta}</span>
      </div>
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-surface-0">

      {/* Background grid */}
      <div aria-hidden className="absolute inset-0 bg-grid bg-[length:48px_48px] opacity-100 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />

      {/* Glow blobs */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-violet/10 blur-3xl" />
        <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/6 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-20 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-edge bg-surface-2 text-xs text-ink-muted mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse-slow" />
          AI analysis in under 60 seconds
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-hero font-extrabold text-ink-bright leading-[0.95] tracking-tight mb-6 [text-wrap:balance]"
        >
          Know your growth.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-violet via-brand-violet2 to-brand-cyan">
            Act on it faster.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lead text-ink max-w-[560px] mx-auto mb-10"
        >
          Connect Instagram, YouTube, or Facebook. Our AI audits your entire
          social presence and hands you a 90-day growth roadmap.
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
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-pill border border-edge text-sm text-ink-muted hover:text-ink hover:border-edge-bright transition-all w-full sm:w-auto justify-center"
          >
            See how it works
          </a>
        </motion.div>

        {/* Score cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[600px] mx-auto"
        >
          {SCORES.map((s, i) => (
            <ScoreCard key={s.label} {...s} delay={0.5 + i * 0.06} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-xs text-ink-ghost"
        >
          No credit card required &nbsp;·&nbsp; Free during beta
        </motion.p>
      </div>
    </section>
  )
}
