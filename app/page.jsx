// app/page.jsx 
// Home Page for Train-Up-A-Child Charity Organization
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Train-Up-A-Child Charity Organization !!! <br /> <br /></h1>
        <p className="mt-2 text-lg text-gray-600">
          Empowering underprivileged children through sponsorships. <br />
          Help to sponsor poor children's education and support their wellbeing in remote areas.        </p>
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
        <Link
          href="/FAQItem"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          FAQs
        </Link>
        
      </main>

      <footer className="mt-16 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Train-Up-A-Child. All rights reserved.
      </footer>
    </div>
  );
}

