"use client";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function DonateButton({ sponsor_id, child_id, amount }) {
  console.log("DEBUG sending:", {
    sponsor_id,
    child_id,
    amount,
});

  const handleDonate = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/donations/create-checkout-session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sponsor_id: sponsor_id,
          child_id: child_id,
          amount: amount, // passed from preset
        }),
      });

      const data = await res.json();
      if (data.error) {
        alert("Payment failed: " + data.error);
        return;
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error("Error creating checkout session:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleDonate}
      className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
    >
      Donate Now
    </button>
  );
}

//if ---
//  headers: { "Content-Type": "application/json" }, use request.data
// headers: { "Content-Type": "application/x-www-form-urlencoded" }, use request.POST

