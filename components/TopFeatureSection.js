"use client";

export default function TopFeatureSection({ title, subtitle }) {
  return (
    <div className="bg-blue-50 text-center py-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      <br />
    </div>
    
  );
}
