"use client"; // Needed if using client-side hooks like useState or useEffect

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const [donationAmount, setDonationAmount] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Example: Get donation amount from query params (optional)
    const params = new URLSearchParams(window.location.search);
    const amount = params.get("amount");
    if (amount) setDonationAmount(amount);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Thank you for your donation{donationAmount ? ` of $${donationAmount}` : ""}!</p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
