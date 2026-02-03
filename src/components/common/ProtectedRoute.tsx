import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({
    redirectPath = "/login",
    authType = "user"
}: {
    redirectPath?: string;
    authType?: 'user' | 'admin';
}) => {
    const { isUserAuthenticated, isAdminAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    console.log('ProtectedRoute Debug:', {
        path: location.pathname,
        authType,
        isLoading,
        isUserAuthenticated,
        isAdminAuthenticated
    });

    const isAuthenticated = authType === 'admin' ? isAdminAuthenticated : isUserAuthenticated;

    if (isLoading) {
        return null; // Or a loader component
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
