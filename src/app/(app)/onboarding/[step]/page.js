'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { QUESTIONS, TOTAL_STEPS, SECTION_COLORS } from '@/config/questions'
import { useOnboardingStore } from '@/store/onboardingStore'
import AnswerInput from '@/components/onboarding/AnswerInput'

function getDefaultAnswer(type) {
  if (type === 'multiselect') return []
  if (type === 'boolean') return null
  return ''
}

function isAnswerValid(type, value) {
  if (value === null || value === undefined) return false
  if (type === 'text') return String(value).trim().length > 0
  if (type === 'select') return Boolean(value)
  if (type === 'multiselect') return Array.isArray(value) && value.length > 0
  if (type === 'boolean') return value !== null && value !== undefined
  return false
}

export default function OnboardingStepPage() {
  const params  = useParams()
  const router  = useRouter()
  const stepNum = parseInt(params.step, 10)

  const { answers, setAnswer, getAnswer, loaded } = useOnboardingStore()
  const question = QUESTIONS.find(q => q.step === stepNum)

  const [value,   setValue]   = useState(null)
  const [saving,  setSaving]  = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward
  const prevStep = useRef(stepNum)

  // Sync answer from store when store loads or step changes
  useEffect(() => {
    if (loaded) {
      const existing = getAnswer(stepNum)
      setValue(existing ?? getDefaultAnswer(question?.type))
    }
  }, [loaded, stepNum])

  // Determine animation direction
  useEffect(() => {
    setDirection(stepNum > prevStep.current ? 1 : -1)
    prevStep.current = stepNum
  }, [stepNum])

  if (!question) {
    router.replace('/onboarding/1')
    return null
  }

  const isValid = isAnswerValid(question.type, value)
  const isLast  = stepNum === TOTAL_STEPS
  const pct     = Math.round((stepNum / TOTAL_STEPS) * 100)
  const colors  = SECTION_COLORS[question.section] || SECTION_COLORS.business_basics

  async function handleNext() {
    if (!isValid || saving) return
    setSaving(true)

    // Persist to store immediately
    setAnswer(stepNum, value)

    // Save to DB
    await fetch('/api/onboarding/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        step: stepNum,
        section: question.section,
        question: question.question,
        answer: value,
      }),
    })

    if (isLast) {
      await fetch('/api/onboarding/complete', { method: 'POST' })
      router.push('/dashboard')
    } else {
      setDirection(1)
      router.push(`/onboarding/${stepNum + 1}`)
    }

    setSaving(false)
  }

  function handleBack() {
    if (stepNum <= 1) return
    setDirection(-1)
    router.push(`/onboarding/${stepNum - 1}`)
  }

  const slideVariants = {
    enter:  (d) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d * -40 }),
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Step counter */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-4 border-b border-gray-100 bg-white">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-label font-medium ${colors.bg} ${colors.text}`}>
          {question.sectionLabel}
        </span>
        <span className="text-label text-content-secondary">
          {stepNum} <span className="text-content-secondary/50">of</span> {TOTAL_STEPS}
        </span>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={stepNum}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[640px]"
          >
            {/* Question text */}
            <h2 className="text-display-md font-display font-semibold text-content-primary mb-8 text-balance leading-snug">
              {question.question}
            </h2>

            {/* Input */}
            <AnswerInput question={question} value={value} onChange={setValue} />

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              <button
                type="button"
                onClick={handleBack}
                disabled={stepNum <= 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-body-sm font-medium text-content-secondary hover:text-content-primary hover:bg-bg-secondary transition-all disabled:opacity-0"
              >
                <ArrowLeft size={16} />
                Back
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!isValid || saving}
                className={[
                  'inline-flex items-center gap-2 px-7 py-3 rounded-pill text-body-sm font-medium transition-all',
                  isValid && !saving
                    ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-md hover:opacity-90 hover:-translate-y-0.5'
                    : 'bg-gray-100 text-content-secondary cursor-not-allowed',
                ].join(' ')}
              >
                {saving
                  ? <><Loader2 size={15} className="animate-spin" /> Saving…</>
                  : isLast
                    ? <>Finish & see results <ArrowRight size={15} /></>
                    : <>Continue <ArrowRight size={15} /></>
                }
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
