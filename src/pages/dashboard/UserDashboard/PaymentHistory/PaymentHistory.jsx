import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import {
  FaCalendar,
  FaCheckCircle,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaFileDownload,
  FaReceipt,
  FaSearch,
} from "react-icons/fa";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // get the user payment history data's
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["payment-history", user?.email, currentPage, limit, search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/user?email=${user?.email}&page=${currentPage}&limit=${limit}&search=${search}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const payments = data?.result || [];
  const totalPayments = data?.totalPayments;
  const totalPages = Math.ceil(totalPayments / limit);

  // Loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="alert alert-error shadow-lg max-w-md">
          <div>
            <FaTimesCircle className="text-xl" />
            <span>Error loading payment history: {error?.message}</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaReceipt className="text-primary" />
            Payment History
          </h1>
          <p className="text-gray-600 mt-2">
            View all your payment transactions and receipts
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <div className="stat bg-base-300 shadow-lg rounded-lg px-6 py-4">
            <div className="stat-title text-primary">Total Payments</div>
            <div className="stat-value text-primary text-3xl">
              {totalPayments || 0}
            </div>
          </div>
        </div>
      </div>
      {/* search and select field */}
      <div className="w-full flex justify-between items-center">
        {/* search field */}
        <fieldset className="fieldset w-xs lg:w-md flex items-center">
          <legend className="fieldset-legend">Search</legend>
          <input
            type="text"
            placeholder="Transaction ID, Email"
            className="input focus-within:outline-0 w-full"
            defaultValue={search}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setCurrentPage(1); // reset to page 1 when searching
            }}
            onKeyDown={(e) => {
              setCurrentPage(1);
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
        </fieldset>
        {/* select field */}
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
      {/* Payment History Table */}
      <div className="shadow-xl rounded-lg">
        {/* Table Header */}
        <div className="px-6 py-4 border-b  ">
          <h2 className="text-lg font-semibold text-wrap">
            Transaction History
          </h2>
        </div>

        {!payments || payments?.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <FaReceipt className="text-4xl  mx-auto mb-4" />
            <h3 className="text-lg font-semibold  mb-2">
              No payment history found
            </h3>
            <p className="text-secondary">You haven't made any payments yet.</p>
          </div>
        ) : (
          // Table Content
          <div className="overflow-x-auto bg-base-300 p-4 rounded-lg">
            <table>
              {/* Table Head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th className="py-4 px-6 font-semibold text-left">
                    Transaction ID
                  </th>
                  <th className="py-4 px-6 font-semibold text-left">Email</th>
                  <th className="py-4 px-6 font-semibold text-left">Amount</th>
                  <th className="py-4 px-6 font-semibold text-left">
                    Payment Method
                  </th>
                  <th className="py-4 px-6 font-semibold text-left">
                    Date & Time
                  </th>
                  <th className="py-4 px-6 font-semibold text-left">Status</th>
                  <th className="py-4 px-6 font-semibold text-left">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    {/* table serial */}
                    <td>{index + 1}</td>
                    {/* Transaction ID */}
                    <td className="px-2">
                      <div className="flex items-center gap-3">
                        <FaReceipt className="text-primary text-lg" />
                        <div>
                          <h4>{payment.transactionId}</h4>
                        </div>
                      </div>
                    </td>
                    {/* email */}
                    <td>{payment?.userEmail}</td>

                    {/* Amount */}
                    <td className="px-2">
                      <div className="text-lg font-bold text-primary">
                        {payment.amount}
                      </div>
                    </td>

                    {/* Payment Method */}
                    <td className="px-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium capitalize">
                          {payment.paymentMethod[0]}
                        </span>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="px-2">
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-primary text-2xl" />
                        <div>
                          <div className="text-sm font-medium">
                            {new Date(payment?.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-2">
                      <div className="flex items-center gap-2">
                        <FaCheckCircle className="text-secondary" />
                        <span className="badge badge-success badge-sm text-white">
                          Paid
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex join-vertical gap-1">
                        <button
                          className="btn btn-sm btn-outline btn-primary tooltip w-full"
                          data-tip="View Receipt"
                        >
                          <FaReceipt />
                          Receipt
                        </button>
                        <button
                          className="btn btn-sm btn-outline btn-secondary tooltip w-full"
                          data-tip="Download Invoice"
                        >
                          <FaFileDownload /> Download
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* pagination */}
            <div className="my-2 flex justify-center items-center gap-3">
              <button
                className="btn btn-sm btn-primary btn-outline"
                onClick={() => setCurrentPage((prv) => prv - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronCircleLeft />
              </button>
              <div className="flex justify-center items-center gap-2">
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
              </div>
              <button
                className="btn btn-sm btn-primary btn-outline"
                onClick={() => setCurrentPage((prv) => prv + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronCircleRight />
              </button>
            </div>

            {/* Table Footer */}
            {payments && payments.length > 0 && (
              <div className="px-6 py-4 border-t ">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-sm ">
                  <div className="flex items-center gap-1">
                    Showing{" "}
                    <span className="font-semibold">{payments.length}</span>
                    <span>payment{payments.length !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="mt-2 lg:mt-0">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
