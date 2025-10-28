import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
  FaCheckCircle,
  FaEye,
  FaTimesCircle,
  FaUserClock,
} from "react-icons/fa";
import Swal from "sweetalert2";

const PendingRiders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const queryClient = useQueryClient();

  // get pending riders
  const {
    data: pendingRiders = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["pending-riders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/pending`);
      return res.data;
    },
  });

  // set rider pending to active
  const activateMutation = useMutation({
    mutationFn: async (riderId) => {
      const res = await axiosSecure.patch(`/riders/pending/${riderId}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pending-riders"] });
      Swal.fire({
        title: "Activated!",
        text: "Rider has been activated successfully.",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to activate rider. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  // delete rider
  const deleteMutation = useMutation({
    mutationFn: async (riderId) => {
      const res = await axiosSecure.delete(`/riders/${riderId}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pending-riders"] });
      Swal.fire({
        title: "Deleted!",
        text: "Rider has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete rider. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  // view rider details
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
                  <div class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
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
  
            <!-- Application Date -->
            <div class="border rounded-lg p-4 bg-gray-50">
              <div class="text-sm">
                <div class="font-medium text-gray-600">Application Date</div>
                <div>${new Date(
                  rider.createdAt
                ).toLocaleDateString()} at ${new Date(
        rider.createdAt
      ).toLocaleTimeString()}</div>
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

  // activate rider
  const handleActivate = (rider) => {
    Swal.fire({
      title: "Activate Rider?",
      text: `Are you sure you want to activate ${rider.name} as a rider?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Activate!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-lg",
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-ghost",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        activateMutation.mutate(rider._id);
      }
    });
  };

  // delete rider
  const handleDelete = (rider) => {
    Swal.fire({
      title: "Delete Rider?",
      text: `Are you sure you want to delete a rider named ${rider.name} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        popup: "rounded-lg",
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-ghost",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(rider._id);
      }
    });
  };

  // loading state
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
              <span>Error loading parcels: {error.message}</span>
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
              <FaUserClock className="text-primary" />
              Pending Riders
            </h1>
            <p className="mt-2">
              Review and manage rider applications waiting for approval
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="stat bg-base-300 shadow-lg rounded-lg px-6 py-4">
              <div className="stat-title">Pending Applications</div>
              <div className="stat-value text-primary text-3xl">
                {pendingRiders?.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* pending riders table */}
      {pendingRiders?.length === 0 ? (
        <div className="text-center py-12 bg-base-100 rounded-lg shadow">
          <FaUserClock className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary mb-2">
            No pending riders found
          </h3>
          <p className="text-primary">
            {search
              ? "Try adjusting your search criteria"
              : "All rider applications have been processed"}
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
                  Documents & Experience
                </th>
                <th className="text-left py-4 px-6 font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {pendingRiders.map((rider, index) => (
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
                      <div className="text-xs text-gray-500 mt-1">
                        Applied:{" "}
                        {new Date(rider.createdAt).toLocaleDateString()}
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

                  {/* Documents & Experience */}
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div>
                        <div className="font-medium text-sm">Experience</div>
                        <div className="text-sm">{rider.experience}</div>
                      </div>
                      <div>
                        <div className="font-medium text-sm">National ID</div>
                        <div className="text-sm font-mono">
                          {rider.nationalId}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <a
                          href={rider.drivingLicenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-xs btn-outline btn-primary"
                        >
                          License
                        </a>
                        <a
                          href={rider.bikePapersUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-xs btn-outline btn-secondary"
                        >
                          Papers
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-2">
                      {/* view rider info */}
                      <button
                        onClick={() => handleViewDetails(rider)}
                        className="btn btn-sm btn-outline btn-primary tooltip"
                        data-tip="View Details"
                      >
                        <FaEye />
                        View
                      </button>
                      {/* pending to active */}
                      <button
                        onClick={() => handleActivate(rider)}
                        className="btn btn-sm btn-outline btn-primary tooltip"
                        data-tip="Activate Rider"
                        disabled={activateMutation.isPending}
                      >
                        <FaCheckCircle />
                        {activateMutation.isPending
                          ? "Activating..."
                          : "Activate"}
                      </button>
                      {/* delete a rider */}
                      <button
                        onClick={() => handleDelete(rider)}
                        className="btn btn-sm btn-outline btn-secondary tooltip"
                        data-tip="Delete Application"
                        disabled={deleteMutation.isPending}
                      >
                        <FaTimesCircle />
                        {deleteMutation.isPending ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
