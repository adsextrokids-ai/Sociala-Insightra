'use client'

import { motion } from 'framer-motion'

const T = [
  {
    quote: 'Social AI showed me exactly what was killing my engagement. Fixed two things it flagged and reach doubled in 3 weeks.',
    name: 'Sarah Chen',
    role: 'Bloom Skincare — Founder',
    init: 'SC',
  },
  {
    quote: 'The roadmap felt like it was written by someone who had been watching my account for a year. Scarily accurate.',
    name: 'Marcus Rivera',
    role: 'Business & Life Coach',
    init: 'MR',
  },
  {
    quote: 'I expected generic tips. I got a 47-page business intelligence report that called out things I\'d missed for months.',
    name: 'Priya Patel',
    role: 'DTC E-commerce — Owner',
    init: 'PP',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-surface-0">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-h2 font-bold text-ink-bright"
          >
            Founders trust it. Creators rely on it.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {T.map(({ quote, name, role, init }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-surface-1 border border-edge-subtle rounded-card p-7 flex flex-col gap-6"
            >
              <p className="text-sm text-ink leading-relaxed flex-1 italic">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-3 border border-edge flex items-center justify-center text-xs font-bold text-brand-violet2 flex-shrink-0">
                  {init}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-bright">{name}</p>
                  <p className="text-xs text-ink-muted">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
