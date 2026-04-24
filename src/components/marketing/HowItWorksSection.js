'use client'

import { motion } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Connect your accounts',
    body: 'Link Instagram, YouTube, or Facebook in one click. We handle OAuth — you never share your password.',
    color: 'text-brand-violet',
    border: 'border-brand-violet/30',
    bg: 'bg-brand-violet/8',
  },
  {
    number: '02',
    title: 'AI scans everything',
    body: 'Our engine reads your profile, posts, engagement patterns, branding, and audience signals.',
    color: 'text-brand-cyan',
    border: 'border-brand-cyan/30',
    bg: 'bg-brand-cyan/8',
  },
  {
    number: '03',
    title: 'Get your growth plan',
    body: 'A detailed intelligence report with scores, insights, and a custom 7/30/90-day roadmap lands in your dashboard.',
    color: 'text-brand-gold',
    border: 'border-brand-gold/30',
    bg: 'bg-brand-gold/8',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 bg-surface-1">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-brand-cyan uppercase tracking-widest mb-4"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-h1 font-bold text-ink-bright max-w-[400px] leading-tight"
          >
            From connected to growing in 3 steps.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div aria-hidden className="hidden md:block absolute top-8 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px border-t border-dashed border-edge" />

          {STEPS.map(({ number, title, body, color, border, bg }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              <div className={`w-16 h-16 rounded-2xl ${bg} border ${border} flex items-center justify-center mb-6 relative z-10`}>
                <span className={`font-display text-h3 font-bold ${color}`}>{number}</span>
              </div>
              <h3 className="font-display text-base font-semibold text-ink-bright mb-2">{title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
