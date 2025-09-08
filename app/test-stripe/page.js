"use client";

import { useRouter } from "next/navigation";

export default function TestStripe() {
  const router = useRouter();
  return (
    <div>
      <h1>Test Stripe Redirects</h1>
      <button onClick={() => router.push("/success?amount=50")}>
        Simulate Success
      </button>
      <button onClick={() => router.push("/cancel")}>
        Simulate Cancel
      </button>
    </div>
  );
}
