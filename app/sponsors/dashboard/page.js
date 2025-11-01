// "use client";

// import { useAuth } from "@/context/AuthContext";
// import Image from "next/image";
// import Link from "next/link";

// export default function SponsorDashboard() {
//   const { user } = useAuth();

//   return (
//     <div className="pt-6">
//       <h1 className="text-2xl font-bold mb-4 text-blue-700">
//         Welcome, {user?.organization || "Dear Sponsor"}!
//       </h1>
//       <p className="text-gray-600 mb-6">
//         Thank you for supporting our children. Here’s your impact summary:
//       </p>

//       {/* Summary Cards */}
//       <div className="grid md:grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 shadow rounded-xl">
//           <h2 className="text-xl font-semibold text-blue-600 mb-2">Total Donated</h2>
//           <p className="text-3xl font-bold text-amber-500">€2,450</p>
//         </div>
//         <div className="bg-white p-6 shadow rounded-xl">
//           <h2 className="text-xl font-semibold text-blue-600 mb-2">Donations Made</h2>
//           <p className="text-3xl font-bold text-amber-500">12</p>
//         </div>
//         <div className="bg-white p-6 shadow rounded-xl">
//           <h2 className="text-xl font-semibold text-blue-600 mb-2">Children Helped</h2>
//           <p className="text-3xl font-bold text-amber-500">All</p>
//         </div>
//       </div>

//       {/* Rotating Children Photos */}
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
//         {[1, 2, 3, 4, 5, 6].map((i) => (
//           <Image
//             key={i}
//             src={`/images/children/child${i}.jpg`}
//             alt={`Child ${i}`}
//             width={300}
//             height={200}
//             className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
//           />
//         ))}
//       </div>

//       <div className="flex gap-4">
//         <Link
//           href="/sponsors/donations"
//           className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
//         >
//           Make a Donation
//         </Link>
//         <Link
//           href="/sponsors/profile"
//           className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-500 transition"
//         >
//           Edit Profile
//         </Link>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

export default function SponsorDashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.username) return;

    const fetchData = async () => {
      try {
        const [resProfile, resDonations] = await Promise.all([
          fetch(`http://localhost:8000/api/sponsors/${user.username}/`),
          fetch(`http://localhost:8000/api/donations/${user.username}/`),
        ]);

        const profileData = await resProfile.json();
        const donationData = await resDonations.json();

        if (resProfile.ok) setProfile(profileData);
        if (resDonations.ok) setDonations(donationData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, [user]);

  const totalDonated = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);

  return (
    <div className="pt-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        Welcome, { user?.username || "Dear Sponsor"}!
      </h1>
      <p className="text-gray-600 mb-6">
        Thank you for supporting our children. Here’s your impact summary:
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Total Donated</h2>
          <p className="text-3xl font-bold text-amber-500">€{totalDonated.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Donations Made</h2>
          <p className="text-3xl font-bold text-amber-500">{donations.length}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-xl font-semibold text-blue-600 mb-2">Children Helped</h2>
          <p className="text-3xl font-bold text-amber-500">{donations.length > 0 ? "Many" : "None yet"}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link
          href="/sponsors/donations"
          className="bg-yellow-400 text-blue-900 px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition"
        >
          Make a Donation
        </Link>
        <Link
          href="/sponsors/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-500 transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}
