
import {
  LayoutDashboard,
  Building2,
  House,
  Users,
  CreditCard,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";

const navigationItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Societies",
    icon: Building2,
  },
  {
    label: "Properties",
    icon: House,
  },
  {
    label: "Tenants",
    icon: Users,
  },
  {
    label: "Payments",
    icon: CreditCard,
  },
  {
    label: "Reports",
    icon: ChartNoAxesCombined,
  },
];

function Sidebar({ activeItem = "Dashboard", onNavigate }) {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface px-4 py-6">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-white">
          R
        </div>

        <div>
          <h1 className="text-xl font-bold text-text">RentApp</h1>
          <p className="text-xs text-text-soft">Rental Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-text-soft">
          Menu
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate?.(item.label)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-secondary text-white"
                  : "text-text-soft hover:bg-surface-secondary hover:text-text"
              }`}
            >
              <Icon size={19} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="border-t border-border pt-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-text-soft transition-colors hover:bg-surface-secondary hover:text-text"
        >
          <Settings size={19} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
