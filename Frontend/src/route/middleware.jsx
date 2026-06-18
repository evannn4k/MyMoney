import { Navigate } from "react-router";
import { Outlet } from "react-router";

export function ProtectedRoute() {
    const isNotAuthenticated = localStorage.getItem("token") === null;
    if (isNotAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export function GuestRoute() {
    const isNotAuthenticated = localStorage.getItem("token") === null;
    if (!isNotAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}
