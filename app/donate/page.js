
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { useAuth } from "@/context/AuthContext";
// import FastDonation from "@/components/FastDonation";

// export default function SponsorDonatePage() {
//   const { user } = useAuth();
//   const router = useRouter();

//   const [amount, setAmount] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleDonate = async () => {
//     setError("");

//     if (!amount || isNaN(amount) || Number(amount) <= 0) {
//       setError("Please enter a valid donation amount.");
//       return;
//     }

//     if (!user?.username) {
//       setError("You must be logged in as a sponsor to donate.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:8000/api/donations/sponsor-checkout/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount }),
//         credentials: "include", // ensures user session is sent
//       });

//       const data = await res.json();

//       if (res.ok && data.url) {
//         window.location.href = data.url; // Redirect to Stripe checkout
//       } else {
//         setError(data.error || "Failed to initiate payment.");
//       }
//     } catch (err) {
//       console.error("Donation error:", err);
//       setError("Unexpected error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-center bg-gray-50 px-6 pt-10 md:pt-16 gap-8">

//       {/* Left Section - Message */}
//       <motion.div
//         className="md:w-1/2 w-full text-center md:text-left"
//         variants={fadeUp}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="bg-green-50 p-8 rounded-2xl shadow-sm">
//           <h2 className="text-3xl font-bold text-green-700 mb-4">
//             Sponsor Donation 🌟
//           </h2>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             As a logged-in sponsor, your donation will be securely attached to your sponsor profile
//             and help children in need.
//           </p>
//         </div>
//       </motion.div>

//       {/* Right Section - Donation Form */}
//       <motion.div
//         className="md:w-1/3 w-full bg-white p-8 rounded-2xl shadow-lg border"
//         variants={fadeUp}
//         initial="hidden"
//         animate="visible"
//         transition={{ delay: 0.2 }}
//       >
//         <h1 className="text-2xl font-bold mb-4 text-center text-green-700">
//           Donate as Sponsor
//         </h1>

//         {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

//         <input
//           type="number"
//           placeholder="Donation Amount (USD)"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
        
//         <motion.button
//           onClick={handleDonate}
//           disabled={loading}
//           className={`w-full text-white px-4 py-2 rounded ${
//             loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
//           }`}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           {loading ? "Processing..." : "Donate Now"}
//         </motion.button>
//       </motion.div>
//       <FastDonation />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import FastDonation from "@/components/FastDonation";
import DonateButton from "@/components/DonateButton";

export default function DonatePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async () => {
    setError("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    // Check if user is logged in
    if (!user?.username) {
      setError("To donate using this option, you must be registered and logged in as a sponsor. Or, use the Fast Donate option."); 
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/donations/sponsor-checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        setError(data.error || "Failed to initiate payment.");
      }
    } catch (err) {
      console.error("Donation error:", err);
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-center bg-gray-50 px-6 pt-10 md:pt-16 gap-8">
      {/* Left Section - Info Message */}
      <motion.div
        className="md:w-1/2 w-full text-center md:text-left"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-green-50 p-8 rounded-2xl shadow-sm">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Sponsor Donation 🌟
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            As a registered and logged-in sponsor, your donation will be securely attached to your sponsor profile.
          </p>
        </div>
      </motion.div>

      {/* Right Section - Donation Form */}
      <motion.div
        className="md:w-1/3 w-full bg-white p-8 rounded-2xl shadow-lg border"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-green-700">
          Donate as Registered Sponsor
        </h1>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <input
          type="number"
          placeholder="Donation Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Uses SCSS + Tailwind button component */}
        <DonateButton onClick={handleDonate} loading={loading} />
      </motion.div>

      {/* Fast Donation (no login required) */}
      <FastDonation link="/fast-donate" />
    </div>
  );
}
