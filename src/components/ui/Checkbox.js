export default function Checkbox({ id, checked, onChange, className = '' }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`w-4 h-4 rounded border-gray-300 text-accent-blue focus:ring-accent-blue/30 cursor-pointer accent-accent-blue ${className}`}
    />
  )
}
