

// "use client";

// import BackToTopButton from "@/components/BackToTopButton";

// export default function AboutPage() {
//   const team = [
//     {
//       name: "Nkem",
//       role: "Founder & Director",
//       bio: "Nkem leads Train-Up-A-Child with a passion for transforming lives through education. She believes every child deserves a fair chance to dream and succeed.",
//       image: "/images/team/nkem.jpg",
//     },
//     {
//       name: "Chilota",
//       role: "Community Coordinator",
//       bio: "Chilota works closely with families and schools to identify children in need, ensuring that every sponsorship reaches the right hands.",
//       image: "/images/team/chilota.png",
//     },
//     {
//       name: "Callistus",
//       role: "Donor Relations",
//       bio: "Callistus bridges the gap between donors and children, fostering transparency and meaningful connections.",
//       image: "/images/team/callistus.jpeg",
//     },
//   ];

//   // 🖼️ You can add as many images as you want here
//   const gallery = [
//     "/images/gallery/classroom.jpg",
//     "/images/gallery/smiling-children.jpg",
//     "/images/gallery/event-day.jpg",
//     "/images/gallery/volunteers.jpg",
//     "/images/gallery/child-doctor.jpg",
//     "/images/gallery/child_education1.jpg",
//     "/images/gallery/poor-child-educate7.jpg",
//     "/images/gallery/pic7.jpg",
//   ];

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-lg shadow-sm">
//       <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
//         About Train-Up-A-Child
//       </h1>

//       <p className="text-gray-700 text-lg leading-relaxed mb-6">
//         <strong>Train-Up-A-Child</strong> is a compassionate initiative dedicated
//         to uplifting underprivileged children through education, mentorship, and
//         holistic support. We believe every child deserves the opportunity to
//         learn, grow, and become a beacon of hope for their community.
//       </p>

//       <p className="text-gray-700 text-lg leading-relaxed mb-6">
//         Our mission is to connect kind-hearted sponsors and donors with children
//         in need, creating lasting opportunities. Through your generosity, we
//         provide access to education, nutrition, and emotional guidance that help
//         children thrive and build brighter futures.
//       </p>

//       <p className="text-gray-700 text-lg leading-relaxed mb-6">
//         We operate with transparency, accountability, and love at the heart of
//         everything we do. Whether you choose to become a sponsor, volunteer your
//         time, or make a one-time contribution, your involvement helps shape
//         tomorrow’s leaders — one child at a time.
//       </p>

//       {/* 🌟 Meet Our Team Section */}
//       <div className="mt-12">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
//           Meet Our Team
//         </h2>

//         <div className="grid gap-8 md:grid-cols-3">
//           {team.map((member, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition transform hover:-translate-y-1"
//             >
//               <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-4 border-4 border-blue-100">
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   className="w-full h-full object-cover rounded-full transition-transform duration-300 hover:scale-105"
//                 />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
//               <p className="text-blue-600 font-medium text-sm mb-2">
//                 {member.role}
//               </p>
//               <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🖼️ Our Gallery Section */}
//       <div className="mt-16">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
//           Our Gallery
//         </h2>
//         <p className="text-center text-gray-600 mb-6">
//           A glimpse into our community — where love, learning, and hope come together.
//         </p>

//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {gallery.map((photo, index) => (
//             <div
//               key={index}
//               className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
//             >
//               <img
//                 src={photo}
//                 alt={`Gallery image ${index + 1}`}
//                 className="w-full h-56 object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="text-center mt-10">
//         <a
//           href="/donate"
//           className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
//         >
//           Support a Child Today
//         </a>
//       </div>
//       <BackToTopButton />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import BackToTopButton from "@/components/BackToTopButton";

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-lg shadow-sm relative">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        About Train-Up-A-Child
      </h1>

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

      <div className="text-center mt-10">
        <a
          href="/donate"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Support a Child Today
        </a>
      </div>

      <BackToTopButton />
    </div>
  );
}
