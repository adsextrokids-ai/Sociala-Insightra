import Link from 'next/link'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">

      {/* Background atmosphere */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent-purple/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent-blue/5 blur-3xl" />
      </div>

      {/* Logo */}
      <Link
        href="/"
        className="relative z-10 font-display font-bold text-xl text-accent-blue mb-8 tracking-tight"
      >
        Social AI
      </Link>

      {/* Card slot */}
      <div className="relative z-10 w-full max-w-[440px]">
        {children}
      </div>
    </div>
  )
}
