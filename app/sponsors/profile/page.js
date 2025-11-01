"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function SponsorProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.username) return;
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/sponsors/${user.username}/`);
        const data = await res.json();
        if (res.ok) setProfile(data);
      } catch (err) {
        console.error("Error fetching sponsor profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Sponsor Profile</h1>

      {profile ? (
        <div className="bg-white p-6 rounded-xl shadow max-w-md">
          <p><strong>First Name:</strong> {profile.first_name}</p>
          <p><strong>Last Name:</strong> {profile.last_name}</p>
          <p><strong>Organization:</strong> {profile.organization}</p>
          <p><strong>Country:</strong> {profile.country}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : (
        <p className="text-gray-500">No profile found.</p>
      )}

      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
        Update Information
      </button>
    </div>
  );
}
