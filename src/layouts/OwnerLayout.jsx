
import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function OwnerLayout({
  children,
  activeItem = "Dashboard",
  onNavigate,
})  {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const handleNavigation = (page) => {
  onNavigate?.(page);
  setIsSidebarOpen(false);
};

  return (
    <div className="flex min-h-screen bg-bg">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activeItem={activeItem}
          onNavigate={handleNavigation}
        />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className="relative z-10 h-full w-64">
            <Sidebar
              activeItem={activeItem}
              onNavigate={handleNavigation}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default OwnerLayout;
