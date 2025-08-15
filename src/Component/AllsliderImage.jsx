import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

export default function AllsliderImage() {
  const [images, setImages] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // full object
  const [newImageFile, setNewImageFile] = useState(null);

  // Fetch all images from API
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("https://clean-backend-3.onrender.com/Allslider");
      if (res.data.success && Array.isArray(res.data.data)) {
        setImages(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching slider images:", error);
    }
  };

  // Open modal for editing
  const handleEdit = (imgObj) => {
    setSelectedImage(imgObj); // store full object
    setNewImageFile(null);
    setEditModalOpen(true);
  };

  // Save edited image
const handleSaveEdit = async () => {
  if (!newImageFile || !selectedImage) {
    alert("Please select a new image before saving");
    return;
  }

  const formData = new FormData();
  formData.append("images", newImageFile);
  formData.append("public_id", selectedImage.public_id); // send public_id to backend

  try {
    const res = await axios.put(
      "http://localhost:5000/updateslider",
      formData
      // do NOT set headers manually
    );
    alert("Image updated successfully");
    console.log("Update response:", res.data);
    setEditModalOpen(false);
    fetchImages();
  } catch (error) {
    console.error("Error updating image:", error);
  }
};


  // Delete image
  const handleDelete = async (imgObj) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await axios.delete("https://clean-backend-3.onrender.com/deleteslider", {
        data: { public_id: imgObj.public_id },
      });
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Slider Images</h1>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative border rounded-lg overflow-hidden shadow"
          >
            <img src={img.url} alt="Slider" className="w-full h-40 object-cover" />

            <div className="absolute bottom-0 left-0 right-0 flex justify-between bg-black bg-opacity-50 p-2">
              <button
                onClick={() => handleEdit(img)}
                className="text-white hover:text-yellow-300"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(img)}
                className="text-white hover:text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Image</h2>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Current Image:</p>
              <img
                src={selectedImage.url} // use the url from object
                alt="Current"
                className="w-full h-40 object-cover rounded"
              />
            </div>

            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewImageFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
