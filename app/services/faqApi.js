// app/services/faqApi.js

const API_BASE = "http://127.0.0.1:8000";

export async function fetchFaqs(language = "en") {
  const token = localStorage.getItem("authToken");

  const res = await fetch(`${API_BASE}/api/faqs/?lang=${language}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  return res.json();
}

export async function translateFaq({ faq_slug, language }) {
  const token = localStorage.getItem("authToken");

  const res = await fetch("http://127.0.0.1:8000/api/translate-faq/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      faq_slug: String(faq_slug).trim(),
      language: String(language).trim(),
    }),
  });

  // 👇 detect HTML responses safely
  const text = await res.text();

  if (!res.ok) {
    console.error("RAW backend response:", text);
    throw new Error("Translation failed (backend error)");
  }

  return JSON.parse(text);
}
