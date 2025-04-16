import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);  

    useEffect(() => {
        const token = Cookies.get("token"); 
        setIsLoggedIn(!!token);
    }, []); 

    if (isLoggedIn === null) {
        return null; 
    }

    return isLoggedIn ? <Navigate to="/home" replace /> : <Outlet />;
};
