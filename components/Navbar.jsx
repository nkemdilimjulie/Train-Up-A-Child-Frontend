"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isLoggedIn } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    setIsOpen(false); // close mobile menu if open
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Train-Up-A-Child
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/about" className="hover:text-yellow-300">About Us</Link>
          <Link href="/sponsors" className="hover:text-yellow-300">Sponsors</Link>
          <Link href="/children" className="hover:text-yellow-300">Children</Link>
          <Link href="/guest" className="hover:text-yellow-300">Guests</Link>
          <Link href="/login" className="hover:text-yellow-300">Login</Link>
          <Link href="/register" className="hover:text-yellow-300">Register</Link>
          <Link href="/donate" className="hover:text-yellow-300">Donate</Link>

          {/* Logout Button */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-white hover:text-yellow-300"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link href="/sponsors" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Sponsors</Link>
          <Link href="/children" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}> Children</Link>
          <Link href="/guest" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Guests</Link>
          <Link href="/login" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Login</Link>
          <Link href="/register" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Register</Link>
          <Link href="/donate" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Donate</Link>

          {/* Mobile Logout Button */}
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
  );
}

