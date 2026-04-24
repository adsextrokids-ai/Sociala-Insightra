'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [name, setName] = useState('')

  useEffect(() => {
    createClient().from('users').select('full_name').single()
      .then(({ data }) => setName(data?.full_name?.split(' ')[0] || ''))
  }, [])

  return (
    <div className="min-h-screen bg-surface-0 flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-violet/20 border border-brand-violet/30 flex items-center justify-center mb-6 shadow-glow">
        <Sparkles size={26} className="text-brand-violet2" />
      </div>
      <h1 className="font-display text-h1 font-bold text-ink-bright mb-3">
        {name ? `Welcome, ${name}.` : 'You\'re in.'}
      </h1>
      <p className="text-base text-ink-muted max-w-[440px] mb-8">
        Onboarding complete. The AI dashboard ships in the next milestone —
        your profile data is saved and ready.
      </p>
      <Link
        href="/onboarding/1"
        className="px-6 py-2.5 rounded-xl border border-edge text-sm text-ink-muted hover:border-edge-bright hover:text-ink transition-all"
      >
        Review my answers
      </Link>
    </div>
  )
}
