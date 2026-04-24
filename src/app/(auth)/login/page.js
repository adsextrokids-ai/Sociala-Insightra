'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { loginSchema } from '@/lib/validation/auth'
import AuthCard from '@/components/auth/AuthCard'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Banner from '@/components/ui/Banner'
import PasswordField from '@/components/auth/PasswordField'

function LoginForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const redirectTo   = searchParams.get('redirect')
  const resetSuccess = searchParams.get('reset') === 'success'

  const [email,     setEmail]     = useState('')
  const [password,  setPassword]  = useState('')
  const [remember,  setRemember]  = useState(false)
  const [errors,    setErrors]    = useState({})
  const [authError, setAuthError] = useState(null)
  const [loading,   setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})
    setAuthError(null)

    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      const fe = {}
      result.error.issues.forEach(i => { fe[i.path[0]] = i.message })
      setErrors(fe)
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { persistSession: remember },
    })

    if (error) {
      setAuthError('Invalid email or password.')
      setLoading(false)
      return
    }

    // Ensure profile row exists (for users who signed up before migration was applied)
    await fetch('/api/auth/sync-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    // Check onboarding status
    const { data: { user } } = await supabase.auth.getUser()
    const { data: userData }  = await supabase
      .from('users')
      .select('onboarding_completed')
      .eq('id', user.id)
      .single()

    if (userData?.onboarding_completed) {
      router.push(redirectTo || '/dashboard')
    } else {
      router.push('/onboarding/1')
    }
  }

  return (
    <AuthCard title="Welcome back" subtitle="Log in to your Social AI account">
      {resetSuccess && (
        <Banner variant="success" className="mb-6">
          Password reset. Log in with your new password.
        </Banner>
      )}
      {authError && (
        <Banner variant="error" className="mb-6">
          {authError}
        </Banner>
      )}

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

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-body-sm font-medium text-content-primary">Password</span>
              <Link href="/forgot-password" className="text-body-sm text-accent-blue hover:text-accent-blue/80 transition-colors">
                Forgot password?
              </Link>
            </div>
            <PasswordField
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              autoComplete="current-password"
              showStrength={false}
            />
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <Checkbox id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} />
            <span className="text-body-sm text-content-secondary">Remember me</span>
          </label>

          <Button type="submit" loading={loading} disabled={loading} className="w-full mt-2">
            Log in
          </Button>
        </div>
      </form>

      <p className="text-center text-body-sm text-content-secondary mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-accent-blue hover:text-accent-blue/80 font-medium transition-colors">
          Sign up free
        </Link>
      </p>
    </AuthCard>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="bg-white rounded-card shadow-card-lg p-10 h-64 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
