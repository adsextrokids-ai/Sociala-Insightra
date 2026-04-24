'use client'

import { Check } from 'lucide-react'

export default function AnswerInput({ question, value, onChange }) {
  const { type, options, placeholder } = question

  if (type === 'text') {
    return (
      <textarea
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-5 py-4 rounded-xl border border-edge focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 resize-none text-base text-ink-bright bg-surface-2 outline-none transition-all placeholder:text-ink-ghost"
      />
    )
  }

  if (type === 'select') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              'px-5 py-4 rounded-xl border text-sm font-medium text-left transition-all',
              value === opt
                ? 'border-brand-violet bg-brand-violet/10 text-brand-violet2 shadow-glow'
                : 'border-edge bg-surface-2 text-ink-muted hover:border-edge-bright hover:text-ink',
            ].join(' ')}
          >
            {opt}
          </button>
        ))}
      </div>
    )
  }

  if (type === 'multiselect') {
    const sel = Array.isArray(value) ? value : []
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map(opt => {
          const on = sel.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(on ? sel.filter(v => v !== opt) : [...sel, opt])}
              className={[
                'flex items-center gap-3 px-5 py-4 rounded-xl border text-sm font-medium text-left transition-all',
                on
                  ? 'border-brand-violet bg-brand-violet/10 text-brand-violet2 shadow-glow'
                  : 'border-edge bg-surface-2 text-ink-muted hover:border-edge-bright hover:text-ink',
              ].join(' ')}
            >
              <span className={[
                'w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all',
                on ? 'bg-brand-violet border-brand-violet' : 'border-edge-bright',
              ].join(' ')}>
                {on && <Check size={9} className="text-white" />}
              </span>
              {opt}
            </button>
          )
        })}
      </div>
    )
  }

  if (type === 'boolean') {
    return (
      <div className="flex gap-4">
        {[{ label: 'Yes', val: true }, { label: 'No', val: false }].map(({ label, val }) => (
          <button
            key={label}
            type="button"
            onClick={() => onChange(val)}
            className={[
              'flex-1 py-4 rounded-xl border text-base font-semibold transition-all',
              value === val
                ? 'border-brand-violet bg-brand-violet/10 text-brand-violet2 shadow-glow'
                : 'border-edge bg-surface-2 text-ink-muted hover:border-edge-bright',
            ].join(' ')}
          >
            {label}
          </button>
        ))}
      </div>
    )
  }

  return null
}
