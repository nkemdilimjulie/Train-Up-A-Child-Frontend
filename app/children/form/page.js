"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ChildFormPage() {
  const [age, setAge] = useState("");
  const [className, setClassName] = useState("");
  const [story, setStory] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [userData, setUserData] = useState({ first_name: "", last_name: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get("username");

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

    const BACKEND_URL = "http://localhost:8000";
    const res = await fetch(`${BACKEND_URL}/api/children/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        age,
        class_name: className,
        story,
        guardian_name: guardianName,
        guardian_phone: guardianPhone,
        guardian_email: guardianEmail,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }

    setSuccess("Child profile created successfully!");
    setTimeout(() => router.push("/login"), 1500);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Child Profile</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      {/* Read-only user info */}
      <div className="space-y-2 mb-4">
        <input type="text" value={userData.first_name} readOnly className="border p-2 rounded w-full bg-gray-100" placeholder="First Name" />
        <input type="text" value={userData.last_name} readOnly className="border p-2 rounded w-full bg-gray-100" placeholder="Last Name" />
        <input type="email" value={userData.email} readOnly className="border p-2 rounded w-full bg-gray-100" placeholder="Email" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="border p-2 rounded w-full" required />
        <input type="text" placeholder="Class Name" value={className} onChange={(e) => setClassName(e.target.value)} className="border p-2 rounded w-full" required />
        <input type="text" placeholder="Guardian Name" value={guardianName} onChange={(e) => setGuardianName(e.target.value)} className="border p-2 rounded w-full" />
        <input type="text" placeholder="Guardian Phone" value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} className="border p-2 rounded w-full" />
        <input type="email" placeholder="Guardian Email" value={guardianEmail} onChange={(e) => setGuardianEmail(e.target.value)} className="border p-2 rounded w-full" />
        <textarea placeholder="Child Story" value={story} onChange={(e) => setStory(e.target.value)} className="border p-2 rounded w-full" required></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Submit</button>
      </form>
    </div>
  );
}
