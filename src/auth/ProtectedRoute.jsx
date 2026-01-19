import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();

  // ⏳ Wait for auth restoration
  if (authLoading) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  // 🔐 Redirect only AFTER loading finishes
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
