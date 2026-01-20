
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock, dracula } from "react-code-blocks";

// Quick links & accordion sections
const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          Welcome to the <strong>Train-Up-A-Child</strong> documentation.
          This platform enables individuals to sponsor and support the education of 
          underprivileged children securely.
        </p>

        <h3 className="font-semibold mt-4">Key Features</h3>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li><strong>Sponsor Donations:</strong> Secure, profile-linked donations with Stripe.</li>
          <li><strong>Sponsor Dashboard:</strong> Track donations and supported children.</li>
          <li><strong>Children Management:</strong> View profiles of children and monitor sponsorship impact.</li>
          <li><strong>User Accounts:</strong> Role-based access with token authentication.</li>
        </ul>
      </>
    ),
  },
  {
    id: "getting-started",
    title: "Getting Started",
    content: (
      <>
        <h3 className="font-semibold mt-2">Registration</h3>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Navigate to <strong>Register</strong> in order to Sign Up.</li>
          <li>Select Sponsor, Child, or Guest.</li>
          <li>Fill required details.</li>
        </ul>

        <h3 className="font-semibold mt-4">Login</h3>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Enter username and password.</li>
          <li>Access role-specific features.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sponsor-dashboard",
    title: "Sponsor Dashboard",
    content: (
      <>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Total Donations</li>
          <li>Donations Made</li>
          <li>Children Helped</li>
          <li>Quick access to profile & history</li>
        </ul>
      </>
    ),
  },
  {
    id: "children-profiles",
    title: "Children Profiles",
    content: (
      <>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Name, age, and location</li>
          <li>Sponsorship status</li>
          <li>Key needs and progress updates</li>
        </ul>
      </>
    ),
  },
  {
    id: "developer-reference",
    title: "Developer Reference (API)",
    content: (
      <>
        <p>Uses <strong>DRF TokenAuthentication</strong>.</p>

        <CodeBlock
          text={`Authorization: Token <your-token-here>`}
          language="http"
          theme={dracula}
        />

        <h3 className="font-semibold mt-4">Sample Donation Request</h3>
        <CodeBlock
          text={`const token = localStorage.getItem("authToken");

fetch("http://127.0.0.1:8000/api/donations/sponsor-checkout/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": \`Token \${token}\`
  },
  body: JSON.stringify({ amount: 50 })
});`}
          language="javascript"
          theme={dracula}
        />
      </>
    ),
  },
  {
    id: "technical-notes",
    title: "Technical Notes",
    content: (
      <>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Frontend: Next.js 15, React 18</li>
          <li>Backend: Python, Django 5.2, DRF, PostgreSQL</li>
          <li>Authentication: Token-based</li>
          <li>Payments: Stripe API</li>
        </ul>
      </>
    ),
  },
  {
    id: "contact-support",
    title: "Contact & Support",
    content: (
      <>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Email: support@trainupachild.org</li>
          <li>Use the contact form in the <strong>About Us</strong> page </li>
        </ul>
      </>
    ),
  },
];

export default function DocumentationPage() {
  const [openSection, setOpenSection] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  // Sync with URL hash
  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      setOpenSection(id);
      setActiveSection(id);

      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("hashchange", syncFromHash);
    syncFromHash();

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const toggleSection = (id) => {
    const next = openSection === id ? null : id;
    setOpenSection(next);
    setActiveSection(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Train-Up-A-Child Documentation
      </h1>

      {/* Quick Links */}
      <div className="mb-8 sticky top-6 bg-gray-50 z-10 p-4 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-3 py-1 rounded transition font-medium
                ${
                  activeSection === s.id
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {SECTIONS.map((section) => (
          <div key={section.id} id={section.id} className="bg-white rounded-xl shadow">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left text-blue-700 hover:bg-blue-50 rounded-t-xl"
            >
              {section.title}
              <span>{openSection === section.id ? "▲" : "▼"}</span>
            </button>

            <AnimatePresence>
              {openSection === section.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 py-4 text-gray-700"
                >
                  {section.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
