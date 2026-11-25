import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import ThemeToggle from "../../../components/ui/ThemeToggle";

export default function TenantDashboardPage() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setLoggingOut(true);
    setError("");

    try {
      await logout();
    } catch (err) {
      setError(err.message || "Unable to logout. Please try again.");
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
        <h1 className="mb-0 text-xl font-semibold">
          Rent<span className="text-secondary">App</span>
        </h1>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="icon" />
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-2xl font-semibold">Welcome back, {user?.loginId}!</h2>

        <section className="mt-8 rounded-2xl border border-border bg-surface p-8">
          <h3 className="text-xl font-semibold">Tenant Dashboard</h3>
          <p className="mb-0 mt-3 text-sm text-text-soft">
            View your rent bills, utility bills and payment information.
          </p>
        </section>

        {error && (
          <p className="mt-5 text-sm text-danger" role="alert">{error}</p>
        )}
      </main>
    </div>
  );
}