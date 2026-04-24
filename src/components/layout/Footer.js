import Link from 'next/link'

const PRODUCT_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
]

const COMPANY_LINKS = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
]

const LEGAL_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display font-bold text-lg text-accent-blue block mb-3"
            >
              Social AI
            </Link>
            <p className="text-body-sm text-content-secondary leading-relaxed max-w-[200px]">
              AI-powered business intelligence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-label font-medium text-content-secondary uppercase tracking-widest mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-label font-medium text-content-secondary uppercase tracking-widest mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-label font-medium text-content-secondary uppercase tracking-widest mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-body-sm text-content-secondary text-center">
            &copy; 2025 Social AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
