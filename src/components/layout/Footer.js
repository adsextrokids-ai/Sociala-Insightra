import Link from 'next/link'

const COLS = [
  {
    heading: 'Product',
    links: [{ label: 'Features', href: '/#features' }, { label: 'Pricing', href: '/#pricing' }],
  },
  {
    heading: 'Company',
    links: [{ label: 'About', href: '#' }, { label: 'Contact', href: '#' }],
  },
  {
    heading: 'Legal',
    links: [{ label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' }],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-edge-subtle bg-surface-1">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display font-bold text-lg text-ink-bright flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded bg-brand-violet flex items-center justify-center text-[10px] font-black text-white">S</span>
              Social AI
            </Link>
            <p className="text-sm text-ink-muted">AI business intelligence for social media.</p>
          </div>
          {COLS.map(col => (
            <div key={col.heading}>
              <p className="text-xs text-ink-ghost font-semibold uppercase tracking-widest mb-4">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-ink-muted hover:text-ink transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-edge-subtle text-center">
          <p className="text-xs text-ink-ghost">&copy; 2025 Social AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
