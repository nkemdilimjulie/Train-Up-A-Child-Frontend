"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// ✅ Reusable Top Feature Section
export function TopFeatureSection({ title, subtitle }) {
  return (
    <div className="bg-blue-50 text-center py-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function SponsorFormPage() {
  const [organization, setOrganization] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState({ first_name: "", last_name: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get("username");

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      if (!username) return;
      try {
        const res = await fetch(`http://localhost:8000/api/accounts/user-info/?username=${username}`);
        const data = await res.json();
        if (res.ok) setUserData(data);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };
    fetchUser();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const BACKEND_URL = "http://localhost:8000";
      const res = await fetch(`${BACKEND_URL}/api/sponsors/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          organization,
          country,
          phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setSuccess("Sponsor profile created successfully!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      
     

      <h1 className="text-2xl font-bold mb-4 text-center">Sponsor Profile Form</h1>

      {/* ✅ Professional sponsor instruction */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded">
        <p className="text-gray-700">
          <b>To become a Sponsor:</b> Register first.
          <br />
          (Click the <b>sponsor</b> role on the registration form)
        </p>
      </div>

    
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      {/* Read-only user data */}
      <div className="space-y-2 mb-4">
        <input
          type="text"
          value={userData.first_name}
          readOnly
          className="border p-2 rounded w-full bg-gray-100"
          placeholder="First Name"
        />
        <input
          type="text"
          value={userData.last_name}
          readOnly
          className="border p-2 rounded w-full bg-gray-100"
          placeholder="Last Name"
        />
        <input
          type="email"
          value={userData.email}
          readOnly
          className="border p-2 rounded w-full bg-gray-100"
          placeholder="Email"
        />
      </div>

      {/* Sponsor form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


