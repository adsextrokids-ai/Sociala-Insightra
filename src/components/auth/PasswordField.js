'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function getStrength(val) {
  if (!val || val.length < 8) return 'weak'
  const hasUpper = /[A-Z]/.test(val)
  const hasNum   = /[0-9]/.test(val)
  if (hasUpper && hasNum) return 'strong'
  if (hasUpper || hasNum) return 'medium'
  return 'weak'
}

const STRENGTH = {
  weak:   { label: 'Weak',   bar: 'w-1/3 bg-status-error',   text: 'text-status-error'   },
  medium: { label: 'Medium', bar: 'w-2/3 bg-status-warning',  text: 'text-status-warning' },
  strong: { label: 'Strong', bar: 'w-full bg-status-success', text: 'text-status-success' },
}

export default function PasswordField({ showStrength = false, error, label, ...props }) {
  const [visible, setVisible] = useState(false)
  const cfg = showStrength && props.value ? STRENGTH[getStrength(props.value)] : null

  return (
    <div>
      {label && (
        <label className="block text-body-sm font-medium text-content-primary mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          type={visible ? 'text' : 'password'}
          className={[
            'w-full h-12 px-4 pr-12 rounded-lg border text-body-sm text-content-primary',
            'bg-bg-secondary placeholder:text-content-secondary/50',
            'outline-none transition-all duration-150',
            error
              ? 'border-status-error focus:ring-2 focus:ring-status-error/25'
              : 'border-gray-200 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20',
          ].join(' ')}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible(v => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-content-secondary hover:text-content-primary transition-colors"
        >
          {visible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>

      {cfg && (
        <div className="mt-2">
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${cfg.bar}`} />
          </div>
          <p className={`text-label mt-1 ${cfg.text}`}>{cfg.label}</p>
        </div>
      )}

      {error && <p className="mt-1.5 text-label text-status-error">{error}</p>}
    </div>
  )
}
