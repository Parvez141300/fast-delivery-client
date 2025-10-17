import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./shared/PaymentForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import {
  FaBox,
  FaShippingFast,
  FaUser,
  FaMapMarkerAlt,
  FaMoneyBill,
  FaWeightHanging,
  FaIdCard,
} from "react-icons/fa";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcelData } = useQuery({
    queryKey: ["single-parcel", user?.email],
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  ৳{parcelData?.total}
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

        {/* Right Column - Payment Form */}
        <div className="bg-base-300 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>

          {/* Total Amount Highlight */}
          <div className="rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Payment</span>
              <span className="text-2xl font-bold text-primary">
                ৳{parcelData?.total}
              </span>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-base-300 shadow-md rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-secondary">
              <span className="text-sm font-semibold">🔒 Secure Payment</span>
            </div>
            <p className="text-secondary text-sm mt-1">
              Your card information will be processed securely
            </p>
          </div>

          {/* Stripe Payment Form */}
          <Elements stripe={stripePromise}>
            <PaymentForm
              parcelData={parcelData}
              onSuccess={() => navigate("/dashboard/parcels")}
            />
          </Elements>

          {/* Test Card Info */}
          <div className="mt-6 bg-base-300 shadow-md rounded-lg p-4">
            <h4 className="text-sm font-semibold text-accent mb-2">
              Test Card Information:
            </h4>
            <div className="text-xs text-secondary space-y-1">
              <div>
                Card Number:{" "}
                <span className="font-mono">4242 4242 4242 4242</span>
              </div>
              <div>
                Expiry: <span className="font-mono">12/34</span>
              </div>
              <div>
                CVC: <span className="font-mono">123</span>
              </div>
              <div>
                ZIP: <span className="font-mono">12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
