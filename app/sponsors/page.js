"use client";

import SponsorFormPage from "./form/page";
import TopFeatureSection from "@/components/TopFeatureSection";
import BackToTopButton from "@/components/BackToTopButton";
import FastDonation from "@/components/FastDonation";

export default function SponsorsPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Sponsors</h1>
       {/* ✅ Top Feature Section */}
      <TopFeatureSection
        title="Join our Sponsorship Program"
        subtitle="Make a lasting impact by supporting a child today."
      />
     <FastDonation/>

      {/* Include the form component directly */}
      <SponsorFormPage />
      {/* ✅ Back to top button */}
      <BackToTopButton />
    </div>
  );
}
