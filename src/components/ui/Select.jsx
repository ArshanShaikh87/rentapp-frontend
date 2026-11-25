export default function Select({
  label,
  id,
  error,
  options = [],
  placeholder,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-text">
          {label}
        </label>
      )}

      <select
        id={id}
        className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text outline-none transition focus:border-secondary focus:ring-4 focus:ring-secondary/10 disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? "border-danger" : "border-border"
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mb-0 mt-2 text-xs font-medium text-danger" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}