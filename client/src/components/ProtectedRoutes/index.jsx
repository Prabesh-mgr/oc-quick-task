import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ProtectedRoutes = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(null); 

    useEffect(() => {
        const token = Cookies.get("token");
        setIsLoggedIn(!!token);  
    }, [location]); 

    if (isLoggedIn === null) {
        return null;  
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};
