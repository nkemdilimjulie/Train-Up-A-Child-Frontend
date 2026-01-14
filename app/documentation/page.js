// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Copy, ChevronDown, ChevronUp } from "lucide-react";

// // Sections
// const sections = [
//   { id: "overview", title: "Overview", content: <p>Welcome to <strong>Train-Up-A-Child</strong> documentation. This platform enables individuals to sponsor and support underprivileged children securely. This page provides an overview of features, user guides, and developer references for managing donations, sponsor profiles, and children data.</p> },
//   { id: "features", title: "Key Features", content: <ul className="list-disc ml-6"><li>Sponsor Donations</li><li>Sponsor Dashboard</li><li>Children Management</li><li>User Accounts</li></ul> },
//   { id: "getting-started", title: "Getting Started", content: <ol className="list-decimal ml-6"><li>Register and confirm email</li><li>Login to access features</li></ol> },
//   { id: "donations", title: "Making a Donation", content: <ol className="list-decimal ml-6"><li>Navigate to Donate Page</li><li>Enter amount</li><li>Click Donate</li><li>Complete Stripe payment</li></ol> },
//   { id: "dashboard", title: "Sponsor Dashboard", content: <ul className="list-disc ml-6"><li>Total Donations</li><li>Donations Made</li><li>Children Helped</li></ul> },
//   { id: "developer-api", title: "Developer Reference (API)", content: <p>Use DRF TokenAuthentication, include token in API requests.</p> },
//   { id: "technical", title: "Technical Notes", content: <ul className="list-disc ml-6"><li>Next.js 15, React 18</li><li>Django 5.2, DRF</li><li>Token-based Auth</li><li>Stripe Payments</li></ul> },
//   { id: "contact", title: "Contact & Support", content: <p>Email: <a href="mailto:support@trainupachild.org" className="text-blue-600 underline">support@trainupachild.org</a></p> },
// ];

// // Copy button
// function CopyButton({ code }) {
//   const [copied, setCopied] = useState(false);
//   const handleCopy = () => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1500);
//   };
//   return (
//     <button
//       onClick={handleCopy}
//       className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition"
//     >
//       {copied ? "Copied!" : <Copy size={14} />}
//     </button>
//   );
// }

// export default function DocumentationPage() {
//   const [openIndex, setOpenIndex] = useState(null);
//   const [activeId, setActiveId] = useState(sections[0].id);
//   const sectionRefs = useRef([]);

//   // Scroll tracking for active section
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveId(entry.target.id);
//           }
//         });
//       },
//       { rootMargin: "-50% 0px -50% 0px" } // triggers when section is roughly centered
//     );

//     sectionRefs.current.forEach((ref) => {
//       if (ref) observer.observe(ref);
//     });

//     return () => {
//       sectionRefs.current.forEach((ref) => {
//         if (ref) observer.unobserve(ref);
//       });
//     };
//   }, []);

//   const toggleSection = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const scrollToSection = (id) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   return (
//     <div className="flex max-w-7xl mx-auto p-6 gap-8">
//       {/* Quick Navigation Sidebar */}
//       <nav className="hidden md:block w-64 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto border-r pr-4">
//         <h2 className="font-bold text-lg mb-4">Quick Navigation</h2>
//         <ul className="space-y-2">
//           {sections.map((sec) => (
//             <li key={sec.id}>
//               <button
//                 onClick={() => scrollToSection(sec.id)}
//                 className={`text-left w-full px-2 py-1 rounded hover:bg-gray-200 transition ${
//                   activeId === sec.id ? "bg-blue-100 font-semibold" : ""
//                 }`}
//               >
//                 {sec.title}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Main Documentation Content */}
//       <div className="flex-1 space-y-6">
//         <h1 className="text-3xl font-bold text-blue-700">Train-Up-A-Child Documentation</h1>
//         {sections.map((sec, idx) => (
//           <div
//             key={sec.id}
//             id={sec.id}
//             ref={(el) => (sectionRefs.current[idx] = el)}
//             className="border rounded-lg overflow-hidden"
//           >
//             <button
//               onClick={() => toggleSection(idx)}
//               className="w-full text-left p-4 bg-gray-100 flex justify-between items-center hover:bg-gray-200 transition"
//             >
//               <span className="font-semibold">{sec.title}</span>
//               {openIndex === idx ? <ChevronUp /> : <ChevronDown />}
//             </button>
//             {openIndex === idx && <div className="p-4 bg-white">{sec.content}</div>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock, dracula } from "react-code-blocks";

// Quick links for sections
const SECTIONS = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: (
      <>
        <p>Learn how to set up your project locally.</p>
        <CodeBlock
          text={`git clone https://github.com/your-repo.git
cd your-repo
npm install
npm run dev`}
          language="bash"
          theme={dracula}
          showLineNumbers
        />
      </>
    ),
  },
  {
    id: "authentication",
    title: "Authentication",
    content: (
      <>
        <p>
          We use <strong>DRF Token Authentication</strong>. Tokens are stored in
          <code>localStorage</code> and used in fetch requests.
        </p>
        <CodeBlock
          text={`// Example: sending token in fetch
fetch('/api/donations/sponsor-checkout/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Token \${token}\`
  },
  body: JSON.stringify({ amount })
})`}
          language="javascript"
          theme={dracula}
          showLineNumbers
        />
      </>
    ),
  },
  {
    id: "sponsor-dashboard",
    title: "Sponsor Dashboard",
    content: (
      <>
        <p>
          Shows logged-in sponsors’ profile, donations, and impact summary.  
          Uses the token to fetch data from the backend.
        </p>
      </>
    ),
  },
  {
    id: "fast-donate",
    title: "Fast Donate",
    content: (
      <>
        <p>
          Allows donations without login. Great for quick support.  
          Redirects to Stripe checkout session directly.
        </p>
      </>
    ),
  },
];

export default function DocumentationPage() {
  const [openSection, setOpenSection] = useState(null);

  // Handle smooth scrolling when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      setOpenSection(id); // Open the clicked section
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    // Check on initial load if there is a hash
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">
        Train-Up-A-Child Documentation
      </h1>
      <p className="mb-8 text-gray-700 max-w-3xl">
        Welcome to the interactive developer documentation for Train-Up-A-Child.
        Use the sections below to quickly navigate through key features and setup instructions.
      </p>

      {/* Quick Links */}
      <div className="mb-8 sticky top-6 bg-gray-50 z-10 p-4 rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium"
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
              className="w-full flex justify-between items-center px-6 py-4 font-semibold text-left text-blue-700 hover:bg-blue-50 rounded-t-xl focus:outline-none"
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

