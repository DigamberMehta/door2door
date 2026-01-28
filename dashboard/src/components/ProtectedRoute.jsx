import { Navigate } from "react-router-dom";
import { useStoreAuth } from "../context/StoreAuthContext";
import { useAdminAuth } from "../context/AdminAuthContext";

export const StoreProtectedRoute = ({ children }) => {
  const { user, loading } = useStoreAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
