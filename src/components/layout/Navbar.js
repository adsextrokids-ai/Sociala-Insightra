'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
  { href: '#features',      label: 'Features'     },
  { href: '#how-it-works',  label: 'How it works' },
  { href: '#pricing',       label: 'Pricing'      },
]

export default function Navbar() {
  const [open,        setOpen]        = useState(false)
  const [user,        setUser]        = useState(null)
  const [scrolled,    setScrolled]    = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await createClient().auth.signOut()
    setUser(null)
    setOpen(false)
  }

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-surface-1/90 backdrop-blur-xl border-b border-edge-subtle'
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Wordmark */}
        <Link href="/" className="font-display font-bold text-lg text-ink-bright tracking-tight flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-brand-violet flex items-center justify-center text-[10px] font-black text-white">S</span>
          Social AI
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} className="text-sm text-ink-muted hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {!authLoading && (
            user ? (
              <button onClick={handleSignOut} className="text-sm text-ink-muted hover:text-ink transition-colors">
                Log out
              </button>
            ) : (
              <>
                <Link href="/login" className="text-sm text-ink-muted hover:text-ink transition-colors">Log in</Link>
                <Link href="/signup" className="inline-flex items-center px-4 py-2 rounded-pill text-sm font-medium bg-brand-gold text-surface-0 hover:bg-brand-gold2 transition-colors shadow-glow-gold">
                  Get started
                </Link>
              </>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-1 text-ink-muted hover:text-ink">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-surface-1 border-b border-edge-subtle"
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-ink-muted hover:text-ink transition-colors">
                  {l.label}
                </a>
              ))}
              <div className="pt-4 border-t border-edge-subtle flex flex-col gap-3">
                {!authLoading && (user ? (
                  <button onClick={handleSignOut} className="text-sm text-ink-muted text-left">Log out</button>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setOpen(false)} className="text-sm text-ink-muted hover:text-ink">Log in</Link>
                    <Link href="/signup" onClick={() => setOpen(false)} className="text-center py-2.5 px-4 rounded-pill text-sm font-medium bg-brand-gold text-surface-0 hover:bg-brand-gold2 transition-colors">
                      Get started
                    </Link>
                  </>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
