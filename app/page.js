

// // app/page.js
// export default function HomePage() {
//   return (
//     <div>
//       <h1>Welcome to Train-Up-A-Child Charity Organization</h1>
//       <p>Help sponsor poor children's education and support their wellbeing in remote areas.</p>
      
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [showTip, setShowTip] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome to Train-Up-A-Child Charity Organization
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Help sponsor poor children's education and support their wellbeing in remote areas.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/register")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Register
        </button>
        <button
          onClick={() => setShowTip(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
        >
          Tip
        </button>
      </div>

      {/* Modal for Tip */}
      {showTip && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center">
            <h2 className="text-xl font-semibold mb-3">Tip</h2>
            <p className="text-gray-800">
              👉 If you are a new user, please click{" "}
              <span className="font-semibold">Register</span>.  
              If you are already registered, click{" "}
              <span className="font-semibold">Login</span>.
            </p>
            <button
              onClick={() => setShowTip(false)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
