"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import FastDonation from "@/components/FastDonation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("guest"); // sponsor | child | guest
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const BACKEND_URL = "http://localhost:8000";
      const res = await fetch(`${BACKEND_URL}/api/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          is_sponsor: role === "sponsor",
          is_child: role === "child",
          is_guest: role === "guest",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(
          data.username?.[0] ||
            data.first_name?.[0] ||
            data.last_name?.[0] ||
            data.email?.[0] ||
            data.password?.[0] ||
            data.non_field_errors?.[0] ||
            "Registration failed. Please try again."
        );
        return;
      }

      // ✅ Redirect based on role — each role fills its form after registering
      if (res.ok) {
        if (role === "sponsor") {
          router.push(`/sponsors/form?username=${username}`);
        } else if (role === "child") {
          router.push(`/children/form?username=${username}`);
        } else {
          router.push(`/guest/form?username=${username}`);
        }
        return;
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <FastDonation/>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        {/* First Name */}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        {/* Last Name */}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 rounded w-full"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        {/* Role Selection */}
        <div>
          <label className="block mb-1 font-medium">Select Role:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="sponsor"
                checked={role === "sponsor"}
                onChange={() => setRole("sponsor")}
              />
              Sponsor
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="child"
                checked={role === "child"}
                onChange={() => setRole("child")}
              />
              Child
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="guest"
                checked={role === "guest"}
                onChange={() => setRole("guest")}
              />
              Guest
            </label>
          </div>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 rounded w-full pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2 top-2 text-gray-500"
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
