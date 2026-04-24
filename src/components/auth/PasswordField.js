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
  weak:   { label: 'Weak',   bar: 'w-1/3 bg-bad',  text: 'text-bad'  },
  medium: { label: 'Medium', bar: 'w-2/3 bg-warn',  text: 'text-warn' },
  strong: { label: 'Strong', bar: 'w-full bg-ok',   text: 'text-ok'   },
}

export default function PasswordField({ showStrength = false, error, label, ...props }) {
  const [visible, setVisible] = useState(false)
  const cfg = showStrength && props.value ? STRENGTH[getStrength(props.value)] : null

  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          type={visible ? 'text' : 'password'}
          className={[
            'w-full h-12 px-4 pr-12 rounded-xl border text-sm text-ink-bright',
            'bg-surface-2 placeholder:text-ink-ghost',
            'outline-none transition-all duration-150',
            error
              ? 'border-bad focus:ring-2 focus:ring-bad/25'
              : 'border-edge focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20',
          ].join(' ')}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setVisible(v => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
        >
          {visible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {cfg && (
        <div className="mt-2">
          <div className="h-0.5 bg-edge rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${cfg.bar}`} />
          </div>
          <p className={`text-xs mt-1 ${cfg.text}`}>{cfg.label}</p>
        </div>
      )}
      {error && <p className="mt-1.5 text-xs text-bad">{error}</p>}
    </div>
  )
}
