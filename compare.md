import DonateButton from "@/components/DonateButton";

export default function DonatePage() {
  // Example IDs for testing
  const sponsor_id = 1; // replace with actual sponsor ID
  const child_id = 5;   // replace with actual child ID
  const amount = 5000;  // $50 in cents

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Support a Child</h1>
      <p className="mb-6">
        You are donating $50 to Child #{child_id} through Sponsor #{sponsor_id}.
      </p>

      <DonateButton sponsor_id={sponsor_id} child_id={child_id} amount={amount} />
    </div>
  );
}
