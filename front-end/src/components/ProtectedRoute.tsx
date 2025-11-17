import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function ProtectedRoute() {
    const { isAuth } = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
