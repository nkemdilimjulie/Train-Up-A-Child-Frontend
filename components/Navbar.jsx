// "use client";

// import Link from "next/link";
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

//   // Function to determine if link is active
//   const isActive = (path) =>
//     pathname === path
//       ? "text-amber-400 font-semibold underline underline-offset-4"
//       : "hover:text-yellow-300";

//   return (
//     <>
//       {/* ✅ Fixed navbar (always visible) */}
//       <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
//         <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="text-2xl font-bold tracking-tight">
//             Train-Up-A-Child
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
//             <Link href="/donate" className={isActive("/donate")}>Donate</Link>

//             {isLoggedIn && (
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
//               >
//                 Logout
//               </button>
//             )}
//           </div>

//           {/* Mobile Toggle Button */}
//           <button
//             className="md:hidden text-white hover:text-yellow-300"
//             onClick={toggleMenu}
//           >
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-2">
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

//       {/* ✅ Spacer to prevent content from hiding behind fixed navbar */}
//       <div className="h-16" />
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isLoggedIn } = useAuth();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Determine active link
  const isActive = (path) =>
    pathname === path
      ? "text-amber-400 font-semibold underline underline-offset-4"
      : "hover:text-yellow-300 transition-colors";

  return (
    <>
      {/* ✅ Glassmorphism Sticky Navbar */}
      <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-blue-600/80 text-white shadow-md z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight drop-shadow-md">
            Train-Up-A-Child
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className={isActive("/")}>Home</Link>
            <Link href="/about" className={isActive("/about")}>About Us</Link>
            <Link href="/sponsors" className={isActive("/sponsors")}>Sponsors</Link>
            <Link href="/children" className={isActive("/children")}>Children</Link>
            <Link href="/guest" className={isActive("/guest")}>Guests</Link>
            <Link href="/login" className={isActive("/login")}>Login</Link>
            <Link href="/register" className={isActive("/register")}>Register</Link>
            <Link href="/donate" className={isActive("/donate")}>Donate</Link>

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
            <Link href="/" className={`${isActive("/")} block`} onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/about" className={`${isActive("/about")} block`} onClick={() => setIsOpen(false)}>About Us</Link>
            <Link href="/sponsors" className={`${isActive("/sponsors")} block`} onClick={() => setIsOpen(false)}>Sponsors</Link>
            <Link href="/children" className={`${isActive("/children")} block`} onClick={() => setIsOpen(false)}>Children</Link>
            <Link href="/guest" className={`${isActive("/guest")} block`} onClick={() => setIsOpen(false)}>Guests</Link>
            <Link href="/login" className={`${isActive("/login")} block`} onClick={() => setIsOpen(false)}>Login</Link>
            <Link href="/register" className={`${isActive("/register")} block`} onClick={() => setIsOpen(false)}>Register</Link>
            <Link href="/donate" className={`${isActive("/donate")} block`} onClick={() => setIsOpen(false)}>Donate</Link>

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
