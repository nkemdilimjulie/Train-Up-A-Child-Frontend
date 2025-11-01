"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SponsorDonations() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (!user?.username) return;
    const fetchDonations = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/donations/${user.username}/`);
        const data = await res.json();
        if (res.ok) setDonations(data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };
    fetchDonations();
  }, [user]);

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Donation History</h1>

      <table className="min-w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-blue-600 text-white text-left">
            <th className="p-3">Date</th>
            <th className="p-3">Amount (€)</th>
          </tr>
        </thead>
        <tbody>
          {donations.length > 0 ? (
            donations.map((d) => (
              <tr key={d.id} className="border-b hover:bg-blue-50">
                <td className="p-3">{new Date(d.created_at).toLocaleDateString()}</td>
                <td className="p-3 font-semibold">{d.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-3 text-gray-500" colSpan="2">No donations yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
