'use client'

import { motion } from 'framer-motion'
import { ScanLine, BarChart3, Lightbulb, Map, MessageSquare, Target } from 'lucide-react'

const FEATURES = [
  {
    Icon: ScanLine,
    title: 'Deep social scan',
    body: 'Every post, caption, hashtag, and engagement metric analyzed — not just surface stats.',
    span: 'col-span-1',
    accent: 'text-brand-violet',
    glow: 'group-hover:shadow-glow',
  },
  {
    Icon: BarChart3,
    title: 'Scored performance',
    body: 'Four business scores across brand, content, audience, and overall health — updated after every scan.',
    span: 'col-span-1',
    accent: 'text-brand-cyan',
    glow: 'group-hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.3)]',
  },
  {
    Icon: Lightbulb,
    title: 'Strength & weakness map',
    body: 'Exactly what\'s working. Exactly what\'s not. No filler, no generic advice.',
    span: 'col-span-1 md:col-span-2',
    accent: 'text-brand-gold',
    glow: 'group-hover:shadow-glow-gold',
  },
  {
    Icon: Map,
    title: '90-day growth roadmap',
    body: 'Immediate wins, medium-term strategy, and long-term scale — prioritized to your goals.',
    span: 'col-span-1 md:col-span-2',
    accent: 'text-ok',
    glow: '',
  },
  {
    Icon: MessageSquare,
    title: 'Content idea engine',
    body: 'Hooks, captions, and formats proven to work for your specific audience and niche.',
    span: 'col-span-1',
    accent: 'text-brand-violet2',
    glow: '',
  },
  {
    Icon: Target,
    title: 'Goal-aligned analysis',
    body: 'Whether you\'re growing revenue, audience, or authority — every insight is filtered through your stated goals.',
    span: 'col-span-1',
    accent: 'text-brand-cyan',
    glow: '',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 bg-surface-0">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-brand-violet uppercase tracking-widest mb-4"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-h1 font-bold text-ink-bright max-w-[480px] leading-tight"
          >
            Intelligence your team can actually use.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map(({ Icon, title, body, span, accent, glow }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group ${span} relative bg-surface-1 border border-edge-subtle rounded-card p-7 hover:border-edge transition-all duration-300 ${glow}`}
            >
              <div className={`w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center mb-5 ${accent}`}>
                <Icon size={18} />
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
