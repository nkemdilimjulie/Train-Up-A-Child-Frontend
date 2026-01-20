// app/FAQItem/page.js
// FAQItem component for displaying a single FAQ entry with translation functionality
"use client";

import { useState } from "react";

export default function FAQItem({ question, answer }) {
  const [translated, setTranslated] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/api/translate-faq/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
        question,
        answer,
        language: "German",
      }),
    });

    const data = await res.json();
    setTranslated(data);
    setLoading(false);
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white">
      <h3 className="font-semibold">{question}</h3>
      <p className="mt-2">{answer}</p>

      <button
        onClick={handleTranslate}
        disabled={loading}
        className="mt-3 px-4 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        {loading ? "Translating..." : "Translate to German"}
      </button>

      {translated && (
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <h4 className="font-semibold">{translated.question}</h4>
          <p className="mt-1">{translated.answer}</p>
        </div>
      )}
    </div>
  );
}
