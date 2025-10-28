"use client";

export default function FastDonation({ link = "/donate" }) {
  return (
    <div className="bg-green-50 border-l-4 border-green-400 p-3 mb-6 rounded text-sm text-gray-700">
      For a fast contribution, without registration / login – you may{" "}
      <a
        href={link}
        className="text-green-700 underline font-semibold hover:text-green-900"
      >
        donate here
      </a>.
    </div>
  );
}
