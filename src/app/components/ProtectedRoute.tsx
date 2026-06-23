import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, businesses } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  // 1. Kick out if not logged in
  if (!user) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }

  // 2. If on onboarding but already has a business, send to dashboard
  if (location.pathname === "/onboarding" && businesses.length > 0) {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. If on dashboard but has NO business, send to onboarding
  if (location.pathname.startsWith("/dashboard") && businesses.length === 0) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}