"use client";

import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Cancelled ❌</h1>
      <p>Your donation was not completed.</p>
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
        onClick={() => router.push("/")}
      >
        Try Again
      </button>
    </div>
  );
}
