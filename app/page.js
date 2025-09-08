import DonateButton from "@/components/DonateButton";

// app/page.js
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Train-Up-A-Child Charity Organization</h1>
      <p>Help sponsor poor children's education and support their wellbeing in remote areas.</p>
      <DonateButton amount={50} />
    </div>
  );
}
