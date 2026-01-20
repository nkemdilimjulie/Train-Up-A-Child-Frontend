const translateFAQ = async () => {
  const token = localStorage.getItem("authToken");

  const res = await fetch("http://127.0.0.1:8000/api/translate-faq/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
    body: JSON.stringify({
      question: "What is sponsorship?",
      answer: "Sponsorship helps children get education and care.",
      language: "German",
    }),
  });

  const data = await res.json();
  console.log(data);
};
