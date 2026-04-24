'use client'

import { motion } from 'framer-motion'

const STATS = [
  { value: '500+', label: 'Businesses analyzed' },
  { value: '60s',  label: 'To first insight' },
  { value: '3×',   label: 'Avg. growth improvement' },
  { value: '3',    label: 'Social platforms supported' },
]

export default function StatsRow() {
  return (
    <section className="py-14 border-y border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <p className="text-display-lg font-display font-bold bg-gradient-to-br from-accent-blue to-accent-purple bg-clip-text text-transparent mb-1">
                {value}
              </p>
              <p className="text-body-sm text-content-secondary">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
