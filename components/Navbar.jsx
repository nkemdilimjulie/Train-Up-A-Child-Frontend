
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import { usePathname } from "next/navigation";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const { logout, isLoggedIn } = useAuth();
//   const pathname = usePathname();

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const handleLogout = () => {
//     logout();
//     setIsOpen(false);
//   };

//   const isActive = (path) =>
//     pathname === path
//       ? "text-amber-400 font-semibold underline underline-offset-4"
//       : "hover:text-yellow-300 transition-colors";

//   return (
//     <>
//       {/* ✅ Glassmorphism Sticky Navbar */}
//       <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-blue-600/80 text-white shadow-md z-50 transition-all duration-300">
//         <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
//           {/* Logo and Title */}
//           <Link href="/" className="flex items-center space-x-3 group">
//             <Image
//               src="/images/truacco_logo.jpeg"
//               alt="Train Up A Child Logo"
//               width={48}
//               height={48}
//               className="rounded-full border-2 border-white group-hover:scale-105 transition-transform duration-300"
//             />
//             <span className="text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-sm group-hover:text-yellow-300 transition-colors">
//               Train Up A Child
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 items-center">
//             <Link href="/" className={isActive("/")}>Home</Link>
//             <Link href="/about" className={isActive("/about")}>About Us</Link>
//             <Link href="/sponsors" className={isActive("/sponsors")}>Sponsors</Link>
//             <Link href="/children" className={isActive("/children")}>Children</Link>
//             <Link href="/guest" className={isActive("/guest")}>Guests</Link>
//             <Link href="/login" className={isActive("/login")}>Login</Link>
//             <Link href="/register" className={isActive("/register")}>Register</Link>
//             <Link
//               href="/donate"
//               className="bg-yellow-400 text-blue-900 px-3 py-1.5 rounded font-semibold hover:bg-yellow-300 transition"
//             >
//               Donate
//             </Link>

//             {isLoggedIn && (
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
//               >
//                 Logout
//               </button>
//             )}
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             className="md:hidden text-white hover:text-yellow-300 transition"
//             onClick={toggleMenu}
//           >
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden bg-blue-700/90 backdrop-blur-md px-4 pb-4 space-y-2 transition-all">
//             <Link href="/" className={`${isActive("/")} block`} onClick={() => setIsOpen(false)}>Home</Link>
//             <Link href="/about" className={`${isActive("/about")} block`} onClick={() => setIsOpen(false)}>About Us</Link>
//             <Link href="/sponsors" className={`${isActive("/sponsors")} block`} onClick={() => setIsOpen(false)}>Sponsors</Link>
//             <Link href="/children" className={`${isActive("/children")} block`} onClick={() => setIsOpen(false)}>Children</Link>
//             <Link href="/guest" className={`${isActive("/guest")} block`} onClick={() => setIsOpen(false)}>Guests</Link>
//             <Link href="/login" className={`${isActive("/login")} block`} onClick={() => setIsOpen(false)}>Login</Link>
//             <Link href="/register" className={`${isActive("/register")} block`} onClick={() => setIsOpen(false)}>Register</Link>
//             <Link href="/donate" className={`${isActive("/donate")} block`} onClick={() => setIsOpen(false)}>Donate</Link>

//             {isLoggedIn && (
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* Spacer to avoid overlap */}
//       <div className="h-16" />
//     </>
//   );
// }


"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar({ showSponsorMenu = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isLoggedIn } = useAuth();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const isActive = (path) =>
    pathname === path
      ? "text-amber-400 font-semibold underline underline-offset-4"
      : "hover:text-yellow-300 transition-colors";

  return (
    <>
      {/* ✅ Glassmorphism Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-blue-600/80 text-white shadow-md z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/images/truacco_logo.jpeg"
              alt="Train Up A Child Logo"
              width={48}
              height={48}
              className="rounded-full border-2 border-white group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-sm group-hover:text-yellow-300 transition-colors">
              Train Up A Child
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {showSponsorMenu ? (
              <>
                <Link href="/" className={isActive("/")}>🏠 Home</Link>
                <Link href="/sponsors/dashboard" className={isActive("/sponsors/dashboard")}>Dashboard</Link>
                <Link href="/sponsors/profile" className={isActive("/sponsors/profile")}>Profile</Link>
                <Link href="/sponsors/donations" className={isActive("/sponsors/donations")}>Donations</Link>
              </>
            ) : (
              <>
                
                <Link href="/" className={isActive("/")}>Home</Link>
                <Link href="/about" className={isActive("/about")}>About Us</Link>
                <Link href="/sponsors" className={isActive("/sponsors")}>Sponsors</Link>
                <Link href="/children" className={isActive("/children")}>Children</Link>
                <Link href="/guest" className={isActive("/guest")}>Guests</Link>
                <Link href="/login" className={isActive("/login")}>Login</Link>
                <Link href="/register" className={isActive("/register")}>Register</Link>
                <Link
                  href="/donate"
                  className="bg-yellow-400 text-blue-900 px-3 py-1.5 rounded font-semibold hover:bg-yellow-300 transition"
                >
                  Donate
                </Link>
              </>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white hover:text-yellow-300 transition"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-blue-700/90 backdrop-blur-md px-4 pb-4 space-y-2 transition-all">
            {showSponsorMenu ? (
              <>
                <Link href="/" className={isActive("/")}>🏠 Home</Link>
                <Link href="/sponsors/dashboard" className={`${isActive("/sponsors/dashboard")} block`} onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link href="/sponsors/profile" className={`${isActive("/sponsors/profile")} block`} onClick={() => setIsOpen(false)}>Profile</Link>
                <Link href="/sponsors/donations" className={`${isActive("/sponsors/donations")} block`} onClick={() => setIsOpen(false)}>Donations</Link>
              </>
            ) : (
              <>
                <Link href="/" className={`${isActive("/")} block`} onClick={() => setIsOpen(false)}>Home</Link>
                <Link href="/about" className={`${isActive("/about")} block`} onClick={() => setIsOpen(false)}>About Us</Link>
                <Link href="/sponsors" className={`${isActive("/sponsors")} block`} onClick={() => setIsOpen(false)}>Sponsors</Link>
                <Link href="/children" className={`${isActive("/children")} block`} onClick={() => setIsOpen(false)}>Children</Link>
                <Link href="/guest" className={`${isActive("/guest")} block`} onClick={() => setIsOpen(false)}>Guests</Link>
                <Link href="/login" className={`${isActive("/login")} block`} onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/register" className={`${isActive("/register")} block`} onClick={() => setIsOpen(false)}>Register</Link>
                <Link href="/donate" className={`${isActive("/donate")} block`} onClick={() => setIsOpen(false)}>Donate</Link>
              </>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Spacer to avoid overlap */}
      <div className="h-16" />
    </>
  );
}
