// components/LanguageSelect.js
"use client";

export default function LanguageSelect({ value, onChange }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ marginRight: "0.5rem" }}>
        Language:
      </label>

      <select value={value} onChange={e => onChange(e.target.value)}>
        <option value="">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}
