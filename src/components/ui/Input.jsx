
export default function Input({
  label,
  id,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-text"
      >
        {label}
      </label>

      <input
        id={id}
        className={`w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-soft/65 focus:border-secondary focus:ring-4 focus:ring-secondary/10 disabled:cursor-not-allowed disabled:opacity-60 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger/10"
            : "border-border"
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />

      {error && (
        <p
          className="mb-0 mt-2 text-xs font-medium text-danger"
          id={`${id}-error`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
