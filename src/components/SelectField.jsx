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
        <div className="text-lg font-semibold text-textPrimary">{label}</div>
      ) : null}

      <div className={label ? "mt-3" : ""}>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
              w-full appearance-none
              rounded-row border border-border bg-surface
              px-4 py-3 pr-12
              text-base
              focus:outline-none focus:ring-2 focus:ring-primary/30
            "
          >
            <option value="">{placeholder}</option>

            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Chevron */}
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-textSecondary">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
}
