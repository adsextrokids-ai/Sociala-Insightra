'use client'

import { motion } from 'framer-motion'

export default function AuthCard({ children, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface-1 border border-edge-subtle rounded-card p-8 sm:p-10 w-full shadow-card"
    >
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h1 className="font-display text-h3 font-bold text-ink-bright mb-2">{title}</h1>
          )}
          {subtitle && (
            <p className="text-sm text-ink-muted">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </motion.div>
  )
}
