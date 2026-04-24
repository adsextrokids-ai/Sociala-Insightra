'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '500+', label: 'Businesses analyzed',  color: 'text-brand-violet' },
  { value: '60s',  label: 'Time to first insight', color: 'text-brand-cyan'   },
  { value: '3×',   label: 'Avg. growth rate',      color: 'text-brand-gold'   },
  { value: '21',   label: 'Guided questions',       color: 'text-ok'           },
]

export default function StatsRow() {
  return (
    <section className="border-y border-edge-subtle bg-surface-1">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="text-center"
            >
              <p className={`font-display text-h2 font-bold mb-1 ${color}`}>{value}</p>
              <p className="text-xs text-ink-muted">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
