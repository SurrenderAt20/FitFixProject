import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const withAuth = (Component) => (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/?NotAuthenticated" />;
  }
  return <Component {...props} />;
};
