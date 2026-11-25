import { NavLink } from "react-router-dom";
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
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Societies", to: "/societies", icon: Building2 },
  { label: "Properties", to: "/properties", icon: House },
  { label: "Tenants", to: "/tenants", icon: Users },
  { label: "Payments", to: "/payments", icon: CreditCard },
  { label: "Reports", to: "/reports", icon: ChartNoAxesCombined },
];

const linkClass = ({ isActive }) =>
  `flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium no-underline transition-colors ${
    isActive
      ? "bg-secondary text-secondary-text"
      : "text-text-soft hover:bg-surface-secondary hover:text-text"
  }`;

function Sidebar({ onNavigate }) {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-surface px-4 py-6">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-secondary-text">
          R
        </div>

        <div>
          <h1 className="mb-0 text-xl font-bold text-text">RentApp</h1>
          <p className="mb-0 text-xs text-text-soft">Rental Management</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-text-soft">
          Menu
        </p>

        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.to} to={item.to} onClick={onNavigate} className={linkClass}>
              <Icon size={19} strokeWidth={2} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="border-t border-border pt-4">
        <NavLink to="/settings" onClick={onNavigate} className={linkClass}>
          <Settings size={19} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;