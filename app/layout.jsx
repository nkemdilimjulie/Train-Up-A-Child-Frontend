import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Train-Up-A-Child",
  description: "Empowering underprivileged children through sponsorship",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}


