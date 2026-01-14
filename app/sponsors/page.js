"use client";

import SponsorFormPage from "./form/page";
import { motion } from "framer-motion";
import TopFeatureSection from "@/components/TopFeatureSection";
import BackToTopButton from "@/components/BackToTopButton";
import FastDonation from "@/components/FastDonation";
import ReturnToLastPage from "@/components/ReturnToLastPage";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
export default function SponsorsPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-center bg-gray-50 px-6 pt-10 md:pt-16 gap-8">
      {/* Left Section - Info Message */}
      <motion.div
        className="md:w-1/2 w-full text-center md:text-left"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <TopFeatureSection
        title="Join our Sponsorship Program"
        subtitle="Make a lasting impact by supporting a child today."
        />
      </motion.div>

      {/* Right Section - Sponsor Form */}
      <motion.div
       className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border"

        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >       
        <SponsorFormPage />
        
        <BackToTopButton />
        <ReturnToLastPage fallback="/" />

      {/* ✅ Back to top button */}

      </motion.div>
      
      {/* Fast Donation (no login required) */}
      <FastDonation link="/fast-donate" />

      
    </div>
  );
}


