// components/FaqList.js
"use client";

import { useEffect, useState } from "react";
import { fetchFaqs } from "@/app/services/faqApi";
import FaqItem from "./FaqItem";

export default function FaqList({ language }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchFaqs(language)
      .then(data => setFaqs(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, [language]);

  if (loading) return <p>Loading FAQs…</p>;

  console.log("FAQ sample:", faqs[0]);
  
  return (
    <div>
      {faqs.map((faq) => (
        <FaqItem
            key={faq.slug}
            question={faq.question}
            answer={faq.answer}
            faq={faq}
        />
    ))}

    </div>
  );
}
