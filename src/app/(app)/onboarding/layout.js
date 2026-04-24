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
    <div className="min-h-screen bg-surface-0">
      <header className="h-16 border-b border-edge-subtle bg-surface-1 flex items-center px-5 sm:px-8">
        <Link href="/" className="font-display font-bold text-base text-ink-bright flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-brand-violet flex items-center justify-center text-[10px] font-black text-white">S</span>
          Social AI
        </Link>
      </header>
      {children}
    </div>
  )
}
