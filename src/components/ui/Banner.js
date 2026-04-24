import { CheckCircle, XCircle, Info } from 'lucide-react'

const V = {
  success: { bg: 'bg-ok/8',          border: 'border-ok/20',          text: 'text-ok',          Icon: CheckCircle },
  error:   { bg: 'bg-bad/8',         border: 'border-bad/20',         text: 'text-bad',         Icon: XCircle     },
  info:    { bg: 'bg-brand-violet/8', border: 'border-brand-violet/20', text: 'text-brand-violet2', Icon: Info       },
}

export default function Banner({ variant = 'info', children, className = '' }) {
  const { bg, border, text, Icon } = V[variant] ?? V.info
  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${bg} ${border} ${className}`}>
      <Icon size={15} className={`${text} flex-shrink-0 mt-0.5`} />
      <p className={`text-sm ${text} leading-snug`}>{children}</p>
    </div>
  )
}
