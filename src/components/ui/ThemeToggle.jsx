import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * variant="pill" -> icon + label (login page)
 * variant="icon" -> icon only (topbar)
 */
export default function ThemeToggle({ variant = "pill" }) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const Icon = isDark ? Sun : Moon;

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        title={label}
        className="rounded-full p-2 text-text-soft transition-colors hover:bg-surface-secondary hover:text-text"
      >
        <Icon size={20} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-text transition hover:border-secondary hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-sm"
    >
      <Icon size={16} aria-hidden="true" />
      <span>{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}