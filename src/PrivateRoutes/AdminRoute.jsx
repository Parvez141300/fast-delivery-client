import React from "react";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/components/LoadingSpinner/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, userLoading, refetch } = useUserRole();
  const location = useLocation();

  if (loading || userLoading) {
    return <LoadingSpinner />;
  }

  if (!user || role !== "admin") {
    return <Navigate to={"/forbidden"} state={{ from: location }}></Navigate>;
  }
  return children;
};

export default AdminRoute;
