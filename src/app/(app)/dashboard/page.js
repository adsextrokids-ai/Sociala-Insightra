'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [name, setName] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.from('users').select('full_name').single().then(({ data }) => {
      setName(data?.full_name?.split(' ')[0] || '')
    })
  }, [])

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center mb-6 shadow-lg">
        <Sparkles size={28} className="text-white" />
      </div>
      <h1 className="text-display-md font-display font-bold text-content-primary mb-3">
        {name ? `Welcome, ${name}!` : 'You\'re in!'}
      </h1>
      <p className="text-body-lg text-content-secondary max-w-[460px] mb-8">
        Your onboarding is complete. The full AI dashboard is coming in the next milestone — you&apos;re ahead of the curve.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/onboarding/1"
          className="px-6 py-3 rounded-lg border border-gray-200 text-body-sm font-medium text-content-secondary hover:bg-bg-secondary transition-colors"
        >
          Review my answers
        </Link>
      </div>
    </div>
  )
}
