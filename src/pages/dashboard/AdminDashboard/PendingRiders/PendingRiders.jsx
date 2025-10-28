import { useQuery } from "@tanstack/react-query";
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

const PendingRiders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

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
                      <button
                        // onClick={() => handleViewDetails(rider)}
                        className="btn btn-sm btn-outline btn-info tooltip"
                        data-tip="View Details"
                      >
                        <FaEye />
                        View
                      </button>
                      <button
                        // onClick={() => handleActivate(rider)}
                        className="btn btn-sm btn-outline btn-success tooltip"
                        data-tip="Activate Rider"
                        // disabled={activateMutation.isPending}
                      >
                        <FaCheckCircle />
                        {/* {activateMutation.isPending
                          ? "Activating..."
                          : "Activate"} */}
                      </button>
                      <button
                        // onClick={() => handleDelete(rider)}
                        className="btn btn-sm btn-outline btn-error tooltip"
                        data-tip="Delete Application"
                        // disabled={deleteMutation.isPending}
                      >
                        <FaTimesCircle />
                        {/* {deleteMutation.isPending ? "Deleting..." : "Delete"} */}
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
