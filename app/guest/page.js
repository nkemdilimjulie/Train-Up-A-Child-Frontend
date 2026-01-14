"use client";

import ReturnToLastPage from "@/components/ReturnToLastPage";
import { useRouter } from "next/navigation";

export default function GuestPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Welcome to <br/>Train-Up-A-Child <br/> Charity Organization
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for visiting! <br/>Explore who we are. <br/>Meet children in need. <br/> Or,
          join us as a sponsor to make a lasting impact.
        </p>

        {/* About Us Button */}
        <button
          onClick={() => router.push("/about")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full transition"
        >
          About Us
        </button>

        {/* Needy Children Button */}
        <button
          onClick={() => router.push("/children")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full transition"
        >
          Needy Children
        </button>

        {/* Become a Sponsor Button */}
        <button
          onClick={() => {
            // Redirects user to sponsor registration page to fill out sponsor form
            router.push("/sponsors");
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded w-full transition"
        >
          Become a Sponsor
        </button>

      </div>
      <ReturnToLastPage fallback="/" />
      <footer className="mt-12 text-gray-500 text-sm">
          Register as a Sponsor and have a Sponsor profile.
      </footer>
    </div>
  );
}
