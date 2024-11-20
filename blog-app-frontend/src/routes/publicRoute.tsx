import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log(isAuthenticated,location.pathname)
  // Redirect authenticated users trying to access the login page to the dashboard
  if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise, render the requested public route
  return <Outlet />;
};

export default PublicRoute;
