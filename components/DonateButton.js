
//if ---
//  headers: { "Content-Type": "application/json" }, use request.data
// headers: { "Content-Type": "application/x-www-form-urlencoded" }, use request.POST

// components/DonateButton.js
"use client";

import styles from "./DonateButton.module.scss";

export default function DonateButton({ onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${styles.button} flex items-center justify-center`}
    >
      {loading ? "Processing..." : "Donate Now"}
    </button>
  );
}
