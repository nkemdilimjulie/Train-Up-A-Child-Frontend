// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const [showTip, setShowTip] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const router = useRouter();

//   // ✅ Detect login state when the page loads
//   useEffect(() => {
//     const token = localStorage.getItem("auth_token");
//     setIsLoggedIn(!!token);
//   }, []);

 
//   // ✅ Navigate to form pages — clear only form data
//   const handleNavigate = (path) => {
//     sessionStorage.removeItem("form_data");
//     router.push(path);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6">
//       <h1 className="text-3xl font-bold mb-4 text-center">
//         Welcome to Train-Up-A-Child Charity Organization
//       </h1>
//       <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
//         Help sponsor poor children's education and support their wellbeing in remote areas.
//       </p>

      
                    
//       <div className="flex gap-4">
//         <button
//           onClick={() => handleNavigate("/login")}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
//         >
//           Login
//         </button>
//         <button
//           onClick={() => handleNavigate("/register")}
//           className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
//         >
//           Register
//         </button>
//         <button
//           onClick={() => setShowTip(true)}
//           className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
//         >
//           Tip
//         </button>
//       </div>


//       {/* ✅ Tip modal */}
//       {showTip && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//           onClick={() => setShowTip(false)} // Close when clicking outside
//         >
//           <div
//             className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center"
//             onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
//           >
//             <h2 className="text-xl font-semibold mb-3">Tip</h2>
//             <p className="text-gray-800">
//               👉 If you are a new user, please click{" "}
//               <span className="font-semibold">Register</span>.  
//               If you are already registered, click{" "}
//               <span className="font-semibold">Login</span>.
//             </p>
//             <button
//               onClick={() => setShowTip(false)}
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// app/page.jsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Train-Up-A-Child Charity Organization !!! <br /> <br /></h1>
        <p className="mt-2 text-lg text-gray-600">
          Empowering underprivileged children through sponsorships <br />
          Help to sponsor poor children's education and support their wellbeing in remote areas        </p>
      </header>

      <main className="flex flex-col md:flex-row gap-6">
        <Link
          href="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Login
        </Link>
       
      </main>

      <footer className="mt-16 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Train-Up-A-Child. All rights reserved.
      </footer>
    </div>
  );
}

