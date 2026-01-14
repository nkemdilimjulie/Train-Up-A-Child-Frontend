import Navbar from "@/components/Navbar";


export default function SponsorLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showSponsorMenu={true} /> {/* ✅ Sponsor-specific Navbar */}
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
}
