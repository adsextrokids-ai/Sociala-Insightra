export default function Input({ label, error, type = 'text', className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-body-sm font-medium text-content-primary mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        className={[
          'w-full h-12 px-4 rounded-lg border text-body-sm text-content-primary',
          'bg-bg-secondary placeholder:text-content-secondary/50',
          'outline-none transition-all duration-150',
          error
            ? 'border-status-error focus:ring-2 focus:ring-status-error/25'
            : 'border-gray-200 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20',
        ].join(' ')}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-label text-status-error">{error}</p>
      )}
    </div>
  )
}
