// // app/faqs/page.js
// "use client";

// import { useState } from "react";
// import LanguageSelect from "@/components/LanguageSelect";
// import FaqList from "@/components/FaqList";

// export default function FaqPage() {
//   const [language, setLanguage] = useState("");

//   return (
//     <div>
//       <h1>FAQs</h1>

//       <LanguageSelect
//         value={language}
//         onChange={setLanguage}
//       />

//       <FaqList language={language} />
//     </div>
//   );
// }

// mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm


// "use client";

// // File path: app/faqs/page.js

// import { useEffect, useState } from "react";
// import LanguageSelect from "@/components/LanguageSelect";
// import FaqAccordion from "@/components/FaqAccordion";
// import { fetchFaqs } from "../services/faqApi";

// const FAQS_PER_PAGE = 5;

// export default function FaqPage() {
//   const [language, setLanguage] = useState("en");
//   const [faqs, setFaqs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check login token
//     const token = localStorage.getItem("authToken");
//     setIsLoggedIn(!!token);

//     // Fetch FAQs from backend
//     setLoading(true);
//     fetchFaqs(language)
//       .then((data) => setFaqs(data))
//       .catch((err) => {
//         console.error("Failed to fetch FAQs:", err);
//         setFaqs([]);
//       })
//       .finally(() => setLoading(false));
//   }, [language]);

//   // Filter public/private FAQs
//   const visibleFaqs = faqs.filter((faq) => faq.is_public || isLoggedIn);

//   // Pagination logic
//   const totalPages = Math.ceil(visibleFaqs.length / FAQS_PER_PAGE);
//   const start = (page - 1) * FAQS_PER_PAGE;
//   const paginatedFaqs = visibleFaqs.slice(start, start + FAQS_PER_PAGE);

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Frequently Asked Questions
//         </h1>
//         <p className="text-center text-gray-800 mb-6">(Make sure you are logged in)</p>
//         <div className="flex justify-center mb-6">
//           <LanguageSelect value={language} onChange={setLanguage} />
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading FAQs…</p>
//         ) : (
//           <FaqAccordion faqs={paginatedFaqs} language={language} />
//         )}

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-8">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => p - 1)}
//             className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100 transition"
//           >
//             ← Previous
//           </button>

//           <span className="text-sm text-gray-600">
//             Page {page} of {totalPages}
//           </span>

//           <button
//             disabled={page === totalPages || totalPages === 0}
//             onClick={() => setPage((p) => p + 1)}
//             className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100 transition"
//           >
//             Next →
//           </button>
//         </div>

//         {!isLoggedIn && (
//           <p className="text-center text-sm text-gray-500 mt-6">
//             Some FAQs are visible only to logged-in users.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

"use client";

// File path: app/faqs/page.js

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelect from "@/components/LanguageSelect";
import { fetchFaqs } from "../services/faqApi";

const FAQS_PER_PAGE = 5;

export default function FaqPage() {
  const [language, setLanguage] = useState("en");
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    setLoading(true);
    fetchFaqs(language)
      .then((data) => setFaqs(data))
      .catch((err) => {
        console.error("Failed to fetch FAQs:", err);
        setFaqs([]);
      })
      .finally(() => setLoading(false));
  }, [language]);

  // URL hash sync (same behavior as DocumentationPage)
  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;

      setOpenFaq(id);
      setActiveFaq(id);

      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("hashchange", syncFromHash);
    syncFromHash();

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const toggleFaq = (id) => {
    const next = openFaq === id ? null : id;
    setOpenFaq(next);
    setActiveFaq(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  // Filter public/private FAQs
  const visibleFaqs = faqs.filter((faq) => faq.is_public || isLoggedIn);

  // Pagination
  const totalPages = Math.ceil(visibleFaqs.length / FAQS_PER_PAGE);
  const start = (page - 1) * FAQS_PER_PAGE;
  const paginatedFaqs = visibleFaqs.slice(start, start + FAQS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        Frequently Asked Questions
      </h1>

      <p className="text-gray-600 mb-6">
        Find answers about how to use the Train-Up-A-Child platform.
      </p>

      {/* Language Selector */}
      <div className="mb-6">
        <LanguageSelect value={language} onChange={setLanguage} />
      </div>

      {/* Quick Links */}
      <div className="mb-8 sticky top-6 bg-gray-50 z-10 p-4 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <div className="flex flex-wrap gap-2">
          {paginatedFaqs.map((faq) => (
            <a
              key={faq.slug}
              href={`#${faq.slug}`}
              className={`px-3 py-1 rounded transition font-medium
                ${
                  activeFaq === faq.slug
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
            >
              {faq.question}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      {loading ? (
        <p className="text-center text-gray-500">Loading FAQs…</p>
      ) : (
        <div className="space-y-4">
          {paginatedFaqs.map((faq) => (
            <div
              key={faq.slug}
              id={faq.slug}
              className="bg-white rounded-xl shadow"
            >
              <button
                onClick={() => toggleFaq(faq.slug)}
                className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left text-blue-700 hover:bg-blue-50 rounded-t-xl"
              >
                {faq.question}
                <span>{openFaq === faq.slug ? "▲" : "▼"}</span>
              </button>

              <AnimatePresence>
                {openFaq === faq.slug && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 text-gray-700"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100 transition"
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg border disabled:opacity-40 hover:bg-gray-100 transition"
        >
          Next →
        </button>
      </div>

      {!isLoggedIn && (
        <p className="text-center text-sm text-gray-500 mt-6">
          Some FAQs are visible only to logged-in users.
        </p>
      )}
    </div>
  );
}
