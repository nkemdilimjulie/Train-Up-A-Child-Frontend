
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react"; // 👁️ import icons

// export default function RegisterPage() {
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👁️ new state
//   const [phone, setPhone] = useState("");
//   const [isSponsor, setIsSponsor] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🧹 Clear old data on mount
//   useEffect(() => {
//     const keysToClear = [
//       "auth_token",
//       "username",
//       "is_sponsor",
//       "sponsor_info",
//     ];
//     keysToClear.forEach((key) => localStorage.removeItem(key));
//     sessionStorage.removeItem("form_data");

//     // ✅ Reset form on mount
//     setUsername("");
//     setFirstname("");
//     setLastname("");
//     setEmail("");
//     setPassword("");
//     setPhone("");
//     setIsSponsor(false);
//     setMessage("");
//     setError("");
//   }, []);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username,
//           first_name: firstname,
//           last_name: lastname,
//           email,
//           password,
//           phone,
//           is_sponsor: isSponsor,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok)
//         throw new Error(data.error || "Registration failed. Please try again.");

//       setMessage(data.message || "Registration successful!");

//       // ✅ Clear form after successful registration
//       setUsername("");
//       setFirstname("");
//       setLastname("");
//       setEmail("");
//       setPassword("");
//       setPhone("");
//       setIsSponsor(false);

//       setTimeout(() => router.push("/login"), 2000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

//         <form onSubmit={handleRegister} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full border rounded-lg p-2"
//             required
//           />

//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstname}
//             onChange={(e) => setFirstname(e.target.value)}
//             className="w-full border rounded-lg p-2"
//             required
//           />

//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastname}
//             onChange={(e) => setLastname(e.target.value)}
//             className="w-full border rounded-lg p-2"
//             required
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full border rounded-lg p-2"
//             required
//           />

//           {/* 👁️ Password with toggle */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border rounded-lg p-2 pr-10"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
//               tabIndex={-1}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <input
//             type="text"
//             placeholder="Phone (optional)"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full border rounded-lg p-2"
//           />

//           <label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={isSponsor}
//               onChange={(e) => setIsSponsor(e.target.checked)}
//             />
//             <span>I am a sponsor</span>
//           </label>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full text-white p-2 rounded-lg transition ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         {message && (
//           <p className="text-green-600 mt-4 text-center font-medium">
//             {message}
//           </p>
//         )}
//         {error && (
//           <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/accounts/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Registration failed");
        return;
      }

      router.push("/login");
    } catch (err) {
      console.error(err);
      setError("Server error, try again later");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl mb-4">Register</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>

        <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Register
        </button>
      </form>
    </div>
  );
}
