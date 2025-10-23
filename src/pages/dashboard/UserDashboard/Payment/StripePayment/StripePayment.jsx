import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaShippingFast } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "./shared/StripePaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Payment_Publishable_Key);
const StripePayment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcelData = {} } = useQuery({
    queryKey: ["single-parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-12">
        {/* left Column - Payment Form */}
        <div className="bg-base-300 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          {/* user info */}
          <div className="mb-5">
            <h3 className="font-bold text-accent">
              TrackingID: {parcelData?.trackingId}
            </h3>
            <h4>Sender Name: {parcelData?.senderName}</h4>
            <h4>Receiver Name: {parcelData?.receiverName}</h4>
            {/* Delivery Route */}
            <div className="bg-base-300 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaShippingFast className="text-blue-500" />
                Delivery Route
              </h3>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="w-3 h-3 bg-primary rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-semibold capitalize">
                    {parcelData?.senderServiceDistrictCenter}
                  </div>
                  <div className="text-xs text-primary">Pickup</div>
                </div>
                <div className="flex-1 h-1 shadow-md mx-4"></div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-secondary rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-semibold capitalize">
                    {parcelData?.receiverServiceDistrictCenter}
                  </div>
                  <div className="text-xs text-primary">Delivery</div>
                </div>
              </div>
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
        </div>
        <div className="bg-base-300 rounded-lg shadow-lg p-6">
          {/* Total Amount Highlight */}
          <div className="rounded-lg mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Payment</span>
              <span className="text-2xl font-bold text-primary">
                ৳{parcelData?.amount}
              </span>
            </div>
          </div>
          {/* stripe card */}
          <Elements stripe={stripePromise}>
            <StripePaymentForm parcelData={parcelData} />
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

export default StripePayment;
