'use client'

import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Target } from 'lucide-react'

const FEATURES = [
  {
    Icon: Sparkles,
    title: 'AI Social Analysis',
    description: 'Deep scan of your Instagram, engagement patterns, content quality, and branding — surfaced as clear, actionable scores.',
    accent: 'from-accent-blue/20 to-accent-purple/10',
    iconColor: 'text-accent-blue',
  },
  {
    Icon: TrendingUp,
    title: 'Growth Roadmap',
    description: 'A 7/30/90-day action plan customized to your specific business goals and current social performance.',
    accent: 'from-accent-purple/20 to-accent-blue/10',
    iconColor: 'text-accent-purple',
  },
  {
    Icon: Target,
    title: 'Smart Recommendations',
    description: 'Content ideas, posting schedules, and targeted fixes that move the needle on growth — not generic advice.',
    accent: 'from-status-success/15 to-accent-blue/10',
    iconColor: 'text-status-success',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-28 bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-md font-display font-semibold text-content-primary mb-4"
          >
            Everything you need to grow smarter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-lg text-content-secondary max-w-[460px] mx-auto"
          >
            One platform. Your social presence, analyzed end to end.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map(({ Icon, title, description, accent, iconColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white rounded-card p-8 shadow-card hover:shadow-card-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-gray-200"
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-6`}>
                <Icon size={22} className={iconColor} />
              </div>
              <h3 className="text-lg font-display font-semibold text-content-primary mb-3">
                {title}
              </h3>
              <p className="text-body-sm text-content-secondary leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
