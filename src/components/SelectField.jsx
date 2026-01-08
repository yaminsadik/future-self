/**
 * Native select field with a custom chevron.
 *
 * Props:
 * - label: string (shown above the field)
 * - value: string
 * - onChange: (newValue: string) => void
 * - placeholder: string
 * - options: Array<{ id: string, label: string }>
 */
export default function SelectField({
  label,
  value,
  onChange,
  placeholder,
  options,
}) {
  return (
    <div>
      {label ? (
        <label className="block text-sm font-medium text-textPrimary mb-2">
          {label}
        </label>
      ) : null}

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full appearance-none
            rounded-row border border-border bg-surface
            px-4 py-3 pr-12
            text-base text-textPrimary
            transition-colors duration-200
            focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
          "
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
