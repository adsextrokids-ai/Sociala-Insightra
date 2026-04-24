'use client'

import { motion } from 'framer-motion'
import { Link2, ScanLine, Rocket } from 'lucide-react'

const STEPS = [
  {
    number: 1,
    Icon: Link2,
    title: 'Connect',
    description: 'Link your Instagram, YouTube, or Facebook in one click. No technical setup required.',
  },
  {
    number: 2,
    Icon: ScanLine,
    title: 'Analyze',
    description: 'Our AI scans your content, engagement patterns, brand signals, and audience data.',
  },
  {
    number: 3,
    Icon: Rocket,
    title: 'Grow',
    description: 'Receive a custom 90-day roadmap, content ideas, and fixes that are specific to your business.',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-label text-accent-blue font-medium uppercase tracking-widest mb-3"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-md font-display font-semibold text-content-primary"
          >
            From connected to growing in 3 steps
          </motion.h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Dashed connector — desktop only */}
          <div
            aria-hidden
            className="hidden md:block absolute top-8 left-[calc(50%/3+48px)] right-[calc(50%/3+48px)] h-px border-t-2 border-dashed border-gray-200"
          />

          {STEPS.map(({ number, Icon, title, description }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Step circle */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center mb-6 shadow-lg shadow-accent-blue/20">
                <Icon size={24} className="text-white" />
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-accent-blue flex items-center justify-center">
                  <span className="text-[10px] font-bold text-accent-blue">{number}</span>
                </div>
              </div>

              <h3 className="text-xl font-display font-semibold text-content-primary mb-3">
                {title}
              </h3>
              <p className="text-body-sm text-content-secondary max-w-[260px] leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
