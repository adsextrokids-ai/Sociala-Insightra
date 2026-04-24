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
      .then(data => loadAnswers(data.answers || []))
      .catch(() => loadAnswers([]))
  }, [loaded, loadAnswers])

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top bar */}
      <header className="h-16 border-b border-gray-100 bg-white flex items-center px-6 sm:px-8">
        <Link href="/" className="font-display font-bold text-lg text-accent-blue tracking-tight">
          Social AI
        </Link>
      </header>

      {children}
    </div>
  )
}
