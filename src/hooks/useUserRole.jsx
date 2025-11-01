import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: singleUser = {},
    isPending: userLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/user?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log("user role", singleUser?.role);
  return { role: singleUser?.role, userLoading, refetch };
};

export default useUserRole;
