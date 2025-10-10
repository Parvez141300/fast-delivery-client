import React from "react";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/components/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!user) {
    return <Navigate to={'/login'}></Navigate>
  }
  return children;
};

export default PrivateRoute;
