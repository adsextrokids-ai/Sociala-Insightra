'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const SECTION_COLORS = {
  business_basics: { ring: 'focus:ring-brand-violet/20 focus:border-brand-violet', sel: 'border-brand-violet bg-brand-violet/10 text-brand-violet2', kbd: 'border-brand-violet/40 text-brand-violet2', dot: 'bg-brand-violet' },
  identity:        { ring: 'focus:ring-brand-cyan/20 focus:border-brand-cyan',     sel: 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan',         kbd: 'border-brand-cyan/40 text-brand-cyan',     dot: 'bg-brand-cyan'   },
  goals:           { ring: 'focus:ring-ok/20 focus:border-ok',                     sel: 'border-ok bg-ok/10 text-ok',                                  kbd: 'border-ok/40 text-ok',                      dot: 'bg-ok'           },
  challenges:      { ring: 'focus:ring-warn/20 focus:border-warn',                 sel: 'border-warn bg-warn/10 text-warn',                            kbd: 'border-warn/40 text-warn',                  dot: 'bg-warn'         },
  content:         { ring: 'focus:ring-brand-violet/20 focus:border-brand-violet', sel: 'border-brand-violet bg-brand-violet/10 text-brand-violet2', kbd: 'border-brand-violet/40 text-brand-violet2', dot: 'bg-brand-violet' },
  expectations:    { ring: 'focus:ring-brand-gold/20 focus:border-brand-gold',     sel: 'border-brand-gold bg-brand-gold/10 text-brand-gold',          kbd: 'border-brand-gold/40 text-brand-gold',     dot: 'bg-brand-gold'   },
}

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } },
  item:       { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } },
}

export default function AnswerInput({ question, value, onChange, onAutoAdvance }) {
  const c = SECTION_COLORS[question.section] || SECTION_COLORS.business_basics

  if (question.type === 'text') {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.25 }}>
        <textarea
          autoFocus
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          placeholder={question.placeholder}
          rows={3}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onAutoAdvance?.() }
          }}
          className={`w-full bg-transparent border-0 border-b-2 border-edge ${c.ring} outline-none text-xl text-ink-bright py-4 resize-none placeholder:text-ink-ghost transition-colors`}
        />
        <p className="mt-3 text-xs text-ink-ghost">Shift + Enter for new line &nbsp;·&nbsp; Enter to continue</p>
      </motion.div>
    )
  }

  if (question.type === 'select') {
    return (
      <motion.div className="flex flex-col gap-2.5" variants={stagger.container} initial="hidden" animate="visible">
        {question.options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i)
          const active = value === opt
          return (
            <motion.button
              key={opt}
              variants={stagger.item}
              type="button"
              onClick={() => { onChange(opt); onAutoAdvance?.(opt) }}
              className={`group w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-150 ${
                active ? c.sel : 'border-edge bg-surface-1 text-ink hover:border-edge-bright hover:bg-surface-2'
              }`}
            >
              <kbd className={`w-7 h-7 rounded-lg border text-xs font-mono font-bold flex-shrink-0 flex items-center justify-center transition-all ${
                active ? c.kbd : 'border-edge-bright text-ink-ghost'
              }`}>
                {letter}
              </kbd>
              <span className="text-base font-medium">{opt}</span>
              {active && <Check size={15} className="ml-auto flex-shrink-0" />}
            </motion.button>
          )
        })}
        <motion.p variants={stagger.item} className="text-xs text-ink-ghost mt-1">
          Press <kbd className="px-1.5 py-0.5 rounded border border-edge-bright text-ink-ghost font-mono text-xs">A</kbd>–<kbd className="px-1.5 py-0.5 rounded border border-edge-bright text-ink-ghost font-mono text-xs">{String.fromCharCode(64 + question.options.length)}</kbd> to select
        </motion.p>
      </motion.div>
    )
  }

  if (question.type === 'multiselect') {
    const sel = Array.isArray(value) ? value : []
    return (
      <motion.div className="flex flex-col gap-2.5" variants={stagger.container} initial="hidden" animate="visible">
        {question.options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i)
          const on = sel.includes(opt)
          return (
            <motion.button
              key={opt}
              variants={stagger.item}
              type="button"
              onClick={() => onChange(on ? sel.filter(v => v !== opt) : [...sel, opt])}
              className={`group w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-150 ${
                on ? c.sel : 'border-edge bg-surface-1 text-ink hover:border-edge-bright hover:bg-surface-2'
              }`}
            >
              <kbd className={`w-7 h-7 rounded-lg border text-xs font-mono font-bold flex-shrink-0 flex items-center justify-center transition-all ${
                on ? c.kbd : 'border-edge-bright text-ink-ghost'
              }`}>
                {letter}
              </kbd>
              <span className="text-base font-medium flex-1">{opt}</span>
              <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                on ? `${c.dot} border-transparent` : 'border-edge-bright'
              }`}>
                {on && <Check size={11} className="text-surface-0 stroke-[3]" />}
              </span>
            </motion.button>
          )
        })}
        <motion.p variants={stagger.item} className="text-xs text-ink-ghost mt-1">
          Press letter keys to toggle &nbsp;·&nbsp; Select all that apply
        </motion.p>
      </motion.div>
    )
  }

  if (question.type === 'boolean') {
    return (
      <motion.div className="grid grid-cols-2 gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.2 }}>
        {[{ label: 'Yes', val: true, key: 'Y' }, { label: 'No', val: false, key: 'N' }].map(({ label, val, key }) => {
          const active = value === val
          return (
            <button
              key={label}
              type="button"
              onClick={() => { onChange(val); onAutoAdvance?.(val) }}
              className={`flex flex-col items-center justify-center gap-2 py-10 rounded-2xl border text-center transition-all duration-150 ${
                active ? c.sel : 'border-edge bg-surface-1 text-ink hover:border-edge-bright hover:bg-surface-2'
              }`}
            >
              <kbd className={`w-8 h-8 rounded-xl border text-sm font-mono font-bold flex items-center justify-center transition-all ${
                active ? c.kbd : 'border-edge-bright text-ink-ghost'
              }`}>{key}</kbd>
              <span className="text-xl font-display font-semibold">{label}</span>
            </button>
          )
        })}
      </motion.div>
    )
  }

  return null
}
