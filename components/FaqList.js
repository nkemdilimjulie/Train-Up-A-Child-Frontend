// components/FaqList.js
"use client";

import { useEffect, useState } from "react";
import { fetchFaqs } from "@/app/services/faqApi";
import FaqItem from "./FaqItem";

export default function FaqList({ language }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs(language)
      .then(setFaqs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [language]);

  if (loading) return <p>Loading FAQs…</p>;

  return (
    <div>
      {faqs.map((faq) => (
        <FaqItem
          key={faq.slug}
          faqSlug={faq.slug}
          question={faq.question}
          answer={faq.answer}
          language={language}
        />
      ))}
    </div>
  );
}
