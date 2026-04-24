import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-brand-gold text-surface-0 hover:bg-brand-gold2 shadow-glow-gold',
  violet:  'bg-brand-violet text-white hover:bg-brand-violet2',
  outline: 'border border-edge text-ink hover:border-edge-bright hover:bg-surface-2',
  ghost:   'text-ink-muted hover:text-ink hover:bg-surface-2',
}

export default function Button({
  children, loading = false, disabled = false,
  variant = 'primary', type = 'button', className = '', ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-pill',
        'font-semibold text-sm transition-all duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none',
        VARIANTS[variant] ?? VARIANTS.primary,
        className,
      ].join(' ')}
      {...props}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  )
}
