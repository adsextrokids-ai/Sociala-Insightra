'use client'

import { motion } from 'framer-motion'

export default function AuthCard({ children, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-card shadow-card-lg p-8 sm:p-10 border border-gray-100 w-full"
    >
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && (
            <h1 className="text-display-md font-display font-semibold text-content-primary mb-2">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-body-sm text-content-secondary">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </motion.div>
  )
}
