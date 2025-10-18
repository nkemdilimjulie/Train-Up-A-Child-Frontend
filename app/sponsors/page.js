// app/sponsors/page.js


// export default function SponsorsPage() {
//   return (
//     <div>
//       <h1>Sponsors</h1>
//       <p>Register as a sponsor and help change a child's life today.</p>
     
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SponsorsPage() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    username: "",
    first_name: "",
    last_name: "",
    organization_name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;
  const first_name = typeof window !== "undefined" ? localStorage.getItem("first_name") : null;
  const last_name = typeof window !== "undefined" ? localStorage.getItem("last_name") : null;

  useEffect(() => {
    // Basic guard
    if (!token || !username) {
      setError("Not authenticated — please log in.");
      setLoading(false);
      // optionally redirect to login
      // router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/sponsor/by-username/${encodeURIComponent(username)}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );

        // handle non-JSON or empty body
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          // prefer backend message when available
          const msg = data && (data.error || data.detail) ? (data.error || data.detail) : `Failed to fetch sponsor details (status ${res.status})`;
          setError(msg);
        } else {
          // Map returned data into profile fields. Backend may return 'user' or 'username'
          setProfile((prev) => ({
            ...prev,
            username: (data.user && (data.user.username || data.user)) || data.username || username || prev.username,
            first_name: data.first_name ?? prev.first_name,
            last_name: data.last_name ?? prev.last_name,
            organization_name: data.organization_name ?? prev.organization_name,
            phone: data.phone ?? prev.phone,
            address: data.address ?? prev.address,
          }));
        }
      } catch (err) {
        console.error("Fetch sponsor error:", err);
        setError("Could not fetch sponsor details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, username, first_name, last_name]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    if (!token || !username) {
      setError("You must be logged in to save the sponsor profile.");
      setSaving(false);
      return;
    }

    try {
      // POST to the by-username endpoint (your requested route)
      const res = await fetch(
        `http://127.0.0.1:8000/api/sponsor/by-username/${encodeURIComponent(username)}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            first_name: profile.first_name,
            last_name: profile.last_name,
            organization_name: profile.organization_name,
            phone: profile.phone,
            address: profile.address,
          }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = data && (data.error || data.detail) ? (data.error || data.detail) : `Failed to save (status ${res.status})`;
        setError(msg);
        setSaving(false);
        return;
      }

      // Expect the backend to return the sponsor object including id
      const sponsorId = data.id ?? data.sponsor_id ?? null;
      if (sponsorId) {
        localStorage.setItem("sponsor_id", sponsorId);
      }

      setMessage("✅ Profile saved successfully! Redirecting to donate...");
      // small pause so user sees confirmation
      setTimeout(() => {
        // redirect to donate and include sponsor_id as query param
        const target = sponsorId ? `/donate?sponsor_id=${sponsorId}` : `/donate`;
        router.push(target);
      }, 1200);
    } catch (err) {
      console.error("Save sponsor error:", err);
      setError("Network error while saving profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Loading / error UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading sponsor details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Sponsor Profile</h1>

     
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {message && <p className="text-green-600 text-center mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700">First Name</label>
            <input
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="First Name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Last Name</label>
            <input
              name="last_name"
              value={profile.last_name}
              // onChange={handleChange}
              readOnly
              className="w-full p-2 border rounded"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700">Username</label>
          <input
            name="username"
            value={profile.username || username || ""}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        

        <div>
          <label className="block text-sm text-gray-700">Organization Name (optional)</label>
          <input
            name="organization_name"
            value={profile.organization_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Organization Name"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Phone Number</label>
          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Phone"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700">Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded"
            placeholder="Address"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-full py-2 rounded text-white ${saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
