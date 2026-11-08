
import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import AuthLayout from "../../../layouts/AuthLayout";

export default function LoginPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-200">
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 sm:px-8 lg:px-12 xl:px-16">
        <a
          href="/"
          className="inline-flex items-center gap-3 rounded-xl no-underline"
          aria-label="RentApp home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-base font-bold text-secondary-text shadow-sm">
            R
          </span>

          <span className="text-xl font-semibold tracking-tight text-text">
            Rent<span className="text-secondary">App</span>
          </span>
        </a>

        <button
          type="button"
          onClick={() => setDarkMode((current) => !current)}
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          aria-pressed={darkMode}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-text transition hover:border-secondary hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-4 sm:text-sm"
        >
          {darkMode ? (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
              <span>Light mode</span>
            </>
          ) : (
            <>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path d="M20.5 14.1A8.5 8.5 0 0 1 9.9 3.5 8.5 8.5 0 1 0 20.5 14.1Z" />
              </svg>
              <span>Dark mode</span>
            </>
          )}
        </button>
      </header>

      <main>
        <AuthLayout>
          <section className="w-full max-w-[480px] rounded-[28px] border border-border bg-surface p-6 shadow-[0_24px_80px_var(--shadow)] sm:p-9 lg:p-10">
            {/* Mobile-only brand */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary font-bold text-secondary-text">
                R
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Rent<span className="text-secondary">App</span>
              </span>
            </div>

            <div className="mb-8">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/25 px-3 py-1.5 text-[10px] font-semibold tracking-[0.15em] text-text sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                SECURE WORKSPACE ACCESS
              </span>

              <h1 className="mb-3 text-3xl font-semibold leading-tight tracking-tight text-text sm:text-[34px]">
                Welcome back
              </h1>

              <p className="mb-0 text-sm leading-6 text-text-soft">
                Sign in to manage your properties, tenants and rent payments.
              </p>
            </div>

            <LoginForm />

            <div className="mt-8 flex items-center justify-center gap-2 border-t border-border pt-5 text-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-4 w-4 shrink-0 text-secondary"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              <p className="mb-0 text-xs text-text-soft">
                Private access for authorized users
              </p>
            </div>

            <p className="mb-0 mt-5 text-center text-[11px] text-text-soft/80">
              © {new Date().getFullYear()} RentApp. All rights reserved.
            </p>
          </section>
        </AuthLayout>
      </main>
    </div>
  );
}
