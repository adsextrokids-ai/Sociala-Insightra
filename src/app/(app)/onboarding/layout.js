'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useOnboardingStore } from '@/store/onboardingStore'

export default function OnboardingLayout({ children }) {
  const { loadAnswers, loaded } = useOnboardingStore()

  useEffect(() => {
    if (loaded) return
    fetch('/api/onboarding/answers')
      .then(r => r.json())
      .then(d => loadAnswers(d.answers || []))
      .catch(() => loadAnswers([]))
  }, [loaded, loadAnswers])

  return (
    <div className="min-h-screen bg-surface-0 flex flex-col">
      {children}
    </div>
  )
}
