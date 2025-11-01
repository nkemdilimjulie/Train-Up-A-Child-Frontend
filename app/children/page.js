
// "use client"; // MUST be the very first line

// import { useState, useEffect } from "react";
// import TopFeatureSection from "@/components/TopFeatureSection";
// import BackToTopButton from "@/components/BackToTopButton";

// export default function ChildListPage() {
//   const [children, setChildren] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null); // For lightbox gallery

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9; // 3 per row, 3 rows per page

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

//   const totalPages = Math.ceil(children.length / itemsPerPage);
//   const paginatedChildren = children.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Gallery images
//   const gallery = [
//     "/images/children/child1.jpg",
//     "/images/children/child2.jpg",
//     "/images/children/child3.jpg",
//     "/images/children/child4.jpg",
//     "/images/children/child5.jpg",
//     "/images/children/child6.jpg",
//     "/images/children/child7.jpg",
//     "/images/children/child8.jpg",
//     "/images/children/child9.jpg",
//     "/images/children/child10.jpg",
//     "/images/children/child11.jpg",
//     "/images/children/child12.jpg",
//     "/images/children/child13.jpg",
//     "/images/children/child14.jpg",
//     "/images/children/child15.jpg",
//     "/images/children/child16.jpg",
//     "/images/children/child17.jpg",
//     "/images/children/child18.jpg",
//     "/images/children/child19.jpg",
//     "/images/children/child20.jpg",
//   ];

//   return (
//     <div className="max-w-7xl mx-auto mt-10 p-6 border rounded shadow bg-white">
//       <TopFeatureSection
//               title="Join our Sponsorship Program"
//               subtitle="Make a lasting impact by supporting a child today."
//             />

//       <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">
//         Children List
//       </h1>

//       {loading && <p className="text-center text-gray-500">Loading...</p>}
//       {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
//       {children.length === 0 && !loading && (
//         <p className="text-center text-gray-600">No children found.</p>
//       )}

//       {/* Children Grid */}
//       <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {paginatedChildren.map((child, index) => (
//           <div
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
//             {child.age && (
//               <p>
//                 <strong>Age:</strong> {child.age}
//               </p>
//             )}
//             {child.class_name && (
//               <p>
//                 <strong>Class Name:</strong> {child.class_name}
//               </p>
//             )}
//             {child.story && (
//               <p>
//                 <strong>Story:</strong> {child.story}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {children.length > itemsPerPage && (
//         <div className="flex justify-center items-center mt-6 space-x-3">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             &larr; Prev
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               className={`px-3 py-1 rounded ${
//                 currentPage === page
//                   ? "bg-blue-700 text-white font-semibold"
//                   : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//               }`}
//               onClick={() => setCurrentPage(page)}
//             >
//               {page}
//             </button>
//           ))}

//           <button
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       )}

//       {/* Children in Need Gallery */}
//       <div className="mt-16">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
//           Children in Need
//         </h2>
//         <p className="text-center text-gray-600 mb-8">
//           Photos of children facing hardships — your support makes a difference.
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

//       {/* Lightbox Popup */}
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
import { motion, AnimatePresence } from "framer-motion";
import TopFeatureSection from "@/components/TopFeatureSection";
import BackToTopButton from "@/components/BackToTopButton";

export default function ChildListPage() {
  const [children, setChildren] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // For lightbox
  const [selectedCaption, setSelectedCaption] = useState(""); // For caption

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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

  // ✅ Gallery images with captions
  const gallery = [
    { src: "/images/children/child1.jpg", caption: "Hope, age 6 — Loves reading and dreams of becoming a teacher." },
    { src: "/images/children/child2.jpg", caption: "Grace, age 8 — Enjoys drawing and helping younger kids." },
    { src: "/images/children/child3.jpg", caption: "Mary, age 5 — Wants to be a lawyer" },
    { src: "/images/children/child4.jpg", caption: "Daniel, age 7 — Loves football and wants to be a pilot." },
    { src: "/images/children/child5.jpg", caption: "Sarah, age 9 — A creative mind with a kind heart." },
    { src: "/images/children/child6.jpg", caption: "Emmanuella, age 6 — Finds joy in storytelling and singing." },
    { src: "/images/children/child7.jpg", caption: "James, age 8 — Determined to learn despite challenges." },
    { src: "/images/children/child8.jpg", caption: "David, age 10 — Enjoys puzzles and learning science." },
    { src: "/images/children/child9.jpg", caption: "Peace, age 7 — Always cheerful and caring toward others." },
     { src: "/images/children/child11.jpg", caption: "Nnenna, age 6 — Loves reading and dreams of becoming a teacher." },
    { src: "/images/children/child12.jpg", caption: "Nkechi, age 8 — Enjoys helping the sick." },
    { src: "/images/children/child13.jpg", caption: "Obinna, age 5 — Likes computers and full of curiosity." },
    { src: "/images/children/child14.jpg", caption: "David, age 7 — Loves football and wants to be a footballer." },
    { src: "/images/children/child15.jpg", caption: "Ekene, age 9 — A creative mind with courage." },
    { src: "/images/children/child16.jpg", caption: "Dimma, age 10 — Loves to sing." },
    { src: "/images/children/child17.jpg", caption: "Ify, age 8 — Determined to learn despite challenges." },
    { src: "/images/children/child18.jpg", caption: "Adaora, age 6 — Enjoys puzzles and learning science." },
    { src: "/images/children/child19.jpg", caption: "Iyke, age 11 — Always cheerful and caring toward others." },
    { src: "/images/children/child20.jpg", caption: "Anthony, age 7 — Wants to be an Engineer." },
    { src: "/images/children/child10.jpg", caption: "Gabriaella, age 11 — Wants to be doctor and cares for others." },
  ];
 
  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <TopFeatureSection
        title="Join our Sponsorship Program"
        subtitle="Make a lasting impact by supporting a child today."
      />

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

      {/* ✅ Children in Need Gallery */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Children in Need
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Photos of children facing hardships — your support makes a difference.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedImage(item.src);
                setSelectedCaption(item.caption);
              }}
              className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <img
                src={item.src}
                alt={`Child in need ${index + 1}`}
                className="w-full h-56 object-cover"
              />
              <p className="text-center text-sm text-gray-700 mt-2">
                {item.caption.split("—")[0]} {/* Only show name and age */}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Lightbox Popup with Caption
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative text-center">
            <img
              src={selectedImage}
              alt="Enlarged child"
              className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg border border-gray-700"
            />
            <p className="mt-4 text-gray-200 text-lg italic max-w-2xl mx-auto px-4">
              {selectedCaption}
            </p>
            <button
              className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-red-400"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )} */}

            {/* ✅ Lightbox Popup with Framer Motion Fade */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="lightbox"
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative text-center"
            >
              <img
                src={selectedImage}
                alt="Enlarged child"
                className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg border border-gray-700"
              />
              <p className="mt-4 text-gray-200 text-lg italic max-w-2xl mx-auto px-4">
                {selectedCaption}
              </p>
              <button
                className="absolute top-4 right-6 text-white text-3xl font-bold hover:text-red-400"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


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
