import Cookies from 'js-cookie';
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
    const token = Cookies.get("token");

    if (token) {
        return <Navigate to="/home" replace />;
    }
    return <Outlet />;
};