"use client";

import { useState } from "react";

export default function SponsorDonation({ amount }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDonate = async () => {
    setError("");
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/donations/sponsor-checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        credentials: "include", // send cookies/session for authentication
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Donation Error:", err);
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
      <p className="text-gray-700 mb-3">
        As a logged-in sponsor, your donation will be securely attached to your sponsor profile.
      </p>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleDonate}
        disabled={loading}
        className={`${
          loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
        } text-white px-4 py-2 rounded transition`}
      >
        {loading ? "Processing..." : "Donate as Sponsor"}
      </button>
    </div>
  );
}
