'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { QUESTIONS, TOTAL_STEPS, SECTION_COLORS } from '@/config/questions'
import { useOnboardingStore } from '@/store/onboardingStore'
import AnswerInput from '@/components/onboarding/AnswerInput'

function defaultAnswer(type) {
  return type === 'multiselect' ? [] : type === 'boolean' ? null : ''
}

function isValid(type, value) {
  if (value === null || value === undefined) return false
  if (type === 'text')        return String(value).trim().length > 0
  if (type === 'select')      return Boolean(value)
  if (type === 'multiselect') return Array.isArray(value) && value.length > 0
  if (type === 'boolean')     return value !== null
  return false
}

export default function OnboardingStepPage() {
  const { step } = useParams()
  const stepNum   = parseInt(step, 10)
  const router    = useRouter()
  const question  = QUESTIONS.find(q => q.step === stepNum)

  const { answers, setAnswer, getAnswer, loaded } = useOnboardingStore()
  const [value,  setValue]  = useState(null)
  const [saving, setSaving] = useState(false)
  const prevRef = useRef(stepNum)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    if (loaded) setValue(getAnswer(stepNum) ?? defaultAnswer(question?.type))
  }, [loaded, stepNum])

  useEffect(() => {
    setDir(stepNum > prevRef.current ? 1 : -1)
    prevRef.current = stepNum
  }, [stepNum])

  if (!question) { router.replace('/onboarding/1'); return null }

  const valid  = isValid(question.type, value)
  const isLast = stepNum === TOTAL_STEPS
  const pct    = Math.round((stepNum / TOTAL_STEPS) * 100)

  // Section badge color
  const sectionColor = {
    business_basics: 'text-brand-violet bg-brand-violet/10 border-brand-violet/20',
    identity:        'text-brand-cyan   bg-brand-cyan/10   border-brand-cyan/20',
    goals:           'text-ok           bg-ok/10           border-ok/20',
    challenges:      'text-warn         bg-warn/10         border-warn/20',
    content:         'text-brand-violet bg-brand-violet/10 border-brand-violet/20',
    expectations:    'text-brand-gold   bg-brand-gold/10   border-brand-gold/20',
  }[question.section] || 'text-ink-muted bg-surface-3 border-edge'

  async function next() {
    if (!valid || saving) return
    setSaving(true)
    setAnswer(stepNum, value)

    await fetch('/api/onboarding/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: stepNum, section: question.section, question: question.question, answer: value }),
    })

    if (isLast) {
      await fetch('/api/onboarding/complete', { method: 'POST' })
      router.push('/dashboard')
    } else {
      setDir(1)
      router.push(`/onboarding/${stepNum + 1}`)
    }
    setSaving(false)
  }

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d * 48 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d * -48 }),
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">

      {/* Progress */}
      <div className="h-0.5 bg-edge">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-violet to-brand-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Step info */}
      <div className="flex items-center justify-between px-5 sm:px-10 py-4 border-b border-edge-subtle bg-surface-1">
        <span className={`inline-flex items-center px-3 py-1 rounded-pill border text-xs font-semibold ${sectionColor}`}>
          {question.sectionLabel}
        </span>
        <span className="text-xs text-ink-ghost">
          {stepNum} <span className="opacity-40">of</span> {TOTAL_STEPS}
        </span>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-4 py-14">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={stepNum}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[600px]"
          >
            <h2 className="font-display text-h2 font-bold text-ink-bright mb-8 leading-tight">
              {question.question}
            </h2>

            <AnswerInput question={question} value={value} onChange={setValue} />

            <div className="flex items-center justify-between mt-10">
              <button
                type="button"
                onClick={() => { setDir(-1); router.push(`/onboarding/${stepNum - 1}`) }}
                disabled={stepNum <= 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-ink-muted hover:text-ink hover:bg-surface-2 transition-all disabled:opacity-0"
              >
                <ArrowLeft size={15} /> Back
              </button>

              <button
                type="button"
                onClick={next}
                disabled={!valid || saving}
                className={[
                  'inline-flex items-center gap-2 px-7 py-3 rounded-pill text-sm font-semibold transition-all',
                  valid && !saving
                    ? 'bg-brand-gold text-surface-0 hover:bg-brand-gold2 shadow-glow-gold hover:-translate-y-0.5'
                    : 'bg-surface-3 text-ink-ghost cursor-not-allowed',
                ].join(' ')}
              >
                {saving
                  ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
                  : isLast
                    ? <>Finish &amp; see results <ArrowRight size={14} /></>
                    : <>Continue <ArrowRight size={14} /></>
                }
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
