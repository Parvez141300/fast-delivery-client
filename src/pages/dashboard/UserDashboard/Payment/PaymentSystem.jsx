import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  FaBox,
  FaShippingFast,
  FaUser,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaWeightHanging,
  FaIdCard,
} from "react-icons/fa";
import PaymentMethods from "./shared/PaymentMethods";

const PaymentSystem = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcelData } = useQuery({
    queryKey: ["single-parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Complete Payment</h1>
        <p className="text-gray-600 mt-2">
          Make payment for your parcel delivery
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Column - Parcel Information */}
        <div className="space-y-6">
          {/* Order Summary Card */}
          <div className="bg-base-300 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaBox className="text-primary" />
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Parcel Title</span>
                <span className="font-semibold capitalize">
                  {parcelData?.title}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Tracking ID</span>
                <span className="font-mono text-sm font-bold text-primary">
                  {parcelData?.trackingId}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Parcel Type</span>
                <span className="font-semibold capitalize">
                  {parcelData?.parcelType}
                </span>
              </div>

              {parcelData?.parcelType === "non-document" && (
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-semibold">{parcelData?.weight} kg</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-semibold text-gray-800">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-primary">
                  ৳{parcelData?.amount}
                </span>
              </div>
            </div>
          </div>

          {/* Sender & Receiver Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sender Information */}
            <div className="bg-base-300 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FaUser className="text-green-500" />
                Sender
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  <span className="capitalize">{parcelData?.senderName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📞</span>
                  <span>{parcelData?.senderContact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className="capitalize">
                    {parcelData?.senderServiceDistrictCenter}
                  </span>
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  {parcelData?.senderAddress}
                </div>
              </div>
            </div>

            {/* Receiver Information */}
            <div className="bg-base-300 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FaUser className="text-red-500" />
                Receiver
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  <span className="capitalize">{parcelData?.receiverName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📞</span>
                  <span>{parcelData?.receiverContact}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span className="capitalize">
                    {parcelData?.receiverServiceDistrictCenter}
                  </span>
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  {parcelData?.receiverAddress}
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Route */}
          <div className="bg-base-300 rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FaShippingFast className="text-blue-500" />
              Delivery Route
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                <div className="text-sm font-semibold capitalize">
                  {parcelData?.senderServiceDistrictCenter}
                </div>
                <div className="text-xs text-gray-500">Pickup</div>
              </div>
              <div className="flex-1 h-1 bg-gray-300 mx-4"></div>
              <div className="text-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
                <div className="text-sm font-semibold capitalize">
                  {parcelData?.receiverServiceDistrictCenter}
                </div>
                <div className="text-xs text-gray-500">Delivery</div>
              </div>
            </div>
          </div>
        </div>
        {/* right column - Payment Methods */}
        <PaymentMethods parcelData={parcelData} />
      </div>
    </div>
  );
};

export default PaymentSystem;
