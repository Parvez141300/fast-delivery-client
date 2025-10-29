import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
  FaBox,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaEye,
  FaMoneyBill,
  FaTimesCircle,
} from "react-icons/fa";
import StatusBadge from "../shared/StatusBadge";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  console.log("search item text", search);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["my-parcels", user?.email, limit, currentPage, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/user?email=${user?.email}&page=${currentPage}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
  });

  const parcels = data?.parcels || [];
  const totalParcels = data?.totalParcels || 0;
  const totalPages = Math.ceil(totalParcels / limit);

  const deleteMutation = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.delete(`/parcels/${parcelId}`);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["my-parcels", user?.email],
      });
      Swal.fire({
        title: "Deleted!",
        text: "Parcel has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#10b981",
        timer: 2000,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: error.message,
        text: "Failed to delete parcel. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    },
  });

  // Handle view details with SweetAlert2
  const handleViewDetails = (parcel) => {
    Swal.fire({
      title: `<strong>Parcel Details - ${parcel.trackingId}</strong>`,
      html: `
            <div class="text-left space-y-4">
              <!-- Header Info -->
              <div class="grid grid-cols-2 gap-4 p-3 bg-blue-50 rounded-lg">
                <div>
                  <div class="font-semibold text-sm text-gray-600">Tracking ID</div>
                  <div class="font-mono font-bold text-blue-600">${
                    parcel.trackingId
                  }</div>
                </div>
                <div>
                  <div class="font-semibold text-sm text-gray-600">Created Date</div>
                  <div class="text-gray-700">${new Date(
                    parcel.creationDate
                  ).toLocaleDateString()}</div>
                </div>
              </div>
    
              <!-- Parcel Information -->
              <div class="border rounded-lg p-3">
                <div class="font-semibold text-lg text-gray-800 mb-2 flex items-center gap-2">
                  <i class="fas fa-box text-blue-500"></i>
                  Parcel Information
                </div>
                <div class="grid grid-cols-2 gap-2 text-sm">
                  <div class="font-medium">Title:</div>
                  <div class="capitalize">${parcel.title}</div>
                  
                  <div class="font-medium">Type:</div>
                  <div class="capitalize">${parcel.parcelType}</div>
                  
                  ${
                    parcel.parcelType === "non-document"
                      ? `
                    <div class="font-medium">Weight:</div>
                    <div>${parcel.weight} kg</div>
                  `
                      : ""
                  }
                  
                  <div class="font-medium">Total Cost:</div>
                  <div class="font-bold text-green-600">৳${parcel.amount}</div>
                  <div>Payment Status:</div>
                  <div class="font-bold">${parcel.paymentStatus}</div>
                </div>
              </div>
    
              <!-- Sender & Receiver Info -->
              <div class="grid grid-cols-2 gap-4">
                <!-- Sender Information -->
                <div class="border rounded-lg p-3">
                  <div class="font-semibold text-md text-gray-800 mb-2 flex items-center gap-2">
                    <i class="fas fa-user text-green-500"></i>
                    Sender
                  </div>
                  <div class="space-y-1 text-sm">
                    <div><strong>Name:</strong> ${parcel.senderName}</div>
                    <div><strong>Contact:</strong> ${parcel.senderContact}</div>
                    <div><strong>Region:</strong> ${parcel.senderRegion}</div>
                    <div><strong>Service Center:</strong> ${
                      parcel.senderServiceDistrictCenter
                    }</div>
                    <div><strong>Address:</strong> ${parcel.senderAddress}</div>
                  </div>
                </div>
    
                <!-- Receiver Information -->
                <div class="border rounded-lg p-3">
                  <div class="font-semibold text-md text-gray-800 mb-2 flex items-center gap-2">
                    <i class="fas fa-user text-red-500"></i>
                    Receiver
                  </div>
                  <div class="space-y-1 text-sm">
                    <div><strong>Name:</strong> ${parcel.receiverName}</div>
                    <div><strong>Contact:</strong> ${
                      parcel.receiverContact
                    }</div>
                    <div><strong>Region:</strong> ${parcel.receiverRegion}</div>
                    <div><strong>Service Center:</strong> ${
                      parcel.receiverServiceDistrictCenter
                    }</div>
                    <div><strong>Address:</strong> ${
                      parcel.receiverAddress
                    }</div>
                  </div>
                </div>
              </div>
    
              <!-- Status Information -->
              <div class="border rounded-lg p-3">
                <div class="font-semibold text-lg text-gray-800 mb-2 flex items-center gap-2">
                  <i class="fas fa-shipping-fast text-purple-500"></i>
                  Delivery Status
                </div>
                <div class="flex justify-between items-center">
                  <div class="font-medium">Status:</div>
                  <div class="px-3 py-1 rounded-full text-white ${
                    parcel.status === "pending"
                      ? "bg-yellow-500"
                      : parcel.status === "in-transit"
                      ? "bg-blue-500"
                      : parcel.status === "delivered"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }">
                    ${parcel.status}
                  </div>
                </div>
                <div class="mt-2 text-sm">
                  <strong>Created By:</strong> ${parcel.createdBy}
                </div>
              </div>
            </div>
          `,
      width: 800,
      padding: "2rem",
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: "rounded-lg",
        closeButton: "text-gray-400 hover:text-gray-600 text-xl",
      },
    });
  };

  // payment of the product
  const handlePayment = (parcelId) => {
    navigate(`/dashboard/payment/${parcelId}`);
  };

  //   handle delete the parcel
  const handleDelete = (parcel) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete the parcel "${parcel.title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
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
        deleteMutation.mutate(parcel._id);
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
      {/* select the limit of the page */}
      <div className="w-full flex justify-between items-center">
        <fieldset className="fieldset w-xs lg:w-md flex items-center">
          <legend className="fieldset-legend">Search</legend>
          <input
            type="text"
            placeholder="Tracking ID, Contact, Title, status, sender name..."
            className="input focus-within:outline-0 w-full"
            defaultValue={search}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setCurrentPage(1); // reset to page 1 when searching
            }}
            onKeyDown={(e) => {
              setCurrentPage(1)
              if(e.key === "Enter"){
                setSearch(searchInput)
              }
            }}
          />
          <button
            className="btn btn-primary"
            onClick={() => setSearch(searchInput)}
          >
            Search
          </button>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Select Page</legend>
          <select
            defaultValue={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="select focus-within:outline-0"
          >
            <option value={5}>5</option>
            <option value={7}>7</option>
            <option value={10}>10</option>
          </select>
        </fieldset>
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
        <div className="overflow-x-auto w-full">
          <table>
            {/* Table Head */}
            <thead className="bg-base-300">
              <tr>
                <th className="font-bold">No</th>
                <th className="text-left py-4 px-6 font-semibold">
                  Tracking ID
                </th>
                <th className="text-left py-4 px-6 font-semibold">
                  Parcel Info
                </th>
                <th className="text-left py-4 px-6 font-semibold">Route</th>
                <th className="text-left py-4 px-6 font-semibold">
                  Delivery Info
                </th>
                <th className="text-left py-4 px-6 font-semibold">Status</th>
                <th className="text-left py-4 px-6 font-semibold">
                  Payment Status
                </th>
                <th className="text-left py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            {/* table main content */}
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel?._id}>
                  {/* serial number */}
                  <td>{(currentPage - 1) * limit + index + 1}</td>
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
                      Charge: ৳{parcel.amount}
                    </div>
                  </td>
                  {/* Route */}
                  <td className="py-4 px-6 w-2xl">
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
                  <td className="w-xl">
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
                    <StatusBadge status={parcel?.status} />
                  </td>
                  {/* payment Status */}
                  <td className="py-4 px-6">
                    <span className="badge badge-primary">
                      {parcel?.paymentStatus}
                    </span>
                  </td>
                  {/* actions */}
                  <td className="py-4 px-6">
                    <div className="join join-vertical gap-2">
                      <button
                        onClick={() => handleViewDetails(parcel)}
                        className="btn btn-sm btn-outline btn-primary tooltip"
                        data-tip="View Details"
                      >
                        View <FaEye />
                      </button>
                      {parcel.paymentStatus === "paid" ? (
                        <button className="btn btn-primary" disabled={true}>
                          Paid
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePayment(parcel?._id)}
                          className="btn btn-sm btn-outline btn-primary tooltip"
                          data-tip="Pay"
                        >
                          Pay <FaMoneyBill />
                        </button>
                      )}
                      {parcel?.paymentStatus !== "paid" && (
                        <button
                          onClick={() => handleDelete(parcel)}
                          className="btn btn-sm btn-outline btn-error tooltip"
                          data-tip="Delete"
                        >
                          Delete
                          <FaTimesCircle />
                        </button>
                      )}
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

export default MyParcels;
