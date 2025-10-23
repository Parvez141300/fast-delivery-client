import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const StripePaymentForm = ({ parcelData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handleSubmit = async (e) => {
    setIsProcessing(true);
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (result.error) {
      setIsProcessing(false);
      return setErrorMessage(result?.error?.message);
    } else {
      setErrorMessage("");
      // console.log("the payment method is", result?.paymentMethod);
    }

    let amountInCents = parcelData?.amount * 100;

    // create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId: parcelData?._id,
    });

    // console.log("res of the stripe pay", res);

    const clientSecret = res?.data?.clientSecret;

    // confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      }
    );

    if (error) {
      setErrorMessage(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      setErrorMessage("");
      // Handle successful payment here
      setIsProcessing(false);

      console.log("confirmed payment intent", paymentIntent);

      // ✅ Update parcel payment status
      await axiosSecure.patch(`/parcels/payment/${parcelData?._id}`);

      // ✅ Save payment history
      await axiosSecure
        .post("/payments", {
          parcelId: parcelData?._id,
          userEmail: user?.email,
          amount: parcelData?.amount,
          paymentMethod: paymentIntent.payment_method_types,
          createdAt: new Date().toISOString(),
        })
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Payment Successful by: ${parcelData?.senderName} and saved to db`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/dashboard/my-parcels');
          } else {
            toast.error(
              `Payment already done by the user ${user?.displayName}`
            );
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <CardElement className="border border-primary rounded-md p-2" />
      {errorMessage && <p className="text-accent">{errorMessage}</p>}
      <button
        type="submit"
        disabled={isProcessing}
        className="btn btn-primary w-full"
      >
        {isProcessing ? (
          <>
            <span className="loading loading-spinner"></span> Paying ৳
            {parcelData?.amount}{" "}
          </>
        ) : (
          <>Pay ৳{parcelData?.amount}</>
        )}
      </button>
    </form>
  );
};

export default StripePaymentForm;
