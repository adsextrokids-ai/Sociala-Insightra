'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    initials: 'SC',
    name: 'Sarah Chen',
    role: 'Founder, Bloom Skincare',
    quote: 'Social AI gave me a clear picture of what was actually working on Instagram. I stopped guessing and started growing.',
    gradient: 'from-accent-blue/15 to-accent-purple/10',
  },
  {
    initials: 'MR',
    name: 'Marcus Rivera',
    role: 'Personal Brand & Coach',
    quote: 'The 90-day roadmap alone was worth it. It felt like having a marketing strategist in my pocket — without the cost.',
    gradient: 'from-accent-purple/15 to-accent-blue/10',
  },
  {
    initials: 'PP',
    name: 'Priya Patel',
    role: 'E-commerce Owner',
    quote: 'I connected my YouTube channel and had a full audit in under a minute. The content suggestions were spot on.',
    gradient: 'from-status-success/12 to-accent-blue/10',
  },
]

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-28 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-label text-accent-blue font-medium uppercase tracking-widest mb-3"
          >
            Social proof
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-md font-display font-semibold text-content-primary"
          >
            Trusted by founders and creators
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map(({ initials, name, role, quote, gradient }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-card p-8 shadow-card hover:shadow-card-md transition-all border border-gray-100"
            >
              <StarRow />
              <p className="text-body-md text-content-secondary mb-6 leading-relaxed">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-semibold text-sm text-content-primary flex-shrink-0`}>
                  {initials}
                </div>
                <div>
                  <p className="text-body-sm font-semibold text-content-primary">{name}</p>
                  <p className="text-label text-content-secondary">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
