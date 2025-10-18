"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // 🧹 Step 1: Clear all stored data
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_sponsor");
    localStorage.removeItem("sponsor_info");
    sessionStorage.removeItem("form_data");

    console.log("✅ User logged out and data cleared");

    // 🧭 Step 2: Redirect to Home page after short delay
    setTimeout(() => {
      router.push("/"); // ✅ go to Home
    }, 1500);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Logging out...
        </h2>
        <p className="text-gray-500">Please wait a moment.</p>
      </div>
    </div>
  );
}
