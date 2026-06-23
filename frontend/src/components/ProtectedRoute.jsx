import { LoaderCircle } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-cream dark:bg-slate-950">
        <div className="text-center">
          <LoaderCircle
            size={36}
            className="mx-auto animate-spin text-blue-600"
          />
          <p className="mt-4 font-display font-bold text-ink dark:text-white">
            Restoring your PathFinder session…
          </p>
        </div>
      </main>
    );
  }

  if (!currentUser || !localStorage.getItem("token")) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
