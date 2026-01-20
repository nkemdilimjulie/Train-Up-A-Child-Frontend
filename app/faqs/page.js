// app/faqs/page.js
"use client";

import { useState } from "react";
import LanguageSelect from "@/components/LanguageSelect";
import FaqList from "@/components/FaqList";

export default function FaqPage() {
  const [language, setLanguage] = useState("");

  return (
    <div>
      <h1>FAQs</h1>

      <LanguageSelect
        value={language}
        onChange={setLanguage}
      />

      <FaqList language={language} />
    </div>
  );
}
