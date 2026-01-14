"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ReturnToLastPage from "@/components/ReturnToLastPage";


export default function SponsorDonations() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (!user?.username) return;

    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("❌ No auth token found in localStorage");
          return;
        }

        const res = await fetch("http://localhost:8000/api/donations/", {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("🔎 Donations response status:", res.status);

        const text = await res.text();
        console.log("🔎 Raw response:", text);

        if (!res.ok) {
          console.error("❌ Backend rejected request");
          return;
        }

        const data = JSON.parse(text);
        setDonations(data);

      } catch (err) {
        console.error("🔥 Fetch crash:", err);
      }
    };


    fetchDonations();
  }, [user]);

  return (
    <div className="pt-6">
      
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Donation History (Make sure you are logged in as a sponsor)
      </h1>

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
                <td className="p-3">
                  {new Date(d.created_at).toLocaleDateString()}
                </td>
                <td className="p-3 font-semibold">
                  {d.amount}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="p-3 text-gray-500">
                No donations yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <br /> <br />
      <ReturnToLastPage fallback="/sponsors/dashboard" />
    </div>
  );
}
