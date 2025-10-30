import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
  FaEye,
  FaUserCheck,
  FaTimesCircle,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaSearch,
  FaUserSlash,
  FaTasks,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Fetch active riders data
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["active-riders", limit, currentPage, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders/active?page=${currentPage}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
  });

  const riders = data?.result || [];
  console.log("active riders", riders);
  const totalRiders = data?.countRiders || 0;
  const totalPages = Math.ceil(totalRiders / limit);

  // Deactivate rider mutation
  const deactivateMutation = useMutation({
    mutationFn: async (riderId) => {
      const res = await axiosSecure.patch(`/riders/status/${riderId}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["active-riders"] });
      Swal.fire({
        title: "Deactivated!",
        text: "Rider has been deactivated successfully.",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to deactivate rider. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  // Assign rider mutation
  const assignMutation = useMutation({
    mutationFn: async (riderId) => {
      const res = await axiosSecure.patch(`/riders/assign/${riderId}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["active-riders"] });
      Swal.fire({
        title: "Assigned!",
        text: "Rider has been assigned successfully.",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to assign rider. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  // Handle view rider details
  const handleViewDetails = (rider) => {
    Swal.fire({
      title: `<strong>Rider Details - ${rider.name}</strong>`,
      html: `
        <div class="text-left space-y-4">
          <!-- Personal Information -->
          <div class="border rounded-lg p-4">
            <div class="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
              <i class="fas fa-user text-blue-500"></i>
              Personal Information
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="font-medium text-gray-600">Full Name</div>
                <div class="font-semibold">${rider.name}</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">Email</div>
                <div>${rider.email}</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">Age</div>
                <div>${rider.age} years</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">Phone</div>
                <div>${rider.phone}</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">National ID</div>
                <div class="font-mono">${rider.nationalId}</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">Experience</div>
                <div>${rider.experience} years</div>
              </div>
            </div>
          </div>

          <!-- Location & Availability -->
          <div class="border rounded-lg p-4">
            <div class="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
              <i class="fas fa-map-marker-alt text-green-500"></i>
              Location & Availability
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="font-medium text-gray-600">District</div>
                <div class="capitalize">${rider.district}</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">Region</div>
                <div class="capitalize">${rider.region}</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">Availability</div>
                <div>${rider.availability} hours/week</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">Status</div>
                <div class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ${rider.status}
                </div>
              </div>
            </div>
          </div>

          <!-- Bike Information -->
          <div class="border rounded-lg p-4">
            <div class="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
              <i class="fas fa-motorcycle text-purple-500"></i>
              Bike Information
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="font-medium text-gray-600">Bike Registration</div>
                <div class="font-mono">${rider.bikeRegistration}</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">Bike CC</div>
                <div>${rider.bikeCC} CC</div>
              </div>
            </div>
          </div>

          <!-- Documents -->
            <div class="border rounded-lg p-4">
                <div class="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
                <i class="fas fa-file-alt text-red-500"></i>
                Documents
                </div>
                <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <div class="font-medium text-gray-600">Driving License</div>
                    <a href="${
                    rider.drivingLicenseUrl
                    }" target="_blank" class="text-blue-600 hover:underline">
                    View License
                    </a>
                </div>
                <div>
                    <div class="font-medium text-gray-600">Bike Papers</div>
                    <a href="${
                    rider.bikePapersUrl
                    }" target="_blank" class="text-blue-600 hover:underline">
                    View Papers
                    </a>
                </div>
                </div>
            </div>

          <!-- Performance Stats (You can add actual stats from your backend) -->
          <div class="border rounded-lg p-4 bg-blue-50">
            <div class="font-semibold text-lg text-gray-800 mb-3 flex items-center gap-2">
              <i class="fas fa-chart-line text-orange-500"></i>
              Performance Stats
            </div>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="font-medium text-gray-600">Total Deliveries</div>
                <div class="font-semibold">${rider.totalDeliveries || 0}</div>
              </div>
              <div>
                <div class="font-medium text-gray-600">Active Since</div>
                <div>${new Date(
                  rider.activatedAt || rider.createdAt
                ).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      `,
      width: 700,
      padding: "2rem",
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-lg",
        closeButton: "text-gray-400 hover:text-gray-600 text-xl",
      },
    });
  };

  // Handle deactivate rider
  const handleDeactivate = (rider) => {
    Swal.fire({
      title: "Deactivate Rider?",
      text: `Are you sure you want to deactivate ${rider.name}? They will no longer be able to accept deliveries.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Deactivate!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-lg",
        confirmButton: "btn btn-warning",
        cancelButton: "btn btn-ghost",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deactivateMutation.mutate(rider._id);
      }
    });
  };

  // Handle assign rider
  const handleAssign = (rider) => {
    Swal.fire({
      title: "Assign Delivery",
      text: `Assign a new delivery to ${rider.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Assign!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      showDenyButton: true,
      denyButtonText: "View Available Deliveries",
      denyButtonColor: "#3b82f6",
      customClass: {
        popup: "rounded-lg",
        confirmButton: "btn btn-success",
        denyButton: "btn btn-info",
        cancelButton: "btn btn-ghost",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        assignMutation.mutate(rider._id);
      } else if (result.isDenied) {
        // Navigate to available deliveries page or show deliveries modal
        Swal.fire({
          title: "Available Deliveries",
          text: "This would typically show a list of available deliveries to assign.",
          icon: "info",
          confirmButtonColor: "#3b82f6",
        });
      }
    });
  };

  // Loading state
  if (isPending) {
    return <LoadingSpinner />;
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="alert alert-error shadow-lg">
            <div>
              <FaTimesCircle className="text-xl" />
              <span>Error loading active riders: {error.message}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FaUserCheck className="text-primary" />
              Active Riders
            </h1>
            <p className="mt-2">
              Manage and monitor all active delivery riders
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="stat bg-base-300 shadow-lg rounded-lg px-6 py-4">
              <div className="stat-title">Active Riders</div>
              <div className="stat-value text-primary text-3xl">
                {totalRiders}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <fieldset className="fieldset w-full lg:w-96">
          <legend className="fieldset-legend">Search Riders</legend>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by name, email, phone, district..."
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

      {/* Riders Table */}
      {riders.length === 0 ? (
        <div className="text-center py-12 bg-base-100 rounded-lg shadow">
          <FaUserCheck className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No active riders found
          </h3>
          <p className="text-gray-500">
            {search
              ? "Try adjusting your search criteria"
              : "All riders are currently inactive or no riders are registered"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-300">
              <tr>
                <th className="font-bold text-sm">No</th>
                <th className="text-left py-4 px-6 font-semibold text-sm">
                  Personal Info
                </th>
                <th className="text-left py-4 px-6 font-semibold text-sm">
                  Location & Bike
                </th>
                <th className="text-left py-4 px-6 font-semibold text-sm">
                  Performance
                </th>
                <th className="text-left py-4 px-6 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {riders.map((rider, index) => (
                <tr key={rider._id} className="hover:bg-base-200">
                  {/* Serial Number */}
                  <td className="font-medium">
                    {(currentPage - 1) * limit + index + 1}
                  </td>

                  {/* Personal Information */}
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="font-semibold text-lg capitalize">
                        {rider.name}
                      </div>
                      <div className="text-sm text-gray-600">{rider.email}</div>
                      <div className="text-sm">
                        <span className="font-medium">Phone:</span>{" "}
                        {rider.phone}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Age:</span> {rider.age}{" "}
                        years
                      </div>
                      <div className="text-xs text-green-600 font-medium mt-1">
                        Active since:{" "}
                        {new Date(
                          rider.activatedAt || rider.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </td>

                  {/* Location & Bike Information */}
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium text-sm">Location</div>
                        <div className="text-sm capitalize">
                          {rider.district}, {rider.region}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Bike</div>
                        <div className="text-sm">
                          {rider.bikeRegistration} • {rider.bikeCC} CC
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">Availability</div>
                        <div className="text-sm">
                          {rider.availability} hrs/week
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Performance Stats */}
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium text-sm">
                          Total Deliveries
                        </div>
                        <div className="text-sm font-semibold">
                          {rider.totalDeliveries || 0}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleViewDetails(rider)}
                        className="btn btn-sm btn-outline btn-primary tooltip"
                        data-tip="View Details"
                      >
                        <FaEye />
                        View
                      </button>
                      <button
                        onClick={() => handleDeactivate(rider)}
                        className="btn btn-sm btn-outline btn-secondary tooltip"
                        data-tip="Deactivate Rider"
                        disabled={deactivateMutation.isPending}
                      >
                        <FaUserSlash />
                        {deactivateMutation.isPending
                          ? "Deactivating..."
                          : "Deactivate"}
                      </button>
                      <button
                        onClick={() => handleAssign(rider)}
                        className="btn btn-sm btn-outline btn-primary tooltip"
                        data-tip="Assign Delivery"
                        disabled={assignMutation.isPending}
                      >
                        <FaTasks />
                        {assignMutation.isPending ? "Assigning..." : "Assign"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* pagination */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <button
              className="btn btn-sm btn-primary btn-outline"
              onClick={() => setCurrentPage((prv) => prv - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronCircleLeft />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn ${
                  currentPage === index + 1
                    ? "btn-primary"
                    : "btn-primary btn-outline"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
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

export default ActiveRiders;
