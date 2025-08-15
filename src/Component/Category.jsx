import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
// import EditItemModal from "../components/EditItemModal"; // import modal
import UpdateCategory from "./UpdateCategory";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal related states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    itemId: "",
    categoryName: "",
    item: "",
    price: ""
  });

  const fixedCategories = [
    "DRY CLEAN (MEN)",
    "DRY CLEAN (WOMEN)",
    "POLISHING",
    "DRY CLEAN (KIDS)",
    "HOUSE HOLD",
    "LAUNDRY",
    "DRY CLEAN WHITE CLOTHS",
  ];

  const fetchCategories = () => {
    axios
      .get("https://clean-backend-3.onrender.com/api/categories")
      .then((res) => {
        if (res.data.success) setCategories(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (itemId) => {
    console.log('Deleting item ID:', itemId); // ✅ Debug

    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`https://clean-backend-3.onrender.com/api/item/${itemId}`);
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          items: cat.items.filter((itm) => itm._id !== itemId),
        })).filter((cat) => cat.items.length > 0)
      );
    } catch {
      alert("Error deleting.");
    }
  };

  // 🆕 Edit button click
  const handleEditClick = (itemId, categoryName, item, price) => {
    setEditData({ itemId, categoryName, item, price });
    setIsModalOpen(true);
  };

  // 🆕 Save changes
  const handleSaveEdit = () => {
    axios
      .put(`https://clean-backend-3.onrender.com/api/item/${editData.itemId}`, editData)
      .then((res) => {
        alert(res.data.message);
        setIsModalOpen(false);
        fetchCategories();
      })
      .catch(() => alert("Update failed"));
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">📋 All Categories & Items</h1>

      {categories.map((category) => (
        <div key={category._id} className="mb-6 border rounded-lg shadow-sm">
          <h2 className="p-2 bg-blue-600 text-white text-lg font-semibold">{category.categoryName}</h2>
          <div className="p-4 space-y-2">
            {category.items.map((item) => (
              <div key={item._id} className="flex justify-between items-center border-b pb-2">
                <div className="flex gap-10 justify-center">
                  <span className="font-medium">{item.item}</span>
                  <span className="text-green-600 font-semibold text-right"> {"₹"+ item.price}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(item._id, category.categoryName, item.item, item.price)}
                    className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 🆕 Separate Edit Modal component */}
      <UpdateCategory
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editData={editData}
        setEditData={setEditData}
        onSave={handleSaveEdit}
        fixedCategories={fixedCategories}
      />
    </div>
  );
};

export default Category;
