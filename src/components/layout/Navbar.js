'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setAuthLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setIsOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Wordmark */}
          <Link
            href="/"
            className="font-display font-bold text-lg text-accent-blue tracking-tight"
          >
            Social AI
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {!authLoading && (
              user ? (
                <button
                  onClick={handleSignOut}
                  className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center px-4 py-2 text-body-sm font-medium text-white bg-accent-blue hover:bg-accent-blue/90 rounded-lg transition-colors"
                  >
                    Get started
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 text-content-secondary hover:text-content-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-5 flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                {!authLoading && (
                  user ? (
                    <button
                      onClick={handleSignOut}
                      className="text-body-sm text-content-secondary hover:text-content-primary transition-colors text-left"
                    >
                      Log out
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
                      >
                        Log in
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center justify-center px-4 py-2.5 text-body-sm font-medium text-white bg-accent-blue hover:bg-accent-blue/90 rounded-lg transition-colors"
                      >
                        Get started
                      </Link>
                    </>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
