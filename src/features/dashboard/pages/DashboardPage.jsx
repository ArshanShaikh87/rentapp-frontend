
import { useState } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import OwnerLayout from "../../../layouts/OwnerLayout";
import {
  Building2,
  House,
  Users,
  Clock3,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const isOwner = user?.role === "OWNER";
  const isTenant = user?.role === "TENANT";

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

  // Owner Dashboard
  if (isOwner) {
    return (

<OwnerLayout activeItem="Dashboard">
  {/* Page Heading */}
  <section className="mb-8">
    <p className="text-sm text-text-soft">Overview</p>

    <h1 className="mt-2 text-2xl font-semibold text-text">
      Welcome back, {user?.loginId}!
    </h1>

    <p className="mt-2 text-sm text-text-soft">
      Here's what's happening with your properties.
    </p>
  </section>

  {/* Summary Cards */}
  <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
    {[
      {
        title: "Total Societies",
        icon: Building2,
      },
      {
        title: "Total Properties",
        icon: House,
      },
      {
        title: "Active Tenants",
        icon: Users,
      },
      {
        title: "Pending Payments",
        icon: Clock3,
      },
    ].map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={item.title}
          className="rounded-2xl border border-border bg-surface p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-soft">
              {item.title}
            </p>

            <div className="rounded-xl bg-surface-secondary p-3 text-secondary">
              <Icon size={21} />
            </div>
          </div>

          <h2 className="mt-5 text-3xl font-bold text-text">
            —
          </h2>

          <p className="mt-2 text-xs text-text-soft">
            Data will be connected soon
          </p>
        </div>
      );
    })}
  </section>

  {/* Recent Activity */}
  <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
    <div className="flex items-center gap-3">
      <Activity size={21} className="text-secondary" />

      <div>
        <h2 className="font-semibold text-text">
          Recent Activity
        </h2>

        <p className="text-sm text-text-soft">
          Latest updates from your rental management
        </p>
      </div>
    </div>

    <div className="mt-8 flex flex-col items-center justify-center py-10 text-center">
      <Activity size={32} className="text-text-soft" />

      <p className="mt-4 font-medium text-text">
        No recent activity
      </p>

      <p className="mt-2 text-sm text-text-soft">
        Your latest activities will appear here.
      </p>
    </div>
  </section>
</OwnerLayout>

    );
  }

  // Tenant Dashboard
  if (isTenant) {
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
            className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">
          <h2 className="text-2xl font-semibold">
            Welcome back, {user?.loginId}!
          </h2>

          <section className="mt-8 rounded-2xl border border-border bg-surface p-8">
            <h3 className="text-xl font-semibold">
              Tenant Dashboard
            </h3>

            <p className="mt-3 text-sm text-text-soft">
              View your rent bills, utility bills and payment information.
            </p>
          </section>

          {error && (
            <p className="mt-5 text-sm text-danger" role="alert">
              {error}
            </p>
          )}
        </main>
      </div>
    );
  }

  return (
    <p className="p-8 text-danger">
      Your account does not have a supported role.
    </p>
  );
}
