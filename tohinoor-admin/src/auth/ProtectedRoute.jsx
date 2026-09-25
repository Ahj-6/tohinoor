import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, canAccessAdminPanel } = useAuth();
    const location = useLocation();

    if (!isAuthenticated || !canAccessAdminPanel) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return children;
}