"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ReturnToLastPage from "@/components/ReturnToLastPage";


export default function SponsorDashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.username) return;

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("❌ No auth token found");
          return;
        }

        const [resProfile, resDonations] = await Promise.all([
          fetch(`http://localhost:8000/api/sponsors/${user.username}/`),
          fetch(
            `http://localhost:8000/api/donations/user/${user.username}/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          ),
        ]);

        if (!resProfile.ok || !resDonations.ok) {
          console.error("❌ Backend rejected request");
          return;
        }

        const profileData = await resProfile.json();
        const donationData = await resDonations.json();

        setProfile(profileData);
        setDonations(donationData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      }
    };

    fetchData();
  }, [user]);

  const totalDonated = donations.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  );

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Welcome, {profile?.first_name || user?.username}!
      </h1>

      <p className="text-gray-600 mb-6">
        <strong>Here’s a summary of your impact so far.</strong><br /> (Please, make sure you are logged in and registered as a sponsor)
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Total Donated
          </h2>
          <p className="text-3xl font-bold text-amber-500">
            €{totalDonated.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Donations Made
          </h2>
          <p className="text-3xl font-bold text-amber-500">
            {donations.length}
          </p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">
            Children Helped
          </h2>
          <p className="text-3xl font-bold text-amber-500">
            {donations.length > 0 ? "Many" : "None yet"}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/sponsors/donations"
          className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
        >
          View Donation History
        </Link>

        <Link
          href="/sponsors/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-500 transition"
        >
          Edit Profile
        </Link>
      </div>
      <br /> <br />
      <ReturnToLastPage fallback="/" />

    </div>
  );
}
