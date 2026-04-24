import Link from 'next/link'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-0 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-brand-violet/8 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-3xl" />
        <div className="absolute inset-0 bg-grid bg-[length:48px_48px] opacity-100 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,black,transparent)]" />
      </div>

      {/* Logo */}
      <Link href="/" className="relative z-10 font-display font-bold text-lg text-ink-bright flex items-center gap-2 mb-8">
        <span className="w-7 h-7 rounded-lg bg-brand-violet flex items-center justify-center text-[11px] font-black text-white">S</span>
        Social AI
      </Link>

      {/* Card slot */}
      <div className="relative z-10 w-full max-w-[420px]">
        {children}
      </div>
    </div>
  )
}
