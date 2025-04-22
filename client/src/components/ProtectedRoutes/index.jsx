import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setHasToken(!!token);
    setIsCheckingAuth(false);
  }, []);

  return hasToken ? <Outlet /> : <Navigate to="/" replace />;
};
