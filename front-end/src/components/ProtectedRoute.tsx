// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";
import type { JSX } from "react";

interface Props {
    children: JSX.Element;
    requiredRoles?: string[];
}

export default function ProtectedRoute({ children, requiredRoles }: Props) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    if (requiredRoles && !requiredRoles.includes(user?.role ?? "")) {
        return <Navigate to="/" replace />;
    }

    return children;
}
