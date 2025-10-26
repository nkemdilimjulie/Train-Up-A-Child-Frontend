"use client";

import { useState, useEffect } from "react";

export default function ChildListPage() {
  const [children, setChildren] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      setLoading(true);
      setError("");
      try {
        const BACKEND_URL = "http://localhost:8000";
        const res = await fetch(`${BACKEND_URL}/api/children/list/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch children.");
          return;
        }

        setChildren(data);
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Children List</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {children.length === 0 && !loading && <p>No children found.</p>}

      <ul className="space-y-4">
        {children.map((child, index) => (
          <li key={index} className="border p-4 rounded">
            {child.first_name && (
              <p>
                <strong>First Name:</strong> {child.first_name}
              </p>
            )}
            {child.last_name && (
              <p>
                <strong>Last Name:</strong> {child.last_name}
              </p>
            )}
            {child.email && (
              <p>
                <strong>Email:</strong> {child.email}
              </p>
            )}
            {child.username && (
              <p>
                <strong>Username:</strong> {child.username}
              </p>
            )}
            <p>
              <strong>Age:</strong> {child.age}
            </p>
            <p>
              <strong>Class Name:</strong> {child.class_name}
            </p>
            {child.guardian_name && (
              <p>
                <strong>Guardian Name:</strong> {child.guardian_name}
              </p>
            )}
            {child.guardian_phone && (
              <p>
                <strong>Guardian Phone:</strong> {child.guardian_phone}
              </p>
            )}
            {child.guardian_email && (
              <p>
                <strong>Guardian Email:</strong> {child.guardian_email}
              </p>
            )}
            <p>
              <strong>Story:</strong> {child.story}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
