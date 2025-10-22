import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");

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
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      return setErrorMessage(error.message);
    } else {
      console.log("the payment method is", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <CardElement options={cardElementOptions} />
      <button className="btn btn-primary w-full">Pay</button>
    </form>
  );
};

export default StripePaymentForm;
