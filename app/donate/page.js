"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // ✅ Framer Motion import

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

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-center bg-gray-50 px-6 pt-10 md:pt-16 gap-8">

      {/* Left Section - Mission Message */}
      <motion.div
        className="md:w-1/2 w-full text-center md:text-left"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-green-50 p-8 rounded-2xl shadow-sm">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Together, We Make a Difference 🌍
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Bridging compassionate sponsors and generous donors with children in need — 
            empowering brighter futures and lasting opportunities.
          </p>
        </div>
      </motion.div>

      {/* Right Section - Donation Form */}
      <motion.div
        className="md:w-1/3 w-full bg-white p-8 rounded-2xl shadow-lg border"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-green-700">
          Donate
        </h1>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <input
          type="number"
          placeholder="Donation Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button
          onClick={handleDonate}
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "Donate"}
        </button>
      </motion.div>
    </div>
  );
}
