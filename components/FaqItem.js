// components/FaqItem.js
"use client";

// File path: components/FaqItem.js
// Tailwind-styled Translate button with loading and error states

import { useState } from "react";
import { translateFaq } from "@/app/services/faqApi";

export default function FaqItem({ faqSlug, question, answer }) {
  const [targetLanguage, setTargetLanguage] = useState("");
  const [translated, setTranslated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleTranslate() {
    if (!targetLanguage) {
      alert("Please select a language to translate into");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await translateFaq({
        faq_slug: faqSlug,
        language: targetLanguage,
      });

      // always update with fresh translation
      setTranslated(data);
    } catch (err) {
      setError(err.message || "Translation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-b border-gray-200 py-4">
      <h3 className="text-lg font-semibold text-gray-800">
        {translated?.question || question}
      </h3>

      <p className="text-gray-700 mt-1">
        {translated?.answer || answer}
      </p>

      {/* Translate controls */}
      <div className="flex items-center gap-3 mt-4">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="">Translate to…</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
        </select>

        <button
          onClick={handleTranslate}
          disabled={loading}
          className={`px-4 py-2 rounded-full text-sm font-medium text-white transition flex items-center gap-2
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
            }
          `}
        >
          🌐 {loading ? "Translating…" : "Translate"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
