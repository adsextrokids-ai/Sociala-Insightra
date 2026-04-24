'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
  { href: '#features',     label: 'Features'     },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing',      label: 'Pricing'      },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [user,       setUser]       = useState(null)
  const [authReady,  setAuthReady]  = useState(false)

  // Scroll detection — adds background on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Auth state
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null)
      setAuthReady(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  // CTAs: show logged-out buttons immediately (never hidden),
  // swap to "Open dashboard" only once auth confirms user is logged in.
  const showDashboard = authReady && !!user

  return (
    <nav
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface-1/95 backdrop-blur-xl border-b border-edge-subtle'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-base text-ink-bright">
          <span className="w-7 h-7 rounded-lg bg-brand-violet flex items-center justify-center text-[11px] font-black text-white flex-shrink-0">
            S
          </span>
          Social AI
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-ink-muted hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {showDashboard ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 rounded-pill text-sm font-semibold bg-brand-gold text-surface-0 hover:bg-brand-gold2 transition-colors"
            >
              Open dashboard →
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm text-ink-muted hover:text-ink transition-colors">
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center px-4 py-2 rounded-pill text-sm font-semibold bg-brand-gold text-surface-0 hover:bg-brand-gold2 transition-colors shadow-glow-gold"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="md:hidden p-2 -mr-1 text-ink-muted hover:text-ink transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-surface-1 border-t border-edge-subtle"
          >
            <div className="px-5 py-5 flex flex-col gap-4">
              {NAV_LINKS.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-ink-muted hover:text-ink transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-4 border-t border-edge-subtle flex flex-col gap-3">
                {showDashboard ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2.5 px-4 rounded-pill text-sm font-semibold bg-brand-gold text-surface-0 hover:bg-brand-gold2 transition-colors"
                  >
                    Open dashboard →
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-ink-muted hover:text-ink transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="text-center py-2.5 px-4 rounded-pill text-sm font-semibold bg-brand-gold text-surface-0 hover:bg-brand-gold2 transition-colors"
                    >
                      Get started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
