"use client";
import { useState } from "react";
import DonateButton from "@/components/DonateButton";

export default function DonatePage() {
  const [amount, setAmount] = useState(5000); // default $50
  const [sponsorId, setSponsorId] = useState("");
  const [childId, setChildId] = useState("");

  const presetAmounts = [
    { label: "$10", value: 1000 },
    { label: "$25", value: 2500 },
    { label: "$50", value: 5000 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sponsorId || !childId) {
      alert("Please enter sponsor and child IDs.");
      return;
    }
    // You could trigger DonateButton’s logic here if needed
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Support a Child</h1>
      <p className="mb-6">
        Fill in your details and choose your donation amount:
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Sponsor input */}
        <div>
          <label className="block mb-1 font-medium">Sponsor ID</label>
          <input
            type="text"
            value={sponsorId}
            onChange={(e) => setSponsorId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your Sponsor ID"
          />
        </div>

        {/* Child input */}
        <div>
          <label className="block mb-1 font-medium">Child ID</label>
          <input
            type="text"
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter the Child ID"
          />
        </div>

        {/* Preset amount buttons */}
        <div>
          <label className="block mb-2 font-medium">Choose Amount</label>
          <div className="flex gap-3">
            {presetAmounts.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => setAmount(option.value)}
                className={`px-4 py-2 rounded border ${
                  amount === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Donate button */}
        <DonateButton
          sponsor_id={sponsorId}
          child_id={childId}
          amount={amount}
        />
      </form>
    </main>
  );
}
