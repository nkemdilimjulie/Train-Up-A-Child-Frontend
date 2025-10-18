"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // modern icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight">
          Train-Up-A-Child
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/sponsors" className="hover:text-yellow-300">Sponsors</Link>
          <Link href="/children" className="hover:text-yellow-300">Children</Link>
          <Link href="/guest" className="hover:text-yellow-300">Guests</Link>
          <Link href="/login" className="hover:text-yellow-300">Login</Link>
          <Link href="/register" className="hover:text-yellow-300">Register</Link>    
          <Link href="/donate" className="hover:text-yellow-300">Donate</Link>
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
          <Link href="/login" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Login</Link>
          <Link href="/register" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Register</Link>
          <Link href="/children" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Children</Link>
          <Link href="/donate" className="block hover:text-yellow-300" onClick={() => setIsOpen(false)}>Donate</Link>
        </div>
      )}
    </nav>
  );
}


