export default function Checkbox({ id, checked, onChange, className = '' }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`w-4 h-4 rounded border-edge bg-surface-2 text-brand-violet focus:ring-brand-violet/30 cursor-pointer accent-brand-violet ${className}`}
    />
  )
}
