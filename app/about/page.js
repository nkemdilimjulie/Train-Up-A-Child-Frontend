"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackToTopButton from "@/components/BackToTopButton";

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const team = [
    {
      name: "Nkem",
      role: "Founder & Director",
      bio: "Nkem leads Train-Up-A-Child with a passion for transforming lives through education. She believes every child deserves a fair chance to dream and succeed.",
      image: "/images/team/nkem.jpg",
    },
    {
      name: "Chilota",
      role: "Community Coordinator",
      bio: "Chilota works closely with families and schools to identify children in need, ensuring that every sponsorship reaches the right hands.",
      image: "/images/team/chilota.png",
    },
    {
      name: "Callistus",
      role: "Donor Relations",
      bio: "Callistus bridges the gap between donors and children, fostering transparency and meaningful connections.",
      image: "/images/team/callistus.jpeg",
    },
  ];

  const gallery = [
    "/images/gallery/classroom.jpg",
    "/images/gallery/smiling-children.jpg",
    "/images/gallery/event-day.jpg",
    "/images/gallery/volunteers.jpg",
    "/images/gallery/child-doctor.jpg",
    "/images/gallery/child_education1.jpg",
    "/images/gallery/poor-child-educate7.jpg",
    "/images/gallery/pic7.jpg",
  ];

  const link = "https://www.biblegateway.com/quicksearch/?quicksearch=train+up+a+child&version=KJV";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-lg shadow-sm relative">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        About Train-Up-A-Child
      </h1>

      <div className="bg-green-50 border-l-4 border-green-400 p-3 mb-6 rounded text-sm text-gray-700">
        Train up a child in the way he should go: and when he is old, he will not depart from it.{" "}
        <a
          href={link}
          className="text-green-700 underline font-semibold hover:text-green-900"
        >
          Proverbs 22:6
      </a>.
      </div>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        <strong>Train-Up-A-Child</strong> is a compassionate initiative dedicated
        to uplifting underprivileged children through education, mentorship, and
        holistic support. We believe every child deserves the opportunity to
        learn, grow, and become a beacon of hope for their community.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        Our mission is to connect kind-hearted sponsors and donors with children
        in need, creating lasting opportunities. Through your generosity, we
        provide access to education, nutrition, and emotional guidance that help
        children thrive and build brighter futures.
      </p>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        We operate with transparency, accountability, and love at the heart of
        everything we do. Whether you choose to become a sponsor, volunteer your
        time, or make a one-time contribution, your involvement helps shape
        tomorrow’s leaders — one child at a time.
      </p>

      {/* 🌟 Meet Our Team Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
          Meet Our Team
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-4 border-4 border-blue-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-blue-600 font-medium text-sm mb-2">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🖼️ Our Gallery Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
          Our Gallery
        </h2>
        <p className="text-center text-gray-600 mb-6">
          A glimpse into our community — where love, learning, and hope come together.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((photo, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedImage(photo)}
            >
              <img
                src={photo}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-56 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🪞 Lightbox Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged view"
            className="max-w-3xl max-h-[90vh] rounded-lg shadow-lg border border-gray-700"
          />
          <button
            className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-red-400"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* ✉️ Contact Section */}
      <div className="mt-16 text-center">
        <p className="text-gray-700 mb-2">
          For sponsorship inquiries or donations: Fill out the form below to contact us.
        </p>
        <p className="text-gray-700 mt-2">
          We’d love to hear from you — together, we can make a lasting difference.
        </p>
      </div>

      <div className="text-center mt-10">
        <a
          href="/donate"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Support a Child Today
        </a>
      </div>

      {/* ✉️ Contact Us Section */}
      <div className="mt-16 bg-blue-50 rounded-lg p-8 shadow-sm relative">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Have you questions or want to get involved? Send us a message below — we’d love to hear from you!
        </p>

        {/* ✅ Success Banner */}
        {showSuccess && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-opacity duration-700">
            ✅ Message sent successfully! Redirecting...
          </div>
        )}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const body = Object.fromEntries(formData);

            try {
              const response = await fetch("http://127.0.0.1:8000/api/contact/send-email/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              });

              if (response.ok) {
                e.target.reset();
                setShowSuccess(true);

                // Redirect after 2 seconds
                setTimeout(() => {
                  setShowSuccess(false);
                  router.push("/");
                }, 2000);
              } else {
                alert("⚠️ Failed to send message. Please try again later.");
              }
            } catch (error) {
              alert("❌ An error occurred. Please try again later.");
            }
          }}
          className="max-w-xl mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <BackToTopButton />
    </div>
  );
}
