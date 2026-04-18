"use client";

// File path: components/FaqAccordion.jsx
// Integrated with FaqItem for dynamic translation

import { useState } from "react";
import FaqItem from "./FaqItem";

export default function FaqAccordion({ faqs, language }) {
  const [openSlug, setOpenSlug] = useState(null);

  if (!faqs || faqs.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No FAQs available at the moment.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div key={faq.slug} className="border rounded-lg overflow-hidden">
          {/* Question */}
          <button
            onClick={() =>
              setOpenSlug(openSlug === faq.slug ? null : faq.slug)
            }
            className="w-full flex justify-between items-center px-5 py-4 bg-gray-100 hover:bg-gray-200 transition font-semibold text-left"
          >
            <span>{faq.question}</span>
            <span className="text-xl">{openSlug === faq.slug ? "^" : "v"}</span>
          </button>

          {/* Answer */}
          {openSlug === faq.slug && (
            <div className="px-5 py-4 bg-white">
              <FaqItem
                faqSlug={faq.slug}
                // question={faq.question}
                answer={faq.answer}
                language={language}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}