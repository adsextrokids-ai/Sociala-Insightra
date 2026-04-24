'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Loader2, ChevronRight } from 'lucide-react'
import { QUESTIONS, TOTAL_STEPS } from '@/config/questions'
import { useOnboardingStore } from '@/store/onboardingStore'
import AnswerInput from '@/components/onboarding/AnswerInput'
import Link from 'next/link'

function defaultAnswer(type) {
  if (type === 'multiselect') return []
  if (type === 'boolean') return null
  return ''
}

function isValid(type, value) {
  if (type === 'text')        return typeof value === 'string' && value.trim().length > 0
  if (type === 'select')      return !!value
  if (type === 'multiselect') return Array.isArray(value) && value.length > 0
  if (type === 'boolean')     return value === true || value === false
  return false
}

const SECTION_META = {
  business_basics: { label: 'Business Basics',  accentClass: 'text-brand-violet', progressColor: '#8B5CF6' },
  identity:        { label: 'Brand Identity',   accentClass: 'text-brand-cyan',   progressColor: '#22D3EE' },
  goals:           { label: 'Your Goals',        accentClass: 'text-ok',           progressColor: '#10B981' },
  challenges:      { label: 'Challenges',        accentClass: 'text-warn',         progressColor: '#F59E0B' },
  content:         { label: 'Content Strategy', accentClass: 'text-brand-violet', progressColor: '#8B5CF6' },
  expectations:    { label: 'Expectations',      accentClass: 'text-brand-gold',   progressColor: '#F59E0B' },
}

export default function OnboardingStepPage() {
  const { step }  = useParams()
  const stepNum   = parseInt(step, 10)
  const router    = useRouter()
  const question  = QUESTIONS.find(q => q.step === stepNum)

  const { setAnswer, getAnswer, loaded } = useOnboardingStore()

  // Initialise with default immediately so the page renders right away
  const [value,  setValue]  = useState(() => question ? defaultAnswer(question.type) : '')
  const [saving, setSaving] = useState(false)
  const [dir,    setDir]    = useState(1)
  const prevRef  = useRef(stepNum)
  const autoRef  = useRef(null)

  // Once the store has loaded saved answers, hydrate the current step
  useEffect(() => {
    if (!loaded || !question) return
    const saved = getAnswer(stepNum)
    if (saved !== null && saved !== undefined) setValue(saved)
    else setValue(defaultAnswer(question.type))
  }, [loaded, stepNum]) // eslint-disable-line react-hooks/exhaustive-deps

  // Track animation direction
  useEffect(() => {
    setDir(stepNum > prevRef.current ? 1 : -1)
    prevRef.current = stepNum
  }, [stepNum])

  // Cleanup any pending auto-advance on unmount
  useEffect(() => () => { if (autoRef.current) clearTimeout(autoRef.current) }, [])

  const doSaveAndAdvance = useCallback(async (val) => {
    if (saving || !question) return
    const v = val !== undefined ? val : value
    if (!isValid(question.type, v)) return

    setSaving(true)
    setAnswer(stepNum, v)

    await fetch('/api/onboarding/save', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        step: stepNum, section: question.section,
        question: question.question, answer: v,
      }),
    })

    if (stepNum === TOTAL_STEPS) {
      await fetch('/api/onboarding/complete', { method: 'POST' })
      router.push('/dashboard')
    } else {
      setDir(1)
      router.push(`/onboarding/${stepNum + 1}`)
    }
    setSaving(false)
  }, [saving, value, question, stepNum, setAnswer, router]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAutoAdvance = useCallback((val) => {
    if (autoRef.current) clearTimeout(autoRef.current)
    autoRef.current = setTimeout(() => doSaveAndAdvance(val), 380)
  }, [doSaveAndAdvance])

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (!question) return
      const isTyping = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)

      if (!isTyping && (question.type === 'select' || question.type === 'multiselect')) {
        const idx = e.key.toUpperCase().charCodeAt(0) - 65
        if (idx >= 0 && idx < (question.options?.length ?? 0)) {
          e.preventDefault()
          const opt = question.options[idx]
          if (question.type === 'select') {
            setValue(opt)
            handleAutoAdvance(opt)
          } else {
            setValue(prev => {
              const cur = Array.isArray(prev) ? prev : []
              return cur.includes(opt) ? cur.filter(v => v !== opt) : [...cur, opt]
            })
          }
        }
      }

      if (!isTyping && question.type === 'boolean') {
        if (e.key.toLowerCase() === 'y') { setValue(true);  handleAutoAdvance(true)  }
        if (e.key.toLowerCase() === 'n') { setValue(false); handleAutoAdvance(false) }
      }

      if (e.key === 'Enter' && !isTyping && !saving) {
        e.preventDefault()
        doSaveAndAdvance()
      }

      if (e.key === 'Backspace' && !isTyping && stepNum > 1) {
        router.push(`/onboarding/${stepNum - 1}`)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [question, saving, stepNum, handleAutoAdvance, doSaveAndAdvance, router])

  // Guard — if step number is invalid, redirect
  if (!question) {
    router.replace('/onboarding/1')
    return null
  }

  const valid   = isValid(question.type, value)
  const isLast  = stepNum === TOTAL_STEPS
  const pct     = Math.round((stepNum / TOTAL_STEPS) * 100)
  const meta    = SECTION_META[question.section] ?? SECTION_META.business_basics
  const padStep = String(stepNum).padStart(2, '0')

  return (
    <div className="flex flex-col min-h-screen bg-surface-0">

      {/* Fixed top bar */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between px-5 sm:px-10 bg-surface-0/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-sm text-ink-muted hover:text-ink-bright transition-colors">
          <span className="w-6 h-6 rounded-lg bg-brand-violet flex items-center justify-center text-[10px] font-black text-white">S</span>
          Social AI
        </Link>
        <div className="flex items-center gap-3">
          <span className={`hidden sm:block text-xs font-semibold ${meta.accentClass}`}>
            {meta.label}
          </span>
          <span className="text-xs text-ink-muted tabular-nums">
            {stepNum} / {TOTAL_STEPS}
          </span>
        </div>
      </header>

      {/* Progress bar */}
      <div className="fixed top-14 inset-x-0 z-40 h-[2px] bg-edge-subtle">
        <motion.div
          style={{ backgroundColor: meta.progressColor }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full"
        />
      </div>

      {/* Main question area */}
      <main className="flex-1 flex items-center justify-center px-5 sm:px-10 pt-24 pb-28">

        {/* Background step number — inline style for guaranteed opacity */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span
            className="font-display font-black leading-none"
            style={{ fontSize: '20rem', color: 'rgba(240, 244, 255, 0.03)' }}
          >
            {padStep}
          </span>
        </div>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={stepNum}
            custom={dir}
            initial={(d) => ({ opacity: 0, x: d * 40 })}
            animate={{ opacity: 1, x: 0 }}
            exit={(d) => ({ opacity: 0, x: d * -40 })}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[620px]"
          >
            {/* Section label */}
            <p className={`text-xs font-semibold uppercase tracking-widest mb-5 ${meta.accentClass}`}>
              {meta.label}
            </p>

            {/* Question */}
            <h2
              className="font-display font-bold text-ink-bright mb-8 leading-tight"
              style={{ fontSize: question.question.length > 55 ? '1.75rem' : '2.125rem' }}
            >
              {question.question}
            </h2>

            {/* Answer */}
            <AnswerInput
              question={question}
              value={value}
              onChange={setValue}
              onAutoAdvance={
                question.type === 'select' || question.type === 'boolean'
                  ? handleAutoAdvance   // slight delay for visual selection feedback
                  : doSaveAndAdvance    // immediate for text / multiselect Enter
              }
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed bottom nav */}
      <footer className="fixed bottom-0 inset-x-0 z-50 h-20 flex items-center justify-between px-5 sm:px-10 border-t border-edge-subtle bg-surface-0/90 backdrop-blur-lg">

        <button
          type="button"
          onClick={() => { setDir(-1); router.push(`/onboarding/${stepNum - 1}`) }}
          disabled={stepNum <= 1}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-ink-muted hover:text-ink hover:bg-surface-2 transition-all disabled:opacity-0 disabled:pointer-events-none"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <p className="hidden sm:block text-xs text-ink-muted">
          {question.type === 'select'  && 'Select an option to continue'}
          {question.type === 'boolean' && 'Press Y or N'}
          {question.type === 'multiselect' && 'Select all that apply · Enter to continue'}
          {question.type === 'text'    && 'Enter to continue'}
        </p>

        <button
          type="button"
          onClick={() => doSaveAndAdvance()}
          disabled={!valid || saving}
          className={[
            'inline-flex items-center gap-2 px-6 py-3 rounded-pill text-sm font-semibold transition-all',
            valid && !saving
              ? 'bg-brand-gold text-surface-0 hover:bg-brand-gold2 shadow-glow-gold hover:-translate-y-0.5'
              : 'bg-surface-2 text-ink-muted cursor-not-allowed',
          ].join(' ')}
        >
          {saving
            ? <><Loader2 size={14} className="animate-spin" /> Saving…</>
            : isLast
              ? <>Finish <ChevronRight size={14} /></>
              : <>Continue <ArrowRight size={14} /></>
          }
        </button>
      </footer>
    </div>
  )
}
