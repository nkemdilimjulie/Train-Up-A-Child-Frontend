// "use client";

// import { usePathname } from "next/navigation";
// import { useEffect, useRef } from "react";

// export default function TrackNavigation() {
//   const pathname = usePathname();
//   const previousPath = useRef(null);

//   useEffect(() => {
//     if (!pathname) return;

//     // Save the previous path before updating
//     if (previousPath.current && previousPath.current !== pathname) {
//       sessionStorage.setItem("lastPath", previousPath.current);
//     }

//     previousPath.current = pathname;
//   }, [pathname]);

//   return null; // No UI — tracking only
// }


"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TrackNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    localStorage.setItem("lastVisited", pathname);
  }, [pathname]);

  // 🌟 Render nothing — must not generate DOM
  return null;
}
