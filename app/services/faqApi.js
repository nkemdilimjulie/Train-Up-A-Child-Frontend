// services/faqApi.js
// // Service functions for FAQ API interactions
// const API_BASE = "http://127.0.0.1:8000";

// export async function fetchFaqs(lang = "") {
//   let url = `${API_BASE}/api/faqs/`;

//   if (lang) {
//     url += `?lang=${lang}`;
//   }

//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error("Failed to fetch FAQs");
//   }

//   return response.json();
// }


// const API_BASE = "http://127.0.0.1:8000";

// /**
//  * Fetch FAQs from backend
//  * Supports optional language parameter (?lang=de, fr, etc.)
//  */
// export async function fetchFaqs(language = "en", token) {
//   const res = await fetch(
//     `${API_BASE}/api/faqs/?lang=${language}`,
//     {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch FAQs");
//   }

//   return res.json();
// }

// /**
//  * Trigger AI translation for a single FAQ (manual action)
//  */
// export async function translateFaq({ question, answer, language, token }) {
//   const res = await fetch(
//     `${API_BASE}/api/translate-faq/`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify({
//         question,
//         answer,
//         language,
//       }),
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Translation failed");
//   }

//   return res.json();
// }


// app/services/faqApi.js

const API_BASE = "http://127.0.0.1:8000";

export async function fetchFaqs(language = "en") {
  const token = localStorage.getItem("authToken"); // or however you store it

  const res = await fetch(`${API_BASE}/api/faqs/?lang=${language}`, {
    method: "GET",
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
