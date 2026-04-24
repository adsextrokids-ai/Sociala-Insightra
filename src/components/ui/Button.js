import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:opacity-90 shadow-md hover:shadow-lg hover:-translate-y-0.5',
  solid:   'bg-accent-blue text-white hover:bg-accent-blue/90',
  outline: 'border border-gray-200 bg-white text-content-primary hover:bg-bg-secondary',
  ghost:   'text-content-secondary hover:text-content-primary hover:bg-bg-secondary',
}

export default function Button({
  children,
  loading   = false,
  disabled  = false,
  variant   = 'primary',
  type      = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg',
        'font-medium text-body-sm transition-all duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        VARIANTS[variant] ?? VARIANTS.primary,
        className,
      ].join(' ')}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}
