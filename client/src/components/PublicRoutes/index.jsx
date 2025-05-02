import Cookies from 'js-cookie';
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
    const token = Cookies.get('token');
    const isLandingPage = window.location.pathname === '/';
    
    return (isLandingPage || !token) ? <Outlet /> : <Navigate to="/home" replace />;
  };