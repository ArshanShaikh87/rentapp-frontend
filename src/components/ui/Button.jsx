const variants = {
  primary:
    "bg-secondary text-secondary-text shadow-lg shadow-secondary/15 hover:-translate-y-0.5 hover:bg-secondary/90 hover:shadow-xl",
  outline:
    "border border-border bg-surface text-text hover:bg-surface-secondary",
  danger:
    "bg-danger text-white shadow-lg shadow-danger/15 hover:-translate-y-0.5 hover:opacity-90",
};

const sizes = {
  md: "min-h-12 px-5 py-3",
  sm: "min-h-10 px-4 py-2",
};

export default function Button({
  children,
  type = "button",
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = true,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${
        fullWidth ? "w-full" : ""
      } ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4 animate-spin"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
            opacity=".25"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}

      {loading ? "Please wait..." : children}
    </button>
  );
}