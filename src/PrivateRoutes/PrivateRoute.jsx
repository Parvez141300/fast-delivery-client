import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/components/LoadingSpinner/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
