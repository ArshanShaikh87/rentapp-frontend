import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./features/auth/pages/LoginPage";
import { useAuth } from "./features/auth/context/AuthContext";
import OwnerLayout from "./layouts/OwnerLayout";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import TenantDashboardPage from "./features/dashboard/pages/TenantDashboardPage";
import SocietiesPage from "./features/societies/pages/SocietiesPage";
import PropertiesPage from "./features/properties/pages/PropertiesPage";
import ComingSoonPage from "./pages/ComingSoonPage";

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg text-text">
      <p className="text-sm text-text-soft">Checking your session...</p>
    </div>
  );
}

// After login, go back to the page the user originally tried to open.
function RedirectAfterLogin() {
  const location = useLocation();
  return <Navigate to={location.state?.from ?? "/dashboard"} replace />;
}

export default function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Splash />;

  // Logged out: only the login page is reachable.
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
              state={{ from: location.pathname + location.search }}
            />
          }
        />
      </Routes>
    );
  }

  if (user.role === "OWNER") {
    return (
      <Routes>
        <Route path="/login" element={<RedirectAfterLogin />} />

        <Route element={<OwnerLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/societies" element={<SocietiesPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/tenants" element={<ComingSoonPage title="Tenants" />} />
          <Route path="/payments" element={<ComingSoonPage title="Payments" />} />
          <Route path="/reports" element={<ComingSoonPage title="Reports" />} />
          <Route path="/settings" element={<ComingSoonPage title="Settings" />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    );
  }

  if (user.role === "TENANT") {
    return (
      <Routes>
        <Route path="/login" element={<RedirectAfterLogin />} />
        <Route path="/dashboard" element={<TenantDashboardPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  return (
    <p className="p-8 text-danger">
      Your account does not have a supported role.
    </p>
  );
}