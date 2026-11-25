import { Link } from "react-router-dom";
import { Activity, Building2, Clock3, House, Users } from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";
import { useAsyncData } from "../../../hooks/useAsyncData";
import { getSocieties } from "../../societies/service/societyService";
import { getProperties } from "../../properties/service/propertyService";

// Module-level so the reference stays stable for useAsyncData.
function loadOverview() {
  return Promise.all([getSocieties(), getProperties()]).then(
    ([societies, properties]) => ({
      societies: societies.length,
      properties: properties.length,
    })
  );
}

// Owner dashboard home. Rendered inside OwnerLayout.
export default function DashboardPage() {
  const { user } = useAuth();
  const { data, loading } = useAsyncData(loadOverview);

  const cards = [
    {
      title: "Total Societies",
      icon: Building2,
      to: "/societies",
      value: loading ? "…" : data?.societies ?? "—",
      hint: data ? "Active societies" : "Unable to load",
    },
    {
      title: "Total Properties",
      icon: House,
      to: "/properties",
      value: loading ? "…" : data?.properties ?? "—",
      hint: data ? "Active properties" : "Unable to load",
    },
    {
      title: "Active Tenants",
      icon: Users,
      to: "/tenants",
      value: "—",
      hint: "Coming soon",
    },
    {
      title: "Pending Payments",
      icon: Clock3,
      to: "/payments",
      value: "—",
      hint: "Coming soon",
    },
  ];

  return (
    <>
      <section className="mb-8">
        <p className="mb-0 text-sm text-text-soft">Overview</p>
        <h1 className="mb-0 mt-2 text-2xl font-semibold text-text">
          Welcome back, {user?.loginId}!
        </h1>
        <p className="mb-0 mt-2 text-sm text-text-soft">
          Here's what's happening with your properties.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.to}
              className="rounded-2xl border border-border bg-surface p-5 no-underline transition hover:border-secondary/40"
            >
              <div className="flex items-center justify-between">
                <p className="mb-0 text-sm font-medium text-text-soft">{item.title}</p>
                <div className="rounded-xl bg-surface-secondary p-3 text-secondary">
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mb-0 mt-5 text-3xl font-bold text-text">{item.value}</h2>
              <p className="mb-0 mt-2 text-xs text-text-soft">{item.hint}</p>
            </Link>
          );
        })}
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <Activity size={21} className="text-secondary" />
          <div>
            <h2 className="mb-0 font-semibold text-text">Recent Activity</h2>
            <p className="mb-0 text-sm text-text-soft">
              Latest updates from your rental management
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center py-10 text-center">
          <Activity size={32} className="text-text-soft" />
          <p className="mb-0 mt-4 font-medium text-text">No recent activity</p>
          <p className="mb-0 mt-2 text-sm text-text-soft">
            Your latest activities will appear here.
          </p>
        </div>
      </section>
    </>
  );
}