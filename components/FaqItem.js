// components/FaqItem.js
// "use client";

// export default function FaqItem({ question, answer }) {
//   return (
//     <div style={{ marginBottom: "1.5rem" }}>
//       <h3>{question}</h3>
//       <p>{answer}</p>
//     </div>
//   );
// }


"use client";

import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

export default function FaqItem({ question, answer, language, token }) {
  const [translated, setTranslated] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleTranslate() {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/translate-faq/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            question,
            answer,
            language: language || "German",
          }),
        }
      );

      const data = await response.json();
      setTranslated(data);
    } catch (err) {
      console.error("Translation failed", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>{translated ? translated.question : question}</h3>
      <p>{translated ? translated.answer : answer}</p>

      <button onClick={handleTranslate} disabled={loading}>
        {loading ? "Translating…" : "Translate"}
      </button>
    </div>
  );
}
