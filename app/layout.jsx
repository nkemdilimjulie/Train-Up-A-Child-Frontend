// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import { AuthProvider } from "../context/AuthContext";

// export const metadata = {
//   title: "Train-Up-A-Child",
//   description: "Empowering underprivileged children through sponsorship",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>
//           <Navbar />
//           <main className="pt-20">{children}</main>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import TrackNavigation from "@/components/TrackNavigation";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Train Up A Child",
  description: "Sponsor and support children",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          {/* 🧭 Global Main Navbar */}
          <Navbar />
           {/* 🌍 Global navigation tracking */}
          <TrackNavigation />
          
          <main className="pt-20">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
