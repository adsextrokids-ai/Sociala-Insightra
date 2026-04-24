'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const ITEMS = [
  'Full AI social media audit',
  'Business intelligence report',
  '7 / 30 / 90-day growth roadmap',
  'Content ideas and post hooks',
  'Instagram, YouTube & Facebook',
  'Strength & weakness breakdown',
  'Goal-aligned recommendations',
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-28 bg-surface-1">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-brand-gold uppercase tracking-widest mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-h1 font-bold text-ink-bright max-w-[400px] leading-tight"
          >
            Free while we&apos;re in beta.
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-[440px] relative"
        >
          {/* Glow */}
          <div aria-hidden className="absolute -inset-4 bg-brand-violet/5 rounded-3xl blur-2xl -z-10" />

          <div className="bg-surface-2 border border-edge rounded-card overflow-hidden">
            {/* Top bar */}
            <div className="h-1 bg-gradient-to-r from-brand-violet to-brand-cyan" />

            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-display text-h2 font-bold text-ink-bright">$0</p>
                  <p className="text-sm text-ink-muted">/ month during beta</p>
                </div>
                <span className="px-3 py-1 rounded-pill bg-ok/10 text-ok text-xs font-semibold">Beta — free</span>
              </div>

              <ul className="space-y-3 mb-8">
                {ITEMS.map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-ok/15 flex items-center justify-center flex-shrink-0">
                      <Check size={9} className="text-ok" />
                    </span>
                    <span className="text-sm text-ink-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="block w-full text-center py-3.5 px-6 rounded-pill bg-brand-gold text-surface-0 font-semibold text-sm hover:bg-brand-gold2 transition-all shadow-glow-gold"
              >
                Get early access — free
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
