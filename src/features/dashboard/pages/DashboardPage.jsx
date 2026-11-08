
import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";

export default function DashboardPage() {
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
    } finally {
      setLoggingOut(false);
    }
  }

  const isOwner = user?.role === "OWNER";
  const isTenant = user?.role === "TENANT";

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
        <h1 className="text-xl font-semibold">
          Rent<span className="text-secondary">App</span>
        </h1>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-8">
          <p className="text-sm text-text-soft">Welcome back</p>

          <h2 className="mt-2 text-3xl font-semibold">
            {user?.loginId}
          </h2>

          <p className="mt-2 text-sm text-text-soft">
            Role: {user?.role}
          </p>
        </section>

        {isOwner && (
          <section className="rounded-2xl border border-border bg-surface p-8">
            <h3 className="text-xl font-semibold">
              Owner Dashboard
            </h3>

            <p className="mt-3 text-sm text-text-soft">
              Manage your societies, properties, tenants and rent payments.
            </p>
          </section>
        )}

        {isTenant && (
          <section className="rounded-2xl border border-border bg-surface p-8">
            <h3 className="text-xl font-semibold">
              Tenant Dashboard
            </h3>

            <p className="mt-3 text-sm text-text-soft">
              View your rent bills, utility bills and payment information.
            </p>
          </section>
        )}

        {!isOwner && !isTenant && (
          <p className="text-danger">
            Your account does not have a supported role.
          </p>
        )}

        {error && (
          <p className="mt-5 text-sm text-danger" role="alert">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}
