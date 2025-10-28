// "use client";

// import { useState, useEffect } from "react";
// import TopFeatureSection from "@/components/TopFeatureSection";
// import BackToTopButton from "@/components/BackToTopButton";


// export default function ChildListPage() {
//   const [children, setChildren] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchChildren = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const BACKEND_URL = "http://localhost:8000";
//         const res = await fetch(`${BACKEND_URL}/api/children/list/`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await res.json();
//         if (!res.ok) {
//           setError(data.error || "Failed to fetch children.");
//           return;
//         }

//         setChildren(data);
//       } catch (err) {
//         setError("An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChildren();
//   }, []);

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">Children List</h1>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       {children.length === 0 && !loading && <p>No children found.</p>}

//       <ul className="space-y-4">
//         {children.map((child, index) => (
//           <li key={index} className="border p-4 rounded">
//             {child.first_name && (
//               <p>
//                 <strong>First Name:</strong> {child.first_name}
//               </p>
//             )}
//             {child.last_name && (
//               <p>
//                 <strong>Last Name:</strong> {child.last_name}
//               </p>
//             )}
//             {child.email && (
//               <p>
//                 <strong>Email:</strong> {child.email}
//               </p>
//             )}
//             {child.username && (
//               <p>
//                 <strong>Username:</strong> {child.username}
//               </p>
//             )}
//             <p>
//               <strong>Age:</strong> {child.age}
//             </p>
//             <p>
//               <strong>Class Name:</strong> {child.class_name}
//             </p>
//             {child.guardian_name && (
//               <p>
//                 <strong>Guardian Name:</strong> {child.guardian_name}
//               </p>
//             )}
//             {child.guardian_phone && (
//               <p>
//                 <strong>Guardian Phone:</strong> {child.guardian_phone}
//               </p>
//             )}
//             {child.guardian_email && (
//               <p>
//                 <strong>Guardian Email:</strong> {child.guardian_email}
//               </p>
//             )}
//             <p>
//               <strong>Story:</strong> {child.story}
//             </p>
//           </li>
//         ))}
//       </ul>
//       <BackToTopButton />
//     </div>
//   );
// }

// ----------

// "use client";

// import { useState, useEffect } from "react";
// import TopFeatureSection from "@/components/TopFeatureSection";
// import BackToTopButton from "@/components/BackToTopButton";

// export default function ChildListPage() {
//   const [children, setChildren] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null); // for lightbox popup

//   useEffect(() => {
//     const fetchChildren = async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const BACKEND_URL = "http://localhost:8000";
//         const res = await fetch(`${BACKEND_URL}/api/children/list/`, {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         });

//         const data = await res.json();
//         if (!res.ok) {
//           setError(data.error || "Failed to fetch children.");
//           return;
//         }

//         setChildren(data);
//       } catch (err) {
//         setError("An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChildren();
//   }, []);

//   // 🖼️ Static gallery of children in poor conditions (custom photos)
//   const gallery = [
//     "/images/poor-children/poor-child1.jpg",
//     "/images/poor-children/poor-child2.jpg",
//     "/images/poor-children/poor-child3.jpg",
//     "/images/poor-children/poor-child4.jpg",
//     "/images/poor-children/poor-child5.jpg",
//     "/images/poor-children/poor-child6.jpg",
//   ];

//   return (
//     <div className="max-w-5xl mx-auto mt-10 p-6 border rounded shadow bg-white">
//       <TopFeatureSection />

//       <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">
//         Children List
//       </h1>

//       {loading && <p className="text-center text-gray-500">Loading...</p>}
//       {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

//       {children.length === 0 && !loading && (
//         <p className="text-center text-gray-600">No children found.</p>
//       )}

//       {/* Children Details List */}
//       <ul className="space-y-4">
//         {children.map((child, index) => (
//           <li
//             key={index}
//             className="border p-4 rounded bg-gray-50 hover:shadow-md transition"
//           >
//             {child.first_name && (
//               <p>
//                 <strong>First Name:</strong> {child.first_name}
//               </p>
//             )}
//             {child.last_name && (
//               <p>
//                 <strong>Last Name:</strong> {child.last_name}
//               </p>
//             )}
//             {child.email && (
//               <p>
//                 <strong>Email:</strong> {child.email}
//               </p>
//             )}
//             {child.username && (
//               <p>
//                 <strong>Username:</strong> {child.username}
//               </p>
//             )}
//             <p>
//               <strong>Age:</strong> {child.age}
//             </p>
//             <p>
//               <strong>Class Name:</strong> {child.class_name}
//             </p>
//             {child.guardian_name && (
//               <p>
//                 <strong>Guardian Name:</strong> {child.guardian_name}
//               </p>
//             )}
//             {child.guardian_phone && (
//               <p>
//                 <strong>Guardian Phone:</strong> {child.guardian_phone}
//               </p>
//             )}
//             {child.guardian_email && (
//               <p>
//                 <strong>Guardian Email:</strong> {child.guardian_email}
//               </p>
//             )}
//             <p>
//               <strong>Story:</strong> {child.story}
//             </p>
//           </li>
//         ))}
//       </ul>

//       {/* 🖼️ New Section: Children in Need Gallery */}
//       <div className="mt-16">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
//           Children in Need
//         </h2>
//         <p className="text-center text-gray-600 mb-8">
//           These photos represent the reality many children face — and the hope
//           your generosity can bring. Together, we can rewrite their stories.
//         </p>

//         <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {gallery.map((photo, index) => (
//             <div
//               key={index}
//               onClick={() => setSelectedImage(photo)}
//               className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
//             >
//               <img
//                 src={photo}
//                 alt={`Child in need ${index + 1}`}
//                 className="w-full h-56 object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 🪞 Lightbox Popup */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <img
//             src={selectedImage}
//             alt="Enlarged child"
//             className="max-w-3xl max-h-[90vh] rounded-lg shadow-lg border border-gray-700"
//           />
//           <button
//             className="absolute top-6 right-8 text-white text-3xl font-bold hover:text-red-400"
//             onClick={() => setSelectedImage(null)}
//           >
//             ×
//           </button>
//         </div>
//       )}

//       <div className="text-center mt-12">
//         <a
//           href="/donate"
//           className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
//         >
//           Help a Child Today
//         </a>
//       </div>

//       <BackToTopButton />
//     </div>
//   );
// }

"use client"; // MUST be the very first line

import { useState, useEffect } from "react";
import TopFeatureSection from "@/components/TopFeatureSection";
import BackToTopButton from "@/components/BackToTopButton";

export default function ChildListPage() {
  const [children, setChildren] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // For lightbox gallery

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 per row, 3 rows per page

  useEffect(() => {
    const fetchChildren = async () => {
      setLoading(true);
      setError("");
      try {
        const BACKEND_URL = "http://localhost:8000";
        const res = await fetch(`${BACKEND_URL}/api/children/list/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Failed to fetch children.");
          return;
        }
        setChildren(data);
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, []);

  const totalPages = Math.ceil(children.length / itemsPerPage);
  const paginatedChildren = children.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Gallery images
  const gallery = [
    "/images/poor-children/poor-child1.jpg",
    "/images/poor-children/poor-child2.jpg",
    "/images/poor-children/poor-child3.jpg",
    "/images/poor-children/poor-child4.jpg",
    "/images/poor-children/poor-child5.jpg",
    "/images/poor-children/poor-child6.jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <TopFeatureSection />

      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
        Children List
      </h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      {children.length === 0 && !loading && (
        <p className="text-center text-gray-600">No children found.</p>
      )}

      {/* Children Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedChildren.map((child, index) => (
          <div
            key={index}
            className="border p-4 rounded bg-gray-50 hover:shadow-md transition"
          >
            {child.first_name && (
              <p>
                <strong>First Name:</strong> {child.first_name}
              </p>
            )}
            {child.last_name && (
              <p>
                <strong>Last Name:</strong> {child.last_name}
              </p>
            )}
            {child.age && (
              <p>
                <strong>Age:</strong> {child.age}
              </p>
            )}
            {child.class_name && (
              <p>
                <strong>Class Name:</strong> {child.class_name}
              </p>
            )}
            {child.story && (
              <p>
                <strong>Story:</strong> {child.story}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {children.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-3">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &larr; Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-700 text-white font-semibold"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next &rarr;
          </button>
        </div>
      )}

      {/* Children in Need Gallery */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Children in Need
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Photos of children facing hardships — your support makes a difference.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(photo)}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <img
                src={photo}
                alt={`Child in need ${index + 1}`}
                className="w-full h-56 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged child"
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

      <div className="text-center mt-12">
        <a
          href="/donate"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Help a Child Today
        </a>
      </div>

      <BackToTopButton />
    </div>
  );
}
