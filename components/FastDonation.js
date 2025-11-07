"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FastDonation() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFastDonate = async () => {
    setError("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/donations/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        setError(data.error || "Failed to initiate donation.");
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-lg text-sm text-gray-700 shadow-sm">
      <p className="mb-3">
        For a fast contribution, <strong>without registration or login</strong>, you can donate instantly below.
      </p>

      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <input
          type="number"
          placeholder="Enter amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={handleFastDonate}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Donate Fast"}
        </motion.button>
      </div>
    </div>
  );
}
