
import { Bell, LogOut, Menu } from "lucide-react";
import { useAuth } from "../../features/auth/context/AuthContext";

function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-surface px-6">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-text-soft transition-colors hover:bg-surface-secondary hover:text-text lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-lg font-semibold text-text">
            Welcome back!
          </h2>
          <p className="text-sm text-text-soft">
            Here's what's happening with your properties.
          </p>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-full p-2 text-text-soft transition-colors hover:bg-surface-secondary hover:text-text"
          aria-label="Notifications"
        >
          <Bell size={21} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" />
        </button>

        <div className="hidden h-9 w-px bg-border sm:block" />

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-text">
            {user?.loginId || "Owner"}
          </p>
          <p className="text-xs capitalize text-text-soft">
            {user?.role || "Owner"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-soft transition-colors hover:bg-surface-secondary hover:text-text"
          title="Logout"
        >
          <LogOut size={17} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Topbar;
