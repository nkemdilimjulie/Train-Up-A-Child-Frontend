
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FastDonation from "@/components/FastDonation";
import DonateButton from "@/components/DonateButton";

export default function DonatePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔧 FIX: token must NOT be read during render
  const [token, setToken] = useState(null);

  const API_BASE = "http://127.0.0.1:8000";

  // 🔧 FIX: read localStorage only in browser
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

  const handleDonate = async () => {
    setError("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    if (!user?.username) {
      setError(
        "To donate using this option, you must be registered and logged in as a sponsor. Or, use the Donate Fast option... 🟩👉"
      );
      return;
    }

    if (!token) {
      setError("You are not authenticated. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/donations/sponsor-checkout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Failed to initiate payment.");
      }
    } catch (err) {
      console.error("Donation error:", err);
      setError("Unexpected error. Please try again.");
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
      {/* Left Section - Info Message */}
      <motion.div
        className="md:w-1/2 w-full text-center md:text-left"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-green-50 p-8 rounded-2xl shadow-sm">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Sponsor Donation 🌟
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            As a registered and logged-in sponsor, your donation will be securely attached to your sponsor profile.
          </p>
        </div>
      </motion.div>

      {/* Right Section - Donation Form */}
      <motion.div
        className="md:w-1/2 lg:w-2/5 w-full bg-white p-8 rounded-2xl shadow-lg border"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-green-700">
          Donate as a Registered Sponsor
        </h1>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <input
          type="number"
          placeholder="Donation Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <DonateButton onClick={handleDonate} loading={loading} />
      </motion.div>

      {/* Fast Donation (no login required) */}
      <FastDonation link="/fast-donate" />
    </div>
  );
}
