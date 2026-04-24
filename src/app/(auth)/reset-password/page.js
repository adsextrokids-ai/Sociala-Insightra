'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { resetPasswordSchema } from '@/lib/validation/auth'
import AuthCard from '@/components/auth/AuthCard'
import Button from '@/components/ui/Button'
import Banner from '@/components/ui/Banner'
import PasswordField from '@/components/auth/PasswordField'

function ResetPasswordForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()

  const [status,   setStatus]   = useState('loading')  // loading | ready | expired | submitting
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [errors,   setErrors]   = useState({})

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) {
      router.replace('/forgot-password')
      return
    }
    createClient()
      .auth.exchangeCodeForSession(code)
      .then(({ error }) => setStatus(error ? 'expired' : 'ready'))
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})

    const result = resetPasswordSchema.safeParse({ password, confirm_password: confirm })
    if (!result.success) {
      const fe = {}
      result.error.issues.forEach(i => { fe[i.path[0]] = i.message })
      setErrors(fe)
      return
    }

    setStatus('submitting')
    const { error } = await createClient().auth.updateUser({ password })

    if (error) {
      setStatus('expired')
    } else {
      router.push('/login?reset=success')
    }
  }

  if (status === 'loading') {
    return (
      <AuthCard>
        <div className="flex justify-center py-8">
          <div className="w-5 h-5 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthCard>
    )
  }

  if (status === 'expired') {
    return (
      <AuthCard title="Link expired" subtitle="This reset link is no longer valid">
        <Banner variant="error" className="mb-6">
          This reset link has expired or already been used.
        </Banner>
        <Link
          href="/forgot-password"
          className="flex items-center justify-center gap-2 text-body-sm text-accent-blue hover:text-accent-blue/80 font-medium transition-colors"
        >
          Request a new link
        </Link>
      </AuthCard>
    )
  }

  return (
    <AuthCard title="Set new password" subtitle="Choose a strong password for your account">
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <PasswordField
            label="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            autoComplete="new-password"
            showStrength
          />
          <PasswordField
            label="Confirm new password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            error={errors.confirm_password}
            placeholder="••••••••"
            autoComplete="new-password"
            showStrength={false}
          />
          <Button
            type="submit"
            loading={status === 'submitting'}
            disabled={status === 'submitting'}
            className="w-full mt-2"
          >
            Set new password
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="bg-white rounded-card shadow-card-lg p-10 h-48 flex items-center justify-center"><div className="w-5 h-5 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" /></div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
