// "use client";
// import { useEffect, useState } from "react";
// import DonateButton from "@/components/DonateButton";

// export default function DonatePage() {
//   const [children, setChildren] = useState([]);
//   const [selectedChildId, setSelectedChildId] = useState("");
//   const [sponsorId, setSponsorId] = useState("");
//   const [amount, setAmount] = useState(5000); // default = 50.00
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Please login first before donating.");
//       return;
//     }

//     // ✅ Fetch sponsor profile
//     fetch("http://127.0.0.1:8000/api/sponsor/me/", {
//       headers: { Authorization: `Token ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.error) setError(data.error);
//         else setSponsorId(data.sponsor_id);
//       })
//       .catch(() => setError("Could not fetch sponsor details. Please log in again."));

//     // ✅ Fetch children for dropdown
//     fetch("http://127.0.0.1:8000/api/children/")
//       .then((res) => res.json())
//       .then(setChildren)
//       .catch(() => setError("Could not load children list."));
//   }, []);

//   const handleDonate = () => {
//     if (!sponsorId || !selectedChildId || !amount) {
//       setError("Please fill all fields before proceeding.");
//       return;
//     }
//     setError("");
//     setMessage("Redirecting to Stripe checkout...");
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
//         <h1 className="text-2xl font-semibold mb-4 text-center">
//           Make a Donation
//         </h1>

//         {error && <p className="text-red-600 mb-3">{error}</p>}
//         {message && <p className="text-green-600 mb-3">{message}</p>}

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Select a Child:</label>
//             <select
//               value={selectedChildId}
//               onChange={(e) => setSelectedChildId(e.target.value)}
//               className="w-full border p-2 rounded-lg"
//             >
//               <option value="">-- Choose a child to support --</option>
//               {children.map((child) => (
//                 <option key={child.id} value={child.id}>
//                   {child.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Donation Amount ($):</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(Number(e.target.value))}
//               className="w-full border p-2 rounded-lg"
//             />
//           </div>

//           <DonateButton
//             sponsor_id={sponsorId}
//             child_id={selectedChildId}
//             amount={amount}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import DonateButton from "@/components/DonateButton";
import { useRouter } from "next/navigation";

export default function DonatePage() {
  const router = useRouter();

  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [sponsorId, setSponsorId] = useState("");
  const [amount, setAmount] = useState(5000);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setError("Please login first before donating.");
      setLoading(false);
      return;
    }

    // Fetch sponsor info safely
    const sponsorInfo = JSON.parse(localStorage.getItem("sponsor_info"));
    if (sponsorInfo) {
      setSponsorId(sponsorInfo.sponsor_id);
    } else {
      // fallback: fetch from API
      fetch("http://127.0.0.1:8000/api/accounts/sponsor/me/", {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else setSponsorId(data.sponsor_id);
        })
        .catch(() => setError("Could not fetch sponsor details."));
    }

    // Fetch children for dropdown
    fetch("http://127.0.0.1:8000/api/children/")
      .then((res) => res.json())
      .then(setChildren)
      .catch(() => setError("Could not load children list."))
      .finally(() => setLoading(false));
  }, []);

  const handleDonate = () => {
    if (!sponsorId || !selectedChildId || !amount) {
      setError("Please fill all fields before proceeding.");
      return;
    }
    setError("");
    setMessage("Redirecting to Stripe checkout...");
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Make a Donation</h1>

        {error && <p className="text-red-600 mb-3">{error}</p>}
        {message && <p className="text-green-600 mb-3">{message}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Select a Child:</label>
            <select
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              className="w-full border p-2 rounded-lg"
            >
              <option value="">-- Choose a child to support --</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Donation Amount ($):</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          <DonateButton
            sponsor_id={sponsorId}
            child_id={selectedChildId}
            amount={amount}
          />
        </div>
      </div>
    </div>
  );
}
