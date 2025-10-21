import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { toast } from "react-toastify";

const PaymentForm = ({ parcelData }) => {
  const stripe = useStripe();
  const elements = useElements();

  //   {
  //     "address": {
  //         "city": null,
  //         "country": null,
  //         "line1": null,
  //         "line2": null,
  //         "postal_code": "42424",
  //         "state": null
  //     },
  //     "email": null,
  //     "name": null,
  //     "phone": null,
  //     "tax_id": null
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      toast.error(error?.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 w-full max-w-md bg-base-300 p-5 rounded-lg shadow-md"
    >
      <CardElement className="p-3 border rounded" />
      <button type="submit" disabled={!stripe} className="btn btn-primary w-full">
        Pay ${parcelData?.total}
      </button>
    </form>
  );
};

export default PaymentForm;
