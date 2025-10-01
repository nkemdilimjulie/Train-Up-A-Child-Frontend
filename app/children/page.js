
"use client";

import { useState } from "react";

export default function ChildrenPage() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [expandedChild, setExpandedChild] = useState(null);
  const [donationAmounts, setDonationAmounts] = useState({}); // { child_id: amount_in_cents }

  const fetchChildren = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/children/");
      if (!res.ok) throw new Error("Failed to fetch children");
      const data = await res.json();
      setChildren(data);
      setShowList(true);
    } catch (error) {
      alert("Error fetching children: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSponsors = (child_id) => {
    setExpandedChild(expandedChild === child_id ? null : child_id);
  };

  const handleDonate = async (child_id, sponsor_id = null) => {
    const amount = donationAmounts[child_id] || 5000; // default $50
    if (amount < 100) {
      alert("Donation must be at least $1");
      return;
    }

    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/donations/create-checkout-session/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ child_id, sponsor_id, amount }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { session_url } = await res.json();
      window.location.href = session_url;
    } catch (error) {
      alert("Donation failed: " + error.message);
    }
  };

  const handleAmountChange = (child_id, value) => {
    const cents = Math.max(0, Math.floor(parseFloat(value) * 100) || 0);
    setDonationAmounts((prev) => ({ ...prev, [child_id]: cents }));
  };

  return (
    <div className="p-6">
      <button
        onClick={fetchChildren}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Needy Children
      </button>

      {loading && <p className="mt-4">Loading children...</p>}

      {showList && (
        <div className="mt-6 space-y-4">
          {children.length === 0 ? (
            <p>No children available.</p>
          ) : (
            children.map((child) => (
              <div
                key={child.id}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <h2 className="text-lg font-semibold">
                  {child.first_name} {child.last_name} (Age: {child.age})
                </h2>
                <p className="text-gray-700">
                  {child.story || "No story provided."}
                </p>
                <p className="text-sm text-gray-500">Balance: ${child.balance}</p>
                <p className="text-sm text-gray-400">
                  Registered: {new Date(child.registered_at).toLocaleDateString()}
                </p>

                {/* Dynamic donation amount input */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    placeholder="Amount in $"
                    value={
                      donationAmounts[child.id]
                        ? (donationAmounts[child.id] / 100).toFixed(2)
                        : ""
                    }
                    onChange={(e) => handleAmountChange(child.id, e.target.value)}
                    className="border px-2 py-1 rounded-md w-24"
                  />
                  <button
                    onClick={() => handleDonate(child.id, null)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    Donate
                  </button>
                </div>

                {/* Toggle sponsors */}
                <button
                  onClick={() => toggleSponsors(child.id)}
                  className="mt-3 text-blue-600 underline"
                >
                  {expandedChild === child.id ? "Hide Sponsors" : "View Sponsors"}
                </button>

                {expandedChild === child.id && (
                  <div className="mt-2 pl-4 border-l border-gray-300">
                    {child.sponsors && child.sponsors.length > 0 ? (
                      child.sponsors.map((sponsor) => (
                        <div
                          key={sponsor.id}
                          className="text-sm text-gray-700 flex justify-between"
                        >
                          <span>
                            • {sponsor.organization_name} ({sponsor.user})
                          </span>
                          <button
                            onClick={() => handleDonate(child.id, sponsor.id)}
                            className="ml-2 bg-green-600 text-white px-2 py-1 rounded-md text-xs hover:bg-green-700"
                          >
                            Donate
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No sponsors yet.</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

