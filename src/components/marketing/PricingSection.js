'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

const FEATURES = [
  'AI social media audit',
  'Business intelligence report',
  'Growth roadmap (7 / 30 / 90 days)',
  'Content suggestions & hooks',
  'Instagram, YouTube & Facebook',
  'Strength & weakness analysis',
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-label text-accent-blue font-medium uppercase tracking-widest mb-3"
          >
            Pricing
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-display-md font-display font-semibold text-content-primary mb-4">
              Free during beta
            </h2>
            <p className="text-body-lg text-content-secondary max-w-[440px] mx-auto">
              We&apos;re currently in beta. All features are free. Paid plans launching soon.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[420px] mx-auto relative"
        >
          {/* Card glow */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 rounded-card blur-xl scale-95 -z-10" />

          <div className="bg-white rounded-card p-8 border border-gray-200 shadow-card-lg relative overflow-hidden">

            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-accent-purple" />

            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center">
                <Zap size={14} className="text-accent-blue" />
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-status-success/10 text-status-success text-label font-medium">
                Beta &mdash; Free forever until launch
              </span>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-display-lg font-display font-bold text-content-primary">$0</span>
                <span className="text-body-sm text-content-secondary">/ month during beta</span>
              </div>
            </div>

            <ul className="space-y-3.5 mb-8">
              {FEATURES.map(feature => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-status-success/10 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-status-success" />
                  </div>
                  <span className="text-body-sm text-content-secondary">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="block w-full text-center py-3.5 px-6 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Get early access — free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
