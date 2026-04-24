'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section className="relative py-28 overflow-hidden bg-neutral-navy">

      {/* Ambient atmosphere */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent-blue/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-label text-accent-blue font-medium uppercase tracking-widest mb-4">
            Get started today
          </p>
          <h2 className="text-display-lg font-display font-bold text-white mb-4 max-w-[600px] mx-auto">
            Ready to grow your business smarter?
          </h2>
          <p className="text-body-lg text-white/60 mb-10 max-w-[440px] mx-auto">
            Join hundreds of founders who use Social AI to stop guessing and start growing.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-neutral-navy font-medium rounded-pill hover:bg-white/90 transition-all shadow-lg hover:-translate-y-0.5"
          >
            Get started free
            <ArrowRight size={16} />
          </Link>
          <p className="mt-4 text-body-sm text-white/40">
            No credit card required &bull; Free during beta
          </p>
        </motion.div>
      </div>
    </section>
  )
}
