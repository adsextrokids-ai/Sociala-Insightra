import { CheckCircle, XCircle, Info } from 'lucide-react'

const VARIANTS = {
  success: { bg: 'bg-status-success/8',  border: 'border-status-success/20', text: 'text-status-success',  Icon: CheckCircle },
  error:   { bg: 'bg-status-error/8',    border: 'border-status-error/20',   text: 'text-status-error',    Icon: XCircle     },
  info:    { bg: 'bg-accent-blue/8',     border: 'border-accent-blue/20',    text: 'text-accent-blue',     Icon: Info        },
}

export default function Banner({ variant = 'info', children, className = '' }) {
  const { bg, border, text, Icon } = VARIANTS[variant] ?? VARIANTS.info
  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-lg border ${bg} ${border} ${className}`}>
      <Icon size={15} className={`${text} flex-shrink-0 mt-0.5`} />
      <p className={`text-body-sm ${text} leading-snug`}>{children}</p>
    </div>
  )
}
