"use client";

import SponsorFormPage from "./form/page";

export default function SponsorsPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Sponsors</h1>
      {/* Include the form component directly */}
      <SponsorFormPage />
    </div>
  );
}
