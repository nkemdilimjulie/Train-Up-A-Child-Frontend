"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonatePage() {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDonate = async () => {
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
        setError(data.error || "Failed to initiate payment.");
      }
    } catch (err) {
      console.error(err);
      setError("Unexpected error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Donate</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="number"
        placeholder="Donation Amount (USD)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <button
        onClick={handleDonate}
        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? "Processing..." : "Donate"}
      </button>
    </div>
  );
}
