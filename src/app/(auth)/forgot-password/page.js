'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { forgotPasswordSchema } from '@/lib/validation/auth'
import AuthCard from '@/components/auth/AuthCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Banner from '@/components/ui/Banner'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [errors,  setErrors]  = useState({})
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})

    const result = forgotPasswordSchema.safeParse({ email })
    if (!result.success) {
      const fe = {}
      result.error.issues.forEach(i => { fe[i.path[0]] = i.message })
      setErrors(fe)
      return
    }

    setLoading(true)
    const supabase    = createClient()
    const redirectTo  = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`

    await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    // Always show the same message — never reveal whether email exists
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <AuthCard title="Check your email" subtitle="We sent you a reset link">
        <Banner variant="success" className="mb-6">
          If that email is registered, we&apos;ve sent a reset link. Check your spam folder if you don&apos;t see it.
        </Banner>
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-body-sm text-content-secondary hover:text-content-primary transition-colors mt-2"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Forgot password?" subtitle="Enter your email and we'll send a reset link">
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <Button type="submit" loading={loading} disabled={loading} className="w-full mt-2">
            Send reset link
          </Button>
        </div>
      </form>

      <Link
        href="/login"
        className="flex items-center justify-center gap-2 text-body-sm text-content-secondary hover:text-content-primary transition-colors mt-6"
      >
        <ArrowLeft size={14} />
        Back to login
      </Link>
    </AuthCard>
  )
}
