const stripePromise = loadStripe(
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_STRIPE_PK_TEST
    : process.env.NEXT_STRIPE_PK_LIVE
);
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handlePayment = createAsyncThunk(
  "payments/handlePayment",
  async ({ paymentMethod, products, addressInfo, credentialsInfo, user, totalPrice }) => {
    if (paymentMethod === "card") {
      try {
        const stripe = await stripePromise;

        const res = await makePaymentRequest("/api/orders", {
          products,
          paymentMethod,
          status: "active",
          addressInfo,
          credentialsInfo,
          user,
          totalPrice,
        });

        await stripe.redirectToCheckout({
          sessionId: res.stripeSession.id,
        });
      } catch (error) {
        console.log(error, "Error handling card payment");
      }
    } else {
      try {
        await makePaymentRequest("/api/orders", {
          products,
          paymentMethod,
          status: "active",
          addressInfo,
          credentialsInfo,
          user,
          totalPrice,
        });
      } catch (error) {
        console.log(error, "Error handling arrive order");
      }
    }
  }
);
