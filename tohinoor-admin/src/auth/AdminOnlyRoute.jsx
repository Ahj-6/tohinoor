import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function AdminOnlyRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    );
  }

  return children;
}