'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
})

const SCORES = [
  { label: 'Business Score', value: '87', change: '+12', bg: 'bg-accent-blue/10', text: 'text-accent-blue' },
  { label: 'Brand Score',    value: '92', change: '+8',  bg: 'bg-accent-purple/10', text: 'text-accent-purple' },
  { label: 'Content Score',  value: '74', change: '+21', bg: 'bg-status-success/10', text: 'text-status-success' },
  { label: 'Audience Fit',   value: '89', change: '+5',  bg: 'bg-status-warning/10', text: 'text-status-warning' },
]

const STRENGTHS = ['Strong visual branding', 'High engagement rate', 'Consistent posting']
const ACTIONS   = ['Post 3× / week on Reels', 'Add CTA to bio link', 'Try carousel posts']
const ROADMAP   = [{ label: '7 days', pct: 75 }, { label: '30 days', pct: 45 }, { label: '90 days', pct: 20 }]

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-10 md:pt-28 md:pb-0">

      {/* Background atmosphere */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-b from-accent-blue/8 via-accent-purple/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-[-100px] w-[500px] h-[500px] bg-accent-purple/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-accent-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-6">

        {/* Badge */}
        <motion.div {...FADE_UP(0)} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill border border-accent-purple/20 bg-accent-purple/6 text-accent-purple text-label font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
            AI-powered business intelligence
            <Sparkles size={11} />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...FADE_UP(0.1)}
          className="text-center text-display-xl font-display font-bold text-content-primary mb-6 text-balance leading-[1.08]"
        >
          Know exactly what&apos;s working.{' '}
          <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
            Fix what isn&apos;t.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          {...FADE_UP(0.2)}
          className="text-center text-body-lg text-content-secondary max-w-[560px] mx-auto mb-10"
        >
          Connect your social accounts. Get an AI-powered audit of your brand,
          content, and growth &mdash; in 60&nbsp;seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div {...FADE_UP(0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-medium rounded-pill hover:opacity-90 transition-all shadow-lg hover:shadow-accent-blue/20 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
          >
            Start free audit
            <ArrowRight size={16} />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 px-6 py-4 text-content-secondary hover:text-content-primary font-medium transition-colors w-full sm:w-auto justify-center"
          >
            See how it works <ChevronRight size={16} />
          </a>
        </motion.div>

        {/* Trust chips */}
        <motion.div {...FADE_UP(0.4)} className="flex flex-wrap items-center justify-center gap-6 mb-16">
          {['No credit card', 'Free during beta', '60-second analysis'].map(item => (
            <span key={item} className="flex items-center gap-2 text-body-sm text-content-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
              {item}
            </span>
          ))}
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-[860px]"
        >
          {/* Glow under card */}
          <div aria-hidden className="absolute inset-x-8 -bottom-4 h-16 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 blur-2xl rounded-full" />

          <div className="relative rounded-2xl border border-gray-200/80 shadow-card-lg overflow-hidden bg-white">

            {/* Browser chrome */}
            <div className="bg-bg-secondary/70 border-b border-gray-100 px-5 py-3 flex items-center gap-3">
              <div className="flex gap-1.5">
                {['bg-red-300', 'bg-yellow-300', 'bg-green-300'].map(c => (
                  <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex-1 max-w-[220px] bg-white/80 border border-gray-200 rounded-md px-3 py-1">
                <span className="text-xs text-content-secondary font-mono">app.socialai.com/dashboard</span>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="p-5 md:p-6">

              {/* Score row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {SCORES.map(({ label, value, change, bg, text }) => (
                  <div key={label} className="bg-bg-secondary/60 rounded-xl p-4 border border-gray-100">
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-2xl font-bold font-display text-content-primary">{value}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${bg} ${text}`}>{change}</span>
                    </div>
                    <p className="text-xs text-content-secondary">{label}</p>
                  </div>
                ))}
              </div>

              {/* Detail row — hidden on small mobile */}
              <div className="hidden sm:grid grid-cols-3 gap-3">

                {/* Strengths */}
                <div className="bg-bg-secondary/60 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-content-secondary uppercase tracking-wider mb-3">
                    Top Strengths
                  </p>
                  {STRENGTHS.map(s => (
                    <div key={s} className="flex items-center gap-2 mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-status-success flex-shrink-0" />
                      <span className="text-xs text-content-primary">{s}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="bg-bg-secondary/60 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-content-secondary uppercase tracking-wider mb-3">
                    Next Actions
                  </p>
                  {ACTIONS.map(a => (
                    <div key={a} className="flex items-center gap-2 mb-2">
                      <span className="w-4 h-4 rounded border border-accent-blue/30 flex-shrink-0" />
                      <span className="text-xs text-content-primary">{a}</span>
                    </div>
                  ))}
                </div>

                {/* Roadmap */}
                <div className="bg-bg-secondary/60 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs font-semibold text-content-secondary uppercase tracking-wider mb-3">
                    Growth Roadmap
                  </p>
                  {ROADMAP.map(({ label, pct }) => (
                    <div key={label} className="mb-3">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-content-secondary">{label}</span>
                        <span className="text-content-primary font-medium">{pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
