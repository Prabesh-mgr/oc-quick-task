import { useEffect } from "react";
import Cookies from 'js-cookie';
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    const token = Cookies.get("token");
    if (!token) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};