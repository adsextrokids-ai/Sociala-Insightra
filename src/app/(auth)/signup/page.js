'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { signupSchema } from '@/lib/validation/auth'
import AuthCard from '@/components/auth/AuthCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Banner from '@/components/ui/Banner'
import PasswordField from '@/components/auth/PasswordField'

export default function SignupPage() {
  const router = useRouter()

  const [fullName,  setFullName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [terms,     setTerms]     = useState(false)
  const [errors,    setErrors]    = useState({})
  const [authError, setAuthError] = useState(null)
  const [loading,   setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})
    setAuthError(null)

    const result = signupSchema.safeParse({
      full_name: fullName, email, password,
      confirm_password: confirm, terms,
    })
    if (!result.success) {
      const fe = {}
      result.error.issues.forEach(i => { fe[i.path[0]] = i.message })
      setErrors(fe)
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })

    if (error) {
      const msg = error.message || ''
      if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('already_exists')) {
        setAuthError('already_registered')
      } else {
        setAuthError(msg || 'Something went wrong. Please try again.')
      }
      setLoading(false)
      return
    }

    // Ensure the public.users profile row exists (failsafe if trigger missed)
    await fetch('/api/auth/sync-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName }),
    })

    router.push('/onboarding/1')
  }

  return (
    <AuthCard title="Create your account" subtitle="Start your free AI business audit">
      {authError === 'already_registered' && (
        <Banner variant="error" className="mb-6">
          An account with this email already exists.{' '}
          <Link href="/login" className="underline font-medium">Log in instead</Link>
        </Banner>
      )}
      {authError && authError !== 'already_registered' && (
        <Banner variant="error" className="mb-6">
          {authError}
        </Banner>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <Input
            label="Full name"
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            error={errors.full_name}
            placeholder="Jane Smith"
            autoComplete="name"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <PasswordField
            label="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            autoComplete="new-password"
            showStrength
          />
          <PasswordField
            label="Confirm password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            error={errors.confirm_password}
            placeholder="••••••••"
            autoComplete="new-password"
            showStrength={false}
          />

          <div>
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <Checkbox
                id="terms"
                checked={terms}
                onChange={e => setTerms(e.target.checked)}
                className="mt-0.5"
              />
              <span className="text-body-sm text-content-secondary leading-snug">
                I agree to the{' '}
                <Link href="/terms" className="text-accent-blue hover:text-accent-blue/80 transition-colors">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-accent-blue hover:text-accent-blue/80 transition-colors">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="mt-1.5 text-label text-status-error">{errors.terms}</p>
            )}
          </div>

          <Button type="submit" loading={loading} disabled={loading || !terms} className="w-full mt-2">
            Create account
          </Button>
        </div>
      </form>

      <p className="text-center text-body-sm text-content-secondary mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-accent-blue hover:text-accent-blue/80 font-medium transition-colors">
          Log in
        </Link>
      </p>
    </AuthCard>
  )
}
