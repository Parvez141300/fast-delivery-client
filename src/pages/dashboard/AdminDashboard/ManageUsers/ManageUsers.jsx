import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
  FaUser,
  FaUserShield,
  FaUserTimes,
  FaEye,
  FaTrash,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaSearch,
  FaMotorcycle,
  FaTimesCircle,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import { deleteUser } from "firebase/auth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { user } = useAuth();

  // Fetch all users data by fetch method
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["all-users", limit, currentPage, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?page=${currentPage}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
  });

  // delete user by fetch method
  const deleteUserMutation = useMutation({
    mutationFn: async (user) => {
      const res = await axiosSecure.delete(`/users/${user._id}`, {
        data: {
          userEmail: user.email,
        },
      });
      return res.data;
    },
    onSuccess: async () => {
      deleteUser(user).then(() =>
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#10b981",
          timer: 2000,
        })
      );
      await queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete user. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  const users = data?.users || [];
  const totalUsers = data?.totalUsers || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  // delete user
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${
        user.name
      }? This action cannot be undone.${
        user.role === "rider"
          ? " This will also delete their rider profile."
          : ""
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-lg",
        confirmButton: "btn btn-error",
        cancelButton: "btn btn-ghost",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserMutation.mutate(user);
      }
    });
  };

  // loading spinner
  if (isPending) {
    return <LoadingSpinner />;
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-base-300 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="alert alert-error shadow-lg">
            <div>
              <FaTimesCircle className="text-xl" />
              <span>Error loading users: {error.message}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FaUserShield className="text-primary" />
              Manage Users
            </h1>
            <p className="mt-2">
              Manage user roles and permissions across the platform
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="stat bg-base-300 shadow-lg rounded-lg px-6 py-4">
              <div className="stat-title">Total Users</div>
              <div className="stat-value text-primary text-3xl">
                {totalUsers}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Search and Filter Section */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <fieldset className="fieldset w-full lg:w-96">
          <legend className="fieldset-legend">Search Users</legend>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name, email, role..."
              className="input focus-within:outline-0 flex-1"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setCurrentPage(1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(searchInput);
                }
              }}
            />
            <button
              className="btn btn-primary"
              onClick={() => setSearch(searchInput)}
            >
              <FaSearch />
            </button>
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Items per page</legend>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="select focus-within:outline-0"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </fieldset>
      </div>
      {/* users table */}
      {users.length === 0 ? (
        <div className="text-center py-12 bg-base-100 rounded-lg shadow">
          <FaUser className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No users found
          </h3>
          <p className="text-gray-500">
            {search
              ? "Try adjusting your search criteria"
              : "No users registered yet"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-300 rounded-lg">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-300">
              <tr>
                <th className="font-bold text-sm">No</th>
                <th className="text-left py-4 px-6 font-semibold text-sm">
                  User Information
                </th>
                <th className="text-left py-4 px-6 font-semibold text-sm">
                  Account Details
                </th>
                <th className="text-left py-4 px-6 font-semibold text-sm">
                  Role & Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-base-200">
                  {/* Serial Number */}
                  <td className="font-medium">
                    {(currentPage - 1) * limit + index + 1}
                  </td>

                  {/* User Information */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="space-y-1">
                        <div className="font-semibold text-lg capitalize">
                          {user.name}
                        </div>
                        <div className="text-sm text-primary">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Account Details */}
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium text-sm">Member Since</div>
                        <div className="text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">User ID</div>
                        <div className="text-xs font-mono text-primary">
                          {user._id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role & Status */}
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium text-sm">Role</div>
                        <div
                          className={`badge badge-lg ${
                            user.role === "admin"
                              ? "badge-primary"
                              : user.role === "rider"
                              ? "badge-success"
                              : "badge-secondary"
                          }`}
                        >
                          {user.role === "admin" && (
                            <FaUserShield className="mr-1" />
                          )}
                          {user.role === "rider" && (
                            <FaMotorcycle className="mr-1" />
                          )}
                          {user.role === "user" && <FaUser className="mr-1" />}
                          {user.role}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Status</div>
                        <div className="badge badge-success badge-sm">
                          Active
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      {/* {user.role !== "rider" && (
                        <button
                          onClick={() => handleToggleAdmin(user)}
                          disabled={toggleAdminMutation.isPending}
                          className={`btn btn-sm btn-outline tooltip ${
                            user.role === "admin"
                              ? "btn-warning"
                              : "btn-primary"
                          }`}
                          data-tip={
                            user.role === "admin"
                              ? "Remove Admin"
                              : "Make Admin"
                          }
                        >
                          {user.role === "admin" ? (
                            <FaUserTimes />
                          ) : (
                            <FaUserShield />
                          )}
                          {toggleAdminMutation.isPending
                            ? "Updating..."
                            : user.role === "admin"
                            ? "Remove Admin"
                            : "Make Admin"}
                        </button>
                      )} */}

                      <button
                        onClick={() => handleDeleteUser(user)}
                        // disabled={deleteUserMutation.isPending}
                        className="btn btn-sm btn-outline btn-error tooltip"
                        data-tip="Delete User"
                      >
                        <FaTrash />
                        {/* {deleteUserMutation.isPending
                          ? "Deleting..."
                          : "Delete"} */}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* pagination */}
          <div className="flex justify-center items-center gap-8">
            <button
              className="btn btn-sm btn-primary btn-outline"
              onClick={() => setCurrentPage((prv) => prv - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronCircleLeft />
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`btn ${
                    currentPage === index + 1 ? "btn-primary" : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="btn btn-sm btn-primary btn-outline"
              onClick={() => setCurrentPage((prv) => prv + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronCircleRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
