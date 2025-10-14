import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { FaBox, FaEye, FaTimesCircle } from "react-icons/fa";
import StatusBadge from "../shared/StatusBadge";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/user?email=${user?.email}`);
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

  const parcels = data || [];
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <FaBox className="text-primary" />
              My Parcels
            </h1>
            <p className=" mt-2">
              Track and manage all your parcel deliveries in one place
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="stat bg-base-300 shadow-lg rounded-lg px-6 py-4">
              <div className="stat-title ">Total Parcels</div>
              <div className="stat-value text-primary text-3xl">
                {parcels.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* parcels table */}
      {parcels.length === 0 ? ( // Empty state
        <div className="text-center py-12">
          <FaBox className="text-4xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No parcels found
          </h3>
          <p className="text-gray-500">You haven't sent any parcels yet.</p>
        </div> // Table Content
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-300">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Tracking ID
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Parcel Info
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Route
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Delivery Info
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel?._id}>
                  {/* Tracking ID */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-primary text-sm">
                      {parcel.trackingId}
                    </div>
                    <div className="text-xs mt-1">
                      {new Date(parcel.creationDate).toLocaleDateString()}
                    </div>
                  </td>
                  {/* Parcel Info */}
                  <td className="py-4 px-6">
                    <div className="font-semibold capitalize">
                      {parcel.title}
                    </div>
                    <div className="text-sm capitalize">
                      Type: {parcel.parcelType}
                    </div>
                    {parcel.parcelType === "non-document" && (
                      <div className="text-sm">Weight: {parcel.weight}kg</div>
                    )}
                    <div className="text-sm font-semibold text-primary mt-1">
                      Charge: ৳{parcel.total}
                    </div>
                  </td>
                  {/* Route */}
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm font-medium capitalize">
                          {parcel.senderServiceDistrictCenter}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-sm font-medium capitalize">
                          {parcel.receiverServiceDistrictCenter}
                        </span>
                      </div>
                    </div>
                  </td>
                  {/* Delivery Info */}
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="font-semibold">From:</span>{" "}
                        <span className="capitalize">{parcel.senderName}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">To:</span>{" "}
                        <span className="capitalize">
                          {parcel.receiverName}
                        </span>
                      </div>
                      <div className="text-xs">
                        Sender Contact: {parcel.senderContact}
                      </div>
                      <div className="text-xs">
                        Receiver Contact: {parcel.receiverContact}
                      </div>
                    </div>
                  </td>
                  {/* Status */}
                  <td className="py-4 px-6">
                    <StatusBadge status={parcel.status} />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        className="btn btn-sm btn-outline btn-primary tooltip"
                        data-tip="View Details"
                      >
                        <FaEye />
                      </button>
                      {parcel.status === "pending" && (
                        <button
                          className="btn btn-sm btn-outline btn-error tooltip"
                          data-tip="Cancel"
                        >
                          <FaTimesCircle />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Table Footer */}
            <tfoot>
              {parcels.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-sm text-gray-600">
                    <div>
                      Showing{" "}
                      <span className="font-semibold">{parcels.length}</span>{" "}
                      parcel{parcels.length !== 1 ? "s" : ""}
                    </div>
                    <div className="mt-2 lg:mt-0">
                      Last updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              )}
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
