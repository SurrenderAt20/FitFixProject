import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

export const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
