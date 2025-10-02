"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    is_sponsor: false,
    first_name: "",
    last_name: "",
    sponsor_username: "",
    organization_name: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/account/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log("Registration result:", data);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border rounded"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded"/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded"/>
        <input name="phone" placeholder="Phone" onChange={handleChange} className="w-full p-2 border rounded"/>

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="is_sponsor" checked={form.is_sponsor} onChange={handleChange}/>
          <span>I am a sponsor</span>
        </label>

        {form.is_sponsor && (
          <div className="space-y-2">
            <input name="first_name" placeholder="First Name" onChange={handleChange} className="w-full p-2 border rounded"/>
            <input name="last_name" placeholder="Last Name" onChange={handleChange} className="w-full p-2 border rounded"/>
            <input name="sponsor_username" placeholder="Sponsor Username" onChange={handleChange} className="w-full p-2 border rounded"/>
            <input name="organization_name" placeholder="Organization Name" onChange={handleChange} className="w-full p-2 border rounded"/>
            <input name="address" placeholder="Address" onChange={handleChange} className="w-full p-2 border rounded"/>
          </div>
        )}

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
