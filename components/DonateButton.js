"use client";

import { useState } from "react";

export default function DonateButton({ amount = 50 }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/donations/create-checkout-session/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return <button onClick={handleCheckout} disabled={loading}>{loading ? "Redirecting..." : `Donate $${amount}`}</button>;
}
