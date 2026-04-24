'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section className="relative py-28 overflow-hidden bg-surface-0">
      {/* Glow blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand-violet/8 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="border border-edge-subtle rounded-3xl bg-surface-1 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <p className="text-xs font-semibold text-brand-violet uppercase tracking-widest mb-4">Get started</p>
            <h2 className="font-display text-h2 font-bold text-ink-bright leading-tight mb-3">
              Your growth data is waiting.
            </h2>
            <p className="text-base text-ink-muted max-w-[420px]">
              Connect your accounts and get your AI analysis in under a minute. No credit card required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-pill bg-brand-gold text-surface-0 font-semibold text-sm hover:bg-brand-gold2 transition-all shadow-glow-gold hover:-translate-y-0.5 whitespace-nowrap"
            >
              Start free audit
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
