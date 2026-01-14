// "use client";

// import { useRouter } from "next/navigation";

// export default function ReturnToLastPage({ fallback = "/" }) {
//   const router = useRouter();

//   const handleReturn = () => {
//     const lastPath = sessionStorage.getItem("lastPath");

//     if (lastPath) {
//       router.push(lastPath);
//     } else {
//       router.push(fallback);
//     }
//   };

//   return (
//     <button
//       onClick={handleReturn}
//       className="text-sm text-blue-600 hover:underline"
//     >
//       ← Return to Previous Page
//     </button>
//   );
// }


"use client";

import { useRouter } from "next/navigation";

export default function ReturnToLastPage({ fallback = "/" }) {
  const router = useRouter();

  const handleBack = () => {
    // If browser has history, go back
    if (window.history.length > 1) {
      router.back();
    } else {
      // Otherwise, use fallback
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="text-sm text-green-700 hover:underline"
    >
      ← Return to Pevious Page
    </button>
  );
}
