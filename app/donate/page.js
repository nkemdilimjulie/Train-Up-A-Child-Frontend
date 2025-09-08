"use client";

import { useState } from "react";

export default function DonatePage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/donations/create-checkout-session/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 50 })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirect to Stripe
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Make a Donation</h1>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Redirecting..." : "Donate $50"}
      </button>
    </div>
  );
}
