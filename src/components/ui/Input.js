export default function Input({ label, error, type = 'text', className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={[
          'w-full h-12 px-4 rounded-xl border text-sm text-ink-bright',
          'bg-surface-2 placeholder:text-ink-ghost',
          'outline-none transition-all duration-150',
          error
            ? 'border-bad focus:ring-2 focus:ring-bad/25'
            : 'border-edge focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20',
        ].join(' ')}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-bad">{error}</p>}
    </div>
  )
}
