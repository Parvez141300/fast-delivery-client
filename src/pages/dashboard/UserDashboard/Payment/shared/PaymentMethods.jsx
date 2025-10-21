import React, { useState } from "react";
import { toast } from "react-toastify";

const PaymentMethods = ({ parcelData }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);


  const paymentMethods = [
    { id: "ssl", label: "SSLCOMMERZ" },
    { id: "stripe", label: "stripe" },
    { id: "bkash", label: "bKash payment" },
    { id: "manual-bkash", label: "Manual bKash" },
    { id: "lift", label: "LIFT" },
  ];

  const handleProceedToPayment = () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms and Conditions");
      return;
    }
    // Handle payment processing here
    if (selectedMethod === "stripe") {
      toast(`Proceeding with payment method: ${selectedMethod}`);
      return;
    }
    if (selectedMethod === "ssl") {
      toast(`Proceeding with payment method: ${selectedMethod}`);
      return;
    } else {
      toast(`current this payment methods are not available ${selectedMethod}`);
      return;
    }
  };

  return (
    <div className="bg-base-300 rounded-lg shadow-lg p-5">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Select Payment Method
      </h2>

      {/* Payment Methods */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedMethod === method.id
                ? "border-primary bg-base-300"
                : "border-primary/20 hover:border-primary"
            }`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <div className="flex items-center justify-center w-5 h-5 border-2 rounded-full mr-3">
              {selectedMethod === method.id && (
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
              )}
            </div>
            <span className="font-medium text-gray-700">{method.label}</span>
          </div>
        ))}
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center mb-6">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="checkbox checkbox-primary mr-3"
        />
        <div htmlFor="terms" className="text-sm ">
          I agree to the{" "}
          <span className="text-accent cursor-pointer hover:underline">
            Terms And Conditions
          </span>
        </div>
      </div>

      {/* Course Info */}
      <div className="bg-primary/20 rounded-lg p-4 mb-6">
        <div className="text-sm  mb-1">Fast Delivery alongside with us</div>
        <div className="text-2xl font-bold text-primary">
          ৳ {parcelData?.amount}
        </div>
      </div>

      {/* Proceed Button */}
      <button
        onClick={handleProceedToPayment}
        disabled={!selectedMethod || !agreedToTerms}
        className="w-full btn btn-primary"
      >
        Proceed To Payment
      </button>
    </div>
  );
};

export default PaymentMethods;
