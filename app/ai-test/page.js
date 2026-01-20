// app/ai-test/page.js
// AI Translation Test Page
"use client";

import { useState } from "react";

export default function AITestPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("German");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("http://127.0.0.1:8000/api/translate-faq/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer,
        language,
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 700 }}>
      <h1>AI Translation Test</h1>

      <textarea
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "100%", height: 80, marginBottom: 10 }}
      />

      <textarea
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{ width: "100%", height: 80, marginBottom: 10 }}
      />

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ marginBottom: 10 }}
      >
        <option>German</option>
        <option>French</option>
        <option>Spanish</option>
      </select>

      <br />

      <button onClick={translate} disabled={loading}>
        {loading ? "Translating..." : "Translate with AI"}
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>AI Result</h3>
          <p><strong>Question:</strong> {result.question}</p>
          <p><strong>Answer:</strong> {result.answer}</p>
        </div>
      )}
    </div>
  );
}
