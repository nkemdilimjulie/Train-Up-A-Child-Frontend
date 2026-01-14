
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopFeatureSection from "@/components/TopFeatureSection";
import BackToTopButton from "@/components/BackToTopButton";
import ReturnToLastPage from "@/components/ReturnToLastPage";

export default function ChildListPage() {
  const [children, setChildren] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCaption, setSelectedCaption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const BACKEND_URL = "http://127.0.0.1:8000";

  const fetchChildren = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_URL}/api/children/list/`);
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid response format.");
      setChildren(data);
    } catch (err) {
      setError(err.message || "Failed to fetch children.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const updateChildPhotoLocally = (childId, newPhotoUrl) => {
    setChildren((prev) =>
      prev.map((child) =>
        child.id === childId ? { ...child, photo: newPhotoUrl } : child
      )
    );
  };

  const handleRemovePhoto = async (childId) => {
    try {
      const formData = new FormData();
      formData.append("photo", "");

      const res = await fetch(`${BACKEND_URL}/api/children/update/${childId}/`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) throw new Error(`Failed (${res.status})`);
      updateChildPhotoLocally(childId, null);
      alert("Photo removed successfully!");
    } catch (err) {
      setError(err.message || "Failed to remove photo.");
    }
  };

  const handleUploadPhoto = async (childId, file) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await fetch(`${BACKEND_URL}/api/children/update/${childId}/`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed (${res.status})`);
      const data = await res.json();

      // update only this child locally (no full refetch)
      if (data.photo) {
        const newPhotoUrl = data.photo.startsWith("http")
          ? data.photo
          : `${BACKEND_URL}/media/${data.photo.replace(/^\/+/, "")}`;
        updateChildPhotoLocally(childId, newPhotoUrl);
      }

      alert("Photo updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to upload photo.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(children.length / itemsPerPage));
  const paginatedChildren = children.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      {!loading && children.length === 0 && (
        <p className="text-center text-gray-600">No children found.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedChildren.map((child) => {
          let photoUrl = null;
          if (child.photo) {
            photoUrl = child.photo.startsWith("http")
              ? child.photo
              : `${BACKEND_URL}/media/${child.photo.replace(/^\/+/, "")}`;
          }

          return (
            <div
              key={child.id}
              className="border p-4 rounded bg-gray-50 hover:shadow-md transition flex flex-col items-center text-center"
            >
              {photoUrl ? (
                <div className="relative">
                  <img
                    src={photoUrl}
                    alt={child.first_name || "Child"}
                    className="w-32 h-32 object-cover rounded-full mb-3 cursor-pointer"
                    onClick={() => {
                      setSelectedImage(photoUrl);
                      setSelectedCaption(
                        `${child.first_name || ""} — Age: ${
                          child.age || "N/A"
                        } — Class: ${child.class_name || "N/A"}`
                      );
                    }}
                    onError={(e) =>
                      (e.currentTarget.src = "/images/placeholder-child.jpg")
                    }
                  />
                  {/* <button
                    onClick={() => handleRemovePhoto(child.id)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button> */}
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-full mb-3 flex flex-col items-center justify-center text-gray-500 text-sm">
                  <img
                    src="/images/placeholder-child.jpg"
                    alt="Placeholder"
                    className="w-32 h-32 object-cover rounded-full mb-2"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="text-xs"
                    onChange={(e) =>
                      e.target.files.length &&
                      handleUploadPhoto(child.id, e.target.files[0])
                    }
                  />
                </div>
              )}

              <p className="font-semibold text-blue-700 text-lg">
                {child.first_name} {child.last_name}
              </p>
              {child.age && (
                <p className="text-gray-600 text-sm mb-1">Age: {child.age}</p>
              )}
              {child.class_name && (
                <p className="text-gray-600 text-sm mb-1">
                  Class: {child.class_name}
                </p>
              )}
              {child.guardian_name && (
                <p className="text-gray-500 text-sm">
                  Guardian: {child.guardian_name}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {children.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 space-x-3">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ← Prev
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
            Next →
          </button>
        </div>
      )}

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
      <ReturnToLastPage fallback="/" />
      <BackToTopButton />
    </div>
  );
}
