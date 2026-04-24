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
        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 resize-none text-body-md text-content-primary bg-white outline-none transition-all placeholder:text-content-secondary/50"
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
              'px-5 py-3.5 rounded-xl border text-body-sm font-medium text-left transition-all',
              value === opt
                ? 'border-accent-blue bg-accent-blue/8 text-accent-blue shadow-sm'
                : 'border-gray-200 bg-white text-content-secondary hover:border-gray-300 hover:bg-bg-secondary',
            ].join(' ')}
          >
            {opt}
          </button>
        ))}
      </div>
    )
  }

  if (type === 'multiselect') {
    const selected = Array.isArray(value) ? value : []
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map(opt => {
          const isSelected = selected.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                if (isSelected) {
                  onChange(selected.filter(v => v !== opt))
                } else {
                  onChange([...selected, opt])
                }
              }}
              className={[
                'flex items-center gap-3 px-5 py-3.5 rounded-xl border text-body-sm font-medium text-left transition-all',
                isSelected
                  ? 'border-accent-blue bg-accent-blue/8 text-accent-blue shadow-sm'
                  : 'border-gray-200 bg-white text-content-secondary hover:border-gray-300 hover:bg-bg-secondary',
              ].join(' ')}
            >
              <span className={[
                'w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border transition-all',
                isSelected ? 'bg-accent-blue border-accent-blue' : 'border-gray-300',
              ].join(' ')}>
                {isSelected && <Check size={10} className="text-white" />}
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
              'flex-1 py-4 rounded-xl border text-body-md font-medium transition-all',
              value === val
                ? 'border-accent-blue bg-accent-blue/8 text-accent-blue shadow-sm'
                : 'border-gray-200 bg-white text-content-secondary hover:border-gray-300 hover:bg-bg-secondary',
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
